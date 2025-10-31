"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { motion, AnimatePresence } from "motion/react"
import { IconChevronDown } from "@tabler/icons-react"

interface DietApproach {
  id: string
  title: string
  emoji: string
  description: string
  how_it_works: string[]
  pros: string[]
  cons: string[]
  dialogue: {
    person_a: string
    person_b: string
  }
  common_methods?: string[]
}

const dietsData: DietApproach[] = [
  {
    id: "macro-tracking",
    title: "Counting Macros and Micros",
    emoji: "📊",
    description:
      "Monitor protein, carbs, fats (macros) and vitamins, minerals, fiber (micros) to track your nutrition precisely.",
    how_it_works: [
      "Set a calorie goal based on your maintenance or target (deficit for fat loss, surplus for muscle gain)",
      "Split calories into macronutrient ratios, e.g. 40% carbs, 30% protein, 30% fat",
      "Use apps like MyFitnessPal or Cronometer to log meals",
    ],
    pros: [
      "Flexible: you can eat anything that fits your macros",
      "High accuracy for body composition changes",
      "Builds food awareness and discipline",
    ],
    cons: ["Time-consuming at first", "Easy to focus on numbers and forget food quality"],
    dialogue: {
      person_a: "I want to lose fat but still eat the foods I like.",
      person_b:
        "Then counting macros might work — you'll just adjust portions and track consistency instead of cutting everything out.",
    },
  },
  {
    id: "intermittent-fasting",
    title: "Intermittent Fasting (IF)",
    emoji: "⏰",
    description:
      "A timing-based diet that cycles between eating and fasting windows rather than restricting specific foods.",
    how_it_works: [
      "16:8 Method: Fast for 16 hours, eat during an 8-hour window (e.g. 12 PM–8 PM)",
      "5:2 Method: Eat normally for 5 days; restrict calories (~500–600) for 2 days",
      "OMAD: One Meal A Day — a 23:1 fasting ratio for experienced dieters",
    ],
    common_methods: [
      "16:8 Method - 16 hours fasting, 8 hours eating",
      "5:2 Method - Normal eating for 5 days, restricted calories for 2",
      "OMAD - One meal per day approach",
    ],
    pros: [
      "Reduces overall calorie intake without strict tracking",
      "Improves insulin sensitivity and digestion",
      "Suits people who don't like breakfast or prefer fewer meals",
    ],
    cons: ["May cause fatigue or irritability early on", "Hard to sustain with high-intensity training schedules"],
    dialogue: {
      person_a: "I skip breakfast naturally — does that mean I'm fasting?",
      person_b:
        "Yes, that's basically intermittent fasting! You can use that to your advantage by making your first meal balanced and protein-rich.",
    },
  },
  {
    id: "clean-eating",
    title: "Clean Eating / Whole-Food Dieting",
    emoji: "🥦",
    description:
      "Focuses on food quality — eating natural, minimally processed foods rather than obsessing over calorie counts.",
    how_it_works: [
      "Prioritize lean proteins, fruits, vegetables, whole grains, and healthy fats",
      "Minimize sugar, refined carbs, and trans fats",
      "Cook meals at home when possible for better control",
    ],
    pros: [
      "Great for long-term health and energy",
      "Naturally improves digestion and mood",
      "Easier to maintain as a lifestyle",
    ],
    cons: ["Less flexible — eating out becomes tricky", "Progress can slow without calorie awareness"],
    dialogue: {
      person_a: "I don't want to count calories; I just want to eat healthier.",
      person_b:
        "Then start by cleaning up your plate — whole foods, less sugar, and balanced meals. You'll feel better and still lose fat over time.",
    },
  },
  {
    id: "blended-approach",
    title: "Blended or Adaptive Approach",
    emoji: "⚖️",
    description: "Combine elements of multiple methods for flexibility and sustainability that fits your lifestyle.",
    how_it_works: [
      "Eat within an 8-hour window (Intermittent Fasting)",
      "Track protein intake to ensure muscle maintenance",
      "Focus on whole, nutrient-rich foods for quality",
    ],
    pros: [
      "Flexible and sustainable for most lifestyles",
      "Combines benefits of multiple approaches",
      "Easier to adjust based on life circumstances",
    ],
    cons: ["Requires experimentation to find your balance", "May be confusing for beginners"],
    dialogue: {
      person_a: "I want structure but also flexibility.",
      person_b:
        "Perfect! Combine macro tracking with clean eating and a fasting window. You get the best of all worlds.",
    },
  },
]

