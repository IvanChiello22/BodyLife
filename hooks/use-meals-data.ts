"use client"

import { useState, useEffect, useCallback, useMemo } from "react"
import { useAuth } from "./use-auth"

export interface FoodItem {
  id: string
  name: string
  calories: number
  amount: string
  icon: string
  category: string
}

export interface MealData {
  name: string
  calories: number
  target: number
  foods: FoodItem[]
}

export interface MealsState {
  colazione: MealData
  pranzo: MealData
  cena: MealData
  dailyTarget: number
}

// Database di alimenti con ID univoci
export const FOOD_DATABASE: FoodItem[] = [
  // Colazione
  { id: "food_cornetti_001", name: "Cornetti", calories: 60, amount: "1 pezzo", category: "colazione", icon: "🥐" },
  { id: "food_caffe_002", name: "Caffè", calories: 5, amount: "1 tazza", category: "colazione", icon: "☕" },
  { id: "food_latte_003", name: "Latte", calories: 61, amount: "200ml", category: "colazione", icon: "🥛" },
  { id: "food_cereali_004", name: "Cereali", calories: 150, amount: "40g", category: "colazione", icon: "🥣" },
  { id: "food_yogurt_005", name: "Yogurt Greco", calories: 100, amount: "150g", category: "colazione", icon: "🥛" },
  { id: "food_miele_006", name: "Miele", calories: 64, amount: "1 cucchiaio", category: "colazione", icon: "🍯" },
  {
    id: "food_pane_tostato_007",
    name: "Pane Tostato",
    calories: 80,
    amount: "2 fette",
    category: "colazione",
    icon: "🍞",
  },
  {
    id: "food_marmellata_008",
    name: "Marmellata",
    calories: 50,
    amount: "1 cucchiaio",
    category: "colazione",
    icon: "🍓",
  },

  // Pranzo
  { id: "food_spaghetti_009", name: "Spaghetti", calories: 136, amount: "80g", category: "pranzo", icon: "🍝" },
  {
    id: "food_tonno_010",
    name: "Tonno in scatola",
    calories: 182,
    amount: "1 scatoletta",
    category: "pranzo",
    icon: "🐟",
  },
  { id: "food_pomodoro_011", name: "Pomodori", calories: 20, amount: "100g", category: "pranzo", icon: "🍅" },
  {
    id: "food_olio_oliva_012",
    name: "Olio d'Oliva",
    calories: 120,
    amount: "1 cucchiaio",
    category: "pranzo",
    icon: "🫒",
  },
  { id: "food_riso_013", name: "Riso", calories: 130, amount: "80g", category: "pranzo", icon: "🍚" },
  { id: "food_pollo_petto_014", name: "Petto di Pollo", calories: 165, amount: "100g", category: "pranzo", icon: "🍗" },
  { id: "food_insalata_015", name: "Insalata Mista", calories: 15, amount: "100g", category: "pranzo", icon: "🥗" },
  { id: "food_parmigiano_016", name: "Parmigiano", calories: 110, amount: "30g", category: "pranzo", icon: "🧀" },

  // Cena
  { id: "food_salmone_017", name: "Salmone", calories: 208, amount: "100g", category: "cena", icon: "🐟" },
  {
    id: "food_verdure_grigliate_018",
    name: "Verdure Grigliate",
    calories: 35,
    amount: "150g",
    category: "cena",
    icon: "🥒",
  },
  { id: "food_patate_019", name: "Patate Lesse", calories: 77, amount: "100g", category: "cena", icon: "🥔" },
  { id: "food_manzo_020", name: "Manzo Magro", calories: 250, amount: "100g", category: "cena", icon: "🥩" },
  { id: "food_broccoli_021", name: "Broccoli", calories: 25, amount: "100g", category: "cena", icon: "🥦" },
  { id: "food_quinoa_022", name: "Quinoa", calories: 120, amount: "80g", category: "cena", icon: "🌾" },
  { id: "food_avocado_023", name: "Avocado", calories: 160, amount: "1/2 frutto", category: "cena", icon: "🥑" },

  // Snack
  { id: "food_banana_024", name: "Banana", calories: 89, amount: "1 frutto", category: "snack", icon: "🍌" },
  { id: "food_mela_025", name: "Mela", calories: 52, amount: "1 frutto", category: "snack", icon: "🍎" },
  { id: "food_mandorle_026", name: "Mandorle", calories: 164, amount: "30g", category: "snack", icon: "🥜" },
  { id: "food_crackers_027", name: "Crackers", calories: 120, amount: "6 pezzi", category: "snack", icon: "🍘" },
]

// Valori di default per nuovi utenti
const createDefaultMealsState = (): MealsState => ({
  colazione: {
    name: "Colazione",
    calories: 0,
    target: 500,
    foods: [],
  },
  pranzo: {
    name: "Pranzo",
    calories: 0,
    target: 800,
    foods: [],
  },
  cena: {
    name: "Cena",
    calories: 0,
    target: 700,
    foods: [],
  },
  dailyTarget: 2000,
})

