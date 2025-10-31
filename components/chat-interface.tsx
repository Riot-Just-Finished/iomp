"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { PlaceholdersAndVanishInput } from "@/components/ui/placeholders-and-vanish-input"
import { Card } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { LoadingDots } from "@/components/ui/loading-dots"
import Image from "next/image"

interface Message {
  id: string
  type: "user" | "bot"
  content: string
  timestamp: Date
}

export function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "bot",
      content:
        "Hey! I'm Calorie, your personal fitness assistant 💪 Ready to track your nutrition and crush your fitness goals?",
      timestamp: new Date(),
    },
  ])
  const [isLoading, setIsLoading] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages])

  const placeholders = [
    "What's my calorie intake today?",
    "I had a chicken salad for lunch, estimate calories",
    "How many calories does a 5km run burn?",
    "Create a meal plan for 2000 calories",
    "What's a good pre-workout snack?",
  ]

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Real-time input handling
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const input = e.currentTarget.querySelector("input") as HTMLInputElement
    if (!input || !input.value.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: input.value,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    input.value = ""
    setIsLoading(true)

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [
            { role: "system", content: "You are Calorie, an AI fitness assistant. You help users track nutrition, estimate calories, and provide fitness tips. Be concise, friendly, and helpful." },
            ...messages.map(m => ({ 
              role: m.type === "user" ? "user" : "assistant",
              content: m.content 
            })),
            { role: "user", content: userMessage.content }
          ]
        })
      });

      const data = await response.json();
      
      if (!response.ok) throw new Error(data.error || "Failed to get response");

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: "bot",
        content: data.reply,
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, botMessage])
    } catch (error) {
      console.error("Chat error:", error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: "bot",
        content: "Sorry, I'm having trouble responding right now. Please try again.",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col relative">
<ScrollArea className="flex-1 overflow-y-auto py-60">
  {/* --- CHANGE: REMOVED THE LARGE BOTTOM MARGIN --- */}
  {/* The `mb-24` class was creating a large empty space at the bottom. */}
  {/* Removing it allows the chat content to fill the vertical space completely. */}
  {/* The vertical padding `py-8` is kept to give nice spacing at the top and bottom. */}
  <div className="w-full h-full px-4 py-0">

    <div className="space-y-8">
      {messages.map((message) => (
        <div key={message.id} className={`flex w-full h-full ${
    message.type === "user" ? "justify-end" : "justify-start"
  }`}>
          <Card
            className={`max-w-xs md:max-w-md lg:max-w-lg px-6 py-4 shadow-lg ${
              message.type === "user"
                ? "bg-gradient-to-r from-blue-700 to-blue-400 text-white rounded-3xl rounded-tr-sm"
                : "bg-card border-2 border-accent/20 text-foreground rounded-3xl rounded-tl-sm"
            }`}
          >
            <p className="text-sm md:text-base leading-relaxed">{message.content}</p>
            <p
              className={`text-xs mt-2 ${
                message.type === "user" ? "text-primary-foreground/70" : "text-muted-foreground"
              }`}
            >
              {message.timestamp.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
          </Card>
        </div>
      ))}
      {isLoading && (
        <div className="flex justify-start">
          <Card className="bg-card border-2 border-accent/20 text-foreground rounded-3xl rounded-tl-sm px-4 py-3">
            <LoadingDots />
          </Card>
        </div>
      )}
    </div>
  </div>
</ScrollArea>
      {/* Input Area */}
      <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-slate-900 border-t border-border p-3 shadow-2xl">
        <div className="max-w-6xl mx-auto">
          <PlaceholdersAndVanishInput placeholders={placeholders} onChange={handleChange} onSubmit={handleSubmit} />
          <p className="text-xs text-muted-foreground mt-2 text-center">
            💡 Calorie can help you track meals, estimate calories, and provide fitness tips!
          </p>
        </div>
      </div>
    </div>
  )
}
