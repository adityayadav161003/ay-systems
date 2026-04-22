"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Check, RotateCcw } from "lucide-react"

const PHRASE = "The quick brown fox jumps over the lazy dog while optimizing ML pipelines at scale."

export default function TypingDrill() {
  const [input, setInput] = useState("")
  const [isRunning, setIsRunning] = useState(false)
  const [isComplete, setIsComplete] = useState(false)
  const [startTime, setStartTime] = useState<number | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const accuracy = input.length > 0 
    ? Math.round((input.split("").filter((char, i) => char === PHRASE[i]).length / input.length) * 100)
    : 0

  const elapsedSeconds = startTime ? (Date.now() - startTime) / 1000 : 0
  const wpm = startTime && input.length > 0 
    ? Math.round((input.split(" ").length / elapsedSeconds) * 60)
    : 0

  const handleStart = () => {
    setIsRunning(true)
    setIsComplete(false)
    setInput("")
    setStartTime(Date.now())
    inputRef.current?.focus()
  }

  const handleReset = () => {
    setIsRunning(false)
    setIsComplete(false)
    setInput("")
    setStartTime(null)
  }

  useEffect(() => {
    if (input.length === PHRASE.length && isRunning) {
      setIsRunning(false)
      setIsComplete(true)
    }
  }, [input.length, isRunning])

  const progress = (input.length / PHRASE.length) * 100

  return (
    <div className="bg-[#111111] border border-white/10 rounded-2xl p-7 space-y-6 hover:border-white/20 hover:-translate-y-1 transition-all duration-300">
      {/* Terminal Header */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-amber-500" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
          </div>
          <span className="text-xs font-mono text-white/60">typing.drill</span>
        </div>

        {/* Typing Area */}
        <div className="bg-black/40 rounded-lg p-4 font-mono text-sm leading-relaxed min-h-[80px] relative overflow-hidden">
          {!isRunning && !isComplete && (
            <div className="text-white/30">Press RUN to begin...</div>
          )}
          {(isRunning || isComplete) && (
            <div className="flex flex-wrap gap-0 items-baseline">
              {PHRASE.split("").map((char, i) => {
                const inputChar = input[i]
                let color = "text-white/40"
                if (inputChar === char) color = "text-cyan-400"
                else if (inputChar && inputChar !== char) color = "text-red-400 underline decoration-red-500"

                const isCurrent = i === input.length && isRunning

                return (
                  <span key={i} className={`${color} relative`}>
                    {char}
                    {isCurrent && (
                      <motion.span
                        animate={{ opacity: [1, 0] }}
                        transition={{ duration: 1, repeat: Infinity }}
                        className="absolute -right-1 top-0 text-cyan-400"
                      >
                        |
                      </motion.span>
                    )}
                  </span>
                )
              })}
            </div>
          )}
        </div>

        {/* Progress Bar */}
        <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-cyan-500"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.2 }}
          />
        </div>
      </div>

      {/* Stats Grid */}
      {(isRunning || isComplete) && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-4 gap-3"
        >
          {[
            { label: "WPM", value: wpm },
            { label: "Accuracy", value: `${accuracy}%` },
            { label: "Streak", value: input.length },
            { label: "Best", value: "—" },
          ].map((stat) => (
            <div key={stat.label} className="bg-white/5 rounded-lg p-3 text-center">
              <div className="text-[10px] font-semibold text-white/50 uppercase">{stat.label}</div>
              <div className="text-lg font-bold text-white mt-1">{stat.value}</div>
            </div>
          ))}
        </motion.div>
      )}

      {/* Controls */}
      <div className="flex gap-3">
        {!isComplete ? (
          <>
            <button
              onClick={handleStart}
              disabled={isRunning}
              className="flex-1 px-4 py-2 border border-cyan-400/50 text-cyan-400 font-mono text-sm rounded-lg hover:bg-cyan-400/10 hover:border-cyan-400 disabled:opacity-50 transition-all duration-200 group"
            >
              [ {isRunning ? "RUNNING" : "RUN"} ]
            </button>
            {isRunning && (
              <button
                onClick={handleReset}
                className="px-4 py-2 border border-white/20 text-white/60 font-mono text-sm rounded-lg hover:border-white/40 hover:text-white transition-all duration-200"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            )}
          </>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full bg-gradient-to-r from-cyan-500/20 to-green-500/20 rounded-lg p-4 text-center border border-green-500/30"
          >
            <div className="flex items-center justify-center gap-2 mb-2">
              <Check className="w-5 h-5 text-green-400" />
              <span className="text-green-400 font-semibold">Complete!</span>
            </div>
            <div className="text-2xl font-bold text-cyan-400">{wpm} WPM</div>
            <button
              onClick={handleStart}
              className="mt-3 w-full px-4 py-2 bg-cyan-500 text-black font-semibold rounded-lg hover:bg-cyan-400 transition-all duration-200"
            >
              Run Again
            </button>
          </motion.div>
        )}
      </div>

      <input
        ref={inputRef}
        type="text"
        value={input}
        onChange={(e) => setInput(e.currentTarget.value)}
        className="sr-only"
        autoComplete="off"
        spellCheck="false"
      />
    </div>
  )
}
