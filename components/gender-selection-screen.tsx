"use client"

import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface GenderSelectionScreenProps {
  selectedGender: "male" | "female" | null
  onGenderSelect: (gender: "male" | "female") => void
  onNext: () => void
  onBack: () => void
}

export function GenderSelectionScreen({ selectedGender, onGenderSelect, onNext, onBack }: GenderSelectionScreenProps) {
  return (
    <div className="min-h-screen bg-gray-800 flex flex-col justify-between px-8 py-12">
      {/* Header */}
      <div className="flex-1 flex flex-col items-center justify-center">
        <div className="text-center mb-16">
          <h1 className="text-white text-2xl font-bold mb-4">
            Tell us about
            <br />
            yourself!
          </h1>
          <p className="text-gray-400 text-sm leading-relaxed">
            To give you a better experience we
            <br />
            need
            <br />
            to know your gender
          </p>
        </div>

        {/* Gender Selection */}
        <div className="space-y-6">
          {/* Male Option */}
          <button
            onClick={() => onGenderSelect("male")}
            className={`w-32 h-32 rounded-full flex flex-col items-center justify-center transition-all ${
              selectedGender === "male" ? "bg-orange-500 scale-105" : "bg-orange-500 hover:bg-orange-600"
            }`}
          >
            {/* Male Icon */}
            <div className="text-black text-3xl font-bold mb-2">♂</div>
            <span className="text-black font-semibold">Male</span>
          </button>

          {/* Female Option */}
          <button
            onClick={() => onGenderSelect("female")}
            className={`w-32 h-32 rounded-full flex flex-col items-center justify-center transition-all ${
              selectedGender === "female" ? "bg-white scale-105" : "bg-gray-600 hover:bg-gray-500"
            }`}
          >
            {/* Female Icon */}
            <div className={`text-3xl font-bold mb-2 ${selectedGender === "female" ? "text-black" : "text-white"}`}>
              ♀
            </div>
            <span className={`font-semibold ${selectedGender === "female" ? "text-black" : "text-white"}`}>Female</span>
          </button>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between">
        {/* Back Button */}
        <Button
          onClick={onBack}
          variant="ghost"
          className="w-12 h-12 rounded-full bg-gray-600 hover:bg-gray-500 text-white p-0"
        >
          <ChevronLeft className="w-6 h-6" />
        </Button>

        {/* Next Button */}
        <Button
          onClick={onNext}
          disabled={!selectedGender}
          className="bg-orange-500 hover:bg-orange-600 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-semibold py-3 px-8 rounded-full flex items-center gap-2"
        >
          Avanti
          <ChevronRight className="w-5 h-5" />
        </Button>
      </div>
    </div>
  )
}
