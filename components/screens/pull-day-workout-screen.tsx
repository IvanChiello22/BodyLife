"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ChevronLeft, ChevronDown, ChevronUp, Play, Edit2, Home, FileText, Dumbbell, User } from "lucide-react"

interface PullDayWorkoutScreenProps {
  onBack: () => void
}

interface Exercise {
  id: string
  name: string
  hasIllustration: boolean
  sets: number
  reps: number
  weight: number
}

export function PullDayWorkoutScreen({ onBack }: PullDayWorkoutScreenProps) {
  const [exercisesExpanded, setExercisesExpanded] = useState(true)
  const [modifyExpanded, setModifyExpanded] = useState(false)
  const [exercises, setExercises] = useState<Exercise[]>([
    { id: "lat-pulldown", name: "Lat Pulldown", hasIllustration: true, sets: 3, reps: 12, weight: 50 },
    { id: "barbell-rows", name: "Barbell Rows", hasIllustration: false, sets: 4, reps: 10, weight: 60 },
    { id: "face-pulls", name: "Face Pulls", hasIllustration: false, sets: 3, reps: 15, weight: 25 },
    { id: "bicep-curls", name: "Bicep Curls", hasIllustration: true, sets: 3, reps: 12, weight: 15 },
  ])

  const updateExercise = (id: string, field: keyof Exercise, value: number) => {
    setExercises((prev) => prev.map((exercise) => (exercise.id === id ? { ...exercise, [field]: value } : exercise)))
  }

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

      {/* Exercises Section */}
      <div className="px-6 mb-6">
        <Button
          variant="ghost"
          className="w-full flex items-center justify-between p-4 bg-gray-700 hover:bg-gray-600 rounded-lg text-left mb-4"
          onClick={() => setExercisesExpanded(!exercisesExpanded)}
        >
          <span className="text-white text-lg font-medium">Esercizi workout</span>
          {exercisesExpanded ? (
            <ChevronUp className="w-5 h-5 text-orange-500" />
          ) : (
            <ChevronDown className="w-5 h-5 text-orange-500" />
          )}
        </Button>

        {/* Exercise List */}
        {exercisesExpanded && (
          <div className="space-y-4">
            {exercises.map((exercise) => (
              <Card key={exercise.id} className="bg-gray-700 border-gray-600 hover:bg-gray-600 transition-colors">
                <CardContent className="p-0">
                  <div className="flex items-center justify-between p-4">
                    <div className="flex items-center gap-4">
                      {/* Exercise Illustration */}
                      {exercise.hasIllustration && (
                        <div className="w-12 h-12 bg-gray-600 rounded-lg flex items-center justify-center">
                          {exercise.id === "lat-pulldown" && (
                            <div className="w-10 h-10 bg-blue-500 rounded flex items-center justify-center">
                              <div className="text-white text-xs">💪</div>
                            </div>
                          )}
                          {exercise.id === "bicep-curls" && (
                            <div className="w-10 h-10 bg-green-500 rounded flex items-center justify-center">
                              <div className="text-white text-xs">💪</div>
                            </div>
                          )}
                        </div>
                      )}

                      {/* Exercise Name */}
                      <span className="text-white text-lg font-medium">{exercise.name}</span>
                    </div>

                    {/* Play Button */}
                    <Button className="w-12 h-12 rounded-full bg-orange-500 hover:bg-orange-600 text-white p-0">
                      <Play className="w-5 h-5 fill-current" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Modify Section */}
      <div className="px-6 mb-8">
        <Button
          variant="ghost"
          className="w-full flex items-center justify-between p-4 bg-gray-700 hover:bg-gray-600 rounded-lg text-left mb-4"
          onClick={() => setModifyExpanded(!modifyExpanded)}
        >
          <span className="text-white text-lg font-medium">Visualizza/Modifica</span>
          <Edit2 className="w-5 h-5 text-orange-500" />
        </Button>

        {/* Exercise Modification Cards */}
        {modifyExpanded && (
          <div className="space-y-4">
            {exercises.map((exercise) => (
              <Card key={`modify-${exercise.id}`} className="bg-gray-700 border-gray-600">
                <CardContent className="p-4">
                  <h3 className="text-white font-medium mb-4">{exercise.name}</h3>

                  <div className="grid grid-cols-3 gap-4">
                    {/* Sets */}
                    <div className="text-center">
                      <label className="text-gray-400 text-sm mb-2 block">Serie</label>
                      <div className="flex items-center justify-center gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="w-8 h-8 p-0 bg-orange-500 hover:bg-orange-600 text-white rounded-full"
                          onClick={() => updateExercise(exercise.id, "sets", Math.max(1, exercise.sets - 1))}
                        >
                          -
                        </Button>
                        <Input
                          type="number"
                          value={exercise.sets}
                          onChange={(e) => updateExercise(exercise.id, "sets", Number.parseInt(e.target.value) || 1)}
                          className="w-16 text-center bg-gray-600 border-gray-500 text-white"
                          min="1"
                        />
                        <Button
                          variant="ghost"
                          size="sm"
                          className="w-8 h-8 p-0 bg-orange-500 hover:bg-orange-600 text-white rounded-full"
                          onClick={() => updateExercise(exercise.id, "sets", exercise.sets + 1)}
                        >
                          +
                        </Button>
                      </div>
                    </div>

                    {/* Reps */}
                    <div className="text-center">
                      <label className="text-gray-400 text-sm mb-2 block">Rip.</label>
                      <div className="flex items-center justify-center gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="w-8 h-8 p-0 bg-orange-500 hover:bg-orange-600 text-white rounded-full"
                          onClick={() => updateExercise(exercise.id, "reps", Math.max(1, exercise.reps - 1))}
                        >
                          -
                        </Button>
                        <Input
                          type="number"
                          value={exercise.reps}
                          onChange={(e) => updateExercise(exercise.id, "reps", Number.parseInt(e.target.value) || 1)}
                          className="w-16 text-center bg-gray-600 border-gray-500 text-white"
                          min="1"
                        />
                        <Button
                          variant="ghost"
                          size="sm"
                          className="w-8 h-8 p-0 bg-orange-500 hover:bg-orange-600 text-white rounded-full"
                          onClick={() => updateExercise(exercise.id, "reps", exercise.reps + 1)}
                        >
                          +
                        </Button>
                      </div>
                    </div>

                    {/* Weight */}
                    <div className="text-center">
                      <label className="text-gray-400 text-sm mb-2 block">Kg</label>
                      <div className="flex items-center justify-center gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="w-8 h-8 p-0 bg-orange-500 hover:bg-orange-600 text-white rounded-full"
                          onClick={() => updateExercise(exercise.id, "weight", Math.max(0, exercise.weight - 2.5))}
                        >
                          -
                        </Button>
                        <Input
                          type="number"
                          value={exercise.weight}
                          onChange={(e) =>
                            updateExercise(exercise.id, "weight", Number.parseFloat(e.target.value) || 0)
                          }
                          className="w-16 text-center bg-gray-600 border-gray-500 text-white"
                          min="0"
                          step="2.5"
                        />
                        <Button
                          variant="ghost"
                          size="sm"
                          className="w-8 h-8 p-0 bg-orange-500 hover:bg-orange-600 text-white rounded-full"
                          onClick={() => updateExercise(exercise.id, "weight", exercise.weight + 2.5)}
                        >
                          +
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Exercise Summary */}
                  <div className="mt-4 p-3 bg-gray-600 rounded-lg">
                    <p className="text-orange-500 text-center font-medium">
                      {exercise.sets} serie × {exercise.reps} ripetizioni @ {exercise.weight}kg
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-gray-700 border-t border-gray-600">
        <div className="flex items-center justify-around py-3">
          <Button variant="ghost" className="flex flex-col items-center gap-1 text-gray-400">
            <Home className="w-6 h-6" />
          </Button>
          <Button variant="ghost" className="flex flex-col items-center gap-1 text-gray-400">
            <FileText className="w-6 h-6" />
          </Button>
          <Button variant="ghost" className="flex flex-col items-center gap-1 text-white">
            <Dumbbell className="w-6 h-6" />
          </Button>
          <Button variant="ghost" className="flex flex-col items-center gap-1 text-gray-400">
            <User className="w-6 h-6" />
          </Button>
        </div>
      </div>
    </div>
  )
}
