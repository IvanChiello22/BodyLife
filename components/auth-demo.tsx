"use client"

import { useState } from "react"
import { LoginScreen } from "@/components/screens/login-screen"
import { RegisterScreen } from "@/components/screens/register-screen"

export function AuthDemo() {
  const [currentScreen, setCurrentScreen] = useState<"login" | "register">("login")

  const handleLogin = (email: string, password: string) => {
    console.log("Login:", { email, password })
    // Qui andresti alla dashboard principale
    alert(`Login effettuato con: ${email}`)
  }

  const handleRegister = (userData: {
    name: string
    email: string
    password: string
    acceptTerms: boolean
    acceptNewsletter: boolean
  }) => {
    console.log("Register:", userData)
    // Qui andresti alla dashboard principale o al completamento profilo
    alert(`Registrazione effettuata per: ${userData.name} (${userData.email})`)
  }

  if (currentScreen === "login") {
    return <LoginScreen onLogin={handleLogin} onSwitchToRegister={() => setCurrentScreen("register")} />
  }

  return <RegisterScreen onRegister={handleRegister} onSwitchToLogin={() => setCurrentScreen("login")} />
}
