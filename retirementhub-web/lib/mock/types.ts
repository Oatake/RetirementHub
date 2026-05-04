export interface User {
  id: string
  email: string
  name: string
  avatarUrl?: string
  nationality: string
  userType: "planner" | "provider" | "creator" | "admin"
  language: "en" | "th"
  createdAt: string
}

export interface UserProfile {
  userId: string
  age: number
  currentCountry: string
  targetCity: string
  financialData: {
    savings: number
    monthlyIncome: number
    monthlyExpenses: number
    debt: number
  }
  healthData: {
    healthStatus: number
    chronicConditions: string[]
    healthGoals: string[]
  }
  lifestylePrefs: {
    activities: string[]
    housingType: string
  }
  retirementScore: number
  targetTimeline: string
  planningGoal: string
}

export interface ServiceCategory {
  id: string
  name: string
  slug: string
  icon: string
  serviceCount: number
  description: string
}

export interface Provider {
  id: string
  name: string
  categoryId: string
  categoryName: string
  city: string
  address: string
  phone: string
  website?: string
  verified: boolean
  trustScore: number
  listingTier: "standard" | "premium"
  status: "pending" | "active" | "suspended"
  reviewCount: number
  avgRating: number
  createdAt: string
  description: string
  images: string[]
  yearsActive: number
  responseRate: number
  completionRate: number
}

export interface Service {
  id: string
  providerId: string
  providerName: string
  name: string
  name_th?: string
  description: string
  description_th?: string
  priceThb: number
  priceType: "fixed" | "from" | "contact"
  durationDays?: number
  images: string[]
  tags: string[]
  avgRating: number
  reviewCount: number
  isBookable: boolean
  status: "active" | "paused" | "draft"
  categoryId: string
  categoryName: string
  city: string
  slug: string
  whatIsIncluded: string[]
  whatIsNotIncluded: string[]
  cancellationPolicy: "free" | "partial" | "no_refund"
  isSponsored?: boolean
}

export interface Review {
  id: string
  serviceId: string
  userId: string
  bookingId: string
  ratingOverall: number
  ratingQuality: number
  ratingValue: number
  ratingEase: number
  ratingTrust: number
  body: string
  language: string
  isVerified: boolean
  helpfulCount: number
  createdAt: string
  reviewerName: string
  reviewerNationality: string
  visitDate: string
  providerResponse?: string
  wouldRecommend: boolean
}

export interface Booking {
  id: string
  userId: string
  serviceId: string
  providerId: string
  serviceName: string
  providerName: string
  categoryName: string
  status: "pending" | "confirmed" | "completed" | "cancelled"
  bookingDate: string
  priceThb: number
  paymentStatus: "unpaid" | "paid" | "refunded"
  createdAt: string
  hasReview: boolean
  image: string
}

export interface VisaType {
  id: string
  name: string
  name_th?: string
  slug: string
  shortName: string
  targetUser: string
  description: string
  description_th?: string
  eligibilityAge?: string
  keyRequirements: string[]
  documentChecklist: string[]
  estimatedCostThb: number
  processingTime: string
  validity: string
  renewalInfo: string
  lastUpdated: string
}

export interface City {
  id: string
  name: string
  name_th?: string
  slug: string
  description: string
  description_th?: string
  bestFor: string[]
  image: string
  costOfLiving: {
    rentOneBed: number
    mealLocal: number
    mealExpat: number
    transport: number
    utilities: number
    entertainment: number
  }
  healthcare: {
    internationalHospitals: number
    specialistCost: number
    insuranceCostRange: string
  }
  climate: {
    avgTemp: number
    rainyMonths: number
    aqiAvg: "Good" | "Moderate" | "Poor"
  }
  expatCommunity: {
    estimatedExpats: number
    expatGroups: number
    englishPrevalence: "High" | "Medium" | "Low"
  }
  lifestyle: {
    nightlifeRating: number
    natureRating: number
    culturalActivities: number
    shoppingRating: number
  }
  connectivity: {
    avgInternetSpeed: number
    coworkingSpaces: number
  }
  safety: {
    crimeIndex: "Low" | "Medium" | "High"
    touristSafetyRating: number
  }
}

export interface Post {
  id: string
  authorId: string
  authorName: string
  authorAvatar?: string
  content: string
  images: string[]
  taggedServices: Array<{
    id: string
    name: string
    priceThb: number
    avgRating: number
    slug: string
  }>
  topicTags: string[]
  city?: string
  language: "en" | "th"
  likesCount: number
  commentsCount: number
  isLiked: boolean
  isSaved: boolean
  hasAffiliateLink: boolean
  createdAt: string
}

export interface RetirementScore {
  overall: number
  finance: number
  health: number
  lifestyle: number
  financeDetails: string[]
  healthDetails: string[]
  lifestyleDetails: string[]
  recommendations: Array<{
    category: string
    action: string
    priority: "high" | "medium" | "low"
    serviceCategory?: string
    serviceSlug?: string
  }>
  lastUpdated: string
}

export interface AffiliateStats {
  totalClicks: number
  totalConversions: number
  conversionRate: number
  totalEarnings: number
  pendingEarnings: number
  paidEarnings: number
  earningsByCategory: Array<{ category: string; amount: number }>
  recentTransactions: Array<{
    id: string
    date: string
    service: string
    bookingStatus: string
    commission: number
    payoutStatus: "pending" | "paid"
  }>
}

export interface ChatMessage {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: string
  toolResults?: Array<{
    type: "service_card"
    service: Pick<Service, "id" | "name" | "priceThb" | "avgRating" | "city" | "slug" | "images" | "categoryName">
  }>
}
