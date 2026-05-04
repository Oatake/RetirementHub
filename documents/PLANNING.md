# RetirementHub — Product Planning Document

**Platform:** Longevity & Life Freedom App (Thailand Hub)  
**Version:** 1.0  
**Date:** 2026-04-30  
**Status:** Pre-Development

---

## 1. Product Vision

> "Plan your freedom, live better, and retire in Thailand — all in one AI-powered platform."

RetirementHub is an AI-powered web platform that serves as a single destination for life freedom planning, retirement, and long-term longevity in Thailand. It combines marketplace booking (à la Klook), trusted reviews (à la Agoda), AI-driven planning tools, and a community-affiliate ecosystem — all focused on Thailand as the destination hub.

### Target Users

| Segment | Description |
|---|---|
| 🇹🇭 Thai Planners | Thai nationals planning retirement, long-term healthcare, and financial stability |
| 🌍 Expat Relocators | Foreigners relocating to, retiring in, or working remotely from Thailand |
| 🧳 Digital Nomads | Remote workers seeking long-stay visa support and lifestyle services in Thailand |
| 👴 Elderly & Families | Families planning care arrangements, eldercare, and legacy services |

---

## 2. Core Problems Solved

1. **Fragmented information** — Visa requirements, cost-of-living data, healthcare options, and relocation services are scattered across dozens of sites.
2. **No personalization** — Generic guides cannot account for individual financial situations, health profiles, or lifestyle goals.
3. **Trust deficit** — Service quality for healthcare, eldercare, and legal services in Thailand is hard to verify.
4. **Booking friction** — Users find services but must leave the platform to book them.
5. **No community anchor** — Expat and Thai retiree communities exist on Facebook groups with no transactional or service layer.

---

## 3. Feature Roadmap

### Phase 1 — MVP (Months 1–4)
Core value: AI planning + marketplace browsing + trust reviews

| Feature | Priority | Description |
|---|---|---|
| User onboarding + profile | P0 | Age, nationality, financial profile, health goals |
| Retirement Readiness Score | P0 | AI-generated score across Finance, Health, Lifestyle |
| Service Marketplace (browse) | P0 | List hospitals, spas, insurance, relocation services |
| Star Rating & Review System | P0 | Agoda-style reviews per service |
| Thailand Visa Hub (static) | P1 | OA/OX eligibility info + document checklist |
| City Comparison Tool | P1 | Compare Bangkok, Chiang Mai, Phuket, Pattaya |
| Provider Registration Portal | P1 | Partners self-onboard and list services |
| AI Chat Assistant | P1 | Guided next-step recommendations |

### Phase 2 — Growth (Months 5–8)
Core value: Booking + affiliate + community

| Feature | Priority | Description |
|---|---|---|
| In-app Booking & Payment | P0 | Commission-based bookings through partner integrations |
| Affiliate / Creator Referral | P0 | Shoppable posts with tracked referral links |
| Community Feed | P1 | User posts, experience sharing, tagged services |
| Relocation Roadmap Generator | P1 | Step-by-step personalized relocation plan |
| Cost-of-Living Simulator | P1 | Multi-country cost comparison |
| Provider Trust Score | P1 | Composite score from reviews + history |
| Premium Listing Tier | P2 | Paid visibility boost for providers |

### Phase 3 — Scale (Months 9–12)
Core value: Longevity health + daily services + data flywheel

| Feature | Priority | Description |
|---|---|---|
| Health Risk Analysis | P1 | AI-driven preventive health screening recommendations |
| Personalized Health Plan | P1 | Lifestyle + health coaching integration |
| Daily Living Services | P2 | Eldercare, medical transport, meal delivery |
| Will & Legacy Planning | P2 | Partner-assisted legal document services |
| Mobile App (iOS/Android) | P2 | Native mobile for high-engagement users |
| Multi-language Support | P1 | Thai + English (core); Japanese/Chinese later |

---

## 4. User Journeys

### Journey A — Thai Retiree Planning
1. Creates profile (age 55, Thai national, current savings, health status)
2. Gets **Retirement Readiness Score** with gap analysis
3. Browses **Health Screening Packages** in Chiang Mai
4. Reads **reviews** and books a package (commission earned)
5. Shares experience in community → earns affiliate income

### Journey B — Foreign Relocator
1. Lands on platform researching Thailand retirement visa
2. Uses **Visa Eligibility Checker** (OA/OX)
3. Gets **City Comparison** (Bangkok vs. Chiang Mai cost + lifestyle)
4. Generates **Relocation Roadmap** via AI assistant
5. Books **health insurance** and **relocation service** through marketplace

### Journey C — Content Creator / Affiliate
1. Joins as community member
2. Posts review of a wellness retreat
3. Tags services in post → shoppable link generated
4. Earns commission when followers book via their post

---

## 5. Business Model

### Revenue Streams

| Stream | Model | Est. Margin |
|---|---|---|
| Booking Commission | 8–15% per transaction from service partners | Primary |
| Affiliate Referral Payout | Revenue share with creators (30–40% of commission) | Growth driver |
| Premium Listing Fee | Monthly fixed fee for enhanced provider visibility | Secondary |
| Partner Onboarding Fee | One-time registration fee for verified partners | Secondary |
| Sponsored Content | Promoted posts in community feed | Future |

