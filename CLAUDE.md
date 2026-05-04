# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

---

## Project Status

**RetirementHub** is an AI-powered web platform for retirement planning, service booking, and relocation in Thailand. As of 2026-04-30, the repository contains only design and planning documents in `documents/`. No source code exists yet — implementation follows the phases below.

---

## Planned Repository Structure

The project will be two separate apps (or a monorepo with two workspaces):

- `retirementhub-web/` — Next.js 14 frontend (Vercel)
- `retirementhub-api/` — NestJS 10 backend (Railway / Docker)

---

## Commands (once scaffolded)

### Frontend (`retirementhub-web/`)
```bash
npm run dev          # Start Next.js dev server (http://localhost:3000)
npm run build        # Production build
npm run lint         # ESLint
npm run type-check   # TypeScript check
npm test             # Jest/Vitest unit tests
```

### Backend (`retirementhub-api/`)
```bash
npm run start:dev    # NestJS watch mode
npm run build        # Compile TypeScript → dist/
npm run lint         # ESLint
npm test             # Jest unit tests
npm run test:e2e     # End-to-end tests
npx prisma migrate dev   # Run DB migrations
npx prisma db seed       # Seed database
```

### Backend API docs (auto-generated)
`http://localhost:3001/api/docs` — Swagger/OpenAPI via `@nestjs/swagger`

---

## Architecture

### Topology

```
Next.js (Vercel) → Cloudflare → NestJS (Railway)
                                      ├── PostgreSQL + pgvector (Supabase)
                                      ├── Redis (Upstash) — cache + BullMQ queues
                                      └── Supabase Storage — images/documents
```

Frontend and backend are **fully decoupled** — the frontend calls `https://api.retirementhub.co/v1` exclusively. This separation was chosen to enable independent scaling and clean mobile-app readiness (Phase 3).

### Backend module layout (`src/`)

| Module | Responsibility |
|---|---|
| `auth/` | Supabase JWT strategy, `JwtAuthGuard`, `RolesGuard` |
| `users/` | Profile CRUD; PDPA deletion endpoint |
| `marketplace/` | Services + providers browse/search (Algolia) |
| `bookings/` | Booking flow, status transitions |
| `reviews/` | Verified-booking-only reviews; AI moderation pipeline |
| `ai/` | Claude streaming (`@Sse()`), tool use, Retirement Score, Chat |
| `planning/` | Visa hub content, city comparison data |
| `community/` | Community feed posts, affiliate link generation |
| `payments/` | Omise + Stripe integration, webhook HMAC verification |
| `jobs/` | BullMQ processors: Trust Score, review prompts, affiliate payouts |
| `admin/` | Admin-only endpoints behind `RolesGuard('admin')` |
| `common/` | Shared guards, pipes, decorators (`@Public()`, `@Roles()`), filters, interceptors |

All routes require auth by default (global `JwtAuthGuard`). Public routes use the `@Public()` decorator.

### Frontend route groups (`app/`)

| Route group | Pages |
|---|---|
| `(auth)/` | login, register, onboarding |
| `(marketplace)/` | service browse, detail (`/services/[slug]`), provider profile |
| `(planning)/` | retirement dashboard, AI planner chat, visa hub, city comparison |
| `(community)/` | community feed, affiliate creator dashboard |
| `(account)/` | profile, bookings, settings |
| `(provider)/` | provider portal layout |

---

## Key Conventions

### Authentication
- Supabase Auth issues the JWT; NestJS verifies it via a custom Passport strategy against Supabase's JWKS endpoint.
- Roles: `user`, `provider`, `creator`, `admin`. Role checks done in NestJS `RolesGuard`, not in the frontend.
- Supabase RLS is a secondary defense layer — primary access control lives in NestJS service methods.

### AI Integration
- **Model:** `claude-sonnet-4-6` via Anthropic TypeScript SDK.
- **Prompt caching:** System prompts use `cache_control: ephemeral` to reduce latency/cost on repeated requests.
- **Streaming:** AI chat uses NestJS `@Sse()` (Server-Sent Events), not WebSockets.
- **Tool use:** The AI can call `search_services`, `get_visa_requirements`, `get_city_comparison`, `get_service_reviews`, `get_user_profile`, `calculate_budget`.
- **Context management:** Conversation history is summarized after 10 user turns.
- All AI outputs for financial or health topics must include the disclaimer: *"This is for informational purposes only and does not constitute financial or medical advice."*

### Database
- ORM: Prisma — no raw SQL. All queries are parameterized.
- Sensitive fields (financial data, health data) are AES-256 encrypted at rest.
- Indexes required on: `user_id`, `service_id`, `provider_id`, `category`, `city`, `status`.
- `pgvector` extension stores `vector(1536)` embeddings (OpenAI `text-embedding-3-small`) on the `posts` table for semantic recommendations.

### Reviews
- Only users with a booking in `completed` status may submit a review. Enforced in the NestJS `ReviewsService` before DB write.
- Reviews go through AI moderation before publishing; failures queue to admin review.

### Payments
- Card data never touches RetirementHub servers — Omise Checkout iframe handles it.
- Webhook integrity verified via HMAC signature on all `/v1/webhooks/omise` and `/v1/webhooks/stripe` routes.
- Commission split: provider payout = `price × (1 - commission_pct)`; affiliate cut taken from platform commission share.

### Internationalization
- `next-intl` middleware serves `/en/...` and `/th/...` URL prefixes.
- Service listings have bilingual fields: `name_en`/`name_th`, `description_en`/`description_th`.
- AI chat responds in the language the user writes in, regardless of platform language setting.

### NestJS bootstrap (`main.ts`)
```typescript
app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }))
app.useGlobalInterceptors(new LoggingInterceptor(), new SentryInterceptor())
app.useGlobalFilters(new GlobalExceptionFilter())
```
DTOs use `class-validator` + `class-transformer`; all input is validated at the pipe level.

---

## Infrastructure Notes

- **Backend deployment:** Railway runs NestJS as a persistent Docker container — no cold starts (this is why Railway was chosen over serverless).
- **Background jobs:** BullMQ + Redis (Upstash). Key processors: Trust Score recalculation (daily), review prompts (48h post-service), affiliate payouts (bi-monthly).
- **Search:** Algolia powers `/v1/services` search; index kept in sync via background job.
- **Admin panel:** Separate subdomain `admin.retirementhub.co`; IP-allowlisted; all admin accounts require MFA.

---

## Phase Roadmap

| Phase | Weeks | Focus |
|---|---|---|
| 1 — Foundation | 1–8 | Auth, onboarding, marketplace browse, reviews, AI Retirement Score, Visa Hub |
| 2 — Commerce | 9–16 | Booking + Omise payment, affiliates, community feed, AI Chat, admin panel |
| 3 — Scale | 17–24 | Health module, relocation roadmap, pgvector recommendations, mobile, full TH localization |
