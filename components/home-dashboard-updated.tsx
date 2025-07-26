"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Play, Home, FileText, Dumbbell, Clock, AlertCircle } from "lucide-react"
import { useMealsData } from "@/hooks/use-meals-data"

interface HomeDashboardProps {
  onNavigateToMealTracking?: () => void
  onNavigateToWorkoutSelection?: () => void
}

export function HomeDashboardUpdated({ onNavigateToMealTracking, onNavigateToWorkoutSelection }: HomeDashboardProps) {
  const { meals, getStats, error, clearError } = useMealsData()

  const workoutStats = [
    { name: "Dumbell Rows", duration: "1Hr 20Min", icon: "🏋️" },
    { name: "Croci ai cavi", duration: "1Hr 20Min", icon: "🏋️" },
    { name: "Cardio", duration: "1Hr 20Min", icon: "❤️" },
  ]

  const stats = getStats()

  const mealStats = [
    {
      name: "Colazione",
      current: meals.colazione.calories,
      total: meals.colazione.target,
      color: "stroke-yellow-500",
    },
    {
      name: "Pranzo",
      current: meals.pranzo.calories,
      total: meals.pranzo.target,
      color: "stroke-orange-500",
    },
    {
      name: "Cena",
      current: meals.cena.calories,
      total: meals.cena.target,
      color: "stroke-purple-500",
    },
  ]

  const getCircleProgress = (current: number, total: number) => {
    return total > 0 ? Math.min((current / total) * 100, 100) : 0
  }

  return (
    <div className="min-h-screen bg-gray-800 text-white">
      {/* Error Message */}
      {error && (
        <div className="p-4">
          <Alert className="bg-red-900/50 border-red-500">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription className="text-red-200">
              {error}
              <Button variant="ghost" size="sm" onClick={clearError} className="ml-2 text-red-200 hover:text-red-100">
                Chiudi
              </Button>
            </AlertDescription>
          </Alert>
        </div>
      )}

      {/* Header */}
      <div className="flex items-center gap-3 p-6 pb-4">
        <Avatar className="w-12 h-12">
          <AvatarImage src="/placeholder.svg?height=48&width=48" />
          <AvatarFallback className="bg-white text-black font-bold">
            <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
              <Dumbbell className="w-4 h-4 text-white" />
            </div>
          </AvatarFallback>
        </Avatar>
        <div>
          <h1 className="text-xl font-semibold">Bentornato Luca</h1>
          <p className="text-sm text-gray-400">
            {stats.totalCalories}/{stats.targetCalories} cal oggi
          </p>
        </div>
      </div>

      {/* Main Workout Card */}
      <div className="px-6 mb-6">
        <Card className="bg-gray-700 border-gray-600">
          <CardContent className="p-6">
            <div className="mb-2">
              <span className="text-sm text-gray-400">Principiante</span>
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">Bench Press</h2>
            <p className="text-orange-500 text-sm mb-4">10 Bench Press Workout Videos For You</p>

            <div className="flex items-center gap-3">
              <Button className="bg-white text-black hover:bg-gray-100 rounded-full w-12 h-12 p-0">
                <Play className="w-5 h-5 fill-current" />
              </Button>
              <span className="text-orange-500 text-xl font-bold">34 Minutes</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Vedi Tutto */}
      <div className="px-6 mb-4">
        <div className="text-right">
          <span className="text-gray-400 text-sm">Vedi Tutto</span>
        </div>
      </div>

      {/* Workout Categories */}
      <div className="px-6 mb-6">
        <div className="grid grid-cols-3 gap-4">
          {workoutStats.map((workout, index) => (
            <Card key={index} className="bg-gray-700 border-gray-600">
              <CardContent className="p-4 text-center">
                <div className="text-orange-500 text-2xl mb-2">🏋️</div>
                <h3 className="text-white font-semibold text-sm mb-1">{workout.name}</h3>
                <div className="flex items-center justify-center gap-1 text-orange-500 text-xs">
                  <Clock className="w-3 h-3" />
                  <span>{workout.duration}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Vedi Tutto */}
      <div className="px-6 mb-4">
        <div className="text-right">
          <span className="text-gray-400 text-sm">Vedi Tutto</span>
        </div>
      </div>

      {/* Meal Stats */}
      <div className="px-6 mb-8">
        <div className="grid grid-cols-3 gap-4">
          {mealStats.map((meal, index) => (
            <div key={index} className="text-center">
              <div className="relative w-20 h-20 mx-auto mb-2">
                <svg className="w-20 h-20 transform -rotate-90" viewBox="0 0 36 36">
                  <path
                    className="stroke-gray-600"
                    strokeWidth="3"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  <path
                    className={meal.color}
                    strokeWidth="3"
                    strokeLinecap="round"
                    fill="none"
                    strokeDasharray={`${getCircleProgress(meal.current, meal.total)}, 100`}
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-white text-sm font-bold">{meal.current}</span>
                  <span className="text-gray-400 text-xs">/{meal.total}</span>
                </div>
              </div>
              <span className="text-gray-400 text-sm">{meal.name}</span>
            </div>
          ))}
        </div>

        {/* Quick Stats */}
        <div className="mt-4 text-center">
          <div className="text-sm text-gray-400">Progresso giornaliero: {Math.round(stats.progress)}%</div>
          {stats.isOverTarget && (
            <div className="text-xs text-red-400 mt-1">
              Obiettivo superato di {stats.totalCalories - stats.targetCalories} cal
            </div>
          )}
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-gray-700 border-t border-gray-600">
        <div className="flex items-center justify-around py-3">
          <Button variant="ghost" className="flex flex-col items-center gap-1 text-white">
            <Home className="w-6 h-6" />
          </Button>
          <Button
            variant="ghost"
            className="flex flex-col items-center gap-1 text-gray-400"
            onClick={onNavigateToMealTracking}
          >
            <FileText className="w-6 h-6" />
          </Button>
          <Button
            variant="ghost"
            className="flex flex-col items-center gap-1 text-gray-400"
            onClick={onNavigateToWorkoutSelection}
          >
            <Dumbbell className="w-6 h-6" />
          </Button>
        </div>
      </div>
    </div>
  )
}
