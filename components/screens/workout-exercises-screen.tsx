"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronLeft, Play, Home, FileText, Dumbbell, User } from "lucide-react"

interface Exercise {
  id: string
  name: string
  targetMuscle: string
  hasIllustration: boolean
  color: string
  icon: string
}

interface WorkoutExercisesScreenProps {
  workoutType: string
  onBack: () => void
  onExerciseSelect: (exerciseId: string) => void
}

export function WorkoutExercisesScreen({ workoutType, onBack, onExerciseSelect }: WorkoutExercisesScreenProps) {
  const getWorkoutData = () => {
    switch (workoutType) {
      case "push-day":
        return {
          title: "Push Day",
          subtitle: "Petto, Spalle, Tricipiti",
          exercises: [
            {
              id: "bench-press",
              name: "Bench Press",
              targetMuscle: "Petto",
              hasIllustration: true,
              color: "bg-blue-500",
              icon: "💪",
            },
            {
              id: "shoulder-press",
              name: "Shoulder Press",
              targetMuscle: "Spalle",
              hasIllustration: true,
              color: "bg-blue-400",
              icon: "🏋️",
            },
            {
              id: "tricep-dips",
              name: "Tricep Dips",
              targetMuscle: "Tricipiti",
              hasIllustration: true,
              color: "bg-blue-600",
              icon: "💪",
            },
            {
              id: "push-ups",
              name: "Push Ups",
              targetMuscle: "Petto",
              hasIllustration: true,
              color: "bg-blue-500",
              icon: "💥",
            },
            {
              id: "incline-bench-press",
              name: "Incline Bench Press",
              targetMuscle: "Petto Alto",
              hasIllustration: true,
              color: "bg-blue-300",
              icon: "💪",
            },
            {
              id: "lateral-raises",
              name: "Lateral Raises",
              targetMuscle: "Spalle",
              hasIllustration: true,
              color: "bg-blue-400",
              icon: "🔥",
            },
            {
              id: "overhead-press",
              name: "Overhead Press",
              targetMuscle: "Spalle",
              hasIllustration: true,
              color: "bg-blue-600",
              icon: "🏋️",
            },
            {
              id: "tricep-extensions",
              name: "Tricep Extensions",
              targetMuscle: "Tricipiti",
              hasIllustration: true,
              color: "bg-blue-700",
              icon: "💪",
            },
          ],
        }
      case "leg-day":
        return {
          title: "Leg Day",
          subtitle: "Quadricipiti, Glutei, Polpacci",
          exercises: [
            {
              id: "squat",
              name: "Squat",
              targetMuscle: "Quadricipiti",
              hasIllustration: true,
              color: "bg-green-500",
              icon: "🦵",
            },
            {
              id: "leg-press",
              name: "Leg Press",
              targetMuscle: "Quadricipiti",
              hasIllustration: true,
              color: "bg-green-400",
              icon: "🦵",
            },
            {
              id: "lunges",
              name: "Lunges",
              targetMuscle: "Glutei",
              hasIllustration: true,
              color: "bg-green-600",
              icon: "🚶",
            },
            {
              id: "calf-raises",
              name: "Calf Raises",
              targetMuscle: "Polpacci",
              hasIllustration: true,
              color: "bg-green-300",
              icon: "🦵",
            },
            {
              id: "romanian-deadlift",
              name: "Romanian Deadlift",
              targetMuscle: "Femorali",
              hasIllustration: true,
              color: "bg-green-700",
              icon: "🏋️",
            },
            {
              id: "leg-curls",
              name: "Leg Curls",
              targetMuscle: "Femorali",
              hasIllustration: true,
              color: "bg-green-600",
              icon: "🦵",
            },
            {
              id: "bulgarian-split-squat",
              name: "Bulgarian Split Squat",
              targetMuscle: "Glutei",
              hasIllustration: true,
              color: "bg-green-500",
              icon: "🚶",
            },
            {
              id: "hip-thrusts",
              name: "Hip Thrusts",
              targetMuscle: "Glutei",
              hasIllustration: true,
              color: "bg-green-400",
              icon: "🔥",
            },
          ],
        }
      case "pull-day":
        return {
          title: "Pull Day",
          subtitle: "Schiena, Bicipiti, Dorsali",
          exercises: [
            {
              id: "lat-pulldown",
              name: "Lat Pulldown",
              targetMuscle: "Dorsali",
              hasIllustration: true,
              color: "bg-purple-500",
              icon: "💪",
            },
            {
              id: "barbell-rows",
              name: "Barbell Rows",
              targetMuscle: "Schiena",
              hasIllustration: true,
              color: "bg-purple-400",
              icon: "🏋️",
            },
            {
              id: "face-pulls",
              name: "Face Pulls",
              targetMuscle: "Spalle Post.",
              hasIllustration: true,
              color: "bg-purple-600",
              icon: "💪",
            },
            {
              id: "bicep-curls",
              name: "Bicep Curls",
              targetMuscle: "Bicipiti",
              hasIllustration: true,
              color: "bg-purple-300",
              icon: "💪",
            },
            {
              id: "pull-ups",
              name: "Pull-ups",
              targetMuscle: "Dorsali",
              hasIllustration: true,
              color: "bg-purple-700",
              icon: "🔥",
            },
            {
              id: "deadlift",
              name: "Deadlift",
              targetMuscle: "Schiena",
              hasIllustration: true,
              color: "bg-purple-800",
              icon: "🏋️",
            },
            {
              id: "hammer-curls",
              name: "Hammer Curls",
              targetMuscle: "Bicipiti",
              hasIllustration: true,
              color: "bg-purple-400",
              icon: "💪",
            },
            {
              id: "cable-rows",
              name: "Cable Rows",
              targetMuscle: "Schiena",
              hasIllustration: true,
              color: "bg-purple-500",
              icon: "🔥",
            },
          ],
        }
      case "full-body":
        return {
          title: "Full Body",
          subtitle: "Allenamento completo",
          exercises: [
            {
              id: "burpees",
              name: "Burpees",
              targetMuscle: "Tutto il corpo",
              hasIllustration: true,
              color: "bg-red-500",
              icon: "🔥",
            },
            {
              id: "mountain-climbers",
              name: "Mountain Climbers",
              targetMuscle: "Core",
              hasIllustration: true,
              color: "bg-red-400",
              icon: "⛰️",
            },
            {
              id: "plank",
              name: "Plank",
              targetMuscle: "Core",
              hasIllustration: true,
              color: "bg-red-600",
              icon: "🔥",
            },
            {
              id: "jumping-jacks",
              name: "Jumping Jacks",
              targetMuscle: "Cardio",
              hasIllustration: true,
              color: "bg-red-300",
              icon: "⚡",
            },
          ],
        }
      default:
        return { title: "Workout", subtitle: "", exercises: [] }
    }
  }

  const workoutData = getWorkoutData()

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

      {/* Workout Header */}
      <div className="px-6 mb-8">
        <div className="p-4 bg-gray-700 rounded-lg">
          <h2 className="text-white text-xl font-bold mb-1">{workoutData.title}</h2>
          <p className="text-orange-500 text-sm">{workoutData.subtitle}</p>
        </div>
      </div>

      {/* Exercises List */}
      <div className="px-6 space-y-4 pb-32">
        {workoutData.exercises.map((exercise) => (
          <Card key={exercise.id} className="bg-gray-700 border-gray-600 hover:bg-gray-600 transition-colors">
            <CardContent className="p-0">
              <div className="flex items-center justify-between p-4">
                <div className="flex items-center gap-4">
                  {/* Exercise Illustration */}
                  {exercise.hasIllustration && (
                    <div className="w-12 h-12 bg-gray-600 rounded-lg flex items-center justify-center">
                      <div className={`w-10 h-10 ${exercise.color} rounded flex items-center justify-center`}>
                        <div className="text-white text-xs">{exercise.icon}</div>
                      </div>
                    </div>
                  )}

                  {/* Exercise Info */}
                  <div>
                    <span className="text-white text-lg font-medium block">{exercise.name}</span>
                    <span className="text-gray-400 text-sm">{exercise.targetMuscle}</span>
                  </div>
                </div>

                {/* Play Button */}
                <Button
                  className="w-12 h-12 rounded-full bg-orange-500 hover:bg-orange-600 text-white p-0"
                  onClick={() => onExerciseSelect(exercise.id)}
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
