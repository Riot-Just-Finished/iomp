"use client"

export function LoadingDots() {
  return (
    <div className="flex space-x-1 animate-pulse">
      <div className="w-1.5 h-1.5 bg-current rounded-full"></div>
      <div className="w-1.5 h-1.5 bg-current rounded-full animation-delay-200"></div>
      <div className="w-1.5 h-1.5 bg-current rounded-full animation-delay-400"></div>
    </div>
  )
}