"use client"

import { useState } from "react"
import { BottomNavigation } from "@/components/bottom-navigation"
import { HomeScreen } from "@/components/screens/home-screen"
import { MealTrackingScreen } from "@/components/screens/meal-tracking-screen"
import { ProfileScreen } from "@/components/screens/profile-screen"

export function MainApp() {
  const [activeTab, setActiveTab] = useState("home")

  const renderScreen = () => {
    switch (activeTab) {
      case "home":
        return <HomeScreen />
      case "meals":
        return <MealTrackingScreen onBack={() => setActiveTab("home")} onAddFood={() => {}} />
      case "profile":
        return <ProfileScreen />
      default:
        return <HomeScreen />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="pb-20">{renderScreen()}</div>
      <BottomNavigation activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  )
}
