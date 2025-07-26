"use client"

import { useEffect, useState } from "react"
import { Progress } from "@/components/ui/progress"

interface SplashScreenUpdatedProps {
  onComplete: () => void
}

export function SplashScreenUpdated({ onComplete }: SplashScreenUpdatedProps) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer)
          setTimeout(onComplete, 500)
          return 100
        }
        return prev + 2
      })
    }, 50)

    return () => clearInterval(timer)
  }, [onComplete])

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-500 to-red-600 flex flex-col items-center justify-center text-white">
      <div className="text-center mb-8">
        <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mb-6 mx-auto">
          <div className="text-4xl">💪</div>
        </div>
        <h1 className="text-4xl font-bold mb-2">GymApp</h1>
        <p className="text-xl opacity-90">La tua palestra personale</p>
      </div>

      <div className="w-64 mb-4">
        <Progress value={progress} className="h-2 bg-white/20" />
      </div>

      <p className="text-sm opacity-75">Caricamento in corso...</p>
    </div>
  )
}
