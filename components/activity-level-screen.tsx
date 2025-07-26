"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, ArrowRight } from "lucide-react"

interface ActivityLevelScreenProps {
  selectedLevel: string | null
  onLevelSelect: (level: string) => void
  onNext: () => void
  onBack: () => void
}

const activityLevels = [
  {
    id: "sedentary",
    title: "Sedentario",
    description: "Poco o nessun esercizio",
    details: "Lavoro da scrivania, nessuna attività fisica regolare",
    icon: "🪑",
    color: "bg-red-500/20 border-red-500/30",
    textColor: "text-red-400",
  },
  {
    id: "light",
    title: "Leggero",
    description: "Esercizio leggero 1-3 giorni/settimana",
    details: "Camminate occasionali, attività fisica sporadica",
    icon: "🚶",
    color: "bg-yellow-500/20 border-yellow-500/30",
    textColor: "text-yellow-400",
  },
  {
    id: "moderate",
    title: "Moderato",
    description: "Esercizio moderato 3-5 giorni/settimana",
    details: "Allenamenti regolari, sport occasionali",
    icon: "🏃",
    color: "bg-blue-500/20 border-blue-500/30",
    textColor: "text-blue-400",
  },
  {
    id: "active",
    title: "Attivo",
    description: "Esercizio intenso 6-7 giorni/settimana",
    details: "Allenamenti quotidiani, sport competitivi",
    icon: "💪",
    color: "bg-green-500/20 border-green-500/30",
    textColor: "text-green-400",
  },
  {
    id: "very-active",
    title: "Molto Attivo",
    description: "Esercizio molto intenso, lavoro fisico",
    details: "Atleta professionista, lavoro fisicamente impegnativo",
    icon: "🏆",
    color: "bg-purple-500/20 border-purple-500/30",
    textColor: "text-purple-400",
  },
]

export function ActivityLevelScreen({ selectedLevel, onLevelSelect, onNext, onBack }: ActivityLevelScreenProps) {
  return (
    <div className="min-h-screen bg-gray-800 text-white flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-gray-700">
        <Button variant="ghost" size="sm" onClick={onBack} className="text-white hover:bg-gray-700">
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h1 className="text-xl font-semibold">Livello di Attività</h1>
        <div className="w-10" />
      </div>

      {/* Content */}
      <div className="flex-1 p-6">
        <div className="text-center mb-8">
          <div className="text-4xl mb-4">⚡</div>
          <h2 className="text-2xl font-bold mb-2">Quanto sei attivo?</h2>
          <p className="text-gray-400">Questo ci aiuta a calcolare il tuo fabbisogno calorico giornaliero</p>
        </div>

        <div className="space-y-4 max-w-md mx-auto">
          {activityLevels.map((level) => (
            <Card
              key={level.id}
              className={`cursor-pointer transition-all duration-200 border-2 ${
                selectedLevel === level.id
                  ? level.color + " scale-105"
                  : "bg-gray-700 border-gray-600 hover:border-gray-500"
              }`}
              onClick={() => onLevelSelect(level.id)}
            >
              <CardContent className="p-4">
                <div className="flex items-start gap-4">
                  <div className="text-3xl">{level.icon}</div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className={`font-semibold ${selectedLevel === level.id ? level.textColor : "text-white"}`}>
                        {level.title}
                      </h3>
                      {selectedLevel === level.id && (
                        <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse" />
                      )}
                    </div>
                    <p className="text-sm text-gray-300 mb-1">{level.description}</p>
                    <p className="text-xs text-gray-400">{level.details}</p>
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
          disabled={!selectedLevel}
          className="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-gray-600 disabled:text-gray-400"
        >
          Continua
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  )
}
