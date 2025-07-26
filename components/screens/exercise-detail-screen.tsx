"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Play, Clock, Target, Zap } from "lucide-react"
import { useWorkoutsData } from "@/hooks/use-workouts-data"
import { Input } from "@/components/ui/input"
import { Minus, Plus, Check } from "lucide-react"

interface ExerciseDetailScreenProps {
  exerciseId: string
  workoutType: string
  onBack: () => void
  onWatchVideo: () => void
}

export function ExerciseDetailScreen({ exerciseId, workoutType, onBack, onWatchVideo }: ExerciseDetailScreenProps) {
  const { currentWorkout, getOrCreateWorkout, startExercise, completeSet, updateSet, addSet, removeSet, exercises } =
    useWorkoutsData()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const initializeWorkout = async () => {
      setIsLoading(true)
      try {
        await getOrCreateWorkout(workoutType)
      } catch (error) {
        console.error("Error initializing workout:", error)
      } finally {
        setIsLoading(false)
      }
    }

    initializeWorkout()
  }, [workoutType, getOrCreateWorkout])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-800 text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
          <p className="text-gray-400">Caricamento esercizio...</p>
        </div>
      </div>
    )
  }

  const exercise = exercises.find((ex) => ex.id === exerciseId)
  const workoutExercise = currentWorkout?.exercises.find((ex) => ex.exerciseId === exerciseId)

  if (!exercise) {
    return (
      <div className="min-h-screen bg-gray-800 text-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-400 mb-4">Esercizio non trovato</p>
          <Button onClick={onBack} className="bg-orange-500 hover:bg-orange-600">
            Torna indietro
          </Button>
        </div>
      </div>
    )
  }

  const handleStartExercise = () => {
    startExercise(exerciseId)
  }

  const handleUpdateSet = (setIndex: number, weight: number, reps: number) => {
    updateSet(exerciseId, setIndex, weight, reps)
  }

  const handleCompleteSet = (setIndex: number, weight: number, reps: number) => {
    const currentSet = workoutExercise?.sets[setIndex]
    if (currentSet?.completed) {
      // Se la serie è già completata, aggiorna solo i valori
      updateSet(exerciseId, setIndex, weight, reps)
    } else {
      // Se non è completata, completa la serie
      completeSet(exerciseId, setIndex, weight, reps)
    }
  }

  return (
    <div className="min-h-screen bg-gray-800 text-white">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-gray-700">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" onClick={onBack} className="text-white hover:bg-gray-700">
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-xl font-semibold">{exercise.name}</h1>
        </div>
        <Button onClick={onWatchVideo} className="bg-orange-500 hover:bg-orange-600 text-white">
          <Play className="w-4 h-4 mr-2" />
          Video
        </Button>
      </div>

      {/* Exercise Info */}
      <div className="p-6">
        <Card className="bg-gray-700 border-gray-600 mb-6">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-white">{exercise.name}</CardTitle>
              <div className="flex gap-2">
                <Badge variant="secondary" className="bg-orange-500/20 text-orange-400">
                  {exercise.category}
                </Badge>
                <Badge variant="secondary" className="bg-blue-500/20 text-blue-400">
                  {exercise.difficulty}
                </Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-gray-300 mb-4">{exercise.description}</p>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="flex items-center gap-2 text-gray-400">
                <Target className="w-4 h-4" />
                <span className="text-sm">Muscoli: {exercise.targetMuscles.join(", ")}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-400">
                <Clock className="w-4 h-4" />
                <span className="text-sm">Durata: {exercise.duration}</span>
              </div>
            </div>

            {exercise.equipment && exercise.equipment.length > 0 && (
              <div className="flex items-center gap-2 text-gray-400 mb-4">
                <Zap className="w-4 h-4" />
                <span className="text-sm">Attrezzatura: {exercise.equipment.join(", ")}</span>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Sets and Reps */}
        <Card className="bg-gray-700 border-gray-600">
          <CardHeader>
            <CardTitle className="text-white">Serie e Ripetizioni</CardTitle>
          </CardHeader>
          <CardContent>
            {workoutExercise ? (
              <div className="space-y-4">
                {workoutExercise.sets.map((set, index) => (
                  <div key={index} className="p-4 bg-gray-600 rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-white font-medium">Serie {index + 1}</span>
                      <div
                        className={`w-6 h-6 rounded-full flex items-center justify-center ${
                          set.completed ? "bg-green-500" : "bg-gray-500"
                        }`}
                      >
                        {set.completed && <Check className="w-4 h-4 text-white" />}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      {/* Weight Input */}
                      <div className="space-y-2">
                        <label className="text-sm text-gray-400">Peso (kg)</label>
                        <div className="flex items-center gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            className="w-8 h-8 p-0 border-gray-500 text-gray-300 bg-transparent"
                            onClick={() => {
                              const newWeight = Math.max(0, (set.weight || 0) - 2.5)
                              handleUpdateSet(index, newWeight, set.reps || 0)
                            }}
                          >
                            <Minus className="w-4 h-4" />
                          </Button>
                          <Input
                            type="number"
                            value={set.weight || 0}
                            onChange={(e) => {
                              const newWeight = Number.parseFloat(e.target.value) || 0
                              handleUpdateSet(index, newWeight, set.reps || 0)
                            }}
                            className="text-center bg-gray-700 border-gray-500 text-white"
                            min="0"
                            step="0.5"
                          />
                          <Button
                            size="sm"
                            variant="outline"
                            className="w-8 h-8 p-0 border-gray-500 text-gray-300 bg-transparent"
                            onClick={() => {
                              const newWeight = (set.weight || 0) + 2.5
                              handleUpdateSet(index, newWeight, set.reps || 0)
                            }}
                          >
                            <Plus className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>

                      {/* Reps Input */}
                      <div className="space-y-2">
                        <label className="text-sm text-gray-400">Ripetizioni</label>
                        <div className="flex items-center gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            className="w-8 h-8 p-0 border-gray-500 text-gray-300 bg-transparent"
                            onClick={() => {
                              const newReps = Math.max(0, (set.reps || 0) - 1)
                              handleUpdateSet(index, set.weight || 0, newReps)
                            }}
                          >
                            <Minus className="w-4 h-4" />
                          </Button>
                          <Input
                            type="number"
                            value={set.reps || 0}
                            onChange={(e) => {
                              const newReps = Number.parseInt(e.target.value) || 0
                              handleUpdateSet(index, set.weight || 0, newReps)
                            }}
                            className="text-center bg-gray-700 border-gray-500 text-white"
                            min="0"
                          />
                          <Button
                            size="sm"
                            variant="outline"
                            className="w-8 h-8 p-0 border-gray-500 text-gray-300 bg-transparent"
                            onClick={() => {
                              const newReps = (set.reps || 0) + 1
                              handleUpdateSet(index, set.weight || 0, newReps)
                            }}
                          >
                            <Plus className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>

                    {/* Complete Set Button */}
                    <Button
                      className={`w-full mt-3 ${
                        set.completed ? "bg-green-600 hover:bg-green-700" : "bg-orange-500 hover:bg-orange-600"
                      }`}
                      onClick={() => {
                        if (!set.completed) {
                          const updatedSet = { ...set, completed: true }
                          handleCompleteSet(index, updatedSet.weight, updatedSet.reps)
                        }
                      }}
                      disabled={set.completed}
                    >
                      {set.completed ? "Serie Completata" : "Completa Serie"}
                    </Button>
                  </div>
                ))}

                {/* Add Set Button */}
                <Button
                  variant="outline"
                  className="w-full border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white bg-transparent"
                  onClick={() => addSet(exerciseId)}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Aggiungi Serie
                </Button>
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-400 mb-4">Inizia l'esercizio per tracciare le tue serie</p>
                <Button onClick={handleStartExercise} className="bg-orange-500 hover:bg-orange-600">
                  Inizia Esercizio
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Instructions */}
        {exercise.instructions && exercise.instructions.length > 0 && (
          <Card className="bg-gray-700 border-gray-600 mt-6">
            <CardHeader>
              <CardTitle className="text-white">Istruzioni</CardTitle>
            </CardHeader>
            <CardContent>
              <ol className="space-y-2">
                {exercise.instructions.map((instruction, index) => (
                  <li key={index} className="text-gray-300 flex gap-3">
                    <span className="text-orange-500 font-bold min-w-[20px]">{index + 1}.</span>
                    <span>{instruction}</span>
                  </li>
                ))}
              </ol>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
