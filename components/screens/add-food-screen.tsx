"use client"

import { useState, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ArrowLeft, Search, Plus, CheckCircle2, AlertCircle } from "lucide-react"
import { useMealsData, type FoodItem, type MealsState } from "@/hooks/use-meals-data"

interface AddFoodScreenProps {
  onBack: () => void
}

export function AddFoodScreen({ onBack }: AddFoodScreenProps) {
  const { FOOD_DATABASE, addFoodToMeal, getFoodsByCategory, searchFoods, error, clearError } = useMealsData()

  const [searchQuery, setSearchQuery] = useState("")
  const [selectedMeal, setSelectedMeal] = useState<keyof MealsState>("colazione")
  const [isAdding, setIsAdding] = useState(false)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)

  // Memoizza i risultati della ricerca per performance
  const searchResults = useMemo(() => {
    if (searchQuery.trim().length < 2) return []
    return searchFoods(searchQuery)
  }, [searchQuery, searchFoods])

  // Memoizza gli alimenti per categoria
  const foodsByCategory = useMemo(() => {
    return {
      colazione: getFoodsByCategory("colazione"),
      pranzo: getFoodsByCategory("pranzo"),
      cena: getFoodsByCategory("cena"),
      snack: getFoodsByCategory("snack"),
    }
  }, [getFoodsByCategory])

  const handleAddFood = async (food: FoodItem) => {
    if (isAdding) return

    setIsAdding(true)
    try {
      const success = await addFoodToMeal(selectedMeal, food)
      if (success) {
        setSuccessMessage(`${food.name} aggiunto a ${selectedMeal}!`)
        setTimeout(() => setSuccessMessage(null), 2000)
      }
    } catch (error) {
      console.error("Errore aggiunta alimento:", error)
    } finally {
      setIsAdding(false)
    }
  }

  const FoodCard = ({ food }: { food: FoodItem }) => (
    <Card className="bg-gray-700 border-gray-600 hover:bg-gray-600 transition-colors">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="text-2xl">{food.icon}</div>
            <div>
              <h3 className="font-medium text-white">{food.name}</h3>
              <p className="text-sm text-gray-400">{food.amount}</p>
              <Badge variant="secondary" className="text-xs mt-1">
                {food.category}
              </Badge>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-right">
              <div className="font-bold text-orange-500">{food.calories}</div>
              <div className="text-xs text-gray-400">cal</div>
            </div>
            <Button
              size="sm"
              onClick={() => handleAddFood(food)}
              disabled={isAdding}
              className="bg-orange-500 hover:bg-orange-600"
            >
              <Plus className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )

  return (
    <div className="min-h-screen bg-gray-800 text-white">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-gray-700">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" onClick={onBack} className="text-white hover:bg-gray-700">
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-xl font-semibold">Aggiungi Alimento</h1>
        </div>
      </div>

      {/* Messages */}
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

      {/* Meal Selection */}
      <div className="p-6 border-b border-gray-700">
        <h2 className="text-lg font-semibold mb-3">Aggiungi a:</h2>
        <div className="flex gap-2">
          {[
            { key: "colazione", label: "Colazione", icon: "🌅" },
            { key: "pranzo", label: "Pranzo", icon: "🍽️" },
            { key: "cena", label: "Cena", icon: "🌙" },
          ].map(({ key, label, icon }) => (
            <Button
              key={key}
              variant={selectedMeal === key ? "default" : "outline"}
              onClick={() => setSelectedMeal(key as keyof MealsState)}
              className={`flex items-center gap-2 ${
                selectedMeal === key
                  ? "bg-orange-500 hover:bg-orange-600"
                  : "border-gray-600 text-gray-300 hover:bg-gray-700"
              }`}
            >
              <span>{icon}</span>
              {label}
            </Button>
          ))}
        </div>
      </div>

      {/* Search */}
      <div className="p-6 border-b border-gray-700">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Cerca alimenti..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-gray-700 border-gray-600 text-white"
          />
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {searchQuery.trim().length >= 2 ? (
          // Search Results
          <div>
            <h2 className="text-lg font-semibold mb-4">Risultati ricerca ({searchResults.length})</h2>
            {searchResults.length === 0 ? (
              <div className="text-center py-8">
                <div className="text-4xl mb-2">🔍</div>
                <p className="text-gray-400">Nessun risultato trovato</p>
                <p className="text-gray-500 text-sm">Prova con un termine diverso</p>
              </div>
            ) : (
              <div className="space-y-3">
                {searchResults.map((food) => (
                  <FoodCard key={food.id} food={food} />
                ))}
              </div>
            )}
          </div>
        ) : (
          // Categories
          <Tabs defaultValue="colazione" className="w-full">
            <TabsList className="grid w-full grid-cols-4 bg-gray-700">
              <TabsTrigger value="colazione" className="data-[state=active]:bg-orange-500">
                🌅 Colazione
              </TabsTrigger>
              <TabsTrigger value="pranzo" className="data-[state=active]:bg-orange-500">
                🍽️ Pranzo
              </TabsTrigger>
              <TabsTrigger value="cena" className="data-[state=active]:bg-orange-500">
                🌙 Cena
              </TabsTrigger>
              <TabsTrigger value="snack" className="data-[state=active]:bg-orange-500">
                🍿 Snack
              </TabsTrigger>
            </TabsList>

            {Object.entries(foodsByCategory).map(([category, foods]) => (
              <TabsContent key={category} value={category} className="mt-6">
                <div className="space-y-3">
                  {foods.map((food) => (
                    <FoodCard key={food.id} food={food} />
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        )}
      </div>
    </div>
  )
}
