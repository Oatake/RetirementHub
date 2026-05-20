"use client"
import { useState, useRef, useEffect } from "react"
import { Link } from "@/i18n/navigation"
import { ArrowLeft, Send, Bot, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { getChatHistory, sendChatMessage } from "@/lib/mock/api"
import type { ChatMessage } from "@/lib/mock/types"
import { timeAgo, formatCurrency } from "@/lib/utils"

export default function PlannerPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isInitializing, setIsInitializing] = useState(true)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    getChatHistory().then(msgs => {
      setMessages(msgs)
      setIsInitializing(false)
    })
  }, [])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSend = async () => {
    if (!input.trim() || isLoading) return
    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      role: "user",
      content: input.trim(),
      timestamp: new Date().toISOString(),
    }
    setMessages(prev => [...prev, userMsg])
    setInput("")
    setIsLoading(true)
    const reply = await sendChatMessage(userMsg.content)
    setMessages(prev => [...prev, reply])
    setIsLoading(false)
  }

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const QUICK_PROMPTS = [
    "What visa do I need?",
    "How much does it cost to live in Chiang Mai?",
    "What health checks should I get?",
    "Compare Bangkok vs Chiang Mai",
  ]

  function renderContent(content: string) {
    const lines = content.split("\n")
    return lines.map((line, i) => {
      const bold = line.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
      if (line.startsWith("| ")) {
        return <span key={i} className="font-mono text-xs block">{line}</span>
      }
      if (line.startsWith("- ") || line.match(/^\d+\./)) {
        return <li key={i} className="ml-4 list-disc" dangerouslySetInnerHTML={{ __html: bold.replace(/^[-\d.]+\s*/, "") }} />
      }
      if (line === "") return <br key={i} />
      return <p key={i} dangerouslySetInnerHTML={{ __html: bold }} />
    })
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-6 flex flex-col h-[calc(100vh-80px)]">
      {/* Header */}
      <div className="flex items-center gap-3 mb-4 shrink-0">
        <Button variant="ghost" size="icon-sm" asChild>
          <Link href="/planning/dashboard"><ArrowLeft className="h-4 w-4" /></Link>
        </Button>
        <div className="flex items-center gap-2.5">
          <div className="h-9 w-9 rounded-full bg-primary flex items-center justify-center">
            <Bot className="h-5 w-5 text-white" />
          </div>
          <div>
            <p className="text-sm font-semibold text-on-surface">Longevity AI Planner</p>
            <p className="text-xs text-secondary">● Online</p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto space-y-4 pb-4">
        {isInitializing ? (
          <div className="space-y-3">
            {[1, 2].map(i => (
              <div key={i} className="animate-pulse flex gap-3">
                <div className="h-9 w-9 rounded-full bg-surface-container shrink-0" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-surface-container rounded w-3/4" />
                  <div className="h-4 bg-surface-container rounded w-1/2" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <>
            {messages.map(msg => (
              <div key={msg.id} className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : ""}`}>
                <div className={`h-9 w-9 rounded-full flex items-center justify-center shrink-0 ${msg.role === "assistant" ? "bg-primary" : "bg-surface-container"}`}>
                  {msg.role === "assistant"
                    ? <Bot className="h-5 w-5 text-white" />
                    : <User className="h-5 w-5 text-on-surface-dim" />
                  }
                </div>
                <div className={`max-w-[75%] ${msg.role === "user" ? "items-end" : "items-start"} flex flex-col gap-1`}>
                  <div className={`rounded-2xl px-4 py-3 text-sm leading-relaxed ${msg.role === "assistant" ? "bg-surface-white border border-outline-light/60 text-on-surface" : "bg-primary text-white"}`}>
                    <div className="space-y-1">
                      {renderContent(msg.content)}
                    </div>
                  </div>
                  {msg.toolResults?.map((tr, ti) => tr.type === "service_card" && (
                    <Link key={ti} href={`/services/${tr.service.slug}`} className="block bg-surface-white border border-outline-light rounded-xl p-3 hover:border-primary/30 transition-colors w-full mt-1">
                      <p className="text-xs text-on-surface-dim mb-0.5">{tr.service.categoryName}</p>
                      <p className="text-sm font-semibold text-on-surface">{tr.service.name}</p>
                      <p className="text-sm text-primary font-bold mt-1">{formatCurrency(tr.service.priceThb)}</p>
                    </Link>
                  ))}
                  <span className="text-xs text-on-surface-dim">{timeAgo(msg.timestamp)}</span>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex gap-3">
                <div className="h-9 w-9 rounded-full bg-primary flex items-center justify-center shrink-0">
                  <Bot className="h-5 w-5 text-white" />
                </div>
                <div className="bg-surface-white border border-outline-light/60 rounded-2xl px-4 py-3">
                  <div className="flex gap-1">
                    {[0, 1, 2].map(i => (
                      <div key={i} className="h-2 w-2 rounded-full bg-on-surface-dim animate-bounce" style={{ animationDelay: `${i * 0.15}s` }} />
                    ))}
                  </div>
                </div>
              </div>
            )}
          </>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Quick prompts */}
      {messages.length <= 1 && !isLoading && (
        <div className="flex gap-2 flex-wrap mb-3 shrink-0">
          {QUICK_PROMPTS.map(q => (
            <button
              key={q}
              onClick={() => { setInput(q); }}
              className="px-3 py-1.5 rounded-full border border-outline-light text-xs text-on-surface-dim hover:border-primary/40 hover:text-primary transition-colors"
            >
              {q}
            </button>
          ))}
        </div>
      )}

      {/* Input */}
      <div className="flex gap-2 shrink-0">
        <textarea
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKey}
          placeholder="Ask anything about retiring in Thailand..."
          rows={1}
          className="flex-1 resize-none px-4 py-3 rounded-xl border border-outline-light bg-surface-white text-sm text-on-surface placeholder:text-on-surface-dim focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
        />
        <Button onClick={handleSend} disabled={!input.trim() || isLoading} size="icon" className="h-11 w-11 shrink-0">
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
