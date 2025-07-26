"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Play, Home, FileText, Dumbbell, Clock } from "lucide-react"

export function HomeDashboard() {
  const workoutStats = [
    { name: "Dumbell Rows", duration: "1Hr 20Min", icon: "🏋️" },
    { name: "Croci ai cavi", duration: "1Hr 20Min", icon: "🏋️" },
    { name: "Cardio", duration: "1Hr 20Min", icon: "❤️" },
  ]

  const mealStats = [
    { name: "Colazione", current: 186, total: 2020, color: "stroke-orange-500" },
    { name: "Pranzo", current: 338, total: 500, color: "stroke-orange-500" },
    { name: "Cena", current: 200, total: 400, color: "stroke-orange-500" },
  ]

  const getCircleProgress = (current: number, total: number) => {
    return (current / total) * 100
  }

  return (
    <div className="min-h-screen bg-gray-800 text-white">
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
        <h1 className="text-xl font-semibold">Bentornato Luca</h1>
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
            onClick={() => (window.location.href = "/meal-tracking")}
          >
            <FileText className="w-6 h-6" />
          </Button>
          <Button
            variant="ghost"
            className="flex flex-col items-center gap-1 text-gray-400"
            onClick={() => (window.location.href = "/meal-tracking")}
          >
            <Dumbbell className="w-6 h-6" />
          </Button>
        </div>
      </div>
    </div>
  )
}
