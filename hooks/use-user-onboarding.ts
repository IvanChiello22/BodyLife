"use client"

import { useState, useEffect } from "react"

interface UserData {
  gender: "male" | "female" | null
  activityLevel: string | null
  goal: string | null
  weight: number
  height: number
  registrationDate: string | null
}

interface OnboardingState {
  userData: UserData
  isLoading: boolean
  isFirstTime: boolean
  hasCompletedOnboarding: boolean
}

const defaultUserData: UserData = {
  gender: null,
  activityLevel: null,
  goal: null,
  weight: 70,
  height: 170,
  registrationDate: null,
}

export function useUserOnboarding() {
  const [state, setState] = useState<OnboardingState>({
    userData: defaultUserData,
    isLoading: true,
    isFirstTime: true,
    hasCompletedOnboarding: false,
  })

  // Carica i dati dal localStorage all'avvio
  useEffect(() => {
    const loadUserData = () => {
      try {
        const savedData = localStorage.getItem("gym-app-user-data")
        const onboardingComplete = localStorage.getItem("gym-app-onboarding-complete")

        if (savedData) {
          const userData = JSON.parse(savedData)
          setState({
            userData,
            isLoading: false,
            isFirstTime: false,
            hasCompletedOnboarding: onboardingComplete === "true",
          })
        } else {
          setState((prev) => ({
            ...prev,
            isLoading: false,
            isFirstTime: true,
            hasCompletedOnboarding: false,
          }))
        }
      } catch (error) {
        console.error("Errore nel caricamento dati utente:", error)
        setState((prev) => ({
          ...prev,
          isLoading: false,
          isFirstTime: true,
          hasCompletedOnboarding: false,
        }))
      }
    }

    loadUserData()
  }, [])

  // Salva i dati nel localStorage
  const saveUserData = (userData: UserData) => {
    try {
      localStorage.setItem("gym-app-user-data", JSON.stringify(userData))
    } catch (error) {
      console.error("Errore nel salvataggio dati utente:", error)
    }
  }

  // Completa l'onboarding
  const completeOnboarding = () => {
    const now = new Date().toISOString()
    const updatedUserData = {
      ...state.userData,
      registrationDate: state.userData.registrationDate || now,
    }

    saveUserData(updatedUserData)
    localStorage.setItem("gym-app-onboarding-complete", "true")

    setState((prev) => ({
      ...prev,
      userData: updatedUserData,
      hasCompletedOnboarding: true,
      isFirstTime: false,
    }))
  }

  // Reset onboarding (per testing)
  const resetOnboarding = () => {
    localStorage.removeItem("gym-app-user-data")
    localStorage.removeItem("gym-app-onboarding-complete")
    localStorage.removeItem("gym-app-meals-data")
    localStorage.removeItem("gym-app-workouts-data")

    setState({
      userData: defaultUserData,
      isLoading: false,
      isFirstTime: true,
      hasCompletedOnboarding: false,
    })
  }

  // Aggiorna singoli campi
  const updateGender = (gender: "male" | "female") => {
    const updatedUserData = { ...state.userData, gender }
    setState((prev) => ({ ...prev, userData: updatedUserData }))
    saveUserData(updatedUserData)
  }

  const updateActivityLevel = (activityLevel: string) => {
    const updatedUserData = { ...state.userData, activityLevel }
    setState((prev) => ({ ...prev, userData: updatedUserData }))
    saveUserData(updatedUserData)
  }

  const updateGoal = (goal: string) => {
    const updatedUserData = { ...state.userData, goal }
    setState((prev) => ({ ...prev, userData: updatedUserData }))
    saveUserData(updatedUserData)
  }

  const updateWeight = (weight: number) => {
    const updatedUserData = { ...state.userData, weight }
    setState((prev) => ({ ...prev, userData: updatedUserData }))
    saveUserData(updatedUserData)
  }

  const updateHeight = (height: number) => {
    const updatedUserData = { ...state.userData, height }
    setState((prev) => ({ ...prev, userData: updatedUserData }))
    saveUserData(updatedUserData)
  }

  const updateAllUserData = (newData: Partial<UserData>) => {
    const updatedUserData = { ...state.userData, ...newData }
    setState((prev) => ({ ...prev, userData: updatedUserData }))
    saveUserData(updatedUserData)
  }

  return {
    ...state,
    completeOnboarding,
    resetOnboarding,
    updateGender,
    updateActivityLevel,
    updateGoal,
    updateWeight,
    updateHeight,
    updateAllUserData,
  }
}
