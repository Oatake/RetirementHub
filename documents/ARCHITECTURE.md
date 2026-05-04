# RetirementHub — Technical Architecture Document

**Platform:** Longevity & Life Freedom App (Thailand Hub)  
**Version:** 1.0  
**Date:** 2026-04-30  
**Status:** Pre-Development

---

## 1. Architecture Overview

RetirementHub is a **multi-tenant web platform** with a decoupled architecture: a Next.js frontend served via Vercel and a standalone NestJS REST API backend deployed on Railway. The AI layer is powered by Claude (Anthropic). This separation enables independent scaling of the backend and clean mobile-app readiness from Phase 3 onward.

```
┌─────────────────────────────────────────────────────────────────┐
│                         CLIENT LAYER                            │
│  Web App (Next.js / Vercel)  │  Mobile App (RN — Phase 3)       │
└───────────────────────────────┬─────────────────────────────────┘
                                │ HTTPS / REST + SSE (streaming)
┌───────────────────────────────▼─────────────────────────────────┐
│                    API GATEWAY / REVERSE PROXY                  │
│           (Cloudflare Workers — rate limiting, DDoS)            │
└───────────────────────────────┬─────────────────────────────────┘
                                │
┌───────────────────────────────▼─────────────────────────────────┐
│                      NestJS API SERVER                          │
│                  (Railway — Node.js 20, TypeScript)             │
│                                                                 │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────────────┐  │
│  │ Auth Module  │  │  Marketplace │  │     AI Module        │  │
│  │ (JWT Guard)  │  │  Module      │  │  (Claude Streaming)  │  │
│  ├──────────────┤  ├──────────────┤  ├──────────────────────┤  │
│  │ Users Module │  │  Bookings    │  │   Planning Module    │  │
│  │              │  │  Module      │  │  (Score / Roadmap)   │  │
│  ├──────────────┤  ├──────────────┤  ├──────────────────────┤  │
│  │ Reviews      │  │  Payments    │  │   Community Module   │  │
│  │ Module       │  │  Module      │  │  (Feed / Affiliate)  │  │
│  └──────────────┘  └──────────────┘  └──────────────────────┘  │
│                                                                 │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │  Shared: Guards · Pipes · Interceptors · Swagger/OpenAPI │   │
│  └──────────────────────────────────────────────────────────┘   │
└────────────────────────┬────────────────────────────────────────┘
                         │
       ┌─────────────────┼─────────────────┐
┌──────▼───┐  ┌──────────▼───┐  ┌──────────▼───────────────────┐
│PostgreSQL│  │   Redis      │  │  Object Storage              │
│(Supabase)│  │  (Upstash)   │  │  (Supabase Storage / S3)     │
│+ pgvector│  │  Cache+Queue │  │  Images, Documents           │
└──────────┘  └──────────────┘  └──────────────────────────────┘
```

---

## 2. Tech Stack

### Frontend
| Layer | Technology | Rationale |
|---|---|---|
| Framework | **Next.js 14** (App Router) | SSR for SEO, RSC for performance, file-based routing |
| Language | **TypeScript** | Type safety across the full stack |
| UI Library | **Shadcn/ui + Tailwind CSS** | Matches design system; highly customizable |
| State Management | **Zustand** | Lightweight; no Redux boilerplate |
| Data Fetching | **TanStack Query (React Query)** | Server state, caching, background refetch |
| Forms | **React Hook Form + Zod** | Validation-first forms |
| Charts | **Recharts** | Retirement score visualizations, cost comparisons |
| i18n | **next-intl** | Thai + English; extensible |
| Maps | **Mapbox GL JS** | City comparison map, provider locations |

