"use client"

import { useEffect, useRef } from "react"

type ThemeId = "mocha" | "midnight" | "graphite" | "nebula"

const THEMES: Record<ThemeId, { accentRgb: string; glowRgb: string; panelAlpha: string; borderAlpha: string; starsOpacity: string }> = {
  mocha: { accentRgb: "217 119 87", glowRgb: "217 119 87", panelAlpha: "0.035", borderAlpha: "0.12", starsOpacity: "0.32" },
  midnight: { accentRgb: "59 130 246", glowRgb: "99 102 241", panelAlpha: "0.03", borderAlpha: "0.10", starsOpacity: "0.40" },
  graphite: { accentRgb: "148 163 184", glowRgb: "148 163 184", panelAlpha: "0.028", borderAlpha: "0.12", starsOpacity: "0.24" },
  nebula: { accentRgb: "168 85 247", glowRgb: "59 130 246", panelAlpha: "0.035", borderAlpha: "0.12", starsOpacity: "0.46" },
}

class Star {
  x: number
  y: number
  size: number
  speedX: number
  speedY: number
  opacity: number

  constructor(width: number, height: number) {
    this.x = Math.random() * width
    this.y = Math.random() * height
    this.size = Math.random() * 1.5
    this.speedX = (Math.random() - 0.5) * 0.2
    this.speedY = (Math.random() - 0.5) * 0.2
    this.opacity = Math.random()
  }

  update(width: number, height: number) {
    this.x += this.speedX
    this.y += this.speedY

    if (this.x < 0) this.x = width
    if (this.x > width) this.x = 0
    if (this.y < 0) this.y = height
    if (this.y > height) this.y = 0
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
    ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`
    ctx.fill()
  }
}

export default function GalaxyBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    try {
      const rawTheme = window.localStorage.getItem("ay_theme")
      const rawFx = window.localStorage.getItem("ay_bg_fx")
      const themeId = (rawTheme ? (JSON.parse(rawTheme) as ThemeId) : "midnight") ?? "midnight"
      const fxEnabled = rawFx ? (JSON.parse(rawFx) as boolean) : true
      const theme = THEMES[themeId] ?? THEMES.midnight

      const root = document.documentElement
      root.style.setProperty("--ay-accent-rgb", theme.accentRgb)
      root.style.setProperty("--ay-glow-rgb", theme.glowRgb)
      root.style.setProperty("--ay-panel-alpha", theme.panelAlpha)
      root.style.setProperty("--ay-border-alpha", theme.borderAlpha)
      root.style.setProperty("--ay-stars-opacity", fxEnabled ? theme.starsOpacity : "0.0")
      root.setAttribute("data-ay-theme", themeId)
    } catch {}

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationFrameId: number
    let stars: Star[] = []
    const starCount = 150

    const init = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      stars = []
      for (let i = 0; i < starCount; i++) {
        stars.push(new Star(canvas.width, canvas.height))
      }
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      stars.forEach((star) => {
        star.update(canvas.width, canvas.height)
        star.draw(ctx)
      })
      animationFrameId = requestAnimationFrame(animate)
    }

    init()
    animate()

    const handleResize = () => {
      init()
    }

    window.addEventListener("resize", handleResize)

    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return (
    <div className="fixed inset-0 -z-20 bg-black overflow-hidden pointer-events-none">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ opacity: "var(--ay-stars-opacity)" }}
      />
      
      {/* Nebula/Glow Effects */}
      <div
        className="absolute top-[-10%] left-[-10%] w-[55%] h-[55%] blur-[140px] rounded-full"
        style={{ backgroundColor: "rgb(var(--ay-glow-rgb) / 0.14)" }}
      />
      <div
        className="absolute bottom-[-10%] right-[-10%] w-[55%] h-[55%] blur-[140px] rounded-full"
        style={{ backgroundColor: "rgb(var(--ay-accent-rgb) / 0.10)" }}
      />
      <div
        className="absolute top-[30%] left-[40%] w-[45%] h-[45%] blur-[180px] rounded-full"
        style={{ backgroundColor: "rgb(var(--ay-glow-rgb) / 0.08)" }}
      />
      
      {/* Subtle Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:100px_100px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_20%,transparent_100%)]" />
    </div>
  )
}
