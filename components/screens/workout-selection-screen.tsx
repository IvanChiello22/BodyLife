"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronLeft, Dumbbell, Play, Home, Apple } from "lucide-react"

interface WorkoutSelectionScreenProps {
  onBack: () => void
  onWorkoutSelect: (workoutType: string) => void
}

export function WorkoutSelectionScreen({ onBack, onWorkoutSelect }: WorkoutSelectionScreenProps) {
  const workouts = [
    {
      id: "push-day",
      name: "Push Day",
      description: "Petto, Spalle, Tricipiti",
      hasIllustration: true,
      color: "bg-blue-500",
      icon: "🏋️",
    },
    {
      id: "leg-day",
      name: "Leg Day",
      description: "Quadricipiti, Glutei, Polpacci",
      hasIllustration: true,
      color: "bg-green-500",
      icon: "🦵",
    },
    {
      id: "pull-day",
      name: "Pull Day",
      description: "Schiena, Bicipiti, Dorsali",
      hasIllustration: true,
      color: "bg-purple-500",
      icon: "💪",
    },
  ]

  return (
    <div className="min-h-screen bg-gray-800 text-white">
      {/* Header */}
      <div className="flex items-center justify-between p-6 pb-4">
        <Button variant="ghost" className="w-8 h-8 p-0 text-white" onClick={onBack}>
          <ChevronLeft className="w-6 h-6" />
        </Button>
        <h1 className="text-xl font-semibold">Friday, 16</h1>
        <div className="w-8 h-8" /> {/* Spacer */}
      </div>

      {/* Workout Selection Header */}
      <div className="px-6 mb-8">
        <div className="flex items-center gap-3 p-4 bg-gray-700 rounded-lg">
          <span className="text-white text-lg font-medium">Seleziona workout</span>
          <Dumbbell className="w-6 h-6 text-white ml-auto" />
        </div>
      </div>

      {/* Workout Options */}
      <div className="px-6 space-y-4 pb-32">
        {workouts.map((workout) => (
          <Card key={workout.id} className="bg-gray-700 border-gray-600 hover:bg-gray-600 transition-colors">
            <CardContent className="p-0">
              <div className="flex items-center justify-between p-4">
                <div className="flex items-center gap-4">
                  {/* Workout Illustration */}
                  <div className="w-12 h-12 bg-gray-600 rounded-lg flex items-center justify-center">
                    <div className={`w-10 h-10 ${workout.color} rounded flex items-center justify-center`}>
                      <div className="text-white text-xs">{workout.icon}</div>
                    </div>
                  </div>

                  {/* Workout Info */}
                  <div>
                    <span className="text-white text-lg font-medium block">{workout.name}</span>
                    <span className="text-gray-400 text-sm">{workout.description}</span>
                  </div>
                </div>

                {/* Play Button */}
                <Button
                  className="w-12 h-12 rounded-full bg-orange-500 hover:bg-orange-600 text-white p-0"
                  onClick={() => onWorkoutSelect(workout.id)}
                >
                  <Play className="w-5 h-5 fill-current" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-gray-700 border-t border-gray-600">
        <div className="flex items-center justify-around py-3">
          <Button variant="ghost" className="flex flex-col items-center gap-1 text-gray-400" onClick={onBack}>
            <Home className="w-6 h-6" />
          </Button>
          <Button variant="ghost" className="flex flex-col items-center gap-1 text-gray-400">
            <Apple className="w-6 h-6" />
          </Button>
          <Button variant="ghost" className="flex flex-col items-center gap-1 text-white">
            <Dumbbell className="w-6 h-6" />
          </Button>
        </div>
      </div>
    </div>
  )
}
