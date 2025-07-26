"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Eye, EyeOff, Mail, Lock, Dumbbell } from "lucide-react"

interface LoginScreenProps {
  onLogin: (email: string, password: string) => Promise<void>
  onSwitchToRegister: () => void
}

export function LoginScreen({ onLogin, onSwitchToRegister }: LoginScreenProps) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    // Validazione base
    if (!email || !password) {
      setError("Inserisci email e password")
      return
    }

    if (!email.includes("@")) {
      setError("Inserisci un'email valida")
      return
    }

    if (password.length < 6) {
      setError("La password deve essere di almeno 6 caratteri")
      return
    }

    setIsLoading(true)

    try {
      await onLogin(email, password)
    } catch (error) {
      setError(error instanceof Error ? error.message : "Errore durante il login")
    } finally {
      setIsLoading(false)
    }
  }

  const handleDemoLogin = () => {
    setEmail("demo@bodylife.com")
    setPassword("demo123")
  }

  return (
    <div className="min-h-screen bg-gray-800 flex items-center justify-center p-6">
      <Card className="w-full max-w-md bg-gray-700 border-gray-600">
        <CardHeader className="text-center">
          <div className="mx-auto w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mb-4">
            <Dumbbell className="w-8 h-8 text-white" />
          </div>
          <CardTitle className="text-2xl font-bold text-white">Bentornato!</CardTitle>
          <CardDescription className="text-gray-400">Accedi al tuo account BODYLIFE</CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email Field */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-white">
                Email
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  id="email"
                  type="email"
                  placeholder="inserisci@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 bg-gray-600 border-gray-500 text-white placeholder-gray-400 focus:border-orange-500"
                  disabled={isLoading}
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <Label htmlFor="password" className="text-white">
                Password
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 pr-10 bg-gray-600 border-gray-500 text-white placeholder-gray-400 focus:border-orange-500"
                  disabled={isLoading}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 text-gray-400 hover:text-white"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={isLoading}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </Button>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="p-3 bg-red-500/20 border border-red-500/50 rounded-md">
                <p className="text-red-400 text-sm">{error}</p>
              </div>
            )}

            {/* Login Button */}
            <Button
              type="submit"
              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  Accesso in corso...
                </div>
              ) : (
                "Accedi"
              )}
            </Button>
          </form>

          {/* Demo Login */}
          <div className="text-center">
            <Button
              variant="outline"
              onClick={handleDemoLogin}
              className="text-sm text-gray-400 border-gray-600 hover:bg-gray-600 hover:text-white bg-transparent"
              disabled={isLoading}
            >
              🚀 Usa Account Demo
            </Button>
          </div>

          {/* Forgot Password */}
          <div className="text-center">
            <Button
              variant="link"
              className="text-orange-500 hover:text-orange-400 text-sm"
              onClick={() => alert("Funzionalità in sviluppo")}
            >
              Password dimenticata?
            </Button>
          </div>

          {/* Divider */}
          <div className="relative">
            <Separator className="bg-gray-600" />
            <span className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-700 px-2 text-gray-400 text-sm">
              oppure
            </span>
          </div>

          {/* Social Login Placeholders */}
          <div className="space-y-3">
            <Button
              variant="outline"
              className="w-full border-gray-600 text-gray-300 hover:bg-gray-600 bg-transparent"
              onClick={() => alert("Login Google in sviluppo")}
              disabled={isLoading}
            >
              <div className="w-5 h-5 mr-2">🔍</div>
              Continua con Google
            </Button>
            <Button
              variant="outline"
              className="w-full border-gray-600 text-gray-300 hover:bg-gray-600 bg-transparent"
              onClick={() => alert("Login Apple in sviluppo")}
              disabled={isLoading}
            >
              <div className="w-5 h-5 mr-2">🍎</div>
              Continua con Apple
            </Button>
          </div>

          {/* Register Link */}
          <div className="text-center">
            <p className="text-gray-400 text-sm">
              Non hai un account?{" "}
              <Button
                variant="link"
                onClick={onSwitchToRegister}
                className="text-orange-500 hover:text-orange-400 p-0 h-auto font-semibold"
                disabled={isLoading}
              >
                Registrati
              </Button>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
