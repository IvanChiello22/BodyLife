"use client"

import { Button } from "@/components/ui/button"
import { ChevronRight } from "lucide-react"

interface WelcomeScreenProps {
  onNext: () => void
}

export function WelcomeScreen({ onNext }: WelcomeScreenProps) {
  return (
    <div className="min-h-screen bg-gray-800 flex flex-col items-center justify-center px-8 py-12">
      {/* Welcome Text */}
      <div className="text-center mb-16">
        <h1 className="text-white text-2xl font-bold leading-tight">
          CIAO BENVENUTO IN
          <br />
          BODYLIFE
        </h1>
      </div>

      {/* Logo/Icon */}
      <div className="mb-20">
        <div className="relative w-32 h-32 bg-white rounded-2xl flex items-center justify-center">
          {/* Person lifting weights icon */}
          <div className="relative">
            {/* Body */}
            <div className="w-12 h-16 bg-white relative">
              {/* Head */}
              <div className="w-8 h-8 bg-white rounded-full absolute -top-4 left-2 border-4 border-gray-800"></div>

              {/* Arms */}
              <div className="absolute -top-2 -left-6 w-6 h-3 bg-white transform rotate-45 rounded-full"></div>
              <div className="absolute -top-2 -right-6 w-6 h-3 bg-white transform -rotate-45 rounded-full"></div>

              {/* Barbell */}
              <div className="absolute -top-6 -left-8 w-20 h-1 bg-gray-800"></div>

              {/* Weight plates */}
              <div className="absolute -top-8 -left-10 w-4 h-4 bg-red-500 rounded-sm"></div>
              <div className="absolute -top-8 right-6 w-4 h-4 bg-red-500 rounded-sm"></div>
            </div>
          </div>

          {/* Chart elements */}
          <div className="absolute bottom-3 left-3">
            <div className="flex items-end gap-1">
              <div className="w-2 h-4 bg-orange-400 rounded-sm"></div>
              <div className="w-2 h-6 bg-orange-400 rounded-sm"></div>
              <div className="w-2 h-3 bg-orange-400 rounded-sm"></div>
            </div>
          </div>

          <div className="absolute bottom-3 right-3">
            <div className="flex items-end gap-1">
              <div className="w-2 h-5 bg-orange-400 rounded-sm"></div>
              <div className="w-2 h-7 bg-orange-400 rounded-sm"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Start Button */}
      <Button
        onClick={onNext}
        className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-4 px-12 rounded-full text-lg flex items-center gap-2 min-w-[200px] justify-center"
      >
        Iniziamo
        <ChevronRight className="w-5 h-5" />
      </Button>
    </div>
  )
}