### Backend
| Layer | Technology | Rationale |
|---|---|---|
| API Framework | **NestJS 10** (Node.js 20, TypeScript) | Structured module system; DI; Guards/Pipes/Interceptors; Swagger built-in |
| API Style | **REST + OpenAPI (Swagger)** | Standard HTTP; auto-generated docs; mobile-ready |
| Validation | **class-validator + class-transformer** | DTO-level validation integrated into NestJS Pipes |
| Auth | **Supabase Auth + NestJS JWT Guard** | Supabase issues JWT; NestJS verifies + attaches user to request |
| ORM | **Prisma** | Type-safe DB access; migration management |
| Database | **PostgreSQL** (via Supabase) | Relational; strong for reviews, bookings, financials |
| Cache | **Redis** (Upstash) + **@nestjs/cache-manager** | Response caching, rate limiting, AI cache |
| Background Jobs | **BullMQ** + **@nestjs/bull** | Queue-based async jobs: Trust Score, review scoring, payouts |
| File Storage | **Supabase Storage** | Provider images, user documents |
| Email | **Resend** | Transactional emails (booking confirm, OTP) |
| Search | **Algolia** | Full-text service/provider search with filters |
| API Docs | **@nestjs/swagger** | Auto-generated OpenAPI spec at `/api/docs` |
| Streaming | **SSE (Server-Sent Events)** via NestJS `@Sse()` | AI chat token streaming to frontend |

### AI Layer
| Component | Technology | Rationale |
|---|---|---|
| LLM | **Claude claude-sonnet-4-6 (Anthropic)** | Best-in-class reasoning for planning scenarios |
| AI SDK | **Anthropic TypeScript SDK** | Streaming, tool use, prompt caching |
| Prompt Caching | **Anthropic Cache Control** | Reduces latency and cost for system prompts |
| Embeddings | **OpenAI text-embedding-3-small** | Semantic search for community content |
| Vector DB | **pgvector** (PostgreSQL extension) | Store embeddings alongside relational data |
| RAG Pipeline | **LangChain.js** | Document retrieval for visa/tax content |

### Infrastructure & DevOps
| Layer | Technology | Notes |
|---|---|---|
| Frontend Hosting | **Vercel** | Next.js SSR/ISR; edge middleware |
| Backend Hosting | **Railway** | NestJS long-running server; auto-deploy from GitHub |
| Database | **Supabase** (managed Postgres + Auth + Storage) | Includes pgvector extension |
| CDN | **Cloudflare** | Static assets, DDoS, rate limiting at edge |
| CI/CD | **GitHub Actions** | Separate pipelines for frontend and backend |
| Container | **Docker** (NestJS) | Dockerfile in backend repo; Railway builds from it |
| Monitoring | **Sentry** (errors, frontend + backend) | NestJS exception filter sends to Sentry |
| Logging | **Axiom** | Structured JSON logs from NestJS via Winston transport |
| Payments | **Omise** (Thailand-native) + **Stripe** (international) | |

---

## 3. Database Schema (Core Entities)

### Users & Auth
```sql
users
  id              UUID PK
  email           TEXT UNIQUE
  full_name       TEXT
  nationality     TEXT          -- 'TH', 'US', 'UK', etc.
  user_type       ENUM          -- 'planner', 'provider', 'creator'
  language        ENUM          -- 'th', 'en'
  created_at      TIMESTAMPTZ

user_profiles
  user_id         UUID FK
  age             INT
  current_country TEXT
  target_city     TEXT          -- Bangkok, Chiang Mai, Phuket...
  financial_data  JSONB         -- savings, monthly income, expenses
  health_data     JSONB         -- conditions, goals (encrypted)
  lifestyle_prefs JSONB
  retirement_score INT          -- 0-100 computed score
  score_updated_at TIMESTAMPTZ
```

### Service Marketplace
```sql
service_categories
  id              UUID PK
  name_en         TEXT
  name_th         TEXT
  slug            TEXT UNIQUE
  icon            TEXT
  -- e.g. hospital, spa, insurance, visa, eldercare, legal

providers
  id              UUID PK
  name_en         TEXT
  name_th         TEXT
  category_id     UUID FK
  city            TEXT
  address         TEXT
  phone           TEXT
  website         TEXT
  lat             DECIMAL
  lng             DECIMAL
  verified        BOOLEAN DEFAULT false
  trust_score     DECIMAL(3,2)  -- 0.00–5.00 computed
  listing_tier    ENUM          -- 'standard', 'premium'
  status          ENUM          -- 'pending', 'active', 'suspended'
  created_at      TIMESTAMPTZ

services
  id              UUID PK
  provider_id     UUID FK
  name_en         TEXT
  name_th         TEXT
  description_en  TEXT
  description_th  TEXT
  price_thb       DECIMAL
  price_type      ENUM          -- 'fixed', 'from', 'contact'
  duration_days   INT
  images          TEXT[]
  tags            TEXT[]
  avg_rating      DECIMAL(3,2)
  review_count    INT
  is_bookable     BOOLEAN DEFAULT true
  status          ENUM          -- 'active', 'paused', 'draft'
```

