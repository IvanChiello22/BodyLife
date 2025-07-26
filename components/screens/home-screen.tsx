"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Target, Flame, Droplets, TrendingUp, Apple, Dumbbell, User, ChevronRight } from "lucide-react"

export function HomeScreen() {
  return (
    <div className="min-h-screen bg-gray-50 p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Ciao, Marco!</h1>
          <p className="text-gray-600">Oggi è un ottimo giorno per allenarsi</p>
        </div>
        <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
          <User className="w-6 h-6 text-white" />
        </div>
      </div>

      {/* Daily Stats */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Flame className="w-5 h-5 text-orange-500" />
              <div>
                <p className="text-sm text-gray-600">Calorie</p>
                <p className="text-lg font-semibold">1,240 / 2,100</p>
              </div>
            </div>
            <Progress value={59} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Droplets className="w-5 h-5 text-blue-500" />
              <div>
                <p className="text-sm text-gray-600">Acqua</p>
                <p className="text-lg font-semibold">1.2 / 2.5 L</p>
              </div>
            </div>
            <Progress value={48} className="mt-2" />
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <Button variant="outline" className="h-20 flex-col space-y-2 bg-transparent">
          <Apple className="w-6 h-6 text-green-500" />
          <span className="text-xs">Aggiungi Pasto</span>
        </Button>

        <Button variant="outline" className="h-20 flex-col space-y-2 bg-transparent">
          <Dumbbell className="w-6 h-6 text-blue-500" />
          <span className="text-xs">Allenamento</span>
        </Button>

        <Button variant="outline" className="h-20 flex-col space-y-2 bg-transparent">
          <Target className="w-6 h-6 text-purple-500" />
          <span className="text-xs">Obiettivi</span>
        </Button>
      </div>

      {/* Today's Workout */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Allenamento di Oggi</span>
            <Badge variant="secondary">Push Day</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Dumbbell className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium">Panca Piana</p>
                  <p className="text-sm text-gray-600">4 serie x 8-10 rip</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <Dumbbell className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="font-medium">Spinte Manubri</p>
                  <p className="text-sm text-gray-600">3 serie x 10-12 rip</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </div>
          </div>

          <Button className="w-full mt-4">Inizia Allenamento</Button>
        </CardContent>
      </Card>

      {/* Progress Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <TrendingUp className="w-5 h-5" />
            <span>Progressi Settimanali</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Allenamenti completati</span>
              <span className="font-semibold">4/5</span>
            </div>
            <Progress value={80} />

            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Obiettivo calorico</span>
              <span className="font-semibold">85%</span>
            </div>
            <Progress value={85} />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
