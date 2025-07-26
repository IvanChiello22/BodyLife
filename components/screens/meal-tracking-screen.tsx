"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ArrowLeft, Plus, Trash2, Target, AlertCircle, CheckCircle2 } from "lucide-react"
import { useMealsData, type MealsState } from "@/hooks/use-meals-data"

interface MealTrackingScreenProps {
  onBack: () => void
  onAddFood: () => void
}

export function MealTrackingScreen({ onBack, onAddFood }: MealTrackingScreenProps) {
  const { meals, isLoading, error, removeFoodFromMeal, updateCalorieTarget, clearError, getStats } = useMealsData()

  const [showTargetDialog, setShowTargetDialog] = useState(false)
  const [newTarget, setNewTarget] = useState(2000)
  const [isUpdating, setIsUpdating] = useState(false)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)

  const stats = getStats()

  // Aggiorna il valore del target quando cambia
  useEffect(() => {
    setNewTarget(stats.targetCalories)
  }, [stats.targetCalories])

  // Auto-clear dei messaggi di successo
  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => setSuccessMessage(null), 3000)
      return () => clearTimeout(timer)
    }
  }, [successMessage])

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

  const handleUpdateTarget = async () => {
    if (newTarget < 1000 || newTarget > 5000) {
      return
    }

    setIsUpdating(true)
    try {
      const success = await updateCalorieTarget(newTarget)
      if (success) {
        setShowTargetDialog(false)
        setSuccessMessage("Obiettivo calorico aggiornato con successo!")
      }
    } catch (error) {
      console.error("Errore aggiornamento:", error)
    } finally {
      setIsUpdating(false)
    }
  }

  const handleRemoveFood = async (mealType: keyof MealsState, foodId: string) => {
    const success = await removeFoodFromMeal(mealType, foodId)
    if (success) {
      setSuccessMessage("Alimento rimosso con successo!")
    }
  }

  const mealSections = [
    { key: "colazione" as keyof MealsState, data: meals.colazione, icon: "🌅", color: "bg-yellow-500" },
    { key: "pranzo" as keyof MealsState, data: meals.pranzo, icon: "🍽️", color: "bg-orange-500" },
    { key: "cena" as keyof MealsState, data: meals.cena, icon: "🌙", color: "bg-purple-500" },
  ]

  return (
    <div className="min-h-screen bg-gray-800 text-white">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-gray-700">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" onClick={onBack} className="text-white hover:bg-gray-700">
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-xl font-semibold">Tracciamento Pasti</h1>
        </div>
        <div className="flex items-center gap-2">
          <Dialog open={showTargetDialog} onOpenChange={setShowTargetDialog}>
            <DialogTrigger asChild>
              <Button variant="ghost" size="sm" className="text-white hover:bg-gray-700">
                <Target className="w-4 h-4" />
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-gray-800 border-gray-600">
              <DialogHeader>
                <DialogTitle className="text-white">Modifica Obiettivo Calorie</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="target" className="text-white">
                    Obiettivo giornaliero (kcal)
                  </Label>
                  <Input
                    id="target"
                    type="number"
                    value={newTarget}
                    onChange={(e) => setNewTarget(Number(e.target.value))}
                    className="bg-gray-700 border-gray-600 text-white"
                    min="1000"
                    max="5000"
                    disabled={isUpdating}
                  />
                  <p className="text-sm text-gray-400 mt-1">Range consigliato: 1000-5000 calorie</p>
                  {(newTarget < 1000 || newTarget > 5000) && (
                    <p className="text-sm text-red-400 mt-1">Valore non valido. Inserisci un valore tra 1000 e 5000.</p>
                  )}
                </div>
                <div className="flex justify-end gap-2">
                  <Button
                    variant="ghost"
                    onClick={() => setShowTargetDialog(false)}
                    className="text-gray-400"
                    disabled={isUpdating}
                  >
                    Annulla
                  </Button>
                  <Button
                    onClick={handleUpdateTarget}
                    className="bg-orange-500 hover:bg-orange-600"
                    disabled={isUpdating || newTarget < 1000 || newTarget > 5000}
                  >
                    {isUpdating ? "Salvando..." : "Salva"}
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
          <Button onClick={onAddFood} className="bg-orange-500 hover:bg-orange-600 text-white">
            <Plus className="w-4 h-4 mr-2" />
            Aggiungi
          </Button>
        </div>
      </div>

      {/* Error/Success Messages */}
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

      {successMessage && (
        <div className="p-4">
          <Alert className="bg-green-900/50 border-green-500">
            <CheckCircle2 className="h-4 w-4" />
            <AlertDescription className="text-green-200">{successMessage}</AlertDescription>
          </Alert>
        </div>
      )}

      {/* Daily Summary */}
      <div className="p-6 border-b border-gray-700">
        <Card className="bg-gray-700 border-gray-600">
          <CardHeader>
            <CardTitle className="text-white flex items-center justify-between">
              <span>Riepilogo Giornaliero</span>
              <span className="text-orange-500 text-lg">
                {stats.totalCalories}/{stats.targetCalories} cal
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Progress value={stats.progress} className="h-3 bg-gray-600" />
            <div className="flex justify-between text-sm text-gray-400 mt-2">
              <span>Consumate: {stats.totalCalories} cal</span>
              <span>Obiettivo: {stats.targetCalories} cal</span>
            </div>

            {/* Status Messages */}
            {stats.isOverTarget && (
              <p className="text-red-400 text-sm mt-2">
                ⚠️ Hai superato l'obiettivo di {stats.totalCalories - stats.targetCalories} calorie
              </p>
            )}
            {stats.progress < 50 && stats.totalCalories > 0 && (
              <p className="text-yellow-400 text-sm mt-2">
                💡 Ti mancano ancora {stats.remaining} calorie per raggiungere l'obiettivo
              </p>
            )}
            {stats.progress >= 90 && stats.progress <= 100 && (
              <p className="text-green-400 text-sm mt-2">🎯 Ottimo! Sei vicino al tuo obiettivo giornaliero</p>
            )}

            {/* Additional Stats */}
            <div className="flex justify-between text-xs text-gray-500 mt-2">
              <span>Alimenti totali: {stats.totalFoods}</span>
              <span>Progresso: {Math.round(stats.progress)}%</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Meals Sections */}
      <div className="p-6 space-y-6 pb-24">
        {mealSections.map(({ key, data, icon, color }) => (
          <Card key={key} className="bg-gray-700 border-gray-600">
            <CardHeader>
              <CardTitle className="text-white flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 ${color} rounded-full flex items-center justify-center text-white text-lg`}
                  >
                    {icon}
                  </div>
                  <div>
                    <h3 className="text-lg">{data.name}</h3>
                    <p className="text-sm text-gray-400">
                      {data.calories}/{data.target} cal
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-orange-500 font-bold">{data.calories}</div>
                  <div className="text-gray-400 text-sm">/{data.target}</div>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {/* Progress Bar */}
              <Progress
                value={data.target > 0 ? Math.min((data.calories / data.target) * 100, 100) : 0}
                className="h-2 bg-gray-600 mb-4"
              />

              {/* Food Items */}
              {data.foods.length === 0 ? (
                <div className="text-center py-8">
                  <div className="text-4xl mb-2">🍽️</div>
                  <p className="text-gray-400 mb-3">Nessun alimento aggiunto</p>
                  <p className="text-gray-500 text-sm mb-4">
                    Usa il pulsante "Aggiungi" in alto per aggiungere alimenti
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {data.foods.map((food) => (
                    <div key={food.id} className="flex items-center justify-between p-3 bg-gray-600 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="text-xl">{food.icon}</div>
                        <div>
                          <h4 className="font-medium text-white">{food.name}</h4>
                          <p className="text-sm text-gray-400">{food.amount}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="text-right">
                          <div className="font-bold text-orange-500">{food.calories}</div>
                          <div className="text-xs text-gray-400">cal</div>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleRemoveFood(key, food.id)}
                          className="text-red-400 hover:text-red-300 hover:bg-red-500/20"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Floating Add Button */}
      <div className="fixed bottom-6 right-6">
        <Button
          onClick={onAddFood}
          className="w-14 h-14 rounded-full bg-orange-500 hover:bg-orange-600 text-white shadow-lg"
        >
          <Plus className="w-6 h-6" />
        </Button>
      </div>
    </div>
  )
}
