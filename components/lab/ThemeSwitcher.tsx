"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Check } from "lucide-react"

type ThemeId = "mocha" | "midnight" | "graphite" | "nebula"

interface Theme {
  id: ThemeId
  label: string
  description: string
  colors: string[]
  accentColor: string
}

const THEMES: Theme[] = [
  {
    id: "mocha",
    label: "Mocha",
    description: "Warm dark browns + amber",
    colors: ["#3d2f28", "#5a4a43", "#d97757", "#f59e0b"],
    accentColor: "#f59e0b",
  },
  {
    id: "midnight",
    label: "Midnight",
    description: "Deep navy + electric blue",
    colors: ["#1a2847", "#2a3f6f", "#3b82f6", "#60a5fa"],
    accentColor: "#3b82f6",
  },
  {
    id: "graphite",
    label: "Graphite",
    description: "Pure black + cool white",
    colors: ["#1a1a1a", "#333333", "#94a3b8", "#e2e8f0"],
    accentColor: "#94a3b8",
  },
  {
    id: "nebula",
    label: "Nebula",
    description: "Dark purple + violet/pink",
    colors: ["#2d1b4e", "#44226b", "#a855f7", "#ec4899"],
    accentColor: "#a855f7",
  },
]

export default function ThemeSwitcher() {
  const [selectedTheme, setSelectedTheme] = useState<ThemeId>("midnight")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const currentTheme = THEMES.find((t) => t.id === selectedTheme) || THEMES[1]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      viewport={{ once: true }}
      className="bg-[#111111] border border-white/10 rounded-2xl p-7 space-y-6 hover:border-white/20 hover:-translate-y-1 transition-all duration-300"
    >
      <div className="space-y-1">
        <h3 className="text-xl font-bold text-white">Palette Studio</h3>
        <p className="text-xs text-white/50">Curated dark UI themes</p>
      </div>

      {/* Theme Grid */}
      <div className="grid grid-cols-2 gap-3">
        {THEMES.map((theme) => (
          <motion.button
            key={theme.id}
            onClick={() => setSelectedTheme(theme.id)}
            className={`relative rounded-lg overflow-hidden transition-all duration-300 ${
              selectedTheme === theme.id
                ? "ring-2 ring-offset-2 ring-offset-[#111111]"
                : ""
            }`}
            style={
              selectedTheme === theme.id
                ? { outline: `2px solid ${theme.accentColor}`, outlineOffset: "2px" }
                : {}
            }
          >
            {/* Color Gradient Preview */}
            <div
              className="h-16 w-full"
              style={{
                backgroundImage: `linear-gradient(to right, ${theme.colors.join(", ")})`,
              }}
            />

            {/* Label */}
            <div className="bg-black/60 px-3 py-2 backdrop-blur-sm">
              <div className="text-sm font-semibold text-white">{theme.label}</div>
              <div className="text-[10px] text-white/50">{theme.description}</div>
            </div>

            {/* Checkmark */}
            {selectedTheme === theme.id && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200 }}
                className="absolute top-2 right-2 w-6 h-6 rounded-full bg-white/20 backdrop-blur flex items-center justify-center"
              >
                <Check className="w-4 h-4 text-white" strokeWidth={3} />
              </motion.div>
            )}
          </motion.button>
        ))}
      </div>

      {/* Galaxy FX Toggle */}
      <div className="pt-3 border-t border-white/10 space-y-3">
        <label className="flex items-center gap-3 cursor-pointer group">
          <input type="checkbox" className="sr-only peer" defaultChecked={false} />
          <div className="w-10 h-6 rounded-full bg-white/10 peer-checked:bg-cyan-500/30 border border-white/20 peer-checked:border-cyan-400/50 transition-all duration-300" />
          <span className="text-sm font-medium text-white/70 group-hover:text-white transition-colors">
            Galaxy FX Intensity
          </span>
        </label>
      </div>
    </motion.div>
  )
}
