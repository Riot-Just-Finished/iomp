"use client"

import { useState } from "react"
import { Sidebar } from "@/components/ui/sidebar"
import { ChatInterface } from "@/components/chat-interface"
import { WorkoutsPage } from "@/components/workouts-page"
import { DietsPage } from "@/components/diets-page"
import { ThemeToggle } from "@/components/theme-toggle"
import { motion } from "framer-motion" // Corrected import for framer-motion
import Image from "next/image"
import { IconMenu2, IconX } from "@tabler/icons-react"

export default function Home() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [currentPage, setCurrentPage] = useState<"chat" | "workouts" | "diets">("chat")

  return (
    <div className="flex h-screen bg-background">
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} onPageChange={setCurrentPage} />

      {/* The main content area that flexes to fill the screen */}
      <div className="flex-1 flex flex-col relative overflow-y-auto"> {/* Added overflow-y-auto for scrolling */}
        
        {/* Header section containing the menu button and theme toggle */}
        {/* Top gradient bar with toggler and theme toggle */}
        <div className="w-full bg-gradient-to-l from-blue-700 to-blue-400 p-4 md:p-6 shadow-lg z-10">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Image src="/calorie-logo.png" alt="Calorie" width={40} height={40} />
              <h1 className="text-white text-xl font-bold hidden md:block">Calorie</h1>
            </div>

            <div className="flex items-center gap-4">
              {/* Mobile menu button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="md:hidden p-2 rounded-lg bg-primary/10 hover:bg-primary/20 text-primary"
                title="Toggle sidebar"
              >
                {sidebarOpen ? <IconX size={20} /> : <IconMenu2 size={20} />}
              </motion.button>

              {/* Theme toggle, consistently placed */}
              <div className="hidden md:block">
                <ThemeToggle />
              </div>
            </div>
          </div>
        </div>

        {/* Main content, rendered conditionally */}
        <div className="flex-1 p-6"> {/* Added padding here to the main content wrapper */}
            {currentPage === "chat" && <ChatInterface />}
            {currentPage === "workouts" && <WorkoutsPage />}
            {currentPage === "diets" && <DietsPage />}
        </div>
      </div>
    </div>
  )
}