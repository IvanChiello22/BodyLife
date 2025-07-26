"use client"

import { useEffect, useState } from "react"

export function SplashScreen() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer)
          return 100
        }
        return prev + 2
      })
    }, 60)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center px-6">
      <div className="flex flex-col items-center space-y-8">
        {/* Logo */}
        <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
          <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center">
            <div className="w-4 h-4 bg-white rounded-full"></div>
          </div>
        </div>

        {/* Loading Bar */}
        <div className="w-48 h-1 bg-gray-800 rounded-full overflow-hidden">
          <div className="h-full bg-white transition-all duration-100 ease-out" style={{ width: `${progress}%` }} />
        </div>
      </div>
    </div>
  )
}
