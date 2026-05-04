import {
  MOCK_USER, MOCK_PROFILE, SERVICE_CATEGORIES, PROVIDERS, SERVICES,
  REVIEWS, BOOKINGS, VISA_TYPES, CITIES, COMMUNITY_POSTS,
  RETIREMENT_SCORE, AFFILIATE_STATS, MOCK_CHAT_MESSAGES
} from "./data"
import type { Service, Provider, Review, ChatMessage } from "./types"

const delay = (ms = 400) => new Promise(resolve => setTimeout(resolve, ms))

export async function getUser() {
  await delay(200)
  return MOCK_USER
}

export async function getUserProfile() {
  await delay(200)
  return MOCK_PROFILE
}

export async function getServiceCategories() {
  await delay(300)
  return SERVICE_CATEGORIES
}

export interface ServiceFilters {
  category?: string
  city?: string
  minPrice?: number
  maxPrice?: number
  minRating?: number
  search?: string
  page?: number
  pageSize?: number
}

export async function getServices(filters: ServiceFilters = {}): Promise<{ services: Service[]; total: number }> {
  await delay(400)
  let results = [...SERVICES]

  if (filters.category) {
    results = results.filter(s => s.categoryId === filters.category || s.categoryName.toLowerCase().includes(filters.category!.toLowerCase()))
  }
  if (filters.city) {
    results = results.filter(s => s.city.toLowerCase() === filters.city!.toLowerCase())
  }
  if (filters.minPrice !== undefined) {
    results = results.filter(s => s.priceThb >= filters.minPrice!)
  }
  if (filters.maxPrice !== undefined) {
    results = results.filter(s => s.priceThb <= filters.maxPrice!)
  }
  if (filters.minRating !== undefined) {
    results = results.filter(s => s.avgRating >= filters.minRating!)
  }
  if (filters.search) {
    const q = filters.search.toLowerCase()
    results = results.filter(s =>
      s.name.toLowerCase().includes(q) ||
      s.description.toLowerCase().includes(q) ||
      s.tags.some(t => t.includes(q))
    )
  }

  const page = filters.page ?? 1
  const pageSize = filters.pageSize ?? 12
  const total = results.length
  const start = (page - 1) * pageSize
  return { services: results.slice(start, start + pageSize), total }
}

export async function getServiceBySlug(slug: string): Promise<Service | null> {
  await delay(300)
  return SERVICES.find(s => s.slug === slug) ?? null
}

export async function getProviders(): Promise<Provider[]> {
  await delay(300)
  return PROVIDERS
}

export async function getProviderById(id: string): Promise<Provider | null> {
  await delay(300)
  return PROVIDERS.find(p => p.id === id) ?? null
}

export async function getServicesByProvider(providerId: string): Promise<Service[]> {
  await delay(300)
  return SERVICES.filter(s => s.providerId === providerId)
}

export async function getReviewsByService(serviceId: string): Promise<Review[]> {
  await delay(300)
  return REVIEWS.filter(r => r.serviceId === serviceId)
}

export async function getBookings() {
  await delay(300)
  return BOOKINGS
}

export async function getBookingById(id: string) {
  await delay(200)
  return BOOKINGS.find(b => b.id === id) ?? null
}

export async function getVisaTypes() {
  await delay(300)
  return VISA_TYPES
}

export async function getVisaBySlug(slug: string) {
  await delay(200)
  return VISA_TYPES.find(v => v.slug === slug) ?? null
}

export async function getCities() {
  await delay(300)
  return CITIES
}

export async function getCitiesBySlug(slugs: string[]) {
  await delay(300)
  return CITIES.filter(c => slugs.includes(c.slug))
}

export async function getCommunityPosts(topicFilter?: string) {
  await delay(400)
  if (topicFilter && topicFilter !== "all") {
    return COMMUNITY_POSTS.filter(p => p.topicTags.includes(topicFilter))
  }
  return COMMUNITY_POSTS
}

export async function getRetirementScore() {
  await delay(600)
  return RETIREMENT_SCORE
}

export async function getAffiliateStats() {
  await delay(400)
  return AFFILIATE_STATS
}

export async function getChatHistory(): Promise<ChatMessage[]> {
  await delay(200)
  return MOCK_CHAT_MESSAGES
}

export async function sendChatMessage(message: string): Promise<ChatMessage> {
  await delay(1200)
  const responses: Record<string, string> = {
    default: "That's a great question! Based on your profile — planning to retire in Chiang Mai in 2 years with a budget of ฿120K/month — I'd suggest focusing on three things first: (1) your OA visa application, (2) a comprehensive health check, and (3) getting the right expat health insurance in place. Would you like me to dig into any of these?",
  }

  let content = responses.default
  const lower = message.toLowerCase()

  if (lower.includes("visa")) {
    content = "Based on your profile (age 58, British national, planning to retire), the **Non-Immigrant O-A Retirement Visa** is your best path. You'll need:\n\n1. **800,000 THB** in a Thai bank account (or monthly pension ≥ 65,000 THB)\n2. **Valid health insurance** with at least ฿40,000 outpatient and ฿400,000 inpatient cover\n3. Clean criminal record from the UK\n\nI recommend starting the process 6 months before your planned move. Siam Legal can handle everything for you. Want me to find their services?"
  } else if (lower.includes("health") || lower.includes("check") || lower.includes("screen")) {
    content = "Given that you have hypertension and you're planning a major life change, an **Executive Health Check** before your move is highly recommended. Bangkok International Hospital's package (฿18,500) covers cardiac assessment, tumour markers, and gives you a baseline record to share with doctors in Thailand. Would you like to see this service?"
  } else if (lower.includes("cost") || lower.includes("budget") || lower.includes("money")) {
    content = "Based on your lifestyle preferences and target city (Chiang Mai), here's a realistic **monthly budget estimate**:\n\n| Category | Amount |\n|---|---|\n| 1BR Condo (Nimmanhaemin area) | ฿12,000–15,000 |\n| Food (mix of local & expat) | ฿10,000–15,000 |\n| Utilities + Internet | ฿3,000 |\n| Transport | ฿2,000 |\n| Healthcare reserve | ฿5,000 |\n| Entertainment & dining out | ฿8,000 |\n| **Total** | **฿40,000–48,000** |\n\nYour monthly income of ฿120,000 gives you a very comfortable buffer."
  } else if (lower.includes("chiang mai") || lower.includes("bangkok") || lower.includes("city")) {
    content = "Great question! Here's a quick comparison for your profile:\n\n**Chiang Mai** ✅ (Your target)\n- Lower cost: ~฿40-50K/month vs Bangkok's ฿65-80K\n- Better for yoga, nature, wellness (matches your preferences)\n- Strong expat community in the Nimman area\n- Watch for: smoke season (Feb-April) can aggravate hypertension\n\n**Bangkok** — worth visiting for major hospital appointments (2hr train from CM)\n\nWant to see the full city comparison tool?"
  }

  return {
    id: `msg-${Date.now()}`,
    role: "assistant",
    content,
    timestamp: new Date().toISOString(),
  }
}

export async function getFeaturedServices() {
  await delay(300)
  return SERVICES.filter(s => s.isSponsored || s.avgRating >= 4.7).slice(0, 6)
}