### Reviews & Trust
```sql
reviews
  id              UUID PK
  service_id      UUID FK
  user_id         UUID FK
  booking_id      UUID FK       -- must be verified booking
  rating_overall  INT           -- 1–5
  rating_quality  INT           -- service quality
  rating_value    INT           -- value for money
  rating_ease     INT           -- convenience/communication
  rating_trust    INT           -- trustworthiness
  body            TEXT
  language        TEXT
  is_verified     BOOLEAN       -- linked to completed booking
  helpful_count   INT DEFAULT 0
  created_at      TIMESTAMPTZ

provider_trust_scores
  provider_id     UUID FK
  trust_score     DECIMAL(3,2)
  avg_rating      DECIMAL(3,2)
  total_reviews   INT
  verified_reviews INT
  response_rate   DECIMAL       -- provider response % to reviews
  completion_rate DECIMAL       -- booking completion rate
  updated_at      TIMESTAMPTZ
```

### Bookings & Payments
```sql
bookings
  id              UUID PK
  user_id         UUID FK
  service_id      UUID FK
  provider_id     UUID FK
  status          ENUM          -- 'pending','confirmed','completed','cancelled'
  booking_date    DATE
  price_thb       DECIMAL
  commission_thb  DECIMAL       -- platform revenue
  commission_pct  DECIMAL
  payment_status  ENUM          -- 'unpaid','paid','refunded'
  payment_ref     TEXT          -- Omise/Stripe reference
  referral_code   TEXT          -- affiliate tracking
  created_at      TIMESTAMPTZ

affiliate_referrals
  id              UUID PK
  referrer_id     UUID FK       -- creator/user who shared
  booking_id      UUID FK
  commission_thb  DECIMAL       -- amount paid to referrer
  payout_status   ENUM          -- 'pending','paid'
  created_at      TIMESTAMPTZ
```

### AI Planning
```sql
ai_sessions
  id              UUID PK
  user_id         UUID FK
  session_type    ENUM          -- 'planner','visa','health','chat'
  messages        JSONB         -- [{role, content, ts}]
  created_at      TIMESTAMPTZ
  updated_at      TIMESTAMPTZ

retirement_plans
  id              UUID PK
  user_id         UUID FK
  readiness_score INT
  finance_score   INT
  health_score    INT
  lifestyle_score INT
  recommendations JSONB         -- [{category, action, priority}]
  scenario_data   JSONB         -- simulation results
  generated_at    TIMESTAMPTZ
```

### Community
```sql
posts
  id              UUID PK
  author_id       UUID FK
  content         TEXT
  images          TEXT[]
  tagged_services UUID[]        -- FK to services
  affiliate_link  TEXT          -- generated shoppable link
  likes_count     INT DEFAULT 0
  comments_count  INT DEFAULT 0
  embedding       vector(1536)  -- for semantic recommendations
  status          ENUM          -- 'published','draft','removed'
  created_at      TIMESTAMPTZ
```

---

## 4. AI System Architecture

### 4.1 Retirement Readiness Score Engine
```
User Profile Input
    ├── Financial data (savings, income, expenses, debt)
    ├── Health data (age, conditions, goals)
    └── Lifestyle prefs (city, activities, social needs)
         │
         ▼
  Claude claude-sonnet-4-6 (with prompt caching)
  System prompt: scoring rubric + Thailand context
         │
         ▼
  Structured output (JSON)
    ├── finance_score: 0–100
    ├── health_score: 0–100
    ├── lifestyle_score: 0–100
    ├── overall_score: weighted average
    └── recommendations: [{category, action, priority, service_ids}]
```

