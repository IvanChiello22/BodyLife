"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { ArrowLeft, ArrowRight, Ruler } from "lucide-react"

interface HeightSelectionScreenProps {
  selectedHeight: number
  onHeightSelect: (height: number) => void
  onNext: () => void
  onBack: () => void
}

export function HeightSelectionScreen({ selectedHeight, onHeightSelect, onNext, onBack }: HeightSelectionScreenProps) {
  const [height, setHeight] = useState(selectedHeight || 170)

  const handleHeightChange = (value: number[]) => {
    const newHeight = value[0]
    setHeight(newHeight)
    onHeightSelect(newHeight)
  }

  const getHeightCategory = (height: number) => {
    if (height < 160) return { category: "Basso", color: "text-blue-400" }
    if (height < 175) return { category: "Medio", color: "text-green-400" }
    if (height < 185) return { category: "Alto", color: "text-orange-400" }
    return { category: "Molto Alto", color: "text-red-400" }
  }

  const heightInfo = getHeightCategory(height)

  return (
    <div className="min-h-screen bg-gray-800 text-white flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-gray-700">
        <Button variant="ghost" size="sm" onClick={onBack} className="text-white hover:bg-gray-700">
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h1 className="text-xl font-semibold">Altezza</h1>
        <div className="w-10" />
      </div>

      {/* Content */}
      <div className="flex-1 p-6 flex flex-col justify-center">
        <div className="text-center mb-8">
          <div className="text-4xl mb-4">📏</div>
          <h2 className="text-2xl font-bold mb-2">Quanto sei alto?</h2>
          <p className="text-gray-400">Questa informazione ci aiuta a calcolare il tuo BMI e fabbisogno calorico</p>
        </div>

        <div className="max-w-md mx-auto w-full">
          {/* Height Display */}
          <Card className="bg-gray-700 border-gray-600 mb-8">
            <CardContent className="p-6 text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Ruler className="w-5 h-5 text-orange-500" />
                <span className="text-sm text-gray-400">Altezza Selezionata</span>
              </div>
              <div className="text-4xl font-bold text-orange-500 mb-2">{height} cm</div>
              <div className={`text-sm font-medium ${heightInfo.color}`}>{heightInfo.category}</div>
            </CardContent>
          </Card>

          {/* Height Slider */}
          <div className="mb-8">
            <div className="flex justify-between text-sm text-gray-400 mb-4">
              <span>140 cm</span>
              <span>220 cm</span>
            </div>

            <Slider
              value={[height]}
              onValueChange={handleHeightChange}
              max={220}
              min={140}
              step={1}
              className="w-full"
            />

            {/* Ruler marks */}
            <div className="flex justify-between text-xs text-gray-500 mt-2">
              <span>|</span>
              <span>|</span>
              <span>|</span>
              <span>|</span>
              <span>|</span>
              <span>|</span>
              <span>|</span>
              <span>|</span>
              <span>|</span>
            </div>
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>140</span>
              <span>150</span>
              <span>160</span>
              <span>170</span>
              <span>180</span>
              <span>190</span>
              <span>200</span>
              <span>210</span>
              <span>220</span>
            </div>
          </div>

          {/* Quick Selection Buttons */}
          <div className="grid grid-cols-4 gap-2 mb-8">
            {[160, 170, 180, 190].map((quickHeight) => (
              <Button
                key={quickHeight}
                variant={height === quickHeight ? "default" : "outline"}
                size="sm"
                onClick={() => handleHeightChange([quickHeight])}
                className={
                  height === quickHeight
                    ? "bg-orange-500 hover:bg-orange-600"
                    : "border-gray-600 text-gray-300 hover:bg-gray-700"
                }
              >
                {quickHeight}
              </Button>
            ))}
          </div>

          {/* Height Info */}
          <Card className="bg-gray-700/50 border-gray-600">
            <CardContent className="p-4">
              <div className="text-center">
                <h3 className="font-medium text-white mb-2">Informazioni Altezza</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <div className="text-gray-400">Categoria</div>
                    <div className={`font-medium ${heightInfo.color}`}>{heightInfo.category}</div>
                  </div>
                  <div>
                    <div className="text-gray-400">In piedi</div>
                    <div className="text-white font-medium">
                      {Math.floor(height / 30.48)}'{Math.round((height % 30.48) / 2.54)}"
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Footer */}
      <div className="p-6 border-t border-gray-700">
        <Button onClick={onNext} className="w-full bg-orange-500 hover:bg-orange-600">
          Continua
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  )
}
