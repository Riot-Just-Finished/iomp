"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [isRegister, setIsRegister] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)

    const formData = new FormData(e.currentTarget)
    const email = formData.get('email') as string
    const password = formData.get('password') as string

    try {
      if (isRegister) {
        const username = formData.get('username') as string
        
        const { error: signUpError } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              username,
            },
          },
        })

        if (signUpError) throw signUpError

        // Create user profile in database
        const { error: profileError } = await supabase
          .from('profiles')
          .insert([
            {
              id: (await supabase.auth.getUser()).data.user?.id,
              username,
              email,
            },
          ])

        if (profileError) throw profileError
      } else {
        const { error: signInError } = await supabase.auth.signInWithPassword({
          email,
          password,
        })

        if (signInError) throw signInError
      }

      router.push("/")
      router.refresh()
    } catch (error) {
      console.error('Authentication error:', error)
      // You should add proper error handling here
    } finally {
      setIsLoading(false)
    }
  }

  const toggleMode = () => {
    setIsRegister(!isRegister)
  }

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center relative overflow-hidden bg-background">
      {/* Background gradient effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20 animate-gradient-shift" />
      
      {/* Floating circles decoration */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute top-1/3 right-1/3 w-96 h-96 bg-secondary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-accent/10 rounded-full blur-3xl" />
      </motion.div>

      {/* Login card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="relative z-10"
      >
        <Card className="w-full max-w-md p-8 shadow-lg bg-card/80 backdrop-blur border-2">
          <div className="flex flex-col items-center space-y-6">
            {/* Logo */}
            <div className="relative w-16 h-16">
              <Image
                src="/calorie-logo.jpg"
                alt="Calorie Logo"
                width={64}
                height={64}
                className="rounded-xl"
                priority
              />
            </div>
            
            {/* Title */}
            <div className="text-center space-y-2">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                {isRegister ? "Create Account" : "Welcome Back"}
              </h1>
              <p className="text-muted-foreground">
                {isRegister 
                  ? "Create an account to start tracking" 
                  : "Welcome back! Please sign in to continue"}
              </p>
            </div>

            {/* Auth form */}
            <form onSubmit={handleSubmit} className="w-full space-y-4">
              <div className="space-y-2">
                {isRegister && (
                  <Input
                    type="text"
                    name="username"
                    placeholder="Username"
                    required={isRegister}
                    className="w-full bg-background/50"
                  />
                )}
                <Input
                  type="email"
                  name="email"
                  placeholder="Email"
                  required
                  className="w-full bg-background/50"
                />
                <Input
                  type="password"
                  name="password"
                  placeholder="Password"
                  required
                  className="w-full bg-background/50"
                />
                {isRegister && (
                  <Input
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    required={isRegister}
                    className="w-full bg-background/50"
                  />
                )}
              </div>
              
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    {isRegister ? "Creating Account..." : "Signing in..."}
                  </div>
                ) : (
                  isRegister ? "Create Account" : "Sign In"
                )}
              </Button>
            </form>

            {/* Links */}
            <div className="w-full flex flex-col items-center gap-2 text-sm">
              {!isRegister && (
                <button className="text-muted-foreground hover:text-primary transition-colors">
                  Forgot password?
                </button>
              )}
              <div className="flex items-center gap-2">
                <span className="text-muted-foreground">
                  {isRegister ? "Already have an account?" : "Don't have an account?"}
                </span>
                <button 
                  onClick={toggleMode}
                  className="text-primary hover:text-primary/80 transition-colors font-medium"
                >
                  {isRegister ? "Sign in" : "Sign up"}
                </button>
              </div>
            </div>
          </div>
        </Card>
      </motion.div>
    </div>
  )
}