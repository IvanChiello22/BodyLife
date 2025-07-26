"use client"

import { useState } from "react"
import { SplashScreenUpdated } from "@/components/splash-screen-updated"
import { LoginScreen } from "@/components/screens/login-screen"
import { RegisterScreen } from "@/components/screens/register-screen"
import { WelcomeScreen } from "@/components/welcome-screen"
import { GenderSelectionScreen } from "@/components/gender-selection-screen"
import { ActivityLevelScreen } from "@/components/activity-level-screen"
import { GoalsSelectionScreen } from "@/components/goals-selection-screen"
import { WeightSelectionScreen } from "@/components/weight-selection-screen"
import { HeightSelectionScreen } from "@/components/height-selection-screen"
import { MealTrackingScreen } from "@/components/screens/meal-tracking-screen"
import { AddFoodScreen } from "@/components/screens/add-food-screen"
import { WorkoutSelectionScreen } from "@/components/screens/workout-selection-screen"
import { WorkoutExercisesScreen } from "@/components/screens/workout-exercises-screen"
import { ExerciseDetailScreen } from "@/components/screens/exercise-detail-screen"
import { VideoTutorialScreen } from "@/components/screens/video-tutorial-screen"
import { HomeDashboardWithReset } from "@/components/home-dashboard-with-reset"
import { useUserOnboarding } from "@/hooks/use-user-onboarding"
import { useAuth } from "@/hooks/use-auth"
import { PersonalAreaScreen } from "@/components/screens/personal-area-screen"

