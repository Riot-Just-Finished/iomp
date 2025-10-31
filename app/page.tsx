"use client"

import { useState } from "react"
import { Sidebar } from "@/components/ui/sidebar"
import { ChatInterface } from "@/components/chat-interface"
import { WorkoutsPage } from "@/components/workouts-page"
import { DietsPage } from "@/components/diets-page"
import { ThemeToggle } from "@/components/theme-toggle"
import { motion } from "motion/react"
import { IconMenu2, IconX } from "@tabler/icons-react"

export default function Home() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [currentPage, setCurrentPage] = useState<"chat" | "workouts" | "diets">("chat")

  return (
    <div className="flex h-screen bg-background">
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} onPageChange={setCurrentPage} />

      <div className="flex-1 flex flex-col relative">
        <div className="flex justify-between items-center p-6 md:p-0">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="md:hidden p-2 rounded-lg bg-primary/10 hover:bg-primary/20 text-primary"
            title="Toggle sidebar"
          >
            {sidebarOpen ? <IconX size={20} /> : <IconMenu2 size={20} />}
          </motion.button>

          <div className="md:absolute md:top-6 md:right-6">
            <ThemeToggle />
          </div>
        </div>

        {currentPage === "chat" && <ChatInterface />}
        {currentPage === "workouts" && <WorkoutsPage />}
        {currentPage === "diets" && <DietsPage />}
      </div>
    </div>
  )
}
