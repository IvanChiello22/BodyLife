"use client"

import type React from "react"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface WeightSelectionScreenProps {
  selectedWeight: number
  onWeightSelect: (weight: number) => void
  onNext: () => void
  onBack: () => void
}

export function WeightSelectionScreen({ selectedWeight, onWeightSelect, onNext, onBack }: WeightSelectionScreenProps) {
  const minWeight = 30
  const maxWeight = 150

  const handleSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const weight = Number.parseInt(event.target.value)
    onWeightSelect(weight)
  }

  // Generate ruler marks
  const generateRulerMarks = () => {
    const marks = []
    const totalMarks = 50
    const centerIndex = Math.floor(totalMarks / 2)

    for (let i = 0; i < totalMarks; i++) {
      const isCenter = i === centerIndex
      const isMajor = i % 5 === 0
      const height = isCenter ? "h-8" : isMajor ? "h-6" : "h-4"
      const color = isCenter ? "bg-red-500" : "bg-red-400"

      marks.push(<div key={i} className={`w-0.5 ${height} ${color} mx-0.5`} />)
    }
    return marks
  }

  return (
    <div className="min-h-screen bg-gray-800 flex flex-col justify-between px-8 py-12">
      {/* Header */}
      <div className="flex-1 flex flex-col items-center justify-center">
        <div className="text-center mb-16">
          <h1 className="text-white text-2xl font-bold mb-4">What's your weight?</h1>
          <p className="text-gray-400 text-sm">You can always change this later</p>
        </div>

        {/* Weight Display */}
        <div className="text-center mb-12">
          <div className="flex items-baseline justify-center">
            <span className="text-6xl font-bold text-white">{selectedWeight}</span>
            <span className="text-xl text-gray-400 ml-2">kg</span>
          </div>
        </div>

        {/* Weight Slider with Ruler */}
        <div className="w-full max-w-sm">
          {/* Ruler Marks */}
          <div className="flex items-end justify-center mb-4 px-4">{generateRulerMarks()}</div>

          {/* Slider */}
          <div className="relative">
            <input
              type="range"
              min={minWeight}
              max={maxWeight}
              value={selectedWeight}
              onChange={handleSliderChange}
              className="w-full h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer slider-thumb"
              style={{
                background: `linear-gradient(to right, #ef4444 0%, #ef4444 ${((selectedWeight - minWeight) / (maxWeight - minWeight)) * 100}%, #4b5563 ${((selectedWeight - minWeight) / (maxWeight - minWeight)) * 100}%, #4b5563 100%)`,
              }}
            />

            {/* Center indicator line */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-0.5 h-2 bg-red-500 pointer-events-none"></div>
          </div>

          {/* Weight range labels */}
          <div className="flex justify-between text-xs text-gray-500 mt-2">
            <span>{minWeight}kg</span>
            <span>{maxWeight}kg</span>
          </div>
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
          className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-8 rounded-full flex items-center gap-2"
        >
          Avanti
          <ChevronRight className="w-5 h-5" />
        </Button>
      </div>

      <style jsx>{`
        .slider-thumb::-webkit-slider-thumb {
          appearance: none;
          height: 24px;
          width: 24px;
          border-radius: 50%;
          background: #ef4444;
          cursor: pointer;
          border: 3px solid #ffffff;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
        }

        .slider-thumb::-moz-range-thumb {
          height: 24px;
          width: 24px;
          border-radius: 50%;
          background: #ef4444;
          cursor: pointer;
          border: 3px solid #ffffff;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
        }
      `}</style>
    </div>
  )
}
