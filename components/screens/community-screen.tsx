import { BottomNavigation } from "@/components/bottom-navigation"

const CommunityScreen = () => {
  return (
    <div>
      {/* Community Screen Content */}
      <h1>Community</h1>
      <p>Welcome to the community page!</p>

      {/* Bottom Navigation */}
      <div className="pb-20">{/* Existing content stays here */}</div>
      <BottomNavigation activeTab="community" onTabChange={() => {}} />
    </div>
  )
}

export default CommunityScreen