export function DietsPage() {
  const [expandedDiet, setExpandedDiet] = useState<string>("macro-tracking")

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary via-secondary to-accent dark:from-primary dark:via-secondary dark:to-accent p-6 shadow-lg">
        <h1 className="text-3xl md:text-4xl font-bold text-white">Nutrition & Diet Guides</h1>
        <p className="text-white/90 mt-2">Explore different dieting approaches to find what works for you</p>
      </div>

      {/* Diet Plans */}
      <ScrollArea className="flex-1 overflow-hidden">
        <div className="max-w-4xl mx-auto px-6 py-8 w-full">
          <div className="space-y-4">
            {dietsData.map((diet) => (
              <motion.div
                key={diet.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="overflow-hidden border-2 border-border hover:border-primary/50 transition-all">
                  <button
                    onClick={() => setExpandedDiet(expandedDiet === diet.id ? "" : diet.id)}
                    className="w-full p-6 flex items-center justify-between hover:bg-accent/5 transition-colors text-left"
                  >
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-primary flex items-center gap-2">
                        <span>{diet.emoji}</span>
                        {diet.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mt-2">{diet.description}</p>
                    </div>
                    <motion.div
                      animate={{
                        rotate: expandedDiet === diet.id ? 180 : 0,
                      }}
                      transition={{ duration: 0.2 }}
                      className="ml-4"
                    >
                      <IconChevronDown size={24} className="text-primary" />
                    </motion.div>
                  </button>

                  <AnimatePresence>
                    {expandedDiet === diet.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="border-t border-border"
                      >
                        <div className="p-6 space-y-6 bg-card/50">
                          {/* How It Works */}
                          <div>
                            <h4 className="font-bold text-secondary mb-3 flex items-center gap-2">
                              <span className="w-2 h-2 rounded-full bg-primary"></span>
                              How It Works
                            </h4>
                            <ul className="space-y-2">
                              {diet.how_it_works.map((step, idx) => (
                                <li key={idx} className="text-sm text-foreground flex gap-3">
                                  <span className="text-primary font-bold">{idx + 1}.</span>
                                  <span>{step}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* Common Methods (if available) */}
                          {diet.common_methods && (
                            <div>
                              <h4 className="font-bold text-secondary mb-3 flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-secondary"></span>
                                Common Methods
                              </h4>
                              <ul className="space-y-2">
                                {diet.common_methods.map((method, idx) => (
                                  <li
                                    key={idx}
                                    className="text-sm text-foreground bg-background rounded p-3 border border-border/50"
                                  >
                                    {method}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}

                          {/* Pros and Cons */}
                          <div className="grid md:grid-cols-2 gap-4">
                            <div>
                              <h4 className="font-bold text-primary mb-3">✅ Pros</h4>
                              <ul className="space-y-2">
                                {diet.pros.map((pro, idx) => (
                                  <li key={idx} className="text-sm text-foreground">
                                    • {pro}
                                  </li>
                                ))}
                              </ul>
                            </div>
                            <div>
                              <h4 className="font-bold text-secondary mb-3">⚠️ Cons</h4>
                              <ul className="space-y-2">
                                {diet.cons.map((con, idx) => (
                                  <li key={idx} className="text-sm text-foreground">
                                    • {con}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>

                          {/* Dialogue */}
                          <div className="bg-background rounded-lg p-4 border border-border">
                            <h4 className="font-bold text-accent mb-3">💬 Example Conversation</h4>
                            <div className="space-y-3">
                              <div className="flex gap-3">
                                <span className="font-bold text-primary">Person A:</span>
                                <p className="text-sm text-foreground italic">{diet.dialogue.person_a}</p>
                              </div>
                              <div className="flex gap-3">
                                <span className="font-bold text-secondary">Person B:</span>
                                <p className="text-sm text-foreground italic">{diet.dialogue.person_b}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Goal Guidance */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="mt-8">
            <Card className="bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 border-2 border-primary/20 p-6">
              <h3 className="font-bold text-primary mb-4">🧠 Diet Selection Guide</h3>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="font-semibold text-foreground">Fat Loss</span>
                  <span className="text-muted-foreground">
                    Intermittent Fasting or Macro Tracking with Calorie Deficit
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="font-semibold text-foreground">Muscle Gain</span>
                  <span className="text-muted-foreground">Macro Counting with Protein Focus</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="font-semibold text-foreground">Lifestyle / Maintenance</span>
                  <span className="text-muted-foreground">Clean Eating or Blended Approach</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="font-semibold text-foreground">Beginners</span>
                  <span className="text-muted-foreground">Intermittent Fasting (16:8) or Clean Eating</span>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </ScrollArea>
    </div>
  )
}
