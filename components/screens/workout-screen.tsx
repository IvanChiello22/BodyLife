import { BottomNavigation } from "@/components/bottom-navigation"

const WorkoutScreen = () => {
  return (
    <div>
      {/* Workout Screen Content */}
      <h1>Workout Screen</h1>
      <p>This is the workout screen content.</p>

      {/* Bottom Navigation */}
      <div className="pb-20">{/* Existing content stays here */}</div>
      <BottomNavigation activeTab="workout" onTabChange={() => {}} />
    </div>
  )
}

export default WorkoutScreen
