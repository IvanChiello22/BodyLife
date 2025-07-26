"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Play, Home, AppleIcon, Dumbbell, Clock, LogOut, RotateCcw, Settings } from "lucide-react"
import { useMealsData } from "@/hooks/use-meals-data"

interface HomeDashboardWithResetProps {
  onNavigateToMealTracking?: () => void
  onNavigateToWorkoutSelection?: () => void
  onResetOnboarding?: () => void
  onLogout?: () => void
  userName?: string
  onNavigateToPersonalArea?: () => void
}

export function HomeDashboardWithReset({
  onNavigateToMealTracking,
  onNavigateToWorkoutSelection,
  onResetOnboarding,
  onLogout,
  userName = "Utente",
  onNavigateToPersonalArea,
}: HomeDashboardWithResetProps) {
  const { meals, isLoading } = useMealsData()

  const workoutStats = [
    { name: "Dumbell Rows", duration: "1Hr 20Min", icon: "🏋️" },
    { name: "Croci ai cavi", duration: "1Hr 20Min", icon: "🏋️" },
    { name: "Cardio", duration: "1Hr 20Min", icon: "❤️" },
  ]

  // Usa i dati reali dai pasti invece di valori hardcoded
  const mealStats = [
    {
      name: "Colazione",
      current: meals.colazione.calories,
      total: meals.colazione.target,
      color: "stroke-orange-500",
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
      color: "stroke-orange-500",
    },
  ]

  const getCircleProgress = (current: number, total: number) => {
    if (total === 0) return 0
    return Math.min((current / total) * 100, 100) // Limita al 100%
  }

  // Mostra loading se i dati stanno caricando
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-800 text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
          <p className="text-gray-400">Caricamento dati nutrizionali...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-800 text-white">
      {/* Header with User Info and Actions */}
      <div className="flex items-center justify-between p-6 pb-4">
        <div className="flex items-center gap-3 cursor-pointer" onClick={onNavigateToPersonalArea}>
          <Avatar className="w-12 h-12">
            <AvatarImage src="/placeholder.svg?height=48&width=48" />
            <AvatarFallback className="bg-white text-black font-bold">
              <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                <Dumbbell className="w-4 h-4 text-white" />
              </div>
            </AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-xl font-semibold">Bentornato {userName}</h1>
            <p className="text-sm text-gray-400">Tocca per accedere al profilo</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          {/* Settings/Profile Button */}
          <Button
            variant="ghost"
            size="sm"
            className="text-gray-400 hover:text-white hover:bg-gray-700"
            onClick={() => alert("Profilo non ancora implementato")}
          >
            <Settings className="w-5 h-5" />
          </Button>

          {/* Reset Button (Development) */}
          {onResetOnboarding && (
            <Button
              variant="ghost"
              size="sm"
              className="text-yellow-400 hover:text-yellow-300 hover:bg-gray-700"
              onClick={onResetOnboarding}
              title="Reset completo (solo per sviluppo)"
            >
              <RotateCcw className="w-5 h-5" />
            </Button>
          )}

          {/* Logout Button */}
          {onLogout && (
            <Button
              variant="ghost"
              size="sm"
              className="text-red-400 hover:text-red-300 hover:bg-gray-700"
              onClick={onLogout}
              title="Logout"
            >
              <LogOut className="w-5 h-5" />
            </Button>
          )}
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
              <Button
                className="bg-white text-black hover:bg-gray-100 rounded-full w-12 h-12 p-0"
                onClick={onNavigateToWorkoutSelection}
              >
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
          <button className="text-gray-400 text-sm hover:text-white" onClick={onNavigateToWorkoutSelection}>
            Vedi Tutto
          </button>
        </div>
      </div>

      {/* Workout Categories */}
      <div className="px-6 mb-6">
        <div className="grid grid-cols-3 gap-4">
          {workoutStats.map((workout, index) => (
            <Card
              key={index}
              className="bg-gray-700 border-gray-600 cursor-pointer hover:bg-gray-600 transition-colors"
            >
              <CardContent className="p-4 text-center" onClick={onNavigateToWorkoutSelection}>
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

      {/* Vedi Tutto Meals */}
      <div className="px-6 mb-4">
        <div className="text-right">
          <button className="text-gray-400 text-sm hover:text-white" onClick={onNavigateToMealTracking}>
            Vedi Tutto
          </button>
        </div>
      </div>

      {/* Meal Stats - DATI REALI */}
      <div className="px-6 mb-8">
        <div className="grid grid-cols-3 gap-4">
          {mealStats.map((meal, index) => (
            <div key={index} className="text-center cursor-pointer" onClick={onNavigateToMealTracking}>
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
              <span className="text-gray-400 text-sm hover:text-white transition-colors">{meal.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Development Info */}
      <div className="px-6 mb-4">
        <Card className="bg-gray-700/50 border-gray-600">
          <CardContent className="p-4">
            <h3 className="text-orange-500 font-semibold mb-2">🚀 Modalità Sviluppo</h3>
            <div className="text-sm text-gray-300 space-y-1">
              <p>
                • <span className="text-yellow-400">Reset</span>: Cancella tutti i dati e ricomincia
              </p>
              <p>
                • <span className="text-red-400">Logout</span>: Torna alla schermata di login
              </p>
              <p>
                • <span className="text-gray-400">Settings</span>: Gestione profilo (in sviluppo)
              </p>
              <p>
                • <span className="text-green-400">Calorie totali</span>:{" "}
                {meals.colazione.calories + meals.pranzo.calories + meals.cena.calories}/
                {meals.colazione.target + meals.pranzo.target + meals.cena.target}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-gray-700 border-t border-gray-600">
        <div className="flex items-center justify-around py-3">
          <Button variant="ghost" className="flex flex-col items-center gap-1 text-white">
            <Home className="w-6 h-6" />
          </Button>
          <Button
            variant="ghost"
            className="flex flex-col items-center gap-1 text-gray-400 hover:text-white"
            onClick={onNavigateToMealTracking}
          >
            <AppleIcon className="w-6 h-6" />
          </Button>
          <Button
            variant="ghost"
            className="flex flex-col items-center gap-1 text-gray-400 hover:text-white"
            onClick={onNavigateToWorkoutSelection}
          >
            <Dumbbell className="w-6 h-6" />
          </Button>
        </div>
      </div>
    </div>
  )
}