### Unit Economics (Targets — Year 1)
- Average booking value: ฿5,000–฿50,000
- Platform commission: 10% avg
- Target transactions/month (end of Y1): 2,000
- Target GMV/month (end of Y1): ฿20M+

---

## 6. Key Metrics (KPIs)

| Category | KPI |
|---|---|
| Acquisition | MAU, new user registrations, traffic by segment (Thai vs. expat) |
| Engagement | Retirement Readiness Score completions, AI chat sessions/user |
| Marketplace | GMV, bookings/month, avg. order value, conversion rate |
| Trust | Avg. service rating, reviews/service, provider Trust Score distribution |
| Community | Posts/month, affiliate referrals, content-to-booking conversion |
| Revenue | Commission revenue, listing fees, MoM revenue growth |

---

## 7. Competitive Positioning

| Dimension | RetirementHub | Klook | Agoda | Expat forums |
|---|---|---|---|---|
| AI Life Planning | ✅ Core | ❌ | ❌ | ❌ |
| Thailand focus | ✅ Deep | Partial | Partial | Partial |
| Healthcare booking | ✅ | Limited | ❌ | ❌ |
| Visa guidance | ✅ | ❌ | ❌ | Community only |
| Trust reviews | ✅ Verified | ✅ | ✅ | Unverified |
| Affiliate community | ✅ | Limited | ❌ | ❌ |
| Longevity services | ✅ Core | ❌ | ❌ | ❌ |

---

## 8. Risks & Mitigations

| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| Low provider adoption | Medium | High | Free onboarding for first 100 partners; curated launch list |
| Fake or low-quality reviews | High | High | Booking-verified reviews only; AI moderation |
| Regulatory changes (visa rules) | Medium | Medium | Modular content system; legal partner for updates |
| AI hallucinations in planning advice | Medium | High | Disclaimer layer; AI recommendations are suggestions not advice |
| Payment processing in Thailand | Medium | Medium | Use Omise or Stripe (Thailand); fallback to off-platform redirect |
| User data privacy (PDPA compliance) | High | High | PDPA-compliant data handling from day one |

---

## 9. Technical Development Phases

The product roadmap (Section 3) defines *what* to build. This section defines *how* to build it — splitting engineering work into two phases regardless of product phase.

### Dev Phase 1 — Frontend with Mock Data

**Goal:** Ship a fully interactive, visually complete UI against static/mock data so product decisions can be validated before any backend exists.

| Area | Scope |
|---|---|
| Tech stack | Next.js (App Router), Tailwind CSS, shadcn/ui |
| Data layer | Local mock JSON files / in-memory state (no real API calls) |
| Auth | Mocked user session (hardcoded test accounts) |
| AI features | Stubbed responses; static score outputs |
| Booking/payment | UI flows only; no real transactions |
| Deliverables | All page layouts, user flows, component library, design tokens |

**Exit criteria:** All MVP screens (Section 3 Phase 1) are navigable end-to-end with mock data and reviewed by the product team.

---

### Dev Phase 2 — Backend API & Database

**Goal:** Replace every mock with real data by building the API layer and database, then wiring the existing frontend to it.

| Area | Scope |
|---|---|
| Runtime | Node.js / Bun with a REST or tRPC API |
| Database | PostgreSQL (primary), Redis (session/cache) |
| Auth | NextAuth.js or Supabase Auth; JWT sessions |
| AI integration | Real Claude API calls (prompt caching enabled) |
| Booking/payment | Omise or Stripe integration; webhook handling |
| Storage | S3-compatible bucket for provider assets |
| Compliance | PDPA-compliant data handling, audit logging |
| Deliverables | Fully functional API routes, DB schema, seed data, staging environment |

**Exit criteria:** All mock data sources are replaced by live API responses; end-to-end tests pass on staging.

---

### Phase Mapping

| Product Feature | Dev Phase 1 (UI) | Dev Phase 2 (API/DB) |
|---|---|---|
| User onboarding + profile | UI + form validation | User table, auth, profile API |
| Retirement Readiness Score | Static score display | AI scoring engine, user data persistence |
| Service Marketplace | Mock listings, filter UI | Provider DB, search API |
| Reviews & Ratings | Mock review cards | Review table, submission API, moderation |
| Visa Hub | Static content pages | CMS-backed content API |
| City Comparison Tool | Hardcoded comparison data | Live data API, update pipeline |
| Booking & Payment | UI flow with fake confirmation | Omise/Stripe integration, booking table |
| AI Chat Assistant | Stubbed replies | Claude API integration with context |
| Affiliate / Referral | UI link generation mock | Referral tracking table, payout logic |

---

## 10. Compliance & Legal

- **Thailand PDPA** (Personal Data Protection Act) — full compliance required for user data storage and processing
- **Financial advice disclaimer** — Retirement planning outputs are informational; not licensed financial advice
- **Healthcare disclaimer** — Health recommendations are informational; not medical advice
- **Visa information accuracy** — Partner with licensed immigration lawyers for content review
- **Provider verification** — KYC/KYB process for all marketplace partners before listing
