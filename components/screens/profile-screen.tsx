"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  User,
  Target,
  Trophy,
  Activity,
  Scale,
  Ruler,
  ChevronRight,
  Bell,
  Shield,
  HelpCircle,
  LogOut,
} from "lucide-react"

export function ProfileScreen() {
  return (
    <div className="min-h-screen bg-gray-50 p-4">
      {/* Header */}
      <div className="flex items-center space-x-4 mb-6">
        <div className="w-20 h-20 bg-blue-500 rounded-full flex items-center justify-center">
          <User className="w-10 h-10 text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Marco Rossi</h1>
          <p className="text-gray-600">marco.rossi@email.com</p>
          <Badge variant="secondary" className="mt-1">
            Premium Member
          </Badge>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <Card>
          <CardContent className="p-4 text-center">
            <Trophy className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
            <p className="text-2xl font-bold">24</p>
            <p className="text-sm text-gray-600">Allenamenti</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 text-center">
            <Target className="w-8 h-8 text-green-500 mx-auto mb-2" />
            <p className="text-2xl font-bold">85%</p>
            <p className="text-sm text-gray-600">Obiettivi</p>
          </CardContent>
        </Card>
      </div>

      {/* Personal Info */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Informazioni Personali</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Scale className="w-5 h-5 text-gray-500" />
              <div>
                <p className="font-medium">Peso</p>
                <p className="text-sm text-gray-600">75 kg</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Ruler className="w-5 h-5 text-gray-500" />
              <div>
                <p className="font-medium">Altezza</p>
                <p className="text-sm text-gray-600">180 cm</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Activity className="w-5 h-5 text-gray-500" />
              <div>
                <p className="font-medium">Livello Attività</p>
                <p className="text-sm text-gray-600">Moderatamente Attivo</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Target className="w-5 h-5 text-gray-500" />
              <div>
                <p className="font-medium">Obiettivo</p>
                <p className="text-sm text-gray-600">Aumentare Massa Muscolare</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </div>
        </CardContent>
      </Card>

      {/* Settings */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Impostazioni</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Bell className="w-5 h-5 text-gray-500" />
              <span>Notifiche</span>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Shield className="w-5 h-5 text-gray-500" />
              <span>Privacy</span>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <HelpCircle className="w-5 h-5 text-gray-500" />
              <span>Aiuto e Supporto</span>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </div>
        </CardContent>
      </Card>

      {/* Logout */}
      <Button
        variant="outline"
        className="w-full flex items-center justify-center space-x-2 text-red-600 border-red-200 hover:bg-red-50 bg-transparent"
      >
        <LogOut className="w-5 h-5" />
        <span>Esci</span>
      </Button>
    </div>
  )
}
