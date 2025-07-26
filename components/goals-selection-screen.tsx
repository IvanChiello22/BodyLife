"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, ArrowRight } from "lucide-react"

interface GoalsSelectionScreenProps {
  selectedGoal: string | null
  onGoalSelect: (goal: string) => void
  onNext: () => void
  onBack: () => void
}

const goals = [
  {
    id: "lose-weight",
    title: "Perdere Peso",
    description: "Ridurre il grasso corporeo",
    details: "Deficit calorico, cardio e allenamento di resistenza",
    icon: "📉",
    color: "bg-red-500/20 border-red-500/30",
    textColor: "text-red-400",
    bgIcon: "bg-red-500",
  },
  {
    id: "maintain-weight",
    title: "Mantenere Peso",
    description: "Mantenere il peso attuale",
    details: "Equilibrio calorico, focus su composizione corporea",
    icon: "⚖️",
    color: "bg-blue-500/20 border-blue-500/30",
    textColor: "text-blue-400",
    bgIcon: "bg-blue-500",
  },
  {
    id: "gain-weight",
    title: "Aumentare Peso",
    description: "Costruire massa muscolare",
    details: "Surplus calorico, allenamento di forza intenso",
    icon: "📈",
    color: "bg-green-500/20 border-green-500/30",
    textColor: "text-green-400",
    bgIcon: "bg-green-500",
  },
  {
    id: "build-muscle",
    title: "Costruire Muscoli",
    description: "Aumentare la massa magra",
    details: "Proteine elevate, allenamento di resistenza",
    icon: "💪",
    color: "bg-purple-500/20 border-purple-500/30",
    textColor: "text-purple-400",
    bgIcon: "bg-purple-500",
  },
  {
    id: "improve-fitness",
    title: "Migliorare Fitness",
    description: "Aumentare resistenza e forza",
    details: "Allenamento cardiovascolare e di forza combinati",
    icon: "🏃‍♂️",
    color: "bg-orange-500/20 border-orange-500/30",
    textColor: "text-orange-400",
    bgIcon: "bg-orange-500",
  },
]

export function GoalsSelectionScreen({ selectedGoal, onGoalSelect, onNext, onBack }: GoalsSelectionScreenProps) {
  return (
    <div className="min-h-screen bg-gray-800 text-white flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-gray-700">
        <Button variant="ghost" size="sm" onClick={onBack} className="text-white hover:bg-gray-700">
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h1 className="text-xl font-semibold">I Tuoi Obiettivi</h1>
        <div className="w-10" />
      </div>

      {/* Content */}
      <div className="flex-1 p-6">
        <div className="text-center mb-8">
          <div className="text-4xl mb-4">🎯</div>
          <h2 className="text-2xl font-bold mb-2">Qual è il tuo obiettivo?</h2>
          <p className="text-gray-400">Scegli il tuo obiettivo principale per personalizzare il tuo piano</p>
        </div>

        <div className="space-y-4 max-w-md mx-auto">
          {goals.map((goal) => (
            <Card
              key={goal.id}
              className={`cursor-pointer transition-all duration-200 border-2 ${
                selectedGoal === goal.id
                  ? goal.color + " scale-105"
                  : "bg-gray-700 border-gray-600 hover:border-gray-500"
              }`}
              onClick={() => onGoalSelect(goal.id)}
            >
              <CardContent className="p-4">
                <div className="flex items-start gap-4">
                  <div
                    className={`w-12 h-12 ${goal.bgIcon} rounded-full flex items-center justify-center text-white text-xl`}
                  >
                    {goal.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className={`font-semibold ${selectedGoal === goal.id ? goal.textColor : "text-white"}`}>
                        {goal.title}
                      </h3>
                      {selectedGoal === goal.id && <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse" />}
                    </div>
                    <p className="text-sm text-gray-300 mb-2">{goal.description}</p>
                    <p className="text-xs text-gray-400">{goal.details}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="p-6 border-t border-gray-700">
        <Button
          onClick={onNext}
          disabled={!selectedGoal}
          className="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-gray-600 disabled:text-gray-400"
        >
          Continua
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  )
}
