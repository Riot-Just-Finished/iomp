"use client"
import { cn } from "@/lib/utils"
import type React from "react"
import { useState, createContext, useContext } from "react"
import { AnimatePresence, motion } from "motion/react"
import { IconMenu2, IconX } from "@tabler/icons-react"
import { IconHome, IconApps, IconHistory, IconLogout, IconSalad } from "@tabler/icons-react"
import Image from "next/image"

interface Links {
  label: string
  href: string
  icon: React.JSX.Element | React.ReactNode
  onClick?: () => void
}

interface SidebarContextProps {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  animate: boolean
}

const SidebarContext = createContext<SidebarContextProps | undefined>(undefined)

export const useSidebar = () => {
  const context = useContext(SidebarContext)
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider")
  }
  return context
}

export const SidebarProvider = ({
  children,
  open: openProp,
  setOpen: setOpenProp,
  animate = true,
}: {
  children: React.ReactNode
  open?: boolean
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>
  animate?: boolean
}) => {
  const [openState, setOpenState] = useState(false)

  const open = openProp !== undefined ? openProp : openState
  const setOpen = setOpenProp !== undefined ? setOpenProp : setOpenState

  return <SidebarContext.Provider value={{ open, setOpen, animate: animate }}>{children}</SidebarContext.Provider>
}

export const Sidebar = ({
  children,
  open,
  setOpen,
  animate,
  onPageChange,
}: {
  children?: React.ReactNode
  open?: boolean
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>
  animate?: boolean
  onPageChange?: (page: "chat" | "workouts" | "diets") => void
}) => {
  const links: Links[] = [
    {
      label: "Chat",
      href: "#",
      icon: <IconHome className="h-5 w-5 shrink-0 text-primary dark:text-primary" />,
      onClick: () => onPageChange?.("chat"),
    },
    {
      label: "Workouts",
      href: "#",
      icon: <IconApps className="h-5 w-5 shrink-0 text-primary dark:text-primary" />,
      onClick: () => onPageChange?.("workouts"),
    },
    {
      label: "Diets",
      href: "#",
      icon: <IconSalad className="h-5 w-5 shrink-0 text-primary dark:text-primary" />,
      onClick: () => onPageChange?.("diets"),
    },
    {
      label: "History",
      href: "#",
      icon: <IconHistory className="h-5 w-5 shrink-0 text-primary dark:text-primary" />,
    },
    {
      label: "Logout",
      href: "#",
      icon: <IconLogout className="h-5 w-5 shrink-0 text-primary dark:text-primary" />,
    },
  ]

  return (
    <SidebarProvider open={open} setOpen={setOpen} animate={animate}>
      <motion.div
        className={cn(
          "h-screen px-4 py-4 hidden md:flex md:flex-col bg-gradient-to-b from-primary/5 via-secondary/5 to-accent/5 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 w-[300px] shrink-0 border-r border-border",
          "transition-all duration-300",
        )}
        animate={{
          width: animate ? (open ? "300px" : "60px") : "300px",
        }}
        onMouseEnter={() => animate && setOpen?.(true)}
        onMouseLeave={() => animate && setOpen?.(false)}
      >
        {/* Logo - Image displayed prominently */}
                <div className="flex items-center justify-between mb-8 px-2">
          <div className="flex items-center">
            <motion.div
              animate={{
                scale: open ? 1 : 0.8,
              }}
              className="relative w-10 h-10"
            >
              <Image
                src="/calorie-logo.jpg"
                alt="Calorie Logo"
                width={40}
                height={40}
                priority
                className="w-full h-full"
              />
            </motion.div>
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: open ? 1 : 0 }}
              className="ml-3 font-bold text-lg text-primary dark:text-primary whitespace-nowrap"
            >
              Calorie
            </motion.span>
          </div>
          <motion.button
            animate={{ rotate: open ? 180 : 0 }}
            onClick={() => setOpen?.(!open)}
            className="p-2 rounded-lg hover:bg-primary/10 text-primary transition-colors"
          >
            <IconMenu2 size={20} />
          </motion.button>
        </div>

        {/* Navigation Links */}
        <div className="flex-1 flex flex-col gap-2">
          {links.map((link, idx) => (
            <button
              key={idx}
              onClick={link.onClick}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 text-left w-full",
                "hover:bg-primary/10 dark:hover:bg-primary/20 text-foreground hover:text-primary",
              )}
            >
              {link.icon}
              <motion.span
                animate={{
                  display: animate ? (open ? "inline-block" : "none") : "inline-block",
                  opacity: animate ? (open ? 1 : 0) : 1,
                }}
                className="text-sm font-medium whitespace-nowrap"
              >
                {link.label}
              </motion.span>
            </button>
          ))}
        </div>

        {/* User Profile */}
        <div className="mt-auto pt-4 border-t border-border">
          <a href="#" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-accent/10 transition-all">
            <div className="h-8 w-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold text-sm">
              U
            </div>
            <motion.span
              animate={{
                display: animate ? (open ? "inline-block" : "none") : "inline-block",
                opacity: animate ? (open ? 1 : 0) : 1,
              }}
              className="text-sm font-medium whitespace-nowrap"
            >
              User
            </motion.span>
          </a>
        </div>
      </motion.div>

      {/* Mobile Sidebar */}
      <div className="hidden">
        <h1 className="text-white font-bold text-xl flex items-center gap-2">
          <Image src="/public/calorie-logo.png" alt="Calorie" width={40} height={40} />
          Calorie
        </h1>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setOpen?.(!open)}
          className="text-white"
        >
          <IconMenu2 size={24} />
        </motion.button>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ x: "-100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "-100%", opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="fixed inset-0 bg-background dark:bg-slate-900 z-40 flex flex-col p-6 pt-20"
            >
              <button onClick={() => setOpen?.(false)} className="absolute top-6 right-6 text-foreground">
                <IconX size={24} />
              </button>

              {/* Mobile Navigation Links */}
              <div className="flex-1 flex flex-col gap-4 mt-8">
                {links.map((link, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      link.onClick?.();
                      setOpen?.(false);
                    }}
                    className={cn(
                      "flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 text-left w-full",
                      "hover:bg-primary/10 dark:hover:bg-primary/20 text-foreground hover:text-primary"
                    )}
                  >
                    {link.icon}
                    <span className="text-base font-medium">{link.label}</span>
                  </button>
                ))}
              </div>

              {/* Mobile User Profile */}
              <div className="mt-auto pt-4 border-t border-border">
                <a href="#" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-accent/10 transition-all">
                  <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold text-lg">
                    U
                  </div>
                  <span className="text-base font-medium">User</span>
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </SidebarProvider>
  )
}