// Utility per validare i dati
const validateMealsData = (data: any): MealsState | null => {
  try {
    if (!data || typeof data !== "object") return null

    const requiredMeals = ["colazione", "pranzo", "cena"]
    for (const meal of requiredMeals) {
      if (!data[meal] || typeof data[meal] !== "object") return null
      if (typeof data[meal].calories !== "number" || data[meal].calories < 0) return null
      if (typeof data[meal].target !== "number" || data[meal].target < 0) return null
      if (!Array.isArray(data[meal].foods)) return null
    }

    if (typeof data.dailyTarget !== "number" || data.dailyTarget < 1000 || data.dailyTarget > 5000) {
      return null
    }

    return data as MealsState
  } catch {
    return null
  }
}

// Utility per generare ID univoci
const generateUniqueId = (): string => {
  return `meal_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
}

export function useMealsData() {
  const { user } = useAuth()
  const [meals, setMeals] = useState<MealsState>(createDefaultMealsState())
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Memoizza la chiave di storage per evitare ricreazioni
  const storageKey = useMemo(() => {
    return user ? `gym-app-meals-data-${user.id}` : "gym-app-meals-data"
  }, [user])

  // Carica i dati dei pasti dal localStorage con gestione errori migliorata
  useEffect(() => {
    const loadMealsData = async () => {
      try {
        setIsLoading(true)
        setError(null)

        if (!user) {
          setMeals(createDefaultMealsState())
          return
        }

        const savedMeals = localStorage.getItem(storageKey)

        if (savedMeals) {
          let parsedMeals: any
          try {
            parsedMeals = JSON.parse(savedMeals)
          } catch (parseError) {
            console.error("Errore parsing JSON:", parseError)
            setError("Dati corrotti, ripristino valori di default")
            const defaultState = createDefaultMealsState()
            setMeals(defaultState)
            localStorage.setItem(storageKey, JSON.stringify(defaultState))
            return
          }

          const validatedMeals = validateMealsData(parsedMeals)
          if (validatedMeals) {
            setMeals(validatedMeals)
          } else {
            console.warn("Dati non validi, ripristino default")
            setError("Dati non validi, ripristino valori di default")
            const defaultState = createDefaultMealsState()
            setMeals(defaultState)
            localStorage.setItem(storageKey, JSON.stringify(defaultState))
          }
        } else {
          const defaultState = createDefaultMealsState()
          setMeals(defaultState)
          localStorage.setItem(storageKey, JSON.stringify(defaultState))
        }
      } catch (error) {
        console.error("Errore nel caricamento dati pasti:", error)
        setError("Errore nel caricamento dei dati")
        setMeals(createDefaultMealsState())
      } finally {
        setIsLoading(false)
      }
    }

    loadMealsData()
  }, [user, storageKey])

  // Salva i dati nel localStorage con retry logic
  const saveMealsData = useCallback(
    async (mealsData: MealsState, retries = 3): Promise<boolean> => {
      try {
        if (!user) return false

        const validatedData = validateMealsData(mealsData)
        if (!validatedData) {
          setError("Dati non validi, impossibile salvare")
          return false
        }

        localStorage.setItem(storageKey, JSON.stringify(validatedData))
        setError(null)
        return true
      } catch (error) {
        console.error("Errore nel salvataggio:", error)

        if (retries > 0) {
          // Retry dopo un breve delay
          await new Promise((resolve) => setTimeout(resolve, 100))
          return saveMealsData(mealsData, retries - 1)
        }

        setError("Errore nel salvataggio dei dati")
        return false
      }
    },
    [user, storageKey],
  )

  // Distribuisce le calorie tra i pasti con logica migliorata
  const distributeCalories = useCallback((totalCalories: number) => {
    // Validazione input
    const validTotal = Math.max(1000, Math.min(5000, totalCalories))

    // Percentuali standard con arrotondamento intelligente
    const percentages = { colazione: 0.25, pranzo: 0.4, cena: 0.35 }

    const colazione = Math.round(validTotal * percentages.colazione)
    const pranzo = Math.round(validTotal * percentages.pranzo)

    // La cena prende il resto per evitare discrepanze
    const cena = validTotal - colazione - pranzo

    return { colazione, pranzo, cena }
  }, [])

  // Aggiunge un alimento a un pasto con validazione migliorata
  const addFoodToMeal = useCallback(
    async (mealType: keyof MealsState, food: FoodItem): Promise<boolean> => {
      if (mealType === "dailyTarget") return false

      // Validazione input
      if (!food || typeof food.calories !== "number" || food.calories < 0) {
        setError("Alimento non valido")
        return false
      }

      try {
        const newFood: FoodItem = {
          ...food,
          id: generateUniqueId(),
          calories: Math.max(0, Math.round(food.calories)), // Assicura valori positivi e interi
        }

        const updatedMeals = {
          ...meals,
          [mealType]: {
            ...meals[mealType],
            foods: [...meals[mealType].foods, newFood],
            calories: meals[mealType].calories + newFood.calories,
          },
        }

        const saved = await saveMealsData(updatedMeals)
        if (saved) {
          setMeals(updatedMeals)
          return true
        }
        return false
      } catch (error) {
        console.error("Errore aggiunta alimento:", error)
        setError("Errore nell'aggiunta dell'alimento")
        return false
      }
    },
    [meals, saveMealsData],
  )

  // Rimuove un alimento da un pasto con validazione
  const removeFoodFromMeal = useCallback(
    async (mealType: keyof MealsState, foodId: string): Promise<boolean> => {
      if (mealType === "dailyTarget") return false

      try {
        const meal = meals[mealType]
        const foodToRemove = meal.foods.find((food) => food.id === foodId)

        if (!foodToRemove) {
          setError("Alimento non trovato")
          return false
        }

        const updatedMeals = {
          ...meals,
          [mealType]: {
            ...meal,
            foods: meal.foods.filter((food) => food.id !== foodId),
            calories: Math.max(0, meal.calories - foodToRemove.calories),
          },
        }

        const saved = await saveMealsData(updatedMeals)
        if (saved) {
          setMeals(updatedMeals)
          return true
        }
        return false
      } catch (error) {
        console.error("Errore rimozione alimento:", error)
        setError("Errore nella rimozione dell'alimento")
        return false
      }
    },
    [meals, saveMealsData],
  )

  // Aggiorna l'obiettivo calorico con validazione e distribuzione migliorata
  const updateCalorieTarget = useCallback(
    async (newTarget: number): Promise<boolean> => {
      try {
        // Validazione rigorosa
        const validTarget = Math.max(1000, Math.min(5000, Math.round(newTarget)))

        if (validTarget !== newTarget) {
          setError(`Obiettivo corretto a ${validTarget} calorie (range: 1000-5000)`)
        }

        const distribution = distributeCalories(validTarget)

        const updatedMeals = {
          ...meals,
          dailyTarget: validTarget,
          colazione: {
            ...meals.colazione,
            target: distribution.colazione,
          },
          pranzo: {
            ...meals.pranzo,
            target: distribution.pranzo,
          },
          cena: {
            ...meals.cena,
            target: distribution.cena,
          },
        }

        const saved = await saveMealsData(updatedMeals)
        if (saved) {
          setMeals(updatedMeals)
          return true
        }
        return false
      } catch (error) {
        console.error("Errore aggiornamento obiettivo:", error)
        setError("Errore nell'aggiornamento dell'obiettivo")
        return false
      }
    },
    [meals, saveMealsData, distributeCalories],
  )

  // Calcola le calorie totali giornaliere
  const getTotalDailyCalories = useCallback(() => {
    return meals.colazione.calories + meals.pranzo.calories + meals.cena.calories
  }, [meals])

  // Ottiene l'obiettivo calorico giornaliero
  const getDailyCalorieTarget = useCallback(() => {
    return meals.dailyTarget
  }, [meals.dailyTarget])

  // Ottiene gli alimenti per categoria con memoizzazione
  const getFoodsByCategory = useCallback((category: string): FoodItem[] => {
    return FOOD_DATABASE.filter((food) => food.category === category)
  }, [])

  // Cerca alimenti con logica migliorata
  const searchFoods = useCallback((query: string): FoodItem[] => {
    if (!query || query.trim().length < 2) return []

    const normalizedQuery = query.toLowerCase().trim()
    return FOOD_DATABASE.filter(
      (food) =>
        food.name.toLowerCase().includes(normalizedQuery) || food.category.toLowerCase().includes(normalizedQuery),
    )
  }, [])

  // Reset dei dati con conferma
  const resetMealsData = useCallback(async (): Promise<boolean> => {
    try {
      const defaultState = createDefaultMealsState()
      const saved = await saveMealsData(defaultState)
      if (saved) {
        setMeals(defaultState)
        setError(null)
        return true
      }
      return false
    } catch (error) {
      console.error("Errore reset dati:", error)
      setError("Errore nel reset dei dati")
      return false
    }
  }, [saveMealsData])

  // Pulisce gli errori
  const clearError = useCallback(() => {
    setError(null)
  }, [])

  // Statistiche utili
  const getStats = useCallback(() => {
    const totalCalories = getTotalDailyCalories()
    const targetCalories = getDailyCalorieTarget()
    const progress = targetCalories > 0 ? (totalCalories / targetCalories) * 100 : 0

    return {
      totalCalories,
      targetCalories,
      progress: Math.min(progress, 100),
      remaining: Math.max(0, targetCalories - totalCalories),
      isOverTarget: totalCalories > targetCalories,
      totalFoods: meals.colazione.foods.length + meals.pranzo.foods.length + meals.cena.foods.length,
    }
  }, [meals, getTotalDailyCalories, getDailyCalorieTarget])

  return {
    meals,
    isLoading,
    error,
    addFoodToMeal,
    removeFoodFromMeal,
    updateCalorieTarget,
    getTotalDailyCalories,
    getDailyCalorieTarget,
    getFoodsByCategory,
    searchFoods,
    resetMealsData,
    clearError,
    getStats,
    FOOD_DATABASE,
  }
}
