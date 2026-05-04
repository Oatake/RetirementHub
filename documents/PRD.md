# RetirementHub — Product Requirements Document (PRD)

**Platform:** Longevity & Life Freedom App (Thailand Hub)  
**Version:** 1.0  
**Date:** 2026-04-30  
**Status:** Draft — Pre-Development  
**References:** PLANNING.md, ARCHITECTURE.md, DESIGN.md

---

## Table of Contents

1. [Document Purpose & Scope](#1-document-purpose--scope)
2. [Product Overview](#2-product-overview)
3. [User Personas](#3-user-personas)
4. [Assumptions & Constraints](#4-assumptions--constraints)
5. [Feature Modules](#5-feature-modules)
   - 5.1 [User Onboarding & Profile](#51-user-onboarding--profile)
   - 5.2 [AI Retirement Readiness Score](#52-ai-retirement-readiness-score)
   - 5.3 [AI Life Planner Chat Assistant](#53-ai-life-planner-chat-assistant)
   - 5.4 [Service Marketplace](#54-service-marketplace)
   - 5.5 [Booking & Payment Flow](#55-booking--payment-flow)
   - 5.6 [Rating & Review System](#56-rating--review-system)
   - 5.7 [Provider Trust Score](#57-provider-trust-score)
   - 5.8 [Thailand Visa & Relocation Hub](#58-thailand-visa--relocation-hub)
   - 5.9 [City Comparison Tool](#59-city-comparison-tool)
   - 5.10 [Preventive Health & Longevity Module](#510-preventive-health--longevity-module)
   - 5.11 [Community Feed & Shoppable Content](#511-community-feed--shoppable-content)
   - 5.12 [Affiliate & Creator Referral System](#512-affiliate--creator-referral-system)
   - 5.13 [Provider Portal](#513-provider-portal)
   - 5.14 [Admin Panel](#514-admin-panel)
6. [Non-Functional Requirements](#6-non-functional-requirements)
7. [Data & Privacy Requirements](#7-data--privacy-requirements)
8. [Analytics & Instrumentation](#8-analytics--instrumentation)
9. [Out of Scope (v1.0)](#9-out-of-scope-v10)
10. [Glossary](#10-glossary)

---

## 1. Document Purpose & Scope

This PRD defines the complete product requirements for RetirementHub v1.0. It is the primary reference for design, engineering, QA, and product decisions. Each section describes a feature module with context, user stories, acceptance criteria, and edge cases.

**In scope:** Web application covering all features in Phases 1 and 2 of the roadmap (PLANNING.md §3).  
**Out of scope:** Native mobile apps, Phase 3 features (detailed below in §9).

---

## 2. Product Overview

RetirementHub is an AI-powered web platform combining:

- **AI Life Planning** — personalized retirement readiness scoring and scenario simulation
- **Service Marketplace** — bookable health, wellness, insurance, and relocation services in Thailand
- **Trust Reviews** — Agoda-style verified ratings on every service and provider
- **Visa & Relocation Hub** — Thailand-specific immigration guidance and planning tools
- **Community & Affiliate** — user content, shoppable posts, and creator revenue sharing

**Primary value proposition:** The only platform where you can plan, compare, trust, and book everything needed for life and retirement in Thailand — in one place, in your language, powered by AI.

---

## 3. User Personas

### Persona 1 — Somsak, Thai Pre-Retiree
- **Age:** 55 | **Nationality:** Thai | **Location:** Bangkok
- **Goal:** Retire in Chiang Mai at 60; understand if savings are sufficient; book health screenings
- **Pain points:** Confused about healthcare costs; no single source for retirement planning; worried about quality of private hospitals
- **Key features used:** Retirement Score, Health Marketplace, City Comparison, Reviews

### Persona 2 — David, Foreign Relocator
- **Age:** 62 | **Nationality:** British | **Location:** London (planning move to Thailand)
- **Goal:** Retire in Thailand on OA visa; understand cost vs. UK; find expat health insurance
- **Pain points:** Visa requirements unclear; doesn't know which Thai city fits his budget and lifestyle; concerned about medical care quality
- **Key features used:** Visa Hub, City Comparison, AI Planner, Insurance Marketplace

### Persona 3 — Nadia, Digital Nomad
- **Age:** 34 | **Nationality:** German | **Location:** Currently Bali
- **Goal:** Relocate to Chiang Mai; get a long-stay visa; find co-working and wellness services
- **Pain points:** Visa options for non-retirees are unclear; wants community of like-minded people
- **Key features used:** Visa Hub (LTR/Nomad visa), Community Feed, Wellness Marketplace

### Persona 4 — Malee, Adult Child (Family Planner)
- **Age:** 42 | **Nationality:** Thai | **Location:** Bangkok
- **Goal:** Arrange eldercare and nursing services for aging parent in Chiang Mai
- **Pain points:** Difficult to compare eldercare providers; unclear pricing; no reviews from real families
- **Key features used:** Eldercare Marketplace, Reviews, AI Chat (eldercare planning)

### Persona 5 — Khun Prasert, Service Provider
- **Age:** 50 | **Nationality:** Thai | **Role:** Owner of private health clinic in Bangkok
- **Goal:** List health screening packages; acquire new patients from expat and Thai retiree segments
- **Pain points:** No targeted marketing channel; hard to compete with large hospital brands
- **Key features used:** Provider Portal, Listing Management, Review Dashboard

### Persona 6 — Pim, Content Creator / Affiliate
- **Age:** 29 | **Nationality:** Thai | **Location:** Chiang Mai
- **Goal:** Earn income by sharing wellness and retirement content; monetize her audience
- **Pain points:** Affiliate programs are complex; hard to track earnings; no platform built for this niche
- **Key features used:** Community Feed, Affiliate Link Generator, Creator Dashboard

---

## 4. Assumptions & Constraints

### Assumptions
- Users have a stable internet connection and access to a modern browser (Chrome, Safari, Firefox — latest 2 versions)
- Service providers have basic digital literacy to self-manage their listings
- All bookable services operate in Thailand; providers are Thai-registered entities
- Users accept that AI planning outputs are informational, not licensed financial or medical advice
- Payment in Thai Baht (THB) is the primary currency; USD/EUR display is secondary

### Constraints
- **PDPA compliance** is mandatory from day one; no Thai user data may be processed without consent
- **AI outputs must include disclaimers** for any financial or health-related recommendations
- **Review submission** is restricted to users with a verified completed booking on that service
- **Phase 1** has no native mobile app; web must be fully responsive down to 375px viewport
- **Phase 1 payment** supports Thai domestic methods (Omise) only; Stripe international is Phase 2

---

## 5. Feature Modules

---

### 5.1 User Onboarding & Profile

#### Context
First-time users must complete an onboarding flow that captures enough information to generate a meaningful Retirement Readiness Score and personalized recommendations. The profile is the AI's primary data source.

#### User Stories

**US-01** — As a new user, I want to register with my Google account or email so I can get started quickly without creating a password.

**US-02** — As a new user, I want to complete a guided onboarding questionnaire so the platform can personalize my experience.

**US-03** — As a returning user, I want to update my profile data at any time so my recommendations stay current.

**US-04** — As a user, I want to choose my preferred language (English or Thai) so the platform displays content in my language.

**US-05** — As a Thai user, I want to input my financial data in THB so I don't have to manually convert currency.

#### Onboarding Questionnaire Steps

| Step | Fields | Notes |
|---|---|---|
| 1. Basic Info | Full name, date of birth, nationality, current country of residence | Required |
| 2. Target | Planning goal (retire / relocate / explore / eldercare planning), target timeline | Required |
| 3. Target Location | Preferred Thai city or "Not sure yet" | Optional |
| 4. Financial Profile | Current monthly income, monthly expenses, total savings/assets, outstanding debts | Sensitive — encrypted at rest; optional but affects score |
| 5. Health Profile | General health status (self-rated 1–5), any major chronic conditions (multi-select), health goals | Sensitive — encrypted; fully optional |
| 6. Lifestyle | Preferred activities, social preferences, housing type, diet | Optional |

#### Acceptance Criteria

- AC-01.1: User can register via Google OAuth or email + OTP (no password required)
- AC-01.2: Onboarding can be completed in ≤ 5 minutes on desktop; ≤ 7 minutes on mobile
- AC-01.3: Each onboarding step is skippable (except Basic Info); skipped steps reduce score accuracy — user is informed
- AC-01.4: Financial and health data fields display a privacy notice before the user inputs data
- AC-01.5: All profile data is editable after onboarding from the Account > Profile page
- AC-01.6: Language selection persists across sessions and can be changed in settings
- AC-01.7: Upon completion, user is redirected to their Planning Dashboard

#### Edge Cases
- User abandons onboarding mid-flow → progress is saved; user resumes from last completed step on next login
- User registers but never completes onboarding → prompted via banner on every page until completed; can dismiss permanently after 3 prompts
- Duplicate email registration → "Account already exists" prompt with login redirect

---

### 5.2 AI Retirement Readiness Score

#### Context
The Retirement Readiness Score (RRS) is the platform's flagship feature and core hook. It gives users a tangible, personalized number (0–100) across three dimensions — Finance, Health, and Lifestyle — with actionable recommendations linked directly to marketplace services.

#### User Stories

**US-06** — As a user, I want to see my overall Retirement Readiness Score so I know how prepared I am for retirement in Thailand.

**US-07** — As a user, I want to understand what drives each sub-score so I know exactly what to improve.

**US-08** — As a user, I want to see AI-generated recommendations tied to my gaps so I can take action immediately.

**US-09** — As a user, I want to simulate "what-if" scenarios (e.g., if I save 20% more per month) so I can see how changes affect my score.

**US-10** — As a user, I want my score to update when I update my profile data so it stays accurate.

#### Score Dimensions

| Dimension | Weight | Key Inputs | Score Drivers |
|---|---|---|---|
| Finance | 40% | Savings, income, expenses, debt, target timeline | Runway (years savings last), expense coverage ratio, debt-to-asset ratio |
| Health | 35% | Age, health status, chronic conditions, health goals | Preventive care coverage, risk factor load, health goal alignment |
| Lifestyle | 25% | Activities, housing prefs, social needs, target city | Cost-lifestyle fit for chosen city, activity availability, social infrastructure |

#### Score Interpretation

| Score | Label | Color | Message |
|---|---|---|---|
| 80–100 | Ready | Green | "You're well-positioned for retirement in Thailand." |
| 60–79 | On Track | Blue | "Good progress — a few areas to strengthen." |
| 40–59 | Planning Needed | Amber | "Important gaps to address before your target date." |
| 0–39 | Early Stage | Red | "Significant preparation recommended before retirement." |

#### Acceptance Criteria

- AC-02.1: Score is generated within 5 seconds of onboarding completion using Claude claude-sonnet-4-6
- AC-02.2: Score displays as a circular progress gauge with overall score prominently centered
- AC-02.3: Each sub-score (Finance, Health, Lifestyle) is shown as a separate card with a bar indicator and 2–3 bullet explanations
- AC-02.4: Minimum 3 actionable recommendations are generated, each linked to a relevant marketplace service category
- AC-02.5: Each recommendation card includes: action text, why it matters, and a "Browse Services" CTA button
- AC-02.6: Scenario simulation allows up to 3 variables to be adjusted simultaneously; results update in < 3 seconds
- AC-02.7: Score is recalculated automatically when the user saves changes to their profile
- AC-02.8: A disclaimer reads: "This score is for planning guidance only and does not constitute financial or medical advice."
- AC-02.9: Score history is tracked — user can view how their score changed over time (line chart, last 12 data points)

#### Edge Cases
- User provides no financial data → Finance sub-score shows "Incomplete" with prompt to add data; overall score is based on Health + Lifestyle only
- User selects "Not sure" for target city → Lifestyle score uses Thailand average cost data
- Score generation fails (API error) → Display last cached score with "Score may be outdated" notice; retry button shown

---

### 5.3 AI Life Planner Chat Assistant

#### Context
A conversational AI assistant that helps users with any aspect of planning their life or retirement in Thailand. Powered by Claude with streaming responses and tool use (live platform data lookup). Acts as a knowledgeable concierge — not a generic chatbot.

#### User Stories

**US-11** — As a user, I want to ask the AI assistant questions about retiring in Thailand so I get relevant, personalized answers rather than generic web results.

**US-12** — As a user, I want the AI to recommend specific services from the marketplace based on my profile so I don't have to search manually.

**US-13** — As a user, I want to ask the AI to generate a step-by-step relocation roadmap for my situation so I know exactly what to do next.

**US-14** — As a user, I want the AI to compare two Thai cities for my lifestyle and budget so I can make an informed decision.

**US-15** — As a user, I want the AI to summarize the visa options available to me based on my nationality and goals so I understand my options quickly.

#### AI Tool Capabilities

The AI assistant has access to the following platform tools:

| Tool | Description | Data Source |
|---|---|---|
| `search_services` | Search marketplace by category, city, budget range | Platform DB |
| `get_service_reviews` | Retrieve top reviews and avg rating for a service/provider | Platform DB |
| `get_visa_requirements` | Fetch visa eligibility and document list by nationality + type | Content DB |
| `get_city_comparison` | Cost-of-living and lifestyle comparison for up to 3 Thai cities | Content DB |
| `get_user_profile` | Read current user's profile data for personalized responses | Platform DB (own user only) |
| `calculate_budget` | Estimate monthly living cost in a Thai city for a given lifestyle | Computation |

#### Acceptance Criteria

- AC-03.1: Chat UI is a slide-in panel accessible from any page via a persistent floating button
- AC-03.2: AI responses stream in real-time (token-by-token); first token appears within 1 second
- AC-03.3: When the AI recommends a service, it renders as a tappable service card inside the chat (not just text)
- AC-03.4: Conversation history is persisted per user; users can access past sessions from a session list
- AC-03.5: System prompt is cached using Anthropic's prompt caching to reduce latency on repeat requests
- AC-03.6: Conversation context is summarized after 10 user turns to stay within context limits
- AC-03.7: AI responses include a disclaimer for financial and health topics: "This is for informational purposes only"
- AC-03.8: Users can rate each AI response (thumbs up/down) to improve quality over time
- AC-03.9: The AI gracefully declines questions outside its scope (e.g., stock tips, medical diagnosis) and redirects to a professional

#### Edge Cases
- API rate limit hit → Show "I'm busy right now — please try again in a moment" without exposing technical details
- User asks the AI to book a service → AI explains it cannot book directly but provides a deep link to the service booking page
- User asks in Thai → AI responds in Thai regardless of platform language setting

---

### 5.4 Service Marketplace

#### Context
The core transactional layer of the platform. Users browse, filter, compare, and ultimately book services from vetted Thai providers. Inspired by Klook's UX: category-first navigation, high-quality service cards, transparent pricing, and clear booking flows.

#### Service Categories (Phase 1)

| Category | Examples |
|---|---|
| Health Screening | Annual checkups, cancer screening, executive health packages |
| Hospitals & Clinics | Private hospitals, specialist consultations |
| Mental Health | Counselling, therapy, psychiatric services |
| Spa & Wellness | Day spas, retreats, massage therapy |
| Longevity Programs | Anti-aging clinics, IV therapy, biohacking centers |
| Plastic Surgery | Aesthetic procedures, dental cosmetics |
| Health Insurance | Expat health insurance, Thai health insurance |
| Life Insurance | Term life, whole life plans |
| Eldercare & Nursing | In-home nursing, assisted living, day care centers |
| Relocation Services | Moving companies, settling-in services |
| Legal & Legacy | Will writing, estate planning, immigration lawyers |
| Property | Property agents, co-living, retirement communities |

#### User Stories

**US-16** — As a user, I want to browse services by category so I can explore what's available.

**US-17** — As a user, I want to filter services by city, price range, rating, and language support so I find options that match my needs.

**US-18** — As a user, I want to see a service detail page with full description, pricing, photos, provider info, and reviews so I can make a confident decision.

**US-19** — As a user, I want to save services to a wishlist so I can compare them later.

**US-20** — As a user, I want to see "similar services" recommendations on a service page so I can discover alternatives.

**US-21** — As a user, I want to search for services by keyword so I can find specific offerings quickly.

#### Service Card Requirements (List View)
- Provider name + verified badge (if verified)
- Service name
- Location (city + area)
- Star rating (avg) + review count
- Price (THB, with "from" prefix if variable)
- 1 primary image
- Category tag(s)
- "Book Now" or "View Details" CTA

#### Service Detail Page Requirements
- Image gallery (up to 8 images)
- Full service description (bilingual: EN + TH)
- Pricing breakdown (what's included / excluded)
- Duration / validity
- Provider profile summary (name, verified badge, Trust Score, years active)
- Booking availability (date picker if applicable)
- "Book Now" primary CTA + "Save to Wishlist" secondary
- Review section (latest 5 reviews visible; "Load more" pagination)
- Rating breakdown by dimension (quality, value, convenience, trust)
- "Report this listing" link
- Similar services carousel

#### Acceptance Criteria

- AC-04.1: Browse page loads with default category grid; switches to list/card view with category filter applied
- AC-04.2: Filters available: Category (multi-select), City (multi-select), Price range (slider), Rating (min stars), Language support (TH/EN)
- AC-04.3: Search bar returns results within 300ms via Algolia; supports Thai and English keywords
- AC-04.4: Service detail page is server-side rendered (SSR) for SEO; URL format: `/services/[slug]`
- AC-04.5: "Book Now" button is disabled with "Contact Provider" fallback for services marked as non-bookable online
- AC-04.6: Wishlist saves to user account; accessible from Account > Saved Services
- AC-04.7: A maximum of 24 services are shown per page; infinite scroll or "Load more" pagination
- AC-04.8: "Sponsored" label is displayed on premium-listed services; clearly distinguishable from organic results
- AC-04.9: Services with no reviews show "Be the first to review" instead of a star rating
- AC-04.10: Out-of-stock or paused services are hidden from browse; if accessed via direct URL, show "Currently unavailable"

#### Edge Cases
- Zero results for applied filters → Show "No results found" with suggested filter relaxation
- Provider has no active services → Provider profile page shown with "No services currently listed"
- Service price is 0 → Display as "Free" or "Contact for pricing" based on provider config

---

### 5.5 Booking & Payment Flow

#### Context
Users book services in-platform, generating a commission for RetirementHub. The flow must be simple, clear, and trustworthy. For Phase 1, payment supports Omise (Thai domestic: credit card, PromptPay, TrueWallet). Stripe is Phase 2.

#### User Stories

**US-22** — As a user, I want to book a service in under 3 minutes so the process doesn't feel burdensome.

**US-23** — As a user, I want to pay via PromptPay or credit card so I can use my preferred payment method.

**US-24** — As a user, I want to receive a booking confirmation by email immediately after payment so I have proof of booking.

**US-25** — As a user, I want to view and manage all my bookings in one place so I don't lose track.

**US-26** — As a user, I want to cancel a booking per the provider's cancellation policy so I understand my options if plans change.

#### Booking Flow

```
Service Detail Page
  → "Book Now" CTA
    → Booking Form
        [Date / Time selection if applicable]
        [Quantity / participant count]
        [Special requirements (text field)]
        [Contact info pre-filled from profile]
      → Order Summary
          Service name + provider
          Price breakdown (service price + any taxes)
          Platform booking fee (if any)
          Cancellation policy (displayed prominently)
        → Payment
            Payment method selector (PromptPay / Credit Card / TrueWallet)
            [Omise Checkout modal]
          → Booking Confirmed Page
              Booking reference number
              Summary of what was booked
              Provider contact details
              "Add to Calendar" button
              Email confirmation sent
```

#### Acceptance Criteria

- AC-05.1: The full booking flow (form → payment → confirmation) completes in ≤ 5 steps
- AC-05.2: Contact details on the booking form are pre-populated from the user's profile
- AC-05.3: Cancellation policy is displayed on the booking form page (before payment)
- AC-05.4: Payment is processed via Omise Checkout (iframe/modal); card data never touches RetirementHub servers
- AC-05.5: On successful payment, booking record is created with status `confirmed` within 5 seconds
- AC-05.6: Confirmation email is sent within 30 seconds of payment success (via Resend)
- AC-05.7: Bookings page (`/account/bookings`) shows all bookings with status: pending / confirmed / completed / cancelled
- AC-05.8: A booking can only be reviewed after it reaches `completed` status (auto-set 24h after service date)
- AC-05.9: If payment fails, the booking record is set to `pending` and the user is shown a retry option
- AC-05.10: Booking confirmation page includes a "Share with friend" button that generates an affiliate link if the user is enrolled as an affiliate

#### Cancellation Policy Display
- Providers set their own cancellation policy during listing creation (Free cancellation / Partial refund / No refund)
- Policy is shown at: Service Detail → Booking Form → Confirmation Email
- Refund processing (if applicable) is handled manually by admin in Phase 1; automated in Phase 2

#### Edge Cases
- User closes browser mid-payment → Omise webhook confirms/cancels the booking based on payment outcome
- Double-booking attempt → Booking system checks availability before confirming; shows "Slot unavailable" if conflict
- Provider cancels a confirmed booking → User is notified by email + in-app notification; refund is initiated

---

### 5.6 Rating & Review System

#### Context
Every service on the platform has an Agoda-inspired review system. Reviews are only submittable by users who have completed a verified booking. This ensures authenticity and builds trust — a core differentiator vs. unverified social media reviews.

#### User Stories

**US-27** — As a user who completed a service, I want to submit a detailed review so others can benefit from my experience.

**US-28** — As a prospective user, I want to read verified reviews broken down by dimension so I can make an informed decision.

**US-29** — As a user, I want to mark reviews as "helpful" so the best reviews rise to the top.

**US-30** — As a provider, I want to respond to reviews so I can address feedback publicly.

**US-31** — As a user, I want to report a review that seems fake or inappropriate so the platform stays trustworthy.

#### Review Submission Form

| Field | Type | Required | Notes |
|---|---|---|---|
| Overall Rating | 1–5 stars | Yes | Primary score |
| Service Quality | 1–5 stars | Yes | Was the service as described? |
| Value for Money | 1–5 stars | Yes | Was the price justified? |
| Convenience | 1–5 stars | Yes | Ease of booking + communication |
| Trustworthiness | 1–5 stars | Yes | Did the provider deliver as promised? |
| Written Review | Textarea (min 50 chars) | Yes | Experience description |
| Photos | Upload (up to 5) | No | User-submitted service photos |
| Visit Date | Month + Year | Yes | When the service was used |
| Language | Auto-detected | — | Shown as tag on review |
| Recommend? | Yes / No | Yes | "Would you recommend this service?" |

#### Review Display (Service Page)

- Overall score shown as large number (e.g., 4.7) + star graphic + total review count
- Score breakdown: 5 dimension bars with avg scores
- "% would recommend" stat
- Review list sorted by: Most Recent (default) / Most Helpful / Highest / Lowest
- Each review card shows: reviewer name, nationality flag, visit date, star scores, written text, provider response (if any), helpful count + button
- Reviews filterable by: Rating (star filter), Language (EN / TH / Other)

#### Acceptance Criteria

- AC-06.1: Review submission button is only enabled for users with a booking in `completed` status for that service
- AC-06.2: Review prompt email is sent to the user 48 hours after the booking service date (via Inngest scheduled job)
- AC-06.3: Each user can submit exactly one review per booking (not per service — each booking gets its own review)
- AC-06.4: Submitted reviews go through AI moderation check before publishing (spam, profanity, policy violations)
- AC-06.5: Reviews failing moderation are queued for manual admin review; user is notified "Review under review"
- AC-06.6: Reviews pass moderation and publish within 24 hours (or immediately if auto-approved)
- AC-06.7: Provider can post one response per review; response character limit is 500 characters
- AC-06.8: Users can mark a review as "Helpful" once per review (requires login); helpful count displayed
- AC-06.9: A "Report Review" link is on every review card; flagged reviews are queued for admin action
- AC-06.10: Service avg ratings update within 1 hour of a new review being published (background job)

#### Edge Cases
- User books same service twice → Two separate review submissions allowed (one per booking)
- Provider deletes a service → Associated reviews are retained and shown on the provider profile
- Review is posted in a language other than EN/TH → Displayed as-is with language tag; AI translation shown as expandable section (Phase 2)

---

### 5.7 Provider Trust Score

#### Context
Each provider receives a composite Trust Score (0.0–5.0) calculated from multiple signals. This score influences AI recommendations, search ranking, and is displayed as a badge on provider profiles. It provides a transparent quality signal beyond a simple star average.

#### Trust Score Formula

```
Trust Score = (avg_rating × 0.40)
            + (verified_review_ratio × 0.20)
            + (response_rate × 0.15)
            + (booking_completion_rate × 0.15)
            + (platform_tenure_score × 0.10)
```

| Signal | Description | Max Contribution |
|---|---|---|
| avg_rating | Average of all dimension ratings | 2.00 |
| verified_review_ratio | % of reviews from verified bookings | 1.00 |
| response_rate | % of reviews provider has responded to (within 7 days) | 0.75 |
| booking_completion_rate | % of confirmed bookings that reached `completed` (not cancelled by provider) | 0.75 |
| platform_tenure_score | Points for months active (caps at 12 months = full credit) | 0.50 |

#### Trust Score Badges

| Score | Badge Label | Display |
|---|---|---|
| 4.5–5.0 | Top Rated | Gold badge |
| 4.0–4.4 | Highly Trusted | Blue badge |
| 3.0–3.9 | Trusted | Grey badge |
| < 3.0 | No badge | Score shown only |

#### Acceptance Criteria

- AC-07.1: Trust Score is recalculated daily for all active providers via Inngest scheduled job
- AC-07.2: Trust Score and badge are displayed on: provider profile, service cards (small badge), service detail page
- AC-07.3: Score breakdown is visible to providers in their Provider Dashboard with component scores
- AC-07.4: Providers with Trust Score < 2.5 and > 10 reviews trigger an admin review flag
- AC-07.5: New providers with < 5 reviews show "New Provider" label instead of a Trust Score
- AC-07.6: Trust Score is one of the ranking signals used in search and AI service recommendations

---

### 5.8 Thailand Visa & Relocation Hub

#### Context
A comprehensive, structured information center for Thailand visa options and relocation planning. Content is curated and legally reviewed. The Eligibility Checker is a key tool for expat users — it quickly tells them which visa options apply to their situation.

#### Visa Types Covered

| Visa | Target User | Key Requirements |
|---|---|---|
| Retirement Visa OA | Foreigners 50+, staying 1 year | 800,000 THB deposit or monthly income ≥ 65,000 THB; health insurance |
| Retirement Visa OX | Foreigners 50+, long-stay (10 yr) | 3M THB investment or pension; health insurance |
| Long-Term Resident (LTR) | Wealthy expats, remote workers, retirees, skilled professionals | Income or asset thresholds by category |
| Digital Nomad (LTR - WFH) | Remote workers | Min 80K USD income; employer proof |
| Tourist Visa + Extension | Short-stay while planning | General info only |
| Marriage Visa (O) | Married to Thai national | General info only |

#### User Stories

**US-32** — As a foreign user, I want to answer a few questions and see which Thai visas I qualify for so I don't waste time researching irrelevant options.

**US-33** — As a user, I want to see a complete document checklist for my visa type so I know exactly what to prepare.

**US-34** — As a user, I want to generate a personalized relocation roadmap so I have a step-by-step action plan.

**US-35** — As a user, I want to book an immigration lawyer consultation directly from the Visa Hub so I can get professional help easily.

#### Eligibility Checker Flow

```
Q1: Are you Thai or non-Thai?
  → Thai: Redirect to Thai Retirement Planning section

Q2 (non-Thai): What is your primary goal?
  → Retire | Work remotely | Relocate with family | Explore options

Q3: What is your age?
  → Under 50 | 50–59 | 60+

Q4: What is your annual income or pension (USD equivalent)?
  → Under $30K | $30–80K | $80K+ | Prefer not to say

Q5: Do you have significant assets / investments?
  → Yes (> 1M USD) | Yes (< 1M USD) | No

→ Results: Matching visa types listed with suitability score
  Each visa: name, summary, key requirements, document checklist, estimated cost + timeline
  CTA: "Get help from a visa expert" → linked immigration lawyer services in marketplace
```

#### Relocation Roadmap Generator

AI-generated personalized plan covering:
1. Visa application steps (based on chosen visa type)
2. Banking setup in Thailand
3. Health insurance selection (linked to marketplace)
4. Housing options for chosen city
5. Healthcare registration
6. Tax considerations (informational)
7. Community and social integration

#### Acceptance Criteria

- AC-08.1: Eligibility Checker is accessible without login; results are shown immediately; account required to save results
- AC-08.2: Each visa result page includes: requirements, document checklist (downloadable as PDF), estimated timeline, estimated costs
- AC-08.3: Document checklist can be exported as a PDF or shared as a link
- AC-08.4: Visa content is reviewed and updated by a partnered immigration law firm at minimum quarterly
- AC-08.5: An "Information last updated" date is shown on each visa page
- AC-08.6: Relocation Roadmap is generated by AI Chat and rendered as a structured checklist (checkboxes the user can tick)
- AC-08.7: Checklist progress is saved to the user's account and persists across sessions
- AC-08.8: Each checklist item that maps to a bookable service includes a "Find services" link

#### Edge Cases
- User's nationality has no visa agreement with Thailand → Checker shows general OA/OX info only with note to consult a lawyer
- Content accuracy disclaimer: Every visa page shows "For official information, consult the Thai Immigration Bureau or a licensed lawyer"

---

### 5.9 City Comparison Tool

#### Context
Thailand has multiple popular retirement and expat destinations. This tool helps users objectively compare cities on cost, lifestyle, healthcare, climate, and expat community size — removing one of the biggest decision paralysis points.

#### Cities Covered (Phase 1)
Bangkok, Chiang Mai, Phuket, Pattaya, Hua Hin, Koh Samui

#### Comparison Dimensions

| Dimension | Data Points |
|---|---|
| Cost of Living | 1BR apartment rent, meals (local / expat), transport, utilities, entertainment |
| Healthcare | Number of international hospitals, avg specialist consultation cost, expat insurance cost range |
| Climate | Avg temperature, rainy season months, air quality index (AQI) avg |
| Expat Community | Estimated expat population, number of expat groups/clubs, English language prevalence |
| Lifestyle | Nightlife rating, nature access rating, cultural activities, shopping |
| Connectivity | Avg internet speed (Mbps), co-working space availability |
| Safety | General crime index (low/medium/high), tourist safety rating |

#### User Stories

**US-36** — As a user, I want to compare up to 3 Thai cities side-by-side so I can choose the best fit for my lifestyle and budget.

**US-37** — As a user, I want to see a monthly budget estimate for each city based on my lifestyle preferences so I know what to expect financially.

**US-38** — As a user, I want to see a "Best For" summary for each city so I get a quick read without analyzing every data point.

#### Acceptance Criteria

- AC-09.1: User can select 2–3 cities to compare from a dropdown or map-click interface
- AC-09.2: Comparison is displayed in a responsive side-by-side table with color-coded indicators (green = best, red = highest cost / lowest score)
- AC-09.3: Budget estimator allows the user to input their lifestyle level (budget / moderate / comfortable) and outputs an estimated monthly spend in THB and USD
- AC-09.4: Each city has a "Best For" tag: e.g., "Best for: Nightlife & Convenience" (Bangkok), "Best for: Nature & Wellness" (Chiang Mai)
- AC-09.5: Data sources are cited on the page with last-updated dates
- AC-09.6: CTA buttons link to the marketplace filtered for services in that city
- AC-09.7: The AI Chat can be asked to compare cities and pulls from this same dataset

---

### 5.10 Preventive Health & Longevity Module

#### Context
Phase 1 introduces a basic Health Risk Analysis feature that uses the user's health profile to recommend relevant preventive health services from the marketplace. This module grows in depth in Phase 3.

#### User Stories

**US-39** — As a user, I want to see a health risk summary based on my age, health status, and lifestyle so I know which areas to focus on.

**US-40** — As a user, I want to receive personalized recommendations for health screenings so I take action before problems arise.

**US-41** — As a user, I want to find and book recommended health services directly from my health plan so there's no friction.

#### Health Risk Analysis (Phase 1 — Basic)

Based on: age, self-rated health (1–5), chronic conditions (multi-select from profile), lifestyle habits

Output:
- Risk summary in 3 categories: Cardiovascular, Metabolic, Mental Health
- Each category: Low / Medium / High risk indicator with 1-sentence explanation
- Recommended screenings matched to risk level
- Direct links to relevant marketplace services

#### Acceptance Criteria

- AC-10.1: Health Risk Analysis is accessible from the Planning Dashboard
- AC-10.2: Analysis uses only data the user has explicitly provided; no inferences beyond what's stated
- AC-10.3: Every health output includes: "This is not a medical diagnosis. Consult a qualified healthcare professional."
- AC-10.4: Recommended services are filtered to the user's target city (or all cities if not set)
- AC-10.5: User can re-run the analysis after updating health profile data

---

### 5.11 Community Feed & Shoppable Content

#### Context
A content-first community where users share real experiences about retiring and living in Thailand. Posts can tag marketplace services, turning community content into a discovery and conversion channel. Inspired by Instagram's shoppable posts but for life planning content.

#### User Stories

**US-42** — As a user, I want to share my experience with a health screening I booked so others can learn from it.

**US-43** — As a user, I want to tag a service in my post so readers can directly view or book it.

**US-44** — As a user, I want to browse community posts filtered by topic (health, visa, city, lifestyle) so I find relevant content easily.

**US-45** — As a user, I want to follow other community members whose content I find valuable.

**US-46** — As a reader, I want to tap a tagged service in a post and see its full detail + booking option so I can act on recommendations immediately.

#### Post Structure

| Element | Requirement |
|---|---|
| Text body | Max 1,000 characters |
| Images | Up to 5 photos |
| Tagged services | Up to 3 services from the marketplace (auto-linked) |
| Topic tags | Multi-select from: Health, Visa, Finance, Lifestyle, Eldercare, City [name] |
| City tag | Optional location tag |
| Language | EN or TH (auto-detected; user can override) |

#### Feed Algorithms

- **Following feed** — posts from users the viewer follows, reverse chronological
- **Discover feed** — posts ranked by: recency + engagement (likes + saves) + topic relevance to user's profile city and categories
- **Trending** — top posts by engagement in last 7 days

#### Acceptance Criteria

- AC-11.1: Post creation requires a minimum of 50 characters of text body
- AC-11.2: When a service is tagged, a service mini-card (name, price, rating, "View") is embedded in the post
- AC-11.3: Tapping a tagged service mini-card navigates to the service detail page
- AC-11.4: Community feed is accessible without login (read-only); posting and interactions require login
- AC-11.5: Posts are AI-moderated for spam and policy violations before appearing on the public feed (async — max 5 min delay)
- AC-11.6: Users can save posts to a personal collection
- AC-11.7: Each post shows: author name + avatar + follow button, post age, topic tags, like count, comment count, save button
- AC-11.8: Comments are threaded one level deep (reply to comment, not replies-to-replies in Phase 1)
- AC-11.9: A user can delete their own posts and comments at any time
- AC-11.10: Community posts appear in AI-powered content recommendations on the user's dashboard

---

### 5.12 Affiliate & Creator Referral System

#### Context
Users who share services via community posts or personal links earn a commission when others book through their link. This drives organic growth and monetizes engaged community members. Inspired by influencer affiliate programs but with transparent, self-serve tooling.

#### User Stories

**US-47** — As a community creator, I want to generate an affiliate link for any marketplace service so I can share it and earn commissions.

**US-48** — As a creator, I want to see a dashboard of my clicks, conversions, and earnings so I know how my content is performing.

**US-49** — As a creator, I want to request a payout of my earned commissions so I receive my income.

**US-50** — As a platform user, I want to see when a post contains an affiliate link so I know the author may earn from my booking.

#### Affiliate Mechanics

| Parameter | Value |
|---|---|
| Commission structure | 30–40% of platform commission (varies by service category) |
| Cookie window | 30 days (booking within 30 days of link click earns attribution) |
| Minimum payout | 500 THB |
| Payout frequency | Bi-monthly (1st and 15th of each month) |
| Payout method | Thai bank transfer (Phase 1); PayPal (Phase 2) |
| Attribution model | Last click |

#### Creator Dashboard

Metrics displayed:
- Total clicks (30d, all-time)
- Total conversions (bookings via link)
- Conversion rate (%)
- Total earnings (pending + paid out)
- Earnings by service category (bar chart)
- Recent transactions table (click date, service, booking status, commission amount, payout status)

#### Acceptance Criteria

- AC-12.1: Any logged-in user can enroll as an affiliate from their Account settings (one click, no approval required in Phase 1)
- AC-12.2: Affiliate link is generated for any service via a "Share & Earn" button on service detail pages and in the post composer
- AC-12.3: Affiliate links use a unique short code: `retirementhub.co/r/[code]`
- AC-12.4: Posts with tagged affiliate links display a small "Paid partnership" or "Affiliate link" label visible to readers
- AC-12.5: Affiliate attribution is tracked server-side via the booking record (not cookie-only, to handle mobile and multi-device)
- AC-12.6: Commission is marked "pending" until the booking reaches `completed` status; then marked "earned"
- AC-12.7: Payout is processed bi-monthly for all earned commissions ≥ 500 THB minimum threshold
- AC-12.8: Creator Dashboard shows data updated within 24 hours

---

### 5.13 Provider Portal

#### Context
Service providers (hospitals, clinics, spas, insurance companies, etc.) self-onboard via a dedicated portal. They manage their listings, view bookings, respond to reviews, and track their Trust Score and performance analytics.

#### User Stories

**US-51** — As a provider, I want to register my business and submit it for verification so I can list my services on the platform.

**US-52** — As a provider, I want to create and manage my service listings (add, edit, pause) so I control what's visible to users.

**US-53** — As a provider, I want to receive booking notifications and manage booking confirmations so I don't miss requests.

**US-54** — As a provider, I want to respond to reviews on my services so I can address feedback and show responsiveness.

**US-55** — As a provider, I want to see my Trust Score breakdown and performance analytics so I understand how to improve.

#### Provider Onboarding Flow

```
Step 1: Business registration
  Business name, category, address, phone, website, business registration number (Thai)

Step 2: Contact & location
  Primary contact name, email, lat/lng map pin

Step 3: Service listing (first service)
  Service name (EN + TH), description, price, photos, what's included

Step 4: Documents for verification
  Upload: business registration certificate, ID of account owner

Step 5: Submit for review
  Status: Pending verification
  Admin reviews within 3 business days
  Provider emailed on approval / rejection (with reason)
```

#### Provider Dashboard Sections

| Section | Content |
|---|---|
| Overview | Trust Score, avg rating, total bookings (30d), revenue share (30d) |
| Listings | All services with status (active/paused/draft); add/edit/pause actions |
| Bookings | Incoming bookings with status; confirm/reject actions; contact user |
| Reviews | All reviews across services; respond button |
| Analytics | Page views, booking c onversion rate, clicks by service |
| Settings | Business profile, bank account for payouts, notification preferences |

#### Acceptance Criteria

- AC-13.1: Provider registration flow is completable in under 10 minutes
- AC-13.2: A provider can create up to 50 service listings per account in Phase 1
- AC-13.3: New provider accounts are in `pending` status until admin approves — no listings are visible to users during this period
- AC-13.4: Provider receives email + in-portal notification for: new booking, booking cancellation, new review, Trust Score changes
- AC-13.5: Providers can set their own cancellation policy per service (Free / Partial Refund / No Refund) with a text description
- AC-13.6: Service images must be uploaded (min 1, max 8); JPEG/PNG only; max 5MB per image; auto-resized to standard dimensions
- AC-13.7: Provider can pause a listing (hides from marketplace) without deleting it; all associated reviews and booking history are retained
- AC-13.8: Provider response to a review is capped at 500 characters and cannot be edited after 24 hours
- AC-13.9: Premium Listing upgrade is purchasable from the portal dashboard (Phase 2; placeholder UI in Phase 1)

---

### 5.14 Admin Panel

#### Context
Internal tool for the RetirementHub team to manage the platform: approve providers, moderate reviews and posts, manage content, monitor platform health, and handle disputes.

#### Admin Capabilities

| Section | Capabilities |
|---|---|
| Provider Management | Review + approve/reject applications; suspend providers; view all provider data |
| Service Management | Edit/remove any listing; featured placement control |
| Review Moderation | Review flagged reviews; approve / remove reviews stuck in moderation |
| User Management | View user profiles; issue warnings; suspend accounts; handle PDPA deletion requests |
| Community Moderation | Review flagged posts; remove content; issue strikes |
| Booking Disputes | View booking details; issue manual refunds; communicate with users/providers |
| Content Management | Update visa hub content; city comparison data; static pages |
| Analytics | Platform-wide GMV, revenue, MAU, review counts, provider Trust Score distribution |
| System Config | Manage commission rates per category; affiliate payout rates |

#### Acceptance Criteria

- AC-14.1: Admin panel is hosted on a separate subdomain (`admin.retirementhub.co`) with IP allowlisting
- AC-14.2: All admin accounts require MFA (TOTP) to log in
- AC-14.3: All admin actions are logged with timestamp, admin ID, and action description (audit log)
- AC-14.4: Provider approval / rejection sends an automated email to the provider with the decision and reason
- AC-14.5: PDPA data deletion requests from users must be processable by admin within 30 days of receipt
- AC-14.6: Admin can bulk-export user data in CSV format for compliance purposes

---

## 6. Non-Functional Requirements

### Performance

| Requirement | Target |
|---|---|
| Page Load (LCP) | < 2.5 seconds on 4G mobile |
| Time to First Byte | < 400ms |
| Search Results | < 300ms (Algolia) |
| AI Chat First Token | < 1 second |
| API Response Time (p95) | < 800ms |
| Uptime | 99.5% monthly (target 99.9% by Phase 3) |

### Scalability
- System must handle 10,000 concurrent users without degradation (Phase 2 target)
- Database queries must have indexes on: user_id, service_id, provider_id, category, city, status fields
- AI requests must be rate-limited per user (max 20 requests/hour) to control costs

### Accessibility
- WCAG 2.1 Level AA compliance for all core user flows
- Minimum contrast ratio 4.5:1 for all text
- All interactive elements keyboard-navigable
- All images have descriptive alt text
- Forms have proper label associations

### Browser Support
- Chrome 120+, Safari 17+, Firefox 121+, Edge 120+
- Mobile: iOS Safari 17+, Chrome Android 120+
- No IE11 support

### Responsive Design
- Breakpoints: 375px (mobile), 768px (tablet), 1024px (desktop), 1280px (wide)
- All features fully functional at 375px viewport width

---

## 7. Data & Privacy Requirements

### Thailand PDPA Compliance

| Requirement | Implementation |
|---|---|
| Consent capture | Explicit opt-in checkboxes for data processing during registration and onboarding |
| Data minimization | Only collect data fields explicitly needed for each feature |
| Purpose limitation | Data is used only for the purpose stated at collection |
| Right to access | User can download all their personal data from Account Settings |
| Right to deletion | User can request account deletion; data purged within 30 days |
| Right to correction | All profile fields are editable by the user at any time |
| Data breach notification | Users notified within 72 hours of any data breach affecting their data |
| Third-party sharing | No user PII shared with providers beyond what's necessary for a confirmed booking |

### Sensitive Data Handling

| Data Type | Treatment |
|---|---|
| Financial profile data | AES-256 encrypted at rest; masked in UI (show last 3 digits of savings amount) |
| Health profile data | AES-256 encrypted at rest; never exposed to providers |
| Payment card data | Never stored; tokenized via Omise/Stripe |
| Government ID (providers) | Encrypted at rest; admin-only access; deleted after verification |
| AI conversation history | Stored per user; user can delete any session from their account |

---

## 8. Analytics & Instrumentation

### Events to Track (PostHog)

| Event | Properties |
|---|---|
| `user_registered` | method (google/email), nationality, user_type |
| `onboarding_completed` | steps_completed, skipped_steps, time_taken_seconds |
| `score_generated` | overall_score, finance_score, health_score, lifestyle_score |
| `service_viewed` | service_id, category, city, source (search/browse/recommendation/ai) |
| `service_booked` | service_id, provider_id, category, city, price_thb, referral_code |
| `review_submitted` | service_id, overall_rating, has_photos |
| `ai_chat_started` | session_type |
| `ai_message_sent` | session_id, message_length, tools_used |
| `visa_checker_completed` | nationality, goal, age_group, matching_visas_count |
| `city_comparison_viewed` | cities_compared (array) |
| `post_created` | has_images, tagged_services_count, topic_tags |
| `affiliate_link_generated` | service_id, source (post/service_page) |
| `affiliate_conversion` | affiliate_user_id, service_id, booking_id, commission_thb |

### Dashboard Metrics (Internal)
- Daily/Weekly/Monthly Active Users (DAU/WAU/MAU)
- Onboarding completion funnel
- Score generation rate (users who get a score / users who complete onboarding)
- Marketplace conversion rate (views → bookings)
- GMV by category and city
- AI chat usage: sessions/user, avg turns/session, tool call frequency
- Review submission rate (completed bookings that result in a review)
- Community engagement: posts/day, avg likes/post, affiliate conversion rate

---

## 9. Out of Scope (v1.0)

The following are explicitly excluded from v1.0 and targeted for Phase 3 or later:

| Feature | Reason Deferred |
|---|---|
| Native iOS / Android app | Web PWA first; native only if retention data supports it |
| Stripe (international payments) | Omise covers Phase 1 Thai market; Stripe in Phase 2 |
| AI health coaching (ongoing) | Phase 3; requires clinical partner and compliance review |
| Will writing & estate legal tools | Phase 3; requires licensed legal partner |
| Medical transport booking | Phase 3; operational complexity |
| Meal delivery integration | Phase 3; third-party API integration |
| Japanese / Chinese language | Phase 3; after EN + TH are fully localized |
| Video reviews | Phase 3; storage and moderation complexity |
| Peer-to-peer advice matching | Phase 3; trust and liability considerations |
| Custom retirement calculators (actuarial) | Phase 3; requires licensed actuarial partner |
| Provider advertising / promoted posts | Phase 2 (placeholder UI in Phase 1) |
| Automated provider payouts | Phase 2; manual payout in Phase 1 |

---

## 10. Glossary

| Term | Definition |
|---|---|
| RRS | Retirement Readiness Score — the platform's composite 0–100 planning score |
| Provider | A Thai business or individual offering bookable services on the platform |
| Trust Score | Composite provider quality score (0–5.0) calculated from reviews, completion rate, and tenure |
| GMV | Gross Merchandise Value — total value of bookings processed through the platform |
| Verified Review | A review submitted by a user who has a completed booking for that service |
| Affiliate | A platform user enrolled in the referral program who earns commission on referred bookings |
| Creator | An affiliate who also creates community content (posts) to drive referrals |
| OA Visa | Non-Immigrant Visa OA — Thailand's standard 1-year retirement visa for foreigners 50+ |
| OX Visa | Non-Immigrant Visa OX — Thailand's long-term (10-year) retirement visa |
| LTR Visa | Long-Term Resident Visa — Thailand's premium visa program for wealthy/skilled foreigners |
| PDPA | Thailand Personal Data Protection Act — Thailand's primary data privacy law |
| Shoppable Post | A community post with tagged marketplace services that readers can view/book inline |
| Inngest | Background job platform used for async tasks (review scoring, email triggers, Trust Score jobs) |
| ISR | Incremental Static Regeneration — Next.js caching strategy for semi-dynamic pages |
| Omise | Thai payment gateway supporting PromptPay, credit cards, and Thai digital wallets |