### 4.2 AI Chat Assistant (Planner)
- **Model:** claude-sonnet-4-6 with streaming
- **Prompt caching:** System prompt (Thailand knowledge base, visa rules, cost data) is cached with `cache_control: ephemeral`
- **Tool use:** AI can call platform tools:
  - `search_services(category, city, budget)` — live marketplace search
  - `get_visa_requirements(nationality, visa_type)` — visa eligibility check
  - `get_city_comparison(cities[])` — cost of living data
  - `get_provider_reviews(provider_id)` — review summary
- **Context window:** Conversation history passed with each request; summarized after 10 turns

### 4.3 Service Recommendation Engine
```
User context + browsing history + retirement plan
         │
         ▼
  Embedding similarity search (pgvector)
  + Rule-based filters (budget, city, category)
         │
         ▼
  Re-ranked by: Trust Score × Relevance Score × Personalization Score
         │
         ▼
  Top-N service recommendations
```

### 4.4 Content Moderation (Reviews & Community)
- AI-assisted review moderation: Flag reviews for spam, fake patterns, or policy violations before publishing
- Community post moderation: Auto-tag content; flag inappropriate posts

---

## 5. API Design

All endpoints are implemented in NestJS controllers. The base URL for the API is `https://api.retirementhub.co/v1`. The full OpenAPI spec is auto-generated at `https://api.retirementhub.co/api/docs` via `@nestjs/swagger`.

### NestJS Module → Controller → Route Mapping

```
AuthModule          → AuthController
  POST   /v1/auth/register
  POST   /v1/auth/login
  POST   /v1/auth/refresh
  POST   /v1/auth/logout

UsersModule         → UsersController
  GET    /v1/users/me
  PATCH  /v1/users/me
  GET    /v1/users/me/profile
  PATCH  /v1/users/me/profile
  DELETE /v1/users/me             (PDPA deletion request)

MarketplaceModule   → ServicesController, ProvidersController
  GET    /v1/services             (paginated, filtered)
  GET    /v1/services/:id
  GET    /v1/providers/:id
  GET    /v1/providers/:id/services
  POST   /v1/providers            (provider registration)
  PATCH  /v1/providers/:id        (provider update — provider role required)

BookingsModule      → BookingsController
  POST   /v1/bookings
  GET    /v1/bookings/:id
  GET    /v1/bookings             (user's own bookings)
  PATCH  /v1/bookings/:id/cancel
  PATCH  /v1/bookings/:id/confirm (provider only)

ReviewsModule       → ReviewsController
  POST   /v1/reviews
  GET    /v1/reviews?service_id=&provider_id=
  POST   /v1/reviews/:id/helpful
  POST   /v1/reviews/:id/report
  POST   /v1/reviews/:id/response (provider only)

AiModule            → AiController
  POST   /v1/ai/retirement-score
  POST   /v1/ai/relocation-plan
  GET    /v1/ai/chat/:sessionId/stream   (SSE endpoint — streams tokens)
  POST   /v1/ai/chat/:sessionId/message
  GET    /v1/ai/sessions
  DELETE /v1/ai/sessions/:id

PlanningModule      → VisaController, CitiesController
  GET    /v1/visa-types
  GET    /v1/visa-types/:slug
  POST   /v1/visa-eligibility-check
  GET    /v1/cities
  GET    /v1/cities/compare?cities[]=bangkok&cities[]=chiangmai

CommunityModule     → PostsController, AffiliateController
  GET    /v1/posts
  POST   /v1/posts
  GET    /v1/posts/:id
  DELETE /v1/posts/:id
  POST   /v1/posts/:id/like
  POST   /v1/posts/:id/report
  POST   /v1/affiliate/enroll
  POST   /v1/affiliate/links
  GET    /v1/affiliate/dashboard
  GET    /v1/affiliate/transactions

WebhooksModule      → WebhooksController
  POST   /v1/webhooks/omise
  POST   /v1/webhooks/stripe

AdminModule         → AdminController (admin role guard)
  GET    /v1/admin/providers/pending
  PATCH  /v1/admin/providers/:id/approve
  PATCH  /v1/admin/providers/:id/reject
  GET    /v1/admin/reviews/flagged
  PATCH  /v1/admin/reviews/:id/approve
  PATCH  /v1/admin/reviews/:id/remove
```

