export const mockUser = {
  id: 1,
  name: "Marco Rossi",
  email: "marco.rossi@email.com",
  avatar: "/placeholder.svg?height=80&width=80",
  level: 3,
  isPremium: true,
  joinDate: "2024-01-15",
  bio: "Ogni giorno è una nuova opportunità per migliorare! 💪",
  stats: {
    totalWorkouts: 47,
    activeDays: 23,
    caloriesBurned: 12500,
    currentStreak: 5,
  },
}

export const mockWorkouts = [
  {
    id: 1,
    title: "HIIT Cardio Blast",
    duration: 30,
    difficulty: "Intermedio",
    category: "Cardio",
    participants: 156,
    description: "Un allenamento cardio ad alta intensità per bruciare calorie",
    exercises: [
      { name: "Jumping Jacks", duration: 45, rest: 15 },
      { name: "Burpees", duration: 30, rest: 30 },
      { name: "Mountain Climbers", duration: 45, rest: 15 },
    ],
  },
  {
    id: 2,
    title: "Strength Training",
    duration: 45,
    difficulty: "Avanzato",
    category: "Forza",
    participants: 89,
    description: "Allenamento completo per la forza muscolare",
    exercises: [
      { name: "Squat", sets: 4, reps: 12, rest: 60 },
      { name: "Deadlift", sets: 4, reps: 8, rest: 90 },
      { name: "Bench Press", sets: 4, reps: 10, rest: 60 },
    ],
  },
]

export const mockCommunityPosts = [
  {
    id: 1,
    user: {
      name: "Sarah Johnson",
      avatar: "SJ",
      verified: true,
    },
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
    content: "Appena finito un workout incredibile! 💪 45 minuti di HIIT e mi sento fantastica!",
    image: "/placeholder.svg?height=200&width=400",
    likes: 24,
    comments: 8,
    liked: false,
  },
  {
    id: 2,
    user: {
      name: "Mike Chen",
      avatar: "MC",
      verified: false,
    },
    timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
    content: "Nuovo PR sui deadlift oggi! 180kg × 3 reps. Il duro lavoro paga sempre 🔥",
    likes: 31,
    comments: 12,
    liked: true,
  },
]
