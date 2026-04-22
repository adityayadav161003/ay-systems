"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X } from "lucide-react"

const PROMPTS = [
  "What's one thing in your codebase you'd be embarrassed to show a senior engineer?",
  "Write a README for a project you've been putting off.",
  "What would your pipeline look like if you had to rebuild it in half the code?",
  "Document the most confusing part of your current project.",
  "Refactor one function that makes you cringe every time you see it.",
  "What technical debt would you pay down if you had unlimited time?",
  "Build a feature that eliminates the most repetitive task in your workflow.",
  "Write tests for the most complex function in your codebase.",
  "Create a dashboard that visualizes the health of your ML pipeline.",
  "Document a bug that took you hours to fix.",
  "What's the simplest change that would improve your team's velocity?",
  "Design a monitoring system for your production models.",
  "Build a tool to automate your most manual process.",
  "Write a post-mortem for your last major bug or outage.",
  "Create a decision log for your architectural choices.",
  "What would make your code 10x easier to understand?",
  "Design a better error message for your most confusing failure mode.",
  "What training would help your team ship faster?",
  "Build a profiler for your slowest pipeline stage.",
  "Document one pattern you'd like to eliminate from your codebase.",
  "Create a rubric for code quality in your project.",
  "What's the highest-leverage refactor you could do this week?",
  "Build a cost analyzer for your infrastructure.",
  "Document your deployment process so anyone could run it.",
  "What would a 50% performance improvement look like for your system?",
  "Design the ideal developer experience for your tools.",
  "Write a proposal for one architectural improvement.",
  "What metrics would tell you if you're building the right thing?",
  "Create a runbook for your most common incidents.",
  "What's one skill you'd invest in to become a better engineer?",
]

export default function DeveloperCalendar() {
  const today = new Date()
  const currentMonth = today.getMonth()
  const currentYear = today.getFullYear()

  const [selectedDay, setSelectedDay] = useState<number | null>(null)

  const firstDay = new Date(currentYear, currentMonth, 1)
  const lastDay = new Date(currentYear, currentMonth + 1, 0)
  const daysInMonth = lastDay.getDate()
  const startingDayOfWeek = firstDay.getDay()

  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1)
  const padding = Array.from({ length: startingDayOfWeek }, (_, i) => null)

  const getPrompt = (day: number) => PROMPTS[(day - 1) % PROMPTS.length]

  const monthName = firstDay.toLocaleString("default", { month: "long", year: "numeric" })

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      viewport={{ once: true }}
      className="bg-[#111111] border border-white/10 rounded-2xl p-7 space-y-6 hover:border-white/20 hover:-translate-y-1 transition-all duration-300"
    >
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold text-white">Daily Build Prompt</h3>
        <span className="text-xs text-white/50 font-medium">{monthName}</span>
      </div>

      {/* Calendar Grid */}
      <div className="space-y-3">
        {/* Day headers */}
        <div className="grid grid-cols-7 gap-1">
          {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
            <div key={day} className="text-center text-[10px] font-bold text-white/40 uppercase">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar cells */}
        <div className="grid grid-cols-7 gap-1">
          {padding.map((_, i) => (
            <div key={`empty-${i}`} />
          ))}
          {days.map((day) => {
            const isToday = day === today.getDate()
            const isPast = day < today.getDate()
            return (
              <motion.button
                key={day}
                onClick={() => setSelectedDay(selectedDay === day ? null : day)}
                whileHover={{ scale: 1.05 }}
                className={`aspect-square rounded-lg font-semibold text-sm transition-all duration-200 ${
                  isToday
                    ? "bg-cyan-500/30 border border-cyan-400/50 text-cyan-400"
                    : selectedDay === day
                      ? "bg-white/20 border border-white/40 text-white"
                      : "bg-white/5 border border-white/10 text-white/70 hover:bg-white/10"
                } ${isPast ? "opacity-40" : ""}`}
              >
                {day}
              </motion.button>
            )
          })}
        </div>
      </div>

      {/* Prompt Display */}
      <AnimatePresence>
        {selectedDay && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="border-l-2 border-cyan-400/50 bg-cyan-400/5 rounded-lg p-4 space-y-3"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="text-xs font-semibold text-cyan-400/70 uppercase">Day {selectedDay} Prompt</div>
              <button
                onClick={() => setSelectedDay(null)}
                className="text-white/40 hover:text-white transition-colors p-1 -m-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <p className="text-sm text-white/80 leading-relaxed">{getPrompt(selectedDay)}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