### NestJS Shared Infrastructure

```typescript
// Applied globally via main.ts bootstrap
app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }))
app.useGlobalInterceptors(new LoggingInterceptor(), new SentryInterceptor())
app.useGlobalFilters(new GlobalExceptionFilter())

// Swagger setup
const config = new DocumentBuilder()
  .setTitle('RetirementHub API')
  .setVersion('1.0')
  .addBearerAuth()
  .build()
SwaggerModule.setup('api/docs', app, SwaggerModule.createDocument(app, config))
```

### AI Streaming (SSE)

The AI chat uses **Server-Sent Events** (SSE) — NestJS `@Sse()` decorator — so the frontend receives streamed tokens without WebSocket complexity.

```
Frontend                     NestJS AiController
   │                               │
   │── GET /v1/ai/chat/:id/stream ─▶│  @Sse() handler
   │                               │  Creates Claude stream
   │◀─ data: {"token":"Plan"}\n\n ──│  Pipes each chunk as SSE event
   │◀─ data: {"token":"ning"}\n\n ──│
   │◀─ data: {"done":true}\n\n ─────│  Stream ends
```

---

## 6. Authentication & Authorization

### Auth Flow
1. **Social login** (Google, Facebook) via Supabase Auth — frontend handles OAuth redirect
2. **Email + OTP** via Supabase Auth
3. Supabase issues a **JWT access token** (15min) + refresh token (30 days)
4. Frontend sends `Authorization: Bearer <jwt>` on every API request to NestJS
5. NestJS **JwtAuthGuard** verifies the token against Supabase's JWKS endpoint
6. Verified user payload (`sub`, `email`, `role`) is attached to `request.user`

### NestJS Guards

```typescript
// Applied globally — all routes require auth by default
// Use @Public() decorator to exempt public routes (browse, visa info, etc.)
@Injectable()
export class JwtAuthGuard extends AuthGuard('supabase-jwt') { ... }

// Role-based guard for provider and admin routes
@Injectable()
export class RolesGuard implements CanActivate { ... }

// Usage example
@Roles('admin')
@UseGuards(JwtAuthGuard, RolesGuard)
@Patch('/providers/:id/approve')
approveProvider(...) { ... }
```

### Role Definitions
| Role | Access |
|---|---|
| `user` | Own profile, bookings, reviews, community posts |
| `provider` | Own listings, own bookings (incoming), review responses |
| `creator` | User permissions + affiliate tools |
| `admin` | Full platform access via admin module |

### Row-Level Security (RLS) — Database Layer
Supabase RLS remains as a secondary security layer (defense-in-depth):
- Users can only read/write their own profile rows
- Providers can only modify their own service/provider rows
- Reviews writable only by users with a completed booking (enforced in NestJS service layer first)
- NestJS uses the **anon key** for public reads and **service-role key** (server-side only) for admin operations

---

## 7. Payment Architecture

```
User initiates booking
        │
        ▼
Platform creates booking record (status: pending)
        │
        ▼
Redirect to Omise Checkout (Thai cards/PromptPay/TrueWallet)
OR Stripe (international cards)
        │
        ▼
Webhook received → verify signature
        │
        ▼
Update booking status → confirmed
Calculate commission split:
  Provider payout = price × (1 - commission_pct)
  Platform revenue = price × commission_pct
  Affiliate cut = platform_revenue × affiliate_pct (if referral)
        │
        ▼
Schedule provider payout (weekly batch via Omise transfers)
Trigger booking confirmation email (Resend)
Trigger review prompt (14 days post-service, via Inngest)
```

---

## 8. Security Architecture

