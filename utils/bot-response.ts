export function generateBotResponse(userInput: string): string {
  const input = userInput.toLowerCase().trim()

  // Calorie and nutrition-related responses
  const calorieResponses: { [key: string]: string[] } = {
    calorie: [
      "Great question! Daily calorie intake depends on your age, gender, activity level, and goals. Most adults need 2000-2500 calories daily. Would you like me to calculate a personalized recommendation?",
      "Calorie tracking is key to achieving your fitness goals! Are you looking to lose, maintain, or gain weight? I can help you determine your target intake.",
    ],
    meal: [
      "Meal planning is essential for consistent nutrition! I'd love to help create a plan tailored to your goals. What's your target calorie intake?",
      "Smart meal choices fuel your fitness journey! Do you have any dietary preferences or restrictions I should know about?",
    ],
    exercise: [
      "Exercise burns calories and builds strength! A 5km run typically burns 300-500 calories depending on your weight and pace. Want to know about other exercises?",
      "Great! Exercise is crucial for your fitness journey. What type of workout are you planning? I can estimate the calories burned!",
    ],
    protein: [
      "Protein is essential for muscle recovery and growth! Most people need 0.8-1g per pound of body weight. What are your favorite protein sources?",
      "Protein helps you feel fuller longer and supports muscle growth. Good sources include chicken, fish, eggs, legumes, and Greek yogurt!",
    ],
    snack: [
      "Smart snacking can support your fitness goals! Great pre-workout options include bananas, nuts, or Greek yogurt. What are your favorite snacks?",
      "Healthy snacks include nuts, fruit, yogurt, and protein bars. What's your favorite go-to snack?",
    ],
  }

  // Check for matching keywords and return appropriate response
  for (const [keyword, responses] of Object.entries(calorieResponses)) {
    if (input.includes(keyword)) {
      return responses[Math.floor(Math.random() * responses.length)]
    }
  }

  // Default responses for general queries
  const defaultResponses = [
    "That's a great question! I'm here to help with fitness, nutrition, and calorie tracking. Can you tell me more about what you're looking for?",
    "I'd be happy to help! Are you interested in tracking calories, meal planning, or fitness advice?",
    "Let me help you with your fitness journey! What specific aspect of nutrition or fitness are you curious about?",
    "That sounds interesting! To give you the best advice, can you share more details about your fitness goals?",
  ]

  return defaultResponses[Math.floor(Math.random() * defaultResponses.length)]
}
