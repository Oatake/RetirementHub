"use client"
import { useState, useEffect } from "react"
import Image from "next/image"
import { useTranslations } from "next-intl"
import { Link } from "@/i18n/navigation"
import { Heart, MessageCircle, Bookmark, MapPin, Tag, TrendingUp } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { getCommunityPosts } from "@/lib/mock/api"
import type { Post } from "@/lib/mock/types"
import { timeAgo, formatCurrency } from "@/lib/utils"

const TOPICS = ["all", "Health", "Finance", "Visa", "Lifestyle", "Chiang Mai", "Bangkok", "Phuket", "Wellness"]

export default function CommunityPage() {
  const t = useTranslations("Community")
  const [posts, setPosts] = useState<Post[]>([])
  const [topic, setTopic] = useState("all")
  const [isLoading, setIsLoading] = useState(true)
  const [likedPosts, setLikedPosts] = useState<Set<string>>(new Set(["post-002", "post-005"]))
  const [savedPosts, setSavedPosts] = useState<Set<string>>(new Set(["post-002", "post-004", "post-005"]))

  useEffect(() => {
    setIsLoading(true)
    getCommunityPosts(topic === "all" ? undefined : topic).then(data => {
      setPosts(data)
      setIsLoading(false)
    })
  }, [topic])

  const toggleLike = (id: string) => {
    setLikedPosts(prev => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  const toggleSave = (id: string) => {
    setSavedPosts(prev => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  return (
    <div className="max-w-[1280px] mx-auto px-6 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Feed */}
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-on-surface">{t("title")}</h1>
            <Button size="sm" asChild>
              <Link href="/community/affiliate">{t("becomeCreator")}</Link>
            </Button>
          </div>

          {/* Topic tabs */}
          <div className="flex gap-2 overflow-x-auto pb-2 mb-6 scrollbar-none">
            {TOPICS.map(tp => (
              <button
                key={tp}
                onClick={() => setTopic(tp)}
                className={`shrink-0 px-4 py-1.5 rounded-full text-sm font-medium transition-colors capitalize ${tp === topic ? "bg-primary text-white" : "bg-surface-white border border-outline-light text-on-surface-dim hover:border-primary/30"}`}
              >
                {tp === "all" ? t("allTopics") : tp}
              </button>
            ))}
          </div>

          {/* Posts */}
          {isLoading ? (
            <div className="space-y-4">
              {[1, 2, 3].map(i => (
                <div key={i} className="bg-surface-white border border-outline-light/60 rounded-2xl p-5 animate-pulse">
                  <div className="flex gap-3 mb-3">
                    <div className="h-10 w-10 rounded-full bg-surface-container shrink-0" />
                    <div className="flex-1 space-y-2">
                      <div className="h-4 bg-surface-container rounded w-32" />
                      <div className="h-3 bg-surface-container rounded w-20" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="h-4 bg-surface-container rounded" />
                    <div className="h-4 bg-surface-container rounded w-5/6" />
                  </div>
                </div>
              ))}
            </div>
          ) : posts.length === 0 ? (
            <div className="text-center py-12 bg-surface-white border border-outline-light/60 rounded-2xl">
              <p className="text-2xl mb-2">💬</p>
              <p className="text-on-surface font-semibold mb-1">{t("noPostsTitle")}</p>
              <p className="text-on-surface-dim text-sm">{t("noPostsDesc")}</p>
            </div>
          ) : (
            <div className="space-y-5">
              {posts.map(post => (
                <div key={post.id} className="bg-surface-white border border-outline-light/60 rounded-2xl overflow-hidden">
                  {/* Author */}
                  <div className="flex items-center justify-between p-5 pb-3">
                    <div className="flex items-center gap-2.5">
                      {post.authorAvatar ? (
                        <Image src={post.authorAvatar} alt={post.authorName} width={40} height={40} className="rounded-full" />
                      ) : (
                        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary">
                          {post.authorName[0]}
                        </div>
                      )}
                      <div>
                        <p className="text-sm font-semibold text-on-surface">{post.authorName}</p>
                        <div className="flex items-center gap-2 text-xs text-on-surface-dim">
                          {post.city && (
                            <>
                              <MapPin className="h-3 w-3" />
                              <span>{post.city}</span>
                              <span>·</span>
                            </>
                          )}
                          <span>{timeAgo(post.createdAt)}</span>
                          {post.hasAffiliateLink && (
                            <>
                              <span>·</span>
                              <span className="text-gold font-medium">Creator</span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-1 flex-wrap justify-end">
                      {post.topicTags.slice(0, 2).map(tag => (
                        <Badge key={tag} variant="outline" className="text-xs">{tag}</Badge>
                      ))}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="px-5 pb-3">
                    <p className="text-sm text-on-surface leading-relaxed whitespace-pre-line">{post.content}</p>
                  </div>

                  {/* Images */}
                  {post.images.length > 0 && (
                    <div className={`px-5 pb-3 grid gap-2 ${post.images.length === 1 ? "grid-cols-1" : "grid-cols-2"}`}>
                      {post.images.map((img, i) => (
                        <div key={i} className="relative aspect-video rounded-xl overflow-hidden bg-surface-container">
                          <Image src={img} alt={`Post image ${i + 1}`} fill className="object-cover" sizes="600px" />
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Tagged services */}
                  {post.taggedServices.length > 0 && (
                    <div className="px-5 pb-3">
                      {post.taggedServices.map(svc => (
                        <Link key={svc.id} href={`/services/${svc.slug}`} className="flex items-center justify-between p-3 bg-surface-low border border-outline-light/60 rounded-xl hover:border-primary/30 transition-colors">
                          <div className="flex items-center gap-2">
                            <Tag className="h-4 w-4 text-on-surface-dim" />
                            <div>
                              <p className="text-sm font-medium text-on-surface">{svc.name}</p>
                              <p className="text-xs text-on-surface-dim">{formatCurrency(svc.priceThb)} · ⭐ {svc.avgRating.toFixed(1)}</p>
                            </div>
                          </div>
                          <span className="text-xs text-primary font-medium">View →</span>
                        </Link>
                      ))}
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex items-center gap-4 px-5 py-3 border-t border-outline-light/60">
                    <button
                      onClick={() => toggleLike(post.id)}
                      className={`flex items-center gap-1.5 text-sm transition-colors ${likedPosts.has(post.id) ? "text-error" : "text-on-surface-dim hover:text-error"}`}
                    >
                      <Heart className={`h-4 w-4 ${likedPosts.has(post.id) ? "fill-current" : ""}`} />
                      <span>{post.likesCount + (likedPosts.has(post.id) && !post.isLiked ? 1 : !likedPosts.has(post.id) && post.isLiked ? -1 : 0)}</span>
                    </button>
                    <button className="flex items-center gap-1.5 text-sm text-on-surface-dim hover:text-primary transition-colors">
                      <MessageCircle className="h-4 w-4" />
                      <span>{post.commentsCount}</span>
                    </button>
                    <button
                      onClick={() => toggleSave(post.id)}
                      className={`flex items-center gap-1.5 text-sm ml-auto transition-colors ${savedPosts.has(post.id) ? "text-primary" : "text-on-surface-dim hover:text-primary"}`}
                    >
                      <Bookmark className={`h-4 w-4 ${savedPosts.has(post.id) ? "fill-current" : ""}`} />
                      <span className="text-xs">{savedPosts.has(post.id) ? t("saved") : t("save")}</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="hidden lg:block">
          <div className="sticky top-24 space-y-5">
            {/* Trending */}
            <div className="bg-surface-white border border-outline-light/60 rounded-xl p-5">
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp className="h-4 w-4 text-primary" />
                <h3 className="font-semibold text-on-surface">{t("trendingTopics")}</h3>
              </div>
              <div className="space-y-2">
                {["Chiang Mai costs 2026", "OA visa changes", "Best health checks", "Bangkok vs CM", "LTR visa benefits"].map((topicItem, i) => (
                  <div key={topicItem} className="flex items-center gap-2 text-sm">
                    <span className="text-on-surface-dim w-4">{i + 1}.</span>
                    <button className="text-primary hover:underline">{topicItem}</button>
                  </div>
                ))}
              </div>
            </div>

            {/* Become creator */}
            <div className="bg-gold/8 border border-gold/20 rounded-xl p-5">
              <h3 className="font-semibold text-on-surface mb-1">{t("earnCreatorTitle")}</h3>
              <p className="text-sm text-on-surface-dim mb-3">{t("earnCreatorDesc")}</p>
              <Button size="sm" variant="outline" asChild className="w-full">
                <Link href="/community/affiliate">{t("learnMore")}</Link>
              </Button>
            </div>

            {/* Community stats */}
            <div className="bg-surface-white border border-outline-light/60 rounded-xl p-5">
              <h3 className="font-semibold text-on-surface mb-3">{t("communityStats")}</h3>
              <div className="space-y-2 text-sm">
                {[
                  { label: t("activeMembers"), value: "12,400+" },
                  { label: t("postsThisMonth"), value: "3,200" },
                  { label: t("countriesRepresented"), value: "47" },
                  { label: t("citiesCovered"), value: "6" },
                ].map(stat => (
                  <div key={stat.label} className="flex justify-between">
                    <span className="text-on-surface-dim">{stat.label}</span>
                    <span className="font-semibold text-on-surface">{stat.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
