export interface Exercise {
  name: string
  sets: string
  reps: string
  rest: string
  notes?: string
}

export interface WorkoutLevel {
  level: "Beginner" | "Intermediate" | "Advanced"
  goal: string
  frequency: string
  days: Record<string, Exercise[]>
}

export const workoutsData = {
  gym: [
    {
      level: "Beginner",
      goal: "Learn form, build consistency, activate all muscle groups.",
      frequency: "3 days/week",
      schedule: "Monday / Wednesday / Friday",
      days: {
        "Day 1-3": [
          { name: "Bench Press (Barbell or Dumbbell)", sets: "3", reps: "10–12", rest: "60s" },
          { name: "Lat Pulldown or Assisted Pull-up", sets: "3", reps: "10–12", rest: "60s" },
          { name: "Leg Press or Bodyweight Squat", sets: "3", reps: "12–15", rest: "60s" },
          { name: "Dumbbell Shoulder Press", sets: "3", reps: "10–12", rest: "45s" },
          { name: "Dumbbell Curl", sets: "3", reps: "12", rest: "45s" },
          { name: "Cable Pushdown", sets: "3", reps: "12", rest: "45s" },
          { name: "Plank", sets: "3", reps: "30–45s", rest: "30s" },
        ],
      },
    },
    {
      level: "Intermediate",
      goal: "Strength + muscle growth, start progressive overload.",
      frequency: "4 days/week",
      days: {
        "Day 1 - Upper Body (Push Focus)": [
          { name: "Bench Press", sets: "4", reps: "8–10", rest: "90s" },
          { name: "Incline Dumbbell Press", sets: "3", reps: "10–12", rest: "60s" },
          { name: "Overhead Shoulder Press", sets: "3", reps: "10", rest: "60s" },
          { name: "Tricep Dips", sets: "3", reps: "12", rest: "45s" },
          { name: "Lateral Raises", sets: "3", reps: "15", rest: "45s" },
        ],
        "Day 2 - Lower Body": [
          { name: "Squats", sets: "4", reps: "8–10", rest: "90s" },
          { name: "Romanian Deadlift", sets: "3", reps: "10", rest: "60s" },
          { name: "Leg Press", sets: "3", reps: "12", rest: "60s" },
          { name: "Calf Raises", sets: "4", reps: "15–20", rest: "45s" },
          { name: "Hanging Leg Raise", sets: "3", reps: "15", rest: "45s" },
        ],
        "Day 3 - Rest": [],
        "Day 4 - Upper Body (Pull Focus)": [
          { name: "Pull-Ups or Lat Pulldown", sets: "4", reps: "8–10", rest: "90s" },
          { name: "Barbell Row", sets: "3", reps: "10", rest: "60s" },
          { name: "Seated Cable Row", sets: "3", reps: "12", rest: "60s" },
          { name: "Bicep Curl", sets: "3", reps: "10–12", rest: "45s" },
          { name: "Rear Delt Fly", sets: "3", reps: "15", rest: "45s" },
        ],
        "Day 5 - Lower Body (Strength)": [
          { name: "Deadlift", sets: "4", reps: "5–6", rest: "120s" },
          { name: "Front Squat or Hack Squat", sets: "3", reps: "8", rest: "90s" },
          { name: "Walking Lunges", sets: "3", reps: "20 steps", rest: "60s" },
          { name: "Leg Curl", sets: "3", reps: "12", rest: "45s" },
          { name: "Plank with Shoulder Tap", sets: "3", reps: "45s", rest: "45s" },
        ],
      },
    },
    {
      level: "Advanced",
      goal: "Optimize growth, intensity, and specialization.",
      frequency: "6 days/week",
      days: {
        "Day 1 - Push (Chest/Shoulders/Triceps)": [
          { name: "Barbell Bench Press", sets: "4", reps: "6–8", rest: "120s" },
          { name: "Incline Dumbbell Press", sets: "3", reps: "10", rest: "90s" },
          { name: "Overhead Press", sets: "3", reps: "8", rest: "90s" },
          { name: "Dumbbell Lateral Raises", sets: "4", reps: "15", rest: "60s" },
          { name: "Triceps Rope Extension", sets: "3", reps: "12", rest: "60s" },
        ],
        "Day 2 - Pull (Back/Biceps)": [
          { name: "Weighted Pull-Up", sets: "4", reps: "6–8", rest: "120s" },
          { name: "Barbell Row", sets: "4", reps: "8–10", rest: "120s" },
          { name: "Seated Row", sets: "3", reps: "10", rest: "90s" },
          { name: "Face Pull", sets: "3", reps: "15", rest: "60s" },
          { name: "Barbell Curl", sets: "3", reps: "10", rest: "60s" },
          { name: "Hammer Curl", sets: "3", reps: "12", rest: "60s" },
        ],
        "Day 3 - Legs (Quads/Hamstrings/Glutes/Core)": [
          { name: "Squats", sets: "4", reps: "6–8", rest: "120s" },
          { name: "Romanian Deadlift", sets: "3", reps: "10", rest: "90s" },
          { name: "Leg Press", sets: "3", reps: "12", rest: "90s" },
          { name: "Walking Lunge", sets: "3", reps: "20 steps", rest: "60s" },
          { name: "Hanging Leg Raise", sets: "3", reps: "15–20", rest: "60s" },
        ],
        "Day 4-6 - Repeat": [
          { name: "Repeat Days 1-3 (same pattern, vary weight or intensity)", sets: "—", reps: "—", rest: "—" },
        ],
        "Sunday - Rest": [
          { name: "Rest or active recovery (stretching, walk, yoga)", sets: "—", reps: "—", rest: "—" },
        ],
      },
    },
  ],
  home: [
    {
      level: "Beginner",
      goal: "Build habit, endurance, and core strength.",
      frequency: "3 days/week",
      days: {
        "Day 1-3": [
          { name: "Bodyweight Squats", sets: "3", reps: "15", rest: "45s", notes: "Controlled pace" },
          { name: "Push-Ups (Knee if needed)", sets: "3", reps: "10–12", rest: "45s", notes: "Chest focus" },
          { name: "Glute Bridge", sets: "3", reps: "15", rest: "45s", notes: "Squeeze at top" },
          { name: "Plank", sets: "3", reps: "30s", rest: "30s", notes: "Core" },
          { name: "Superman Hold", sets: "3", reps: "15s", rest: "30s", notes: "Lower back" },
          { name: "Standing Calf Raises", sets: "3", reps: "20", rest: "30s", notes: "Full stretch" },
        ],
      },
    },
    {
      level: "Intermediate",
      goal: "Build strength and explosive power.",
      frequency: "4 days/week",
      days: {
        "Day 1 - Upper (Push)": [
          { name: "Regular Push-Ups", sets: "4", reps: "15", rest: "60s" },
          { name: "Pike Push-Ups", sets: "3", reps: "12", rest: "45s" },
          { name: "Triceps Dips (chair)", sets: "3", reps: "12", rest: "45s" },
          { name: "Shoulder Taps", sets: "3", reps: "20", rest: "45s" },
        ],
        "Day 2 - Lower": [
          { name: "Jump Squats", sets: "4", reps: "15", rest: "60s" },
          { name: "Bulgarian Split Squats", sets: "3", reps: "12/leg", rest: "60s" },
          { name: "Glute Bridge", sets: "3", reps: "20", rest: "45s" },
          { name: "Calf Raises", sets: "3", reps: "25", rest: "45s" },
          { name: "Plank", sets: "3", reps: "45s", rest: "45s" },
        ],
        "Day 4 - Upper (Pull/Core focus)": [
          { name: "Inverted Row (under table or band)", sets: "4", reps: "10", rest: "90s" },
          { name: "Resistance Band Rows", sets: "3", reps: "15", rest: "60s" },
          { name: "Bicep Curl (band or water bottle)", sets: "3", reps: "15", rest: "45s" },
          { name: "Flutter Kicks", sets: "3", reps: "30s", rest: "45s" },
        ],
        "Day 5 - Lower/Explosive": [
          { name: "Lunge Jumps", sets: "3", reps: "20", rest: "60s" },
          { name: "Wall Sit", sets: "3", reps: "45s", rest: "45s" },
          { name: "Step-Ups (chair)", sets: "3", reps: "12/leg", rest: "45s" },
          { name: "Mountain Climbers", sets: "3", reps: "30s", rest: "45s" },
        ],
      },
    },
    {
      level: "Advanced",
      goal: "Maximize strength and conditioning at home.",
      frequency: "5–6 days/week",
      days: {
        "Day 1 - Push": [
          { name: "Decline Push-Ups", sets: "4", reps: "15", rest: "60s" },
          { name: "Pike Push-Ups", sets: "4", reps: "12", rest: "60s" },
          { name: "Diamond Push-Ups", sets: "3", reps: "12", rest: "45s" },
          { name: "Dips (chair)", sets: "3", reps: "15", rest: "60s" },
        ],
        "Day 2 - Pull/Core": [
          { name: "Inverted Row or Doorway Row", sets: "4", reps: "10", rest: "90s" },
          { name: "Band Face Pulls", sets: "3", reps: "15", rest: "60s" },
          { name: "Band Curls", sets: "3", reps: "15", rest: "60s" },
          { name: "Plank to Push-Up", sets: "3", reps: "45s", rest: "60s" },
          { name: "Side Plank", sets: "3", reps: "30s/side", rest: "45s" },
        ],
        "Day 3 - Legs (Strength)": [
          { name: "Pistol Squat (or Assisted)", sets: "3", reps: "10/leg", rest: "90s" },
          { name: "Jump Squat", sets: "4", reps: "12", rest: "60s" },
          { name: "Bulgarian Split Squat", sets: "3", reps: "12/leg", rest: "60s" },
          { name: "Calf Raises", sets: "4", reps: "25", rest: "45s" },
        ],
        "Day 4 - Core Focus (Optional)": [
          { name: "Leg Raises", sets: "3", reps: "15", rest: "45s" },
          { name: "Russian Twists", sets: "3", reps: "30", rest: "45s" },
          { name: "V-Ups", sets: "3", reps: "15", rest: "45s" },
          { name: "Plank", sets: "3", reps: "60s", rest: "60s" },
        ],
        "Day 5 - Full Body/Cardio": [
          { name: "Burpees", sets: "4", reps: "15", rest: "60s" },
          { name: "Jump Lunges", sets: "3", reps: "20", rest: "60s" },
          { name: "Push-Up + Shoulder Tap", sets: "3", reps: "15", rest: "60s" },
          { name: "Mountain Climbers", sets: "3", reps: "40s", rest: "45s" },
        ],
      },
    },
  ],
}
