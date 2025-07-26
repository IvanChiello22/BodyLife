"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"
import { Eye, EyeOff, Mail, Lock, User, Dumbbell } from "lucide-react"

interface RegisterScreenProps {
  onRegister: (userData: {
    name: string
    email: string
    password: string
    acceptTerms: boolean
    acceptNewsletter: boolean
  }) => Promise<void>
  onSwitchToLogin: () => void
}

export function RegisterScreen({ onRegister, onSwitchToLogin }: RegisterScreenProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    acceptTerms: false,
    acceptNewsletter: false,
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    setError("") // Clear error when user types
  }

  const validateForm = () => {
    if (!formData.name.trim()) {
      return "Inserisci il tuo nome"
    }
    if (formData.name.trim().length < 2) {
      return "Il nome deve essere di almeno 2 caratteri"
    }
    if (!formData.email) {
      return "Inserisci un'email"
    }
    if (!formData.email.includes("@") || !formData.email.includes(".")) {
      return "Inserisci un'email valida"
    }
    if (!formData.password) {
      return "Inserisci una password"
    }
    if (formData.password.length < 6) {
      return "La password deve essere di almeno 6 caratteri"
    }
    if (formData.password !== formData.confirmPassword) {
      return "Le password non coincidono"
    }
    if (!formData.acceptTerms) {
      return "Devi accettare i termini e condizioni"
    }
    return null
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    const validationError = validateForm()
    if (validationError) {
      setError(validationError)
      return
    }

    setIsLoading(true)

    try {
      await onRegister({
        name: formData.name.trim(),
        email: formData.email.toLowerCase().trim(),
        password: formData.password,
        acceptTerms: formData.acceptTerms,
        acceptNewsletter: formData.acceptNewsletter,
      })
    } catch (error) {
      setError(error instanceof Error ? error.message : "Errore durante la registrazione")
    } finally {
      setIsLoading(false)
    }
  }

  const handleDemoRegister = () => {
    setFormData({
      name: "Demo User",
      email: "demo@bodylife.com",
      password: "demo123",
      confirmPassword: "demo123",
      acceptTerms: true,
      acceptNewsletter: false,
    })
  }

  return (
    <div className="min-h-screen bg-gray-800 flex items-center justify-center p-6">
      <Card className="w-full max-w-md bg-gray-700 border-gray-600">
        <CardHeader className="text-center">
          <div className="mx-auto w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mb-4">
            <Dumbbell className="w-8 h-8 text-white" />
          </div>
          <CardTitle className="text-2xl font-bold text-white">Unisciti a BODYLIFE</CardTitle>
          <CardDescription className="text-gray-400">
            Crea il tuo account e inizia il tuo percorso fitness
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name Field */}
            <div className="space-y-2">
              <Label htmlFor="name" className="text-white">
                Nome completo
              </Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  id="name"
                  type="text"
                  placeholder="Il tuo nome"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  className="pl-10 bg-gray-600 border-gray-500 text-white placeholder-gray-400 focus:border-orange-500"
                  disabled={isLoading}
                />
              </div>
            </div>

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
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
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
                  value={formData.password}
                  onChange={(e) => handleInputChange("password", e.target.value)}
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

            {/* Confirm Password Field */}
            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-white">
                Conferma Password
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={formData.confirmPassword}
                  onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                  className="pl-10 pr-10 bg-gray-600 border-gray-500 text-white placeholder-gray-400 focus:border-orange-500"
                  disabled={isLoading}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 text-gray-400 hover:text-white"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  disabled={isLoading}
                >
                  {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </Button>
              </div>
            </div>

            {/* Terms and Newsletter */}
            <div className="space-y-3">
              <div className="flex items-start space-x-2">
                <Checkbox
                  id="terms"
                  checked={formData.acceptTerms}
                  onCheckedChange={(checked) => handleInputChange("acceptTerms", checked as boolean)}
                  className="border-gray-500 data-[state=checked]:bg-orange-500 data-[state=checked]:border-orange-500"
                  disabled={isLoading}
                />
                <Label htmlFor="terms" className="text-sm text-gray-300 leading-relaxed">
                  Accetto i{" "}
                  <Button
                    variant="link"
                    className="text-orange-500 hover:text-orange-400 p-0 h-auto text-sm"
                    onClick={() => alert("Termini e condizioni in sviluppo")}
                  >
                    termini e condizioni
                  </Button>{" "}
                  e la{" "}
                  <Button
                    variant="link"
                    className="text-orange-500 hover:text-orange-400 p-0 h-auto text-sm"
                    onClick={() => alert("Privacy policy in sviluppo")}
                  >
                    privacy policy
                  </Button>
                </Label>
              </div>

              <div className="flex items-start space-x-2">
                <Checkbox
                  id="newsletter"
                  checked={formData.acceptNewsletter}
                  onCheckedChange={(checked) => handleInputChange("acceptNewsletter", checked as boolean)}
                  className="border-gray-500 data-[state=checked]:bg-orange-500 data-[state=checked]:border-orange-500"
                  disabled={isLoading}
                />
                <Label htmlFor="newsletter" className="text-sm text-gray-300">
                  Voglio ricevere aggiornamenti e offerte via email
                </Label>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="p-3 bg-red-500/20 border border-red-500/50 rounded-md">
                <p className="text-red-400 text-sm">{error}</p>
              </div>
            )}

            {/* Register Button */}
            <Button
              type="submit"
              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  Registrazione in corso...
                </div>
              ) : (
                "Crea Account"
              )}
            </Button>
          </form>

          {/* Demo Register */}
          <div className="text-center">
            <Button
              variant="outline"
              onClick={handleDemoRegister}
              className="text-sm text-gray-400 border-gray-600 hover:bg-gray-600 hover:text-white bg-transparent"
              disabled={isLoading}
            >
              🚀 Compila con Dati Demo
            </Button>
          </div>

          {/* Divider */}
          <div className="relative">
            <Separator className="bg-gray-600" />
            <span className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-700 px-2 text-gray-400 text-sm">
              oppure
            </span>
          </div>

          {/* Social Register Placeholders */}
          <div className="space-y-3">
            <Button
              variant="outline"
              className="w-full border-gray-600 text-gray-300 hover:bg-gray-600 bg-transparent"
              onClick={() => alert("Registrazione Google in sviluppo")}
              disabled={isLoading}
            >
              <div className="w-5 h-5 mr-2">🔍</div>
              Registrati con Google
            </Button>
            <Button
              variant="outline"
              className="w-full border-gray-600 text-gray-300 hover:bg-gray-600 bg-transparent"
              onClick={() => alert("Registrazione Apple in sviluppo")}
              disabled={isLoading}
            >
              <div className="w-5 h-5 mr-2">🍎</div>
              Registrati con Apple
            </Button>
          </div>

          {/* Login Link */}
          <div className="text-center">
            <p className="text-gray-400 text-sm">
              Hai già un account?{" "}
              <Button
                variant="link"
                onClick={onSwitchToLogin}
                className="text-orange-500 hover:text-orange-400 p-0 h-auto font-semibold"
                disabled={isLoading}
              >
                Accedi
              </Button>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
