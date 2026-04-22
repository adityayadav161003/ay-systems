"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"

type WaveMode = "pulse" | "light"

export default function InteractionPulse() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number | undefined>(undefined)
  const [signal, setSignal] = useState(200)
  const [mode, setMode] = useState<WaveMode>("pulse")
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const containerRef = useRef<HTMLDivElement>(null)

  const waveRef = useRef({
    amplitude: mode === "pulse" ? 30 : 15,
    frequency: 0.02,
    phase: 0,
    mouseInfluence: 0,
  })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas size
    const rect = canvas.parentElement?.getBoundingClientRect()
    if (rect) {
      canvas.width = rect.width
      canvas.height = rect.height
    }

    const centerY = canvas.height / 2

    const drawWave = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw waveform
      ctx.beginPath()
      ctx.lineWidth = 2
      ctx.strokeStyle = "#22d3ee"

      for (let x = 0; x < canvas.width; x += 1) {
        const baseAmplitude = waveRef.current.amplitude * (1 + waveRef.current.mouseInfluence)
        const y =
          centerY +
          Math.sin(x * waveRef.current.frequency + waveRef.current.phase) * baseAmplitude +
          Math.sin((x * waveRef.current.frequency + waveRef.current.phase) * 2) * baseAmplitude * 0.3

        if (x === 0) ctx.moveTo(x, y)
        else ctx.lineTo(x, y)
      }
      ctx.stroke()

      // Draw gradient fill
      const gradient = ctx.createLinearGradient(0, centerY, 0, canvas.height)
      gradient.addColorStop(0, "rgba(34, 211, 238, 0.3)")
      gradient.addColorStop(1, "rgba(34, 211, 238, 0)")

      ctx.lineTo(canvas.width, canvas.height)
      ctx.lineTo(0, canvas.height)
      ctx.fillStyle = gradient
      ctx.fill()

      // Draw scanlines overlay
      ctx.strokeStyle = "rgba(255, 255, 255, 0.02)"
      ctx.lineWidth = 1
      for (let y = 0; y < canvas.height; y += 4) {
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(canvas.width, y)
        ctx.stroke()
      }

      // Update signal level
      const signalLevel = Math.abs(Math.sin(waveRef.current.phase) * 100) + 50
      setSignal(Math.round(signalLevel))

      // Animate
      waveRef.current.phase += waveRef.current.frequency * 0.5
      waveRef.current.mouseInfluence = Math.max(0, waveRef.current.mouseInfluence - 0.02)

      animationRef.current = requestAnimationFrame(drawWave)
    }

    drawWave()

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [mode])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const influence = Math.min(1, Math.abs((e.clientX - rect.left) / rect.width - 0.5) * 2)
    waveRef.current.mouseInfluence = influence
    setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top })
  }

  const handleClick = () => {
    waveRef.current.mouseInfluence = 1
  }

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      viewport={{ once: true }}
      onMouseMove={handleMouseMove}
      onClick={handleClick}
      className="bg-[#111111] border border-white/10 rounded-2xl p-7 space-y-6 hover:border-white/20 hover:-translate-y-1 transition-all duration-300 cursor-crosshair"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold text-white">Signal Monitor</h3>
        <div className="flex items-center gap-2">
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-2.5 h-2.5 rounded-full bg-green-500"
          />
          <span className="text-xs font-bold text-green-500 uppercase">LIVE</span>
        </div>
      </div>

      {/* Waveform Canvas */}
      <div className="space-y-3">
        <div
          className="w-full h-40 bg-black/40 rounded-lg overflow-hidden border border-white/10"
          style={{ position: "relative" }}
        >
          <canvas
            ref={canvasRef}
            style={{
              display: "block",
              width: "100%",
              height: "100%",
            }}
          />
        </div>

        {/* Signal Level Readout */}
        <div className="flex items-baseline justify-center gap-2">
          <span className="text-xs text-white/50 uppercase">Signal Level</span>
          <motion.div
            key={signal}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-2xl font-bold text-cyan-400 font-mono"
          >
            {signal}
          </motion.div>
          <span className="text-xs text-white/40">/1000</span>
        </div>
      </div>

      {/* Mode Controls */}
      <div className="flex gap-2 border-t border-white/10 pt-4">
        {(["pulse", "light"] as const).map((m) => (
          <button
            key={m}
            onClick={() => setMode(m)}
            className={`flex-1 px-3 py-2 rounded-lg font-medium text-sm transition-all duration-200 ${
              mode === m
                ? "bg-cyan-500/20 border border-cyan-400/50 text-cyan-400"
                : "bg-white/5 border border-white/10 text-white/60 hover:border-white/20"
            }`}
          >
            {m === "pulse" ? "Pulse" : "Light Pulse"}
          </button>
        ))}
      </div>
    </motion.div>
  )
}
