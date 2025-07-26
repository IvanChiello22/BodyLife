"use client"

import { useState, useEffect } from "react"

export interface User {
  id: string
  name: string
  email: string
  createdAt: string
}

export interface RegisterData {
  name: string
  email: string
  password: string
  acceptTerms: boolean
  acceptNewsletter: boolean
}

// Simulazione database utenti
const USERS_STORAGE_KEY = "gym-app-users"
const AUTH_STORAGE_KEY = "gym-app-auth"
const SESSION_DURATION = 24 * 60 * 60 * 1000 // 24 ore

interface AuthSession {
  user: User
  expiresAt: number
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  // Carica la sessione salvata
  useEffect(() => {
    const loadSession = () => {
      try {
        const savedSession = localStorage.getItem(AUTH_STORAGE_KEY)
        if (savedSession) {
          const session: AuthSession = JSON.parse(savedSession)

          // Controlla se la sessione è ancora valida
          if (session.expiresAt > Date.now()) {
            setUser(session.user)
            setIsAuthenticated(true)
          } else {
            // Sessione scaduta, rimuovi
            localStorage.removeItem(AUTH_STORAGE_KEY)
          }
        }
      } catch (error) {
        console.error("Errore nel caricamento sessione:", error)
        localStorage.removeItem(AUTH_STORAGE_KEY)
      } finally {
        setIsLoading(false)
      }
    }

    loadSession()
  }, [])

  // Salva la sessione
  const saveSession = (userData: User) => {
    const session: AuthSession = {
      user: userData,
      expiresAt: Date.now() + SESSION_DURATION,
    }
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(session))
  }

  // Ottieni tutti gli utenti
  const getUsers = (): User[] => {
    try {
      const users = localStorage.getItem(USERS_STORAGE_KEY)
      return users ? JSON.parse(users) : []
    } catch (error) {
      console.error("Errore nel caricamento utenti:", error)
      return []
    }
  }

  // Salva utenti
  const saveUsers = (users: User[]) => {
    try {
      localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users))
    } catch (error) {
      console.error("Errore nel salvataggio utenti:", error)
    }
  }

  // Login
  const login = async (email: string, password: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        try {
          const users = getUsers()
          const foundUser = users.find((u) => u.email === email)

          if (!foundUser) {
            reject(new Error("Email non trovata"))
            return
          }

          // In un'app reale, qui verificheresti la password hashata
          // Per ora simuliamo che la password sia corretta se l'utente esiste
          setUser(foundUser)
          setIsAuthenticated(true)
          saveSession(foundUser)
          resolve()
        } catch (error) {
          reject(new Error("Errore durante il login"))
        }
      }, 1000) // Simula delay di rete
    })
  }

  // Registrazione
  const register = async (userData: RegisterData): Promise<void> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        try {
          const users = getUsers()

          // Controlla se l'email esiste già
          if (users.some((u) => u.email === userData.email)) {
            reject(new Error("Email già registrata"))
            return
          }

          // Crea nuovo utente
          const newUser: User = {
            id: `user_${Date.now()}`,
            name: userData.name,
            email: userData.email,
            createdAt: new Date().toISOString(),
          }

          // Salva utente
          users.push(newUser)
          saveUsers(users)

          // Effettua login automatico
          setUser(newUser)
          setIsAuthenticated(true)
          saveSession(newUser)
          resolve()
        } catch (error) {
          reject(new Error("Errore durante la registrazione"))
        }
      }, 1000) // Simula delay di rete
    })
  }

  // Logout
  const logout = () => {
    setUser(null)
    setIsAuthenticated(false)
    localStorage.removeItem(AUTH_STORAGE_KEY)
  }

  // Reset completo (per sviluppo)
  const resetAuth = () => {
    setUser(null)
    setIsAuthenticated(false)
    localStorage.removeItem(AUTH_STORAGE_KEY)
    localStorage.removeItem(USERS_STORAGE_KEY)
  }

  return {
    user,
    isLoading,
    isAuthenticated,
    login,
    register,
    logout,
    resetAuth,
  }
}
