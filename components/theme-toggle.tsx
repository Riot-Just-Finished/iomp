"use client"

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { motion } from "motion/react"
import { IconSun, IconMoon } from "@tabler/icons-react"

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="p-2 rounded-lg hover:bg-accent/20 transition-colors"
      aria-label="Toggle theme"
    >
      {theme === "dark" ? (
        <IconSun size={20} className="text-yellow-500" />
      ) : (
        <IconMoon size={20} className="text-slate-700" />
      )}
    </motion.button>
  )
}
