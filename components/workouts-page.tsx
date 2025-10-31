"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { workoutsData } from "@/utils/workouts-data"
import { motion, AnimatePresence } from "motion/react"
import { IconChevronDown } from "@tabler/icons-react"

export function WorkoutsPage() {
  const [selectedType, setSelectedType] = useState<"gym" | "home">("gym")
  const [expandedLevel, setExpandedLevel] = useState<string>("Beginner")

  const workoutTypes = [
    { id: "gym", label: "Gym Workouts", emoji: "🏋️" },
    { id: "home", label: "Home Workouts", emoji: "🏠" },
  ]

  const currentWorkouts = workoutsData[selectedType]

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      {/* Header with consistent gradient */}
      <div className="bg-gradient-to-r from-primary via-secondary to-accent dark:from-primary dark:via-secondary dark:to-accent p-6 shadow-lg">
        <h1 className="text-3xl md:text-4xl font-bold text-white">Workout Plans</h1>
        <p className="text-white/90 mt-2">Choose your training style and difficulty level</p>
      </div>

      <div className="border-b border-border px-6 py-4 flex gap-4 bg-background">
        {workoutTypes.map((type) => (
          <button
            key={type.id}
            onClick={() => {
              setSelectedType(type.id as "gym" | "home")
              setExpandedLevel("Beginner")
            }}
            className={`px-6 py-2 rounded-lg font-medium transition-all ${
              selectedType === type.id
                ? "bg-primary text-white shadow-lg"
                : "bg-secondary/10 text-foreground hover:bg-secondary/20"
            }`}
          >
            <span className="mr-2">{type.emoji}</span>
            {type.label}
          </button>
        ))}
      </div>

      {/* Workout Plans */}
      <ScrollArea className="flex-1 overflow-hidden">
        <div className="max-w-4xl mx-auto px-6 py-8 w-full">
          <div className="space-y-4">
            {currentWorkouts.map((workout) => (
              <motion.div
                key={workout.level}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="overflow-hidden border-2 border-border hover:border-primary/50 transition-all">
                  <button
                    onClick={() => setExpandedLevel(expandedLevel === workout.level ? "" : workout.level)}
                    className="w-full p-6 flex items-center justify-between hover:bg-accent/5 transition-colors text-left"
                  >
                    <div>
                      <h3 className="text-xl font-bold text-primary">{workout.level} Level</h3>
                      <p className="text-sm text-muted-foreground mt-1">{workout.goal}</p>
                      <p className="text-sm text-secondary font-medium mt-2">{workout.frequency}</p>
                    </div>
                    <motion.div
                      animate={{
                        rotate: expandedLevel === workout.level ? 180 : 0,
                      }}
                      transition={{ duration: 0.2 }}
                    >
                      <IconChevronDown size={24} className="text-primary" />
                    </motion.div>
                  </button>

                  <AnimatePresence>
                    {expandedLevel === workout.level && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="border-t border-border"
                      >
                        <div className="p-6 space-y-6 bg-card/50">
                          {Object.entries(workout.days).map(([dayLabel, exercises]) => (
                            <div key={dayLabel}>
                              <h4 className="font-bold text-secondary mb-3 flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-primary"></span>
                                {dayLabel}
                              </h4>

                              {exercises.length === 0 ? (
                                <p className="text-muted-foreground italic text-sm">{dayLabel}</p>
                              ) : (
                                <div className="space-y-2">
                                  {exercises.map((exercise, idx) => (
                                    <div
                                      key={idx}
                                      className="bg-background rounded-lg p-4 border border-border/50 hover:border-primary/30 transition-colors"
                                    >
                                      <div className="flex justify-between items-start gap-4">
                                        <div className="flex-1">
                                          <p className="font-semibold text-foreground">{exercise.name}</p>
                                          {exercise.notes && (
                                            <p className="text-xs text-muted-foreground mt-1">{exercise.notes}</p>
                                          )}
                                        </div>
                                        <div className="flex gap-4 text-sm text-right whitespace-nowrap">
                                          <div>
                                            <p className="text-muted-foreground text-xs">Sets</p>
                                            <p className="font-bold text-primary">{exercise.sets}</p>
                                          </div>
                                          <div>
                                            <p className="text-muted-foreground text-xs">Reps</p>
                                            <p className="font-bold text-secondary">{exercise.reps}</p>
                                          </div>
                                          <div>
                                            <p className="text-muted-foreground text-xs">Rest</p>
                                            <p className="font-bold text-accent">{exercise.rest}</p>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </ScrollArea>
    </div>
  )
}