| Concern | Solution |
|---|---|
| Auth | Supabase Auth with JWT; refresh token rotation |
| API abuse | Rate limiting at API Gateway (Kong); per-user limits |
| SQL injection | Prisma ORM with parameterized queries; no raw SQL |
| XSS | Next.js escapes by default; CSP headers via Cloudflare |
| CSRF | SameSite cookies; CSRF token on mutation endpoints |
| Sensitive data | Health/financial fields encrypted at rest (AES-256) |
| PII | PDPA-compliant; data minimization; right-to-deletion endpoint |
| Payment data | Never stored on platform; tokenized via Omise/Stripe |
| Webhook integrity | HMAC signature verification on all payment webhooks |
| File uploads | Validated file type + size; virus scan via Cloudflare |
| Admin access | Separate admin sub-domain; IP allowlist + MFA required |

---

## 9. Performance & Scalability

### Caching Strategy
| Layer | What | TTL |
|---|---|---|
| CDN (Cloudflare) | Static assets, public pages | 30 days |
| Next.js ISR | Service listing pages, city comparison (fetched from NestJS) | 1 hour |
| Redis | User sessions, rate limit counters | 15 min |
| Redis | AI response cache (identical inputs) | 24 hours |
| Algolia | Search index | Real-time sync via Inngest |

### Scalability Plan
- **Phase 1 (MVP):** Vercel Pro (frontend) + Railway Starter (NestJS); Supabase Pro; Upstash Redis free
- **Phase 2 (Growth):** Railway Pro (NestJS horizontal scaling via replicas); Supabase Pro; Upstash Redis Pro
- **Phase 3 (Scale):** Migrate NestJS to AWS ECS (Fargate) behind an ALB for full auto-scaling; separate BullMQ workers as standalone Railway services

### Target Performance
| Metric | Target |
|---|---|
| Lighthouse Performance | ≥ 90 |
| LCP (Largest Contentful Paint) | < 2.5s |
| TTFB (Time to First Byte) | < 400ms |
| AI response stream start | < 1s |
| Search results | < 300ms (Algolia) |

---

## 10. Internationalization (i18n)

- **Default language:** English
- **Phase 1 launch:** English + Thai
- **Content strategy:** Bilingual service listings (name_en + name_th); bilingual AI responses based on user language preference
- **URL structure:** `/en/...` and `/th/...` via next-intl middleware
- **Future:** Japanese, Chinese (Simplified) — Phase 3

---

## 11. System Integrations

| Integration | Purpose | Provider |
|---|---|---|
| Payment (Thai) | PromptPay, credit cards, TrueWallet | Omise |
| Payment (Intl) | International cards | Stripe |
| AI / LLM | Planning, chat, recommendations | Anthropic (Claude) |
| Email | Transactional notifications | Resend |
| Search | Full-text service search | Algolia |
| Maps | City/provider location display | Mapbox |
| Analytics | User behavior tracking | Vercel Analytics + PostHog |
| Error tracking | Runtime error monitoring | Sentry |
| Background jobs | Queue-based async tasks (Trust Score, review prompts, payouts) | BullMQ + @nestjs/bull |
| SMS/OTP | Phone verification (future) | Twilio |

---

## 12. Folder Structure

The project is split into two repositories (or a monorepo with two workspaces):

### 12.1 Frontend — `retirementhub-web` (Next.js)

```
retirementhub-web/
├── app/
│   ├── (auth)/                  -- login, register, onboarding
│   ├── (marketplace)/
│   │   ├── services/            -- browse + search
│   │   ├── services/[id]/       -- service detail + booking
│   │   └── providers/[id]/      -- provider profile
│   ├── (planning)/
│   │   ├── dashboard/           -- retirement score + recommendations
│   │   ├── planner/             -- AI chat (SSE consumer)
│   │   ├── visa/                -- visa hub
│   │   └── cities/              -- city comparison
│   ├── (community)/
│   │   ├── feed/                -- community posts
│   │   └── affiliate/           -- creator dashboard
│   ├── (account)/
│   │   ├── profile/
│   │   ├── bookings/
│   │   └── settings/
│   └── (provider)/              -- provider portal layout
├── components/
│   ├── ui/                      -- shadcn base components
│   ├── marketplace/             -- service cards, filters, booking flow
│   ├── planning/                -- score widgets, AI chat, roadmap
│   ├── community/               -- post cards, shoppable content
│   └── shared/                  -- navigation, layout, modals
├── lib/
│   ├── api/                     -- typed fetch wrappers for NestJS API
│   ├── auth/                    -- Supabase auth client helpers
│   └── utils/
├── hooks/                       -- custom React hooks
├── store/                       -- Zustand stores
└── messages/
    ├── en.json
    └── th.json
```

