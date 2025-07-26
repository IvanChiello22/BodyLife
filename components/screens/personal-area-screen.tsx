"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { ArrowLeft, Edit3, Save, X, User, Mail, Dumbbell, Target, Activity, Weight, Ruler } from "lucide-react"

interface PersonalAreaScreenProps {
  onBack: () => void
  userData: {
    gender: "male" | "female" | null
    activityLevel: string
    goal: string
    weight: number
    height: number
  }
  user: {
    name: string
    email: string
  } | null
  onUpdateUserData: {
    updateGender: (gender: "male" | "female") => void
    updateActivityLevel: (level: string) => void
    updateGoal: (goal: string) => void
    updateWeight: (weight: number) => void
    updateHeight: (height: number) => void
  }
}

export function PersonalAreaScreen({ onBack, userData, user, onUpdateUserData }: PersonalAreaScreenProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editedData, setEditedData] = useState({
    activityLevel: userData.activityLevel,
    goal: userData.goal,
    weight: userData.weight,
    height: userData.height,
  })

  const handleSave = () => {
    // Salva solo i dati modificabili (escluso il genere)
    if (editedData.activityLevel !== userData.activityLevel) {
      onUpdateUserData.updateActivityLevel(editedData.activityLevel)
    }

    if (editedData.goal !== userData.goal) {
      onUpdateUserData.updateGoal(editedData.goal)
    }

    if (editedData.weight !== userData.weight) {
      onUpdateUserData.updateWeight(editedData.weight)
    }

    if (editedData.height !== userData.height) {
      onUpdateUserData.updateHeight(editedData.height)
    }

    setIsEditing(false)
  }

  const handleCancel = () => {
    setEditedData({
      activityLevel: userData.activityLevel,
      goal: userData.goal,
      weight: userData.weight,
      height: userData.height,
    })
    setIsEditing(false)
  }

  const calculateBMI = () => {
    if (userData.height > 0 && userData.weight > 0) {
      const heightInMeters = userData.height / 100
      return (userData.weight / (heightInMeters * heightInMeters)).toFixed(1)
    }
    return "N/A"
  }

  const getBMICategory = (bmi: string) => {
    const bmiValue = Number.parseFloat(bmi)
    if (bmiValue < 18.5) return { text: "Sottopeso", color: "text-blue-400" }
    if (bmiValue < 25) return { text: "Normale", color: "text-green-400" }
    if (bmiValue < 30) return { text: "Sovrappeso", color: "text-yellow-400" }
    return { text: "Obeso", color: "text-red-400" }
  }

  const activityLevels = [
    { value: "sedentary", label: "Sedentario" },
    { value: "lightly-active", label: "Leggermente Attivo" },
    { value: "moderately-active", label: "Moderatamente Attivo" },
    { value: "very-active", label: "Molto Attivo" },
    { value: "extremely-active", label: "Estremamente Attivo" },
  ]

  const goals = [
    { value: "lose-weight", label: "Perdere Peso" },
    { value: "maintain-weight", label: "Mantenere Peso" },
    { value: "gain-weight", label: "Aumentare Peso" },
    { value: "build-muscle", label: "Costruire Muscoli" },
  ]

  const bmi = calculateBMI()
  const bmiCategory = getBMICategory(bmi)

  // Sincronizza editedData quando userData cambia
  useEffect(() => {
    setEditedData({
      activityLevel: userData.activityLevel,
      goal: userData.goal,
      weight: userData.weight,
      height: userData.height,
    })
  }, [userData])

  return (
    <div className="min-h-screen bg-gray-800 text-white">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-gray-700">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" onClick={onBack} className="text-white hover:bg-gray-700">
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-xl font-semibold">Area Personale</h1>
        </div>

        <div className="flex items-center gap-2">
          {isEditing ? (
            <>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleCancel}
                className="text-red-400 hover:text-red-300 hover:bg-gray-700"
              >
                <X className="w-5 h-5" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleSave}
                className="text-green-400 hover:text-green-300 hover:bg-gray-700"
              >
                <Save className="w-5 h-5" />
              </Button>
            </>
          ) : (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsEditing(true)}
              className="text-orange-400 hover:text-orange-300 hover:bg-gray-700"
            >
              <Edit3 className="w-5 h-5" />
            </Button>
          )}
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Profile Card */}
        <Card className="bg-gray-700 border-gray-600">
          <CardHeader className="pb-4">
            <div className="flex items-center gap-4">
              <Avatar className="w-16 h-16">
                <AvatarImage src="/placeholder.svg?height=64&width=64" />
                <AvatarFallback className="bg-orange-500 text-white text-xl font-bold">
                  {user?.name?.charAt(0).toUpperCase() || "U"}
                </AvatarFallback>
              </Avatar>
              <div>
                <h2 className="text-2xl font-bold text-white">{user?.name || "Utente"}</h2>
                <p className="text-gray-400 flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  {user?.email || "email@example.com"}
                </p>
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* BMI Card */}
        <Card className="bg-gray-700 border-gray-600">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Activity className="w-5 h-5 text-orange-500" />
              Indice di Massa Corporea (BMI)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-500 mb-2">{bmi}</div>
              <div className={`text-sm font-medium ${bmiCategory.color}`}>{bmiCategory.text}</div>
            </div>
          </CardContent>
        </Card>

        {/* Personal Data */}
        <Card className="bg-gray-700 border-gray-600">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <User className="w-5 h-5 text-orange-500" />
              Dati Personali
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Gender - Solo lettura */}
            <div className="space-y-2">
              <Label className="text-gray-300 flex items-center gap-2">
                <User className="w-4 h-4" />
                Genere
              </Label>
              <div className="text-white font-medium flex items-center gap-2">
                {userData.gender === "male" ? "Maschio" : userData.gender === "female" ? "Femmina" : "Non specificato"}
                <span className="text-xs text-gray-400 bg-gray-600 px-2 py-1 rounded">Non modificabile</span>
              </div>
            </div>

            {/* Weight */}
            <div className="space-y-2">
              <Label className="text-gray-300 flex items-center gap-2">
                <Weight className="w-4 h-4" />
                Peso (kg)
              </Label>
              {isEditing ? (
                <div className="space-y-2">
                  <Slider
                    value={[editedData.weight]}
                    onValueChange={(value) => setEditedData({ ...editedData, weight: value[0] })}
                    max={200}
                    min={30}
                    step={1}
                    className="w-full"
                  />
                  <div className="text-center text-orange-500 font-bold">{editedData.weight} kg</div>
                </div>
              ) : (
                <div className="text-white font-medium">{userData.weight} kg</div>
              )}
            </div>

            {/* Height */}
            <div className="space-y-2">
              <Label className="text-gray-300 flex items-center gap-2">
                <Ruler className="w-4 h-4" />
                Altezza (cm)
              </Label>
              {isEditing ? (
                <div className="space-y-2">
                  <Slider
                    value={[editedData.height]}
                    onValueChange={(value) => setEditedData({ ...editedData, height: value[0] })}
                    max={220}
                    min={120}
                    step={1}
                    className="w-full"
                  />
                  <div className="text-center text-orange-500 font-bold">{editedData.height} cm</div>
                </div>
              ) : (
                <div className="text-white font-medium">{userData.height} cm</div>
              )}
            </div>

            {/* Activity Level */}
            <div className="space-y-2">
              <Label className="text-gray-300 flex items-center gap-2">
                <Dumbbell className="w-4 h-4" />
                Livello di Attività
              </Label>
              {isEditing ? (
                <Select
                  value={editedData.activityLevel}
                  onValueChange={(value) => setEditedData({ ...editedData, activityLevel: value })}
                >
                  <SelectTrigger className="bg-gray-600 border-gray-500 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-600 border-gray-500">
                    {activityLevels.map((level) => (
                      <SelectItem key={level.value} value={level.value} className="text-white hover:bg-gray-500">
                        {level.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              ) : (
                <div className="text-white font-medium">
                  {activityLevels.find((level) => level.value === userData.activityLevel)?.label ||
                    userData.activityLevel}
                </div>
              )}
            </div>

            {/* Goal */}
            <div className="space-y-2">
              <Label className="text-gray-300 flex items-center gap-2">
                <Target className="w-4 h-4" />
                Obiettivo
              </Label>
              {isEditing ? (
                <Select
                  value={editedData.goal}
                  onValueChange={(value) => setEditedData({ ...editedData, goal: value })}
                >
                  <SelectTrigger className="bg-gray-600 border-gray-500 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-600 border-gray-500">
                    {goals.map((goal) => (
                      <SelectItem key={goal.value} value={goal.value} className="text-white hover:bg-gray-500">
                        {goal.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              ) : (
                <div className="text-white font-medium">
                  {goals.find((goal) => goal.value === userData.goal)?.label || userData.goal}
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Statistics Card */}
        <Card className="bg-gray-700 border-gray-600">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Activity className="w-5 h-5 text-orange-500" />
              Statistiche
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-orange-500">0</div>
                <div className="text-sm text-gray-400">Allenamenti Completati</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-orange-500">0</div>
                <div className="text-sm text-gray-400">Giorni Consecutivi</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Development Info */}
        {isEditing && (
          <Card className="bg-orange-500/10 border-orange-500/20">
            <CardContent className="p-4">
              <div className="text-sm text-orange-300">
                <p className="font-semibold mb-2">🔧 Modalità Modifica Attiva</p>
                <p>• Usa i controlli per modificare i tuoi dati</p>
                <p>• Il genere non può essere modificato per motivi di sicurezza</p>
                <p>• Clicca il pulsante salva per confermare le modifiche</p>
                <p>• Clicca la X per annullare le modifiche</p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
