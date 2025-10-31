"use client"

import type React from "react"

import { useState } from "react"
import { WavyBackground } from "@/components/ui/wavy-background"
import { PlaceholdersAndVanishInput } from "@/components/ui/placeholders-and-vanish-input"
import { Card } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { generateBotResponse } from "@/utils/bot-response"
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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
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

    // Simulate bot response
    setTimeout(() => {
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: "bot",
        content: generateBotResponse(userMessage.content),
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, botMessage])
    }, 500)
  }

  return (
    <div className="min-h-screen flex flex-col relative">
      {/* Background Wave Effect */}
      <div className="fixed inset-0 -z-10">
        <WavyBackground
          colors={["#22c55e", "#f97316", "#0ea5e9"]}
          waveWidth={100}
          backgroundFill="transparent"
          blur={2}
          speed="slow"
          waveOpacity={0.1}
          className="h-full w-full"
          containerClassName="h-full w-full"
        />
      </div>

      {/* Header - Replaced emoji logo with image */}
      <div className="bg-gradient-to-r from-primary via-secondary to-accent dark:from-primary dark:via-secondary dark:to-accent p-6 shadow-lg">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-white flex items-center gap-3">
            <Image src="/calorie-logo.jpg" alt="Calorie" width={48} height={48} priority />
            Calorie
          </h1>
          <p className="text-primary-foreground/90 mt-2 text-sm md:text-base">Your AI Fitness Coach</p>
        </div>
      </div>

      {/* Chat Area */}
      <ScrollArea className="flex-1 overflow-y-auto">
        <div className="max-w-4xl mx-auto w-full px-4 py-8 mb-24">
          <div className="space-y-6">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}>
                <Card
                  className={`max-w-xs md:max-w-md lg:max-w-lg px-6 py-4 shadow-lg ${
                    message.type === "user"
                      ? "bg-gradient-to-r from-primary to-secondary text-white rounded-3xl rounded-tr-sm"
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
          </div>
        </div>
      </ScrollArea>

      {/* Input Area */}
      <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-slate-900 border-t border-border p-6 shadow-2xl">
        <div className="max-w-4xl mx-auto">
          <PlaceholdersAndVanishInput placeholders={placeholders} onChange={handleChange} onSubmit={handleSubmit} />
          <p className="text-xs text-muted-foreground mt-3 text-center">
            💡 Calorie can help you track meals, estimate calories, and provide fitness tips!
          </p>
        </div>
      </div>
    </div>
  )
}