### 12.2 Backend — `retirementhub-api` (NestJS)

```
retirementhub-api/
├── src/
│   ├── main.ts                  -- bootstrap: validation pipe, Swagger, CORS
│   ├── app.module.ts            -- root module
│   │
│   ├── auth/                    -- AuthModule
│   │   ├── auth.module.ts
│   │   ├── auth.controller.ts
│   │   ├── auth.service.ts
│   │   ├── guards/
│   │   │   ├── jwt-auth.guard.ts
│   │   │   └── roles.guard.ts
│   │   └── strategies/
│   │       └── supabase-jwt.strategy.ts
│   │
│   ├── users/                   -- UsersModule
│   │   ├── users.module.ts
│   │   ├── users.controller.ts
│   │   ├── users.service.ts
│   │   └── dto/
│   │       ├── update-profile.dto.ts
│   │       └── user-response.dto.ts
│   │
│   ├── marketplace/             -- MarketplaceModule
│   │   ├── marketplace.module.ts
│   │   ├── services.controller.ts
│   │   ├── services.service.ts
│   │   ├── providers.controller.ts
│   │   ├── providers.service.ts
│   │   └── dto/
│   │
│   ├── bookings/                -- BookingsModule
│   │   ├── bookings.module.ts
│   │   ├── bookings.controller.ts
│   │   ├── bookings.service.ts
│   │   └── dto/
│   │
│   ├── reviews/                 -- ReviewsModule
│   │   ├── reviews.module.ts
│   │   ├── reviews.controller.ts
│   │   ├── reviews.service.ts
│   │   └── dto/
│   │
│   ├── ai/                      -- AiModule
│   │   ├── ai.module.ts
│   │   ├── ai.controller.ts     -- @Sse() streaming endpoint
│   │   ├── ai.service.ts        -- Claude SDK calls
│   │   ├── tools/               -- Claude tool definitions
│   │   │   ├── search-services.tool.ts
│   │   │   ├── get-visa-requirements.tool.ts
│   │   │   └── get-city-comparison.tool.ts
│   │   └── prompts/             -- system prompt templates
│   │
│   ├── planning/                -- PlanningModule (visa + cities)
│   │   ├── planning.module.ts
│   │   ├── visa.controller.ts
│   │   ├── cities.controller.ts
│   │   └── planning.service.ts
│   │
│   ├── community/               -- CommunityModule
│   │   ├── community.module.ts
│   │   ├── posts.controller.ts
│   │   ├── posts.service.ts
│   │   ├── affiliate.controller.ts
│   │   ├── affiliate.service.ts
│   │   └── dto/
│   │
│   ├── payments/                -- PaymentsModule
│   │   ├── payments.module.ts
│   │   ├── omise.service.ts
│   │   ├── stripe.service.ts
│   │   └── webhooks.controller.ts
│   │
│   ├── jobs/                    -- JobsModule (BullMQ queues)
│   │   ├── jobs.module.ts
│   │   ├── trust-score.processor.ts
│   │   ├── review-prompt.processor.ts
│   │   └── affiliate-payout.processor.ts
│   │
│   ├── admin/                   -- AdminModule
│   │   ├── admin.module.ts
│   │   ├── admin.controller.ts
│   │   └── admin.service.ts
│   │
│   └── common/                  -- Shared utilities
│       ├── decorators/
│       │   ├── public.decorator.ts
│       │   └── roles.decorator.ts
│       ├── filters/
│       │   └── global-exception.filter.ts
│       ├── interceptors/
│       │   ├── logging.interceptor.ts
│       │   └── cache.interceptor.ts
│       └── pipes/
│           └── parse-uuid.pipe.ts
│
├── prisma/
│   ├── schema.prisma
│   └── migrations/
├── Dockerfile
├── .env.example
└── nest-cli.json
```