export default function Home() {
  const [currentScreen, setCurrentScreen] = useState("splash")
  const [showMealTracking, setShowMealTracking] = useState(false)
  const [showAddFood, setShowAddFood] = useState(false)
  const [showWorkoutSelection, setShowWorkoutSelection] = useState(false)
  const [showWorkoutExercises, setShowWorkoutExercises] = useState(false)
  const [showExerciseDetail, setShowExerciseDetail] = useState(false)
  const [showVideoTutorial, setShowVideoTutorial] = useState(false)
  const [selectedWorkoutType, setSelectedWorkoutType] = useState<string>("")
  const [selectedExerciseId, setSelectedExerciseId] = useState<string>("")
  const [showPersonalArea, setShowPersonalArea] = useState(false)

  const {
    userData,
    isLoading: isOnboardingLoading,
    isFirstTime,
    hasCompletedOnboarding,
    completeOnboarding,
    resetOnboarding,
    updateGender,
    updateActivityLevel,
    updateGoal,
    updateWeight,
    updateHeight,
  } = useUserOnboarding()

  const { user, isLoading: isAuthLoading, isAuthenticated, login, register, logout, resetAuth } = useAuth()

  // Gestisce il completamento dello splash screen
  const handleSplashComplete = () => {
    if (!isAuthenticated) {
      setCurrentScreen("login")
    } else if (isFirstTime || !hasCompletedOnboarding) {
      setCurrentScreen("welcome")
    } else {
      setCurrentScreen("home-dashboard")
    }
  }

  // Gestisce il login
  const handleLogin = async (email: string, password: string) => {
    try {
      await login(email, password)
      // Dopo il login, controlla se deve fare l'onboarding
      if (isFirstTime || !hasCompletedOnboarding) {
        setCurrentScreen("welcome")
      } else {
        setCurrentScreen("home-dashboard")
      }
    } catch (error) {
      console.error("Errore durante il login:", error)
      alert("Errore durante il login. Riprova.")
    }
  }

  // Gestisce la registrazione
  const handleRegister = async (userData: {
    name: string
    email: string
    password: string
    acceptTerms: boolean
    acceptNewsletter: boolean
  }) => {
    try {
      await register(userData)
      // Dopo la registrazione, vai sempre all'onboarding
      setCurrentScreen("welcome")
    } catch (error) {
      console.error("Errore durante la registrazione:", error)
      alert("Errore durante la registrazione. Riprova.")
    }
  }

  // Gestisce la navigazione nell'onboarding
  const handleNext = () => {
    if (currentScreen === "welcome") {
      setCurrentScreen("gender-selection")
    } else if (currentScreen === "gender-selection") {
      setCurrentScreen("activity-level")
    } else if (currentScreen === "activity-level") {
      setCurrentScreen("goals-selection")
    } else if (currentScreen === "goals-selection") {
      setCurrentScreen("weight-selection")
    } else if (currentScreen === "weight-selection") {
      setCurrentScreen("height-selection")
    } else if (currentScreen === "height-selection") {
      // Completa l'onboarding e vai alla home
      completeOnboarding()
      setCurrentScreen("home-dashboard")
    }
  }

  const handleBack = () => {
    if (currentScreen === "gender-selection") {
      setCurrentScreen("welcome")
    } else if (currentScreen === "activity-level") {
      setCurrentScreen("gender-selection")
    } else if (currentScreen === "goals-selection") {
      setCurrentScreen("activity-level")
    } else if (currentScreen === "weight-selection") {
      setCurrentScreen("goals-selection")
    } else if (currentScreen === "height-selection") {
      setCurrentScreen("weight-selection")
    }
  }

  // Handlers per l'aggiornamento dei dati utente
  const handleGenderSelect = (gender: "male" | "female") => {
    updateGender(gender)
  }

  const handleActivityLevelSelect = (level: string) => {
    updateActivityLevel(level)
  }

  const handleGoalSelect = (goal: string) => {
    updateGoal(goal)
  }

  const handleWeightSelect = (weight: number) => {
    updateWeight(weight)
  }

  const handleHeightSelect = (height: number) => {
    updateHeight(height)
  }

  // Reset completo (solo per testing)
  const handleResetOnboarding = () => {
    resetOnboarding()
    resetAuth()
    setCurrentScreen("splash")
    // Reset anche gli stati delle schermate
    setShowMealTracking(false)
    setShowAddFood(false)
    setShowWorkoutSelection(false)
    setShowWorkoutExercises(false)
    setShowExerciseDetail(false)
    setShowVideoTutorial(false)
    setShowPersonalArea(false)
  }

  // Logout
  const handleLogout = () => {
    logout()
    setCurrentScreen("login")
    // Reset anche gli stati delle schermate
    setShowMealTracking(false)
    setShowAddFood(false)
    setShowWorkoutSelection(false)
    setShowWorkoutExercises(false)
    setShowExerciseDetail(false)
    setShowVideoTutorial(false)
    setShowPersonalArea(false)
  }

  const handleNavigateToPersonalArea = () => {
    setShowPersonalArea(true)
    setShowMealTracking(false)
    setShowAddFood(false)
    setShowWorkoutSelection(false)
    setShowWorkoutExercises(false)
    setShowExerciseDetail(false)
    setShowVideoTutorial(false)
  }

  const handleBackFromPersonalArea = () => {
    setShowPersonalArea(false)
  }

  // Navigation handlers per le funzionalità principali
  const handleNavigateToMealTracking = () => {
    setShowMealTracking(true)
    setShowAddFood(false)
    setShowWorkoutSelection(false)
    setShowWorkoutExercises(false)
    setShowExerciseDetail(false)
    setShowVideoTutorial(false)
  }

  const handleNavigateToWorkoutSelection = () => {
    setShowWorkoutSelection(true)
    setShowMealTracking(false)
    setShowAddFood(false)
    setShowWorkoutExercises(false)
    setShowExerciseDetail(false)
    setShowVideoTutorial(false)
  }

  const handleWorkoutSelect = (workoutType: string) => {
    setSelectedWorkoutType(workoutType)
    setShowWorkoutExercises(true)
    setShowWorkoutSelection(false)
  }

  const handleExerciseSelect = (exerciseId: string) => {
    setSelectedExerciseId(exerciseId)
    setShowExerciseDetail(true)
    setShowWorkoutExercises(false)
  }

  const handleWatchVideo = () => {
    setShowVideoTutorial(true)
    setShowExerciseDetail(false)
  }

  const handleBackFromMealTracking = () => {
    setShowMealTracking(false)
    setShowAddFood(false)
  }

  const handleBackFromWorkoutSelection = () => {
    setShowWorkoutSelection(false)
  }

  const handleBackFromWorkoutExercises = () => {
    setShowWorkoutExercises(false)
    setShowWorkoutSelection(true)
  }

  const handleBackFromExerciseDetail = () => {
    setShowExerciseDetail(false)
    setShowWorkoutExercises(true)
  }

  const handleBackFromVideoTutorial = () => {
    setShowVideoTutorial(false)
    setShowExerciseDetail(true)
  }

  const handleNavigateToAddFood = () => {
    setShowAddFood(true)
  }

  const handleBackFromAddFood = () => {
    setShowAddFood(false)
  }

  // Mostra loading mentre carica i dati
  if (isAuthLoading || isOnboardingLoading) {
    return <SplashScreenUpdated onComplete={() => {}} />
  }

  // Screen routing logic
  if (currentScreen === "splash") {
    return <SplashScreenUpdated onComplete={handleSplashComplete} />
  }

  // Auth screens
  if (currentScreen === "login") {
    return <LoginScreen onLogin={handleLogin} onSwitchToRegister={() => setCurrentScreen("register")} />
  }

  if (currentScreen === "register") {
    return <RegisterScreen onRegister={handleRegister} onSwitchToLogin={() => setCurrentScreen("login")} />
  }

  if (currentScreen === "home-dashboard") {
    // Personal Area Screen
    if (showPersonalArea) {
      return (
        <PersonalAreaScreen
          onBack={handleBackFromPersonalArea}
          userData={userData}
          user={user}
          onUpdateUserData={{ updateGender, updateActivityLevel, updateGoal, updateWeight, updateHeight }}
        />
      )
    }

    // Video Tutorial Screen
    if (showVideoTutorial) {
      return <VideoTutorialScreen exerciseId={selectedExerciseId} onBack={handleBackFromVideoTutorial} />
    }

    // Exercise Detail Screen
    if (showExerciseDetail) {
      return (
        <ExerciseDetailScreen
          exerciseId={selectedExerciseId}
          workoutType={selectedWorkoutType}
          onBack={handleBackFromExerciseDetail}
          onWatchVideo={handleWatchVideo}
        />
      )
    }

    // Workout Exercises Screen
    if (showWorkoutExercises) {
      return (
        <WorkoutExercisesScreen
          workoutType={selectedWorkoutType}
          onBack={handleBackFromWorkoutExercises}
          onExerciseSelect={handleExerciseSelect}
        />
      )
    }

    // Workout Selection Screen
    if (showWorkoutSelection) {
      return <WorkoutSelectionScreen onBack={handleBackFromWorkoutSelection} onWorkoutSelect={handleWorkoutSelect} />
    }

    // Add Food Screen
    if (showMealTracking && showAddFood) {
      return <AddFoodScreen onBack={handleBackFromAddFood} />
    }

    // Meal Tracking Screen
    if (showMealTracking) {
      return <MealTrackingScreen onBack={handleBackFromMealTracking} onAddFood={handleNavigateToAddFood} />
    }

    // Home Dashboard
    return (
      <HomeDashboardWithReset
        onNavigateToMealTracking={handleNavigateToMealTracking}
        onNavigateToWorkoutSelection={handleNavigateToWorkoutSelection}
        onNavigateToPersonalArea={handleNavigateToPersonalArea}
        onResetOnboarding={handleResetOnboarding}
        onLogout={handleLogout}
        userName={user?.name || "Utente"}
      />
    )
  }

  // Onboarding screens
  if (currentScreen === "welcome") {
    return <WelcomeScreen onNext={handleNext} />
  }

  if (currentScreen === "gender-selection") {
    return (
      <GenderSelectionScreen
        selectedGender={userData.gender}
        onGenderSelect={handleGenderSelect}
        onNext={handleNext}
        onBack={handleBack}
      />
    )
  }

  if (currentScreen === "activity-level") {
    return (
      <ActivityLevelScreen
        selectedLevel={userData.activityLevel}
        onLevelSelect={handleActivityLevelSelect}
        onNext={handleNext}
        onBack={handleBack}
      />
    )
  }

  if (currentScreen === "goals-selection") {
    return (
      <GoalsSelectionScreen
        selectedGoal={userData.goal}
        onGoalSelect={handleGoalSelect}
        onNext={handleNext}
        onBack={handleBack}
      />
    )
  }

  if (currentScreen === "weight-selection") {
    return (
      <WeightSelectionScreen
        selectedWeight={userData.weight}
        onWeightSelect={handleWeightSelect}
        onNext={handleNext}
        onBack={handleBack}
      />
    )
  }

  if (currentScreen === "height-selection") {
    return (
      <HeightSelectionScreen
        selectedHeight={userData.height}
        onHeightSelect={handleHeightSelect}
        onNext={handleNext}
        onBack={handleBack}
      />
    )
  }

  return <SplashScreenUpdated onComplete={handleSplashComplete} />
}
