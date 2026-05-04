"use client"
import { useState, useRef, useEffect } from "react"
import { X, Send, Bot, User, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { useUiStore } from "@/store/ui-store"
import { getChatHistory, sendChatMessage } from "@/lib/mock/api"
import type { ChatMessage } from "@/lib/mock/types"
import { Link } from "@/i18n/navigation"
import { formatCurrency } from "@/lib/utils"

export function ChatPanel() {
  const { isChatOpen, closeChat } = useUiStore()
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isInitialLoading, setIsInitialLoading] = useState(true)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    getChatHistory().then((msgs) => {
      setMessages(msgs)
      setIsInitialLoading(false)
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
    setMessages((prev) => [...prev, userMsg])
    setInput("")
    setIsLoading(true)
    const response = await sendChatMessage(input.trim())
    setMessages((prev) => [...prev, response])
    setIsLoading(false)
  }

  if (!isChatOpen) return null

  return (
    <div className="fixed right-4 bottom-4 z-50 flex flex-col w-full max-w-sm sm:max-w-md h-[600px] rounded-2xl bg-surface-white border border-outline-light shadow-2xl overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-primary text-on-primary shrink-0">
        <div className="flex items-center gap-2.5">
          <div className="h-8 w-8 rounded-full bg-white/20 flex items-center justify-center">
            <Bot className="h-4 w-4" />
          </div>
          <div>
            <p className="text-sm font-semibold">AI Life Planner</p>
            <p className="text-xs opacity-75">Powered by Claude · Online</p>
          </div>
        </div>
        <Button variant="ghost" size="icon-sm" onClick={closeChat} className="text-white hover:bg-white/20">
          <X className="h-4 w-4" />
        </Button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {isInitialLoading ? (
          <div className="flex justify-center items-center h-full">
            <Loader2 className="h-6 w-6 animate-spin text-on-surface-dim" />
          </div>
        ) : (
          messages.map((msg) => (
            <MessageBubble key={msg.id} message={msg} />
          ))
        )}
        {isLoading && (
          <div className="flex items-start gap-2">
            <div className="h-7 w-7 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
              <Bot className="h-3.5 w-3.5 text-primary" />
            </div>
            <div className="bg-surface-low rounded-2xl rounded-tl-sm px-3.5 py-2.5">
              <div className="flex gap-1 items-center">
                <span className="h-1.5 w-1.5 bg-on-surface-dim rounded-full animate-bounce [animation-delay:0ms]" />
                <span className="h-1.5 w-1.5 bg-on-surface-dim rounded-full animate-bounce [animation-delay:150ms]" />
                <span className="h-1.5 w-1.5 bg-on-surface-dim rounded-full animate-bounce [animation-delay:300ms]" />
              </div>
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="shrink-0 p-3 border-t border-outline-light bg-surface-low">
        <div className="flex items-end gap-2">
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSend() } }}
            placeholder="Ask me anything about retiring in Thailand..."
            className="min-h-[42px] max-h-32 text-sm resize-none bg-surface-white"
            rows={1}
          />
          <Button size="icon" onClick={handleSend} disabled={!input.trim() || isLoading} className="shrink-0 h-10 w-10">
            <Send className="h-4 w-4" />
          </Button>
        </div>
        <p className="text-xs text-on-surface-dim mt-1.5 text-center">
          For informational purposes only. Not financial or medical advice.
        </p>
      </div>
    </div>
  )
}

function MessageBubble({ message }: { message: ChatMessage }) {
  const isUser = message.role === "user"
  return (
    <div className={`flex items-start gap-2 ${isUser ? "flex-row-reverse" : ""}`}>
      {!isUser && (
        <div className="h-7 w-7 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
          <Bot className="h-3.5 w-3.5 text-primary" />
        </div>
      )}
      {isUser && (
        <Avatar className="h-7 w-7 shrink-0 mt-0.5">
          <AvatarFallback className="text-xs">D</AvatarFallback>
        </Avatar>
      )}
      <div className={`max-w-[85%] ${isUser ? "items-end" : "items-start"} flex flex-col gap-1.5`}>
        <div
          className={`rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed whitespace-pre-wrap ${
            isUser
              ? "bg-primary text-on-primary rounded-tr-sm"
              : "bg-surface-low text-on-surface rounded-tl-sm"
          }`}
        >
          {message.content}
        </div>
        {message.toolResults?.map((result, i) =>
          result.type === "service_card" ? (
            <Link
              key={i}
              href={`/services/${result.service.slug}`}
              className="flex items-center gap-2.5 p-2.5 rounded-xl bg-surface-white border border-outline-light hover:border-primary/30 hover:bg-surface-low transition-colors w-full"
            >
              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 text-sm">
                🏥
              </div>
              <div className="min-w-0">
                <p className="text-xs font-semibold text-on-surface truncate">{result.service.name}</p>
                <p className="text-xs text-on-surface-dim">{result.service.city} · {formatCurrency(result.service.priceThb)}</p>
              </div>
            </Link>
          ) : null
        )}
        <span className="text-[10px] text-on-surface-dim px-1">
          {new Date(message.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
        </span>
      </div>
    </div>
  )
}