---

## 13. Development Phases & Milestones

### Phase 1 — Foundation (Weeks 1–8)
- [ ] Project scaffold — Next.js frontend + NestJS backend (separate repos or monorepo)
- [ ] NestJS bootstrap: ValidationPipe, Swagger, CORS, JwtAuthGuard, GlobalExceptionFilter
- [ ] Design system implementation (Tailwind + Shadcn, per DESIGN.md)
- [ ] Auth system (Supabase Auth — email + Google login)
- [ ] Database schema + migrations (core tables)
- [ ] User onboarding flow + profile creation
- [ ] Service marketplace — browse, filter, detail pages
- [ ] Provider portal — registration + service listing
- [ ] Star rating + review system (Agoda-style)
- [ ] AI Retirement Readiness Score (Claude integration)
- [ ] Thailand Visa Hub (static content + eligibility checker)

### Phase 2 — Commerce (Weeks 9–16)
- [ ] Booking flow + Omise payment integration
- [ ] Commission tracking + provider payouts
- [ ] Affiliate referral link generation
- [ ] Community feed + shoppable posts
- [ ] AI Chat Assistant (streaming + tool use)
- [ ] City comparison tool
- [ ] Provider Trust Score computation (Inngest job)
- [ ] Algolia search integration
- [ ] Email notifications (Resend)
- [ ] Admin panel (moderation, provider approval)

### Phase 3 — Intelligence & Scale (Weeks 17–24)
- [ ] Health risk analysis module
- [ ] Personalized relocation roadmap generator
- [ ] Content recommendation engine (pgvector)
- [ ] Multi-language (Thai fully localized)
- [ ] Premium listing tier + provider analytics
- [ ] Mobile-responsive audit + PWA support
- [ ] Performance optimization (ISR, caching audit)
- [ ] PDPA compliance audit + data deletion flows
- [ ] Load testing + scalability review

---

## 14. Key Architectural Decisions

| Decision | Choice | Alternative Considered | Reason |
|---|---|---|---|
| Frontend framework | Next.js 14 | Remix, SvelteKit | SSR + ISR for SEO; largest ecosystem; Vercel native |
| Backend framework | **NestJS 10** | Express, tRPC-in-Next.js, Fastify | Opinionated module system; built-in DI, Guards, Pipes, Swagger; scales to team; mobile-API-ready from day one |
| Backend deployment | **Railway** | Vercel (serverless), AWS ECS | Persistent process suits NestJS; simple Docker-based deploys; no cold-start issues |
| API style | **REST + OpenAPI** | GraphQL, tRPC | REST is universally compatible (web + mobile + third-party); Swagger auto-gen reduces doc overhead |
| AI streaming | **SSE via NestJS @Sse()** | WebSockets | SSE is simpler for one-directional server→client token streams; HTTP-native; no socket management |
| Background jobs | **BullMQ + @nestjs/bull** | Inngest, cron | Redis-backed; NestJS-native integration; reliable retry/backoff for Trust Score and payout jobs |
| Database | PostgreSQL (Supabase) | MySQL, MongoDB | Relational data model fits; pgvector for AI; Supabase auth/storage bundled |
| AI model | Claude claude-sonnet-4-6 | GPT-4o | Superior reasoning for nuanced life planning; prompt caching for cost |
| Auth | Supabase Auth + NestJS JWT Guard | Auth0, Passport local | Supabase handles OAuth/OTP complexity; NestJS guard verifies JWT — clean separation |
| Payment (TH) | Omise | 2C2P, SCB Pay | Best developer experience; PromptPay + full Thai payment methods |
| Search | Algolia | Elasticsearch, Typesense | Speed + relevance out-of-box; managed service reduces ops burden |
