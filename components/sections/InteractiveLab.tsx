"use client"

import SectionWrapper from "@/components/SectionWrapper"
import { AnimatePresence, motion } from "framer-motion"
import {
  Braces,
  CalendarDays,
  Check,
  Cpu,
  MousePointerClick,
  Palette,
  Sparkles,
  Wand2,
} from "lucide-react"
import { useEffect, useMemo, useRef, useState, type ReactNode } from "react"

type ThemeId = "mocha" | "midnight" | "graphite" | "nebula"

const THEMES: Record<
  ThemeId,
  {
    label: string
    accentRgb: string
    glowRgb: string
    panelAlpha: string
    borderAlpha: string
    starsOpacity: string
  }
> = {
  mocha: {
    label: "Mocha",
    accentRgb: "217 119 87",
    glowRgb: "217 119 87",
    panelAlpha: "0.035",
    borderAlpha: "0.12",
    starsOpacity: "0.32",
  },
  midnight: {
    label: "Midnight",
    accentRgb: "59 130 246",
    glowRgb: "99 102 241",
    panelAlpha: "0.03",
    borderAlpha: "0.10",
    starsOpacity: "0.40",
  },
  graphite: {
    label: "Graphite",
    accentRgb: "148 163 184",
    glowRgb: "148 163 184",
    panelAlpha: "0.028",
    borderAlpha: "0.12",
    starsOpacity: "0.24",
  },
  nebula: {
    label: "Nebula",
    accentRgb: "168 85 247",
    glowRgb: "59 130 246",
    panelAlpha: "0.035",
    borderAlpha: "0.12",
    starsOpacity: "0.46",
  },
}

function useLocalStorageState<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(initialValue)
  const [hydrated, setHydrated] = useState(false)

  // Hydrate from localStorage on mount (client only)
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(key)
      if (raw != null) {
        setValue(JSON.parse(raw) as T)
      }
    } catch {}
    setHydrated(true)
  }, [key])

  // Persist to localStorage on change (only after hydration)
  useEffect(() => {
    if (!hydrated) return
    try {
      window.localStorage.setItem(key, JSON.stringify(value))
    } catch {}
  }, [key, value, hydrated])

  return [value, setValue] as const
}

function applyTheme(themeId: ThemeId, backgroundFxEnabled: boolean) {
  const theme = THEMES[themeId]
  const root = document.documentElement

  root.style.setProperty("--ay-accent-rgb", theme.accentRgb)
  root.style.setProperty("--ay-glow-rgb", theme.glowRgb)
  root.style.setProperty("--ay-panel-alpha", theme.panelAlpha)
  root.style.setProperty("--ay-border-alpha", theme.borderAlpha)
  root.style.setProperty("--ay-stars-opacity", backgroundFxEnabled ? theme.starsOpacity : "0.0")
  root.setAttribute("data-ay-theme", themeId)
}

function dayKey(d: Date) {
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, "0")
  const day = String(d.getDate()).padStart(2, "0")
  return `${y}-${m}-${day}`
}

function Card({
  title,
  subtitle,
  icon,
  children,
  className = "",
}: {
  title: string
  subtitle?: string
  icon: ReactNode
  children: ReactNode
  className?: string
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-120px" }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className={[
        "group relative rounded-[2.5rem] border overflow-hidden",
        "bg-[rgb(var(--ay-panel-rgb)/var(--ay-panel-alpha))] backdrop-blur-2xl",
        "border-[rgb(var(--ay-panel-rgb)/var(--ay-border-alpha))]",
        "shadow-[0_0_80px_rgba(0,0,0,0.35)]",
        "hover:-translate-y-1 transition-transform duration-500",
        className,
      ].join(" ")}
    >
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
        style={{
          backgroundImage:
            "radial-gradient(1200px circle at 20% 0%, rgb(var(--ay-glow-rgb) / 0.20), transparent 55%)",
        }}
      />
      <div className="relative z-10 p-6 md:p-10 space-y-6">
        <div className="flex items-start justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.3em] text-white/60">
              <span className="inline-flex items-center justify-center w-9 h-9 rounded-2xl border border-white/10 bg-white/5">
                {icon}
              </span>
              <span>{title}</span>
            </div>
            {subtitle ? <p className="text-sm md:text-base text-white/70">{subtitle}</p> : null}
          </div>
        </div>
        {children}
      </div>
    </motion.div>
  )
}

function ThemePanelCard() {
  const [theme, setTheme] = useLocalStorageState<ThemeId>("ay_theme", "midnight")
  const [backgroundFxEnabled, setBackgroundFxEnabled] = useLocalStorageState<boolean>("ay_bg_fx", true)

  useEffect(() => {
    applyTheme(theme, backgroundFxEnabled)
  }, [theme, backgroundFxEnabled])

  return (
    <Card
      title="Theme"
      subtitle="Curated palettes for a premium dark UI."
      icon={<Palette className="w-5 h-5 text-[rgb(var(--ay-accent-rgb))]" />}
    >
      <div className="rounded-[2rem] border border-white/10 bg-black/30 overflow-hidden">
        <div
          className="h-10 w-full"
          style={{
            background:
              "linear-gradient(90deg, rgb(var(--ay-accent-rgb) / 0.35), rgb(var(--ay-glow-rgb) / 0.18), transparent)",
          }}
        />
        <div className="p-4 space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {(Object.keys(THEMES) as ThemeId[]).map((id) => {
              const isActive = id === theme
              return (
                <button
                  key={id}
                  onClick={() => setTheme(id)}
                  aria-pressed={isActive}
                  className="relative rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 transition-all duration-300 overflow-hidden text-left"
                >
                  {isActive ? (
                    <motion.div
                      layoutId="ay-theme-active"
                      className="absolute inset-0"
                      style={{
                        background:
                          "linear-gradient(180deg, rgb(var(--ay-accent-rgb) / 0.18), rgb(var(--ay-glow-rgb) / 0.08), transparent)",
                      }}
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    />
                  ) : null}

                  <div className="relative z-10 px-4 py-3 flex items-center gap-3">
                    <span
                      className="w-8 h-8 rounded-2xl border border-white/10 shrink-0"
                      style={{
                        background: `rgb(${THEMES[id].accentRgb} / 0.22)`,
                        boxShadow: isActive ? `0 0 22px rgb(${THEMES[id].glowRgb} / 0.25)` : undefined,
                      }}
                    />
                    <div className="min-w-0">
                      <div className="text-sm font-black text-white leading-tight">{THEMES[id].label}</div>
                      <div className="text-[10px] font-black uppercase tracking-[0.25em] text-white/50">
                        {id}
                      </div>
                    </div>
                    {isActive ? (
                      <span className="ml-auto inline-flex items-center justify-center w-7 h-7 rounded-2xl border border-white/10 bg-white/5">
                        <Check className="w-4 h-4 text-[rgb(var(--ay-accent-rgb))]" />
                      </span>
                    ) : (
                      <span className="ml-auto w-7 h-7" />
                    )}
                  </div>
                </button>
              )
            })}
          </div>

          <div className="grid grid-cols-[1fr_auto] items-center gap-4">
            <div className="space-y-1">
              <div className="text-sm font-bold text-white">Background FX</div>
              <div className="text-xs text-white/50">Galaxy layer intensity follows theme.</div>
            </div>

            <div className="flex items-center p-1 rounded-full border border-white/10 bg-white/5">
              <button
                onClick={() => setBackgroundFxEnabled(true)}
                aria-pressed={backgroundFxEnabled}
                className={[
                  "px-3 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.25em] transition-all duration-300",
                  backgroundFxEnabled ? "text-black" : "text-white/60 hover:text-white/80",
                ].join(" ")}
                style={backgroundFxEnabled ? { background: "rgb(var(--ay-accent-rgb) / 0.95)" } : undefined}
              >
                On
              </button>
              <button
                onClick={() => setBackgroundFxEnabled(false)}
                aria-pressed={!backgroundFxEnabled}
                className={[
                  "px-3 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.25em] transition-all duration-300",
                  !backgroundFxEnabled ? "text-black" : "text-white/60 hover:text-white/80",
                ].join(" ")}
                style={!backgroundFxEnabled ? { background: "rgb(148 163 184 / 0.85)" } : undefined}
              >
                Off
              </button>
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
}

function ClickCounterCard() {
  const [pulse, setPulse] = useState<number>(420)
  const [pulseKey, setPulseKey] = useState(0)
  const channelRef = useRef<BroadcastChannel | null>(null)

  useEffect(() => {
    if (typeof window === "undefined") return
    if ("BroadcastChannel" in window) {
      const bc = new BroadcastChannel("ay_pulse")
      channelRef.current = bc
      bc.onmessage = (event) => {
        const data = event.data as { type?: string; delta?: number } | null
        if (!data || data.type !== "pulse") return
        const delta = typeof data.delta === "number" ? data.delta : 0
        if (!Number.isFinite(delta) || delta <= 0) return
        setPulse((p) => p + Math.floor(delta))
        setPulseKey((k) => k + 1)
      }
    }

    const id = window.setInterval(() => {
      const backgroundDelta = 1 + Math.floor(Math.random() * 2)
      setPulse((p) => p + backgroundDelta)
      setPulseKey((k) => k + 1)
    }, 4200)

    return () => {
      window.clearInterval(id)
      channelRef.current?.close()
      channelRef.current = null
    }
  }, [])

  const sendPulse = (delta: number) => {
    const safe = Math.max(1, Math.min(9, Math.floor(delta)))
    setPulse((p) => p + safe)
    setPulseKey((k) => k + 1)
    channelRef.current?.postMessage({ type: "pulse", delta: safe })
  }

  return (
    <Card
      title="Interaction Pulse"
      subtitle="A live signal (simulated) that reacts to input."
      icon={<MousePointerClick className="w-5 h-5 text-[rgb(var(--ay-accent-rgb))]" />}
    >
      <div className="flex items-end justify-between gap-6">
        <div className="space-y-2">
          <motion.div
            key={pulseKey}
            initial={{ scale: 0.98, opacity: 0.9 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="text-5xl md:text-6xl font-black tracking-tighter text-white"
          >
            {pulse}
          </motion.div>
          <div className="text-xs text-white/55 font-medium">
            Current level <span className="text-white/80 font-black">{pulse}</span>
          </div>
        </div>
        <div className="flex flex-col gap-3 items-end">
          <button
            onClick={() => sendPulse(3)}
            className="px-5 py-3 rounded-2xl border font-black text-xs uppercase tracking-[0.2em] transition-all duration-300 hover:-translate-y-0.5"
            style={{
              borderColor: "rgb(var(--ay-accent-rgb) / 0.35)",
              background: "rgb(var(--ay-accent-rgb) / 0.12)",
              boxShadow: "0 0 28px rgb(var(--ay-glow-rgb) / 0.18)",
            }}
          >
            Pulse
          </button>
          <button
            onClick={() => sendPulse(1)}
            className="text-[10px] font-black uppercase tracking-[0.25em] text-white/45 hover:text-white/70 transition-colors"
          >
            Light Pulse
          </button>
        </div>
      </div>
    </Card>
  )
}

function CalendarWidgetCard() {
  const [mounted, setMounted] = useState(false)
  const [today, setToday] = useState(() => new Date())
  const [selectedKey, setSelectedKey] = useState<string>(() => dayKey(new Date()))

  const dailyThoughts = useMemo(
    () => [
      "Planning the pipeline before training the model.",
      "Turning messy data into reliable signals.",
      "Small improvements compound into strong systems.",
      "Ship a clean iteration, then refine.",
      "Make it measurable: accuracy, latency, and clarity.",
      "Build tools that make learning faster.",
      "Rest, reflect, and design the next version.",
    ],
    []
  )

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const id = window.setInterval(() => {
      const next = new Date()
      setToday((prev) => {
        if (prev.toDateString() === next.toDateString()) return prev
        setSelectedKey((k) => (k === dayKey(prev) ? dayKey(next) : k))
        return next
      })
    }, 30_000)
    return () => window.clearInterval(id)
  }, [])

  const startOfWeek = useMemo(() => {
    const d = new Date(today)
    const day = d.getDay()
    const diff = (day + 6) % 7
    d.setDate(d.getDate() - diff)
    d.setHours(0, 0, 0, 0)
    return d
  }, [today])

  const days = useMemo(() => {
    return Array.from({ length: 7 }).map((_, i) => {
      const d = new Date(startOfWeek)
      d.setDate(startOfWeek.getDate() + i)
      return d
    })
  }, [startOfWeek])

  const selectedDate = useMemo(() => {
    const match = days.find((d) => dayKey(d) === selectedKey)
    return match ?? today
  }, [days, selectedKey, today])

  const mondayIndex = useMemo(() => {
    const d = selectedDate.getDay()
    return (d + 6) % 7
  }, [selectedDate])
  const thought = dailyThoughts[mondayIndex] ?? dailyThoughts[0]

  // Use explicit locale "en-US" to avoid server/client locale differences
  const weekdayShort = mounted ? selectedDate.toLocaleDateString("en-US", { weekday: "short" }) : ""
  const monthDay = mounted ? selectedDate.toLocaleDateString("en-US", { month: "short", day: "numeric" }) : ""
  const year = mounted ? selectedDate.toLocaleDateString("en-US", { year: "numeric" }) : ""

  return (
    <Card
      title="Developer Calendar"
      subtitle="Select a day. Get a small prompt."
      icon={<CalendarDays className="w-5 h-5 text-[rgb(var(--ay-accent-rgb))]" />}
    >
      <div className="rounded-[2.75rem] border border-white/10 bg-black/40 overflow-hidden">
        <div className="p-6 md:p-8 space-y-6">
          <div className="flex items-start justify-between gap-6">
            <div className="text-4xl md:text-5xl font-black tracking-tight text-white" suppressHydrationWarning>{weekdayShort}</div>
            <div className="text-right">
              <div className="text-sm font-black text-white/80" suppressHydrationWarning>{monthDay}</div>
              <div className="text-xs font-black uppercase tracking-[0.25em] text-white/45" suppressHydrationWarning>{year}</div>
            </div>
          </div>

          <div className="w-full flex sm:grid sm:grid-cols-7 items-center gap-3 overflow-x-auto sm:overflow-visible pb-1">
            {mounted && days.map((d) => {
              const key = dayKey(d)
              const isSelected = key === selectedKey
              const isToday = key === dayKey(today)
              const dayName = d.toLocaleDateString("en-US", { weekday: "short" }).toUpperCase()
              const num = d.getDate()

              return (
                <button
                  key={key}
                  onClick={() => setSelectedKey(key)}
                  className="relative shrink-0 sm:shrink sm:w-full rounded-2xl px-4 py-3 border bg-white/5 hover:bg-white/10 transition-colors min-w-[76px]"
                  aria-pressed={isSelected}
                  style={{
                    borderColor: isSelected
                      ? "rgba(255,255,255,0.18)"
                      : isToday
                        ? "rgb(var(--ay-accent-rgb) / 0.38)"
                        : "rgba(255,255,255,0.10)",
                    boxShadow: !isSelected && isToday ? "0 0 22px rgb(var(--ay-glow-rgb) / 0.12)" : undefined,
                  }}
                >
                  {isSelected ? (
                    <motion.div
                      layoutId="ay-cal-active"
                      className="absolute inset-0 rounded-2xl"
                      style={{
                        background:
                          "linear-gradient(180deg, rgba(255,255,255,0.95), rgba(255,255,255,0.78))",
                      }}
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    />
                  ) : null}
                  <div className="relative z-10 text-center">
                    <div className={isSelected ? "text-2xl font-black text-black" : "text-2xl font-black text-white"}>
                      {num}
                    </div>
                    <div
                      className={
                        isSelected
                          ? "text-[10px] font-black uppercase tracking-[0.25em]"
                          : "text-[10px] font-black uppercase tracking-[0.25em] text-white/55"
                      }
                      style={
                        isSelected
                          ? { color: "rgb(var(--ay-accent-rgb))" }
                          : isToday
                            ? { color: "rgb(var(--ay-accent-rgb) / 0.95)" }
                            : undefined
                      }
                    >
                      {dayName}
                    </div>
                  </div>
                  {!isSelected && isToday ? (
                    <div
                      className="absolute top-2 right-2 w-2 h-2 rounded-full"
                      style={{ background: "rgb(var(--ay-accent-rgb) / 0.85)" }}
                      aria-hidden="true"
                    />
                  ) : null}
                </button>
              )
            })}
          </div>
        </div>

        <div className="border-t border-white/10 bg-white/[0.02] px-6 md:px-8 py-5">
          <div className="flex items-center gap-4">
            <div className="w-5 h-5 rounded-full border border-white/20 bg-black/40" />
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedKey}
                initial={{ opacity: 0, y: 8, filter: "blur(6px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -8, filter: "blur(6px)" }}
                transition={{ duration: 0.35 }}
                className="text-base md:text-lg text-white/80 font-medium leading-relaxed"
              >
                {thought}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </Card>
  )
}


function PipelineBuilderCard() {
  const [scaling, setScaling] = useState<"off" | "standard">("standard")
  const [encoding, setEncoding] = useState<"onehot" | "ordinal">("onehot")
  const [model, setModel] = useState<"logreg" | "rf" | "gb">("gb")

  const estimate = useMemo(() => {
    const baseAcc = 0.83
    const baseLatencyMs = 18
    const baseTrainSec = 6.0

    const scalingAcc = scaling === "standard" ? 0.012 : -0.004
    const scalingLatency = scaling === "standard" ? 0.5 : 0
    const scalingTrain = scaling === "standard" ? 0.2 : 0

    const encodingAcc = encoding === "onehot" ? 0.010 : 0.004
    const encodingLatency = encoding === "onehot" ? 1.6 : 0.6
    const encodingTrain = encoding === "onehot" ? 1.1 : 0.6

    const modelAcc = model === "logreg" ? -0.004 : model === "rf" ? 0.008 : 0.014
    const modelLatency = model === "logreg" ? -2.2 : model === "rf" ? 5.0 : 2.6
    const modelTrain = model === "logreg" ? -2.1 : model === "rf" ? 4.8 : 3.2

    const acc = Math.max(0.75, Math.min(0.92, baseAcc + scalingAcc + encodingAcc + modelAcc))
    const latencyMs = Math.max(6, Math.round((baseLatencyMs + scalingLatency + encodingLatency + modelLatency) * 10) / 10)
    const trainSec = Math.max(1.2, Math.round((baseTrainSec + scalingTrain + encodingTrain + modelTrain) * 10) / 10)

    return {
      accPct: Math.round(acc * 1000) / 10,
      latencyMs,
      trainSec,
    }
  }, [encoding, model, scaling])

  const steps = useMemo(() => {
    return [
      { label: "Data", active: true },
      { label: "Impute", active: true },
      { label: encoding === "onehot" ? "One-Hot" : "Ordinal", active: true },
      { label: "Scale", active: scaling === "standard" },
      { label: model === "logreg" ? "LogReg" : model === "rf" ? "RandomForest" : "GradientBoost", active: true },
      { label: "Evaluate", active: true },
      { label: "Export", active: true },
    ] as const
  }, [encoding, model, scaling])

  return (
    <Card
      title="Pipeline Builder Mini"
      subtitle="A simulated ML pipeline: flip choices and see tradeoffs."
      icon={<Braces className="w-5 h-5 text-[rgb(var(--ay-accent-rgb))]" />}
      className="h-full"
    >
      <div className="rounded-[2.75rem] border border-white/10 bg-black/40 overflow-hidden">
        <div className="p-6 md:p-8 space-y-6">
          <div className="grid md:grid-cols-3 gap-5">
            <div className="space-y-2">
              <div className="text-[10px] font-black uppercase tracking-[0.3em] text-white/45">Scaling</div>
              <div className="flex gap-2">
                {(["standard", "off"] as const).map((id) => {
                  const active = scaling === id
                  return (
                    <button
                      key={id}
                      onClick={() => setScaling(id)}
                      className={[
                        "px-4 py-3 rounded-2xl border text-[10px] font-black uppercase tracking-[0.25em] transition-colors",
                        active ? "text-black" : "text-white/65 hover:text-white",
                      ].join(" ")}
                      style={
                        active
                          ? { background: "rgba(255,255,255,0.92)", borderColor: "rgba(255,255,255,0.18)" }
                          : { background: "rgba(255,255,255,0.04)", borderColor: "rgba(255,255,255,0.08)" }
                      }
                      aria-pressed={active}
                    >
                      {id === "standard" ? "Standard" : "Off"}
                    </button>
                  )
                })}
              </div>
            </div>

            <div className="space-y-2">
              <div className="text-[10px] font-black uppercase tracking-[0.3em] text-white/45">Encoding</div>
              <div className="flex gap-2">
                {(["onehot", "ordinal"] as const).map((id) => {
                  const active = encoding === id
                  return (
                    <button
                      key={id}
                      onClick={() => setEncoding(id)}
                      className={[
                        "px-4 py-3 rounded-2xl border text-[10px] font-black uppercase tracking-[0.25em] transition-colors",
                        active ? "text-black" : "text-white/65 hover:text-white",
                      ].join(" ")}
                      style={
                        active
                          ? { background: "rgba(255,255,255,0.92)", borderColor: "rgba(255,255,255,0.18)" }
                          : { background: "rgba(255,255,255,0.04)", borderColor: "rgba(255,255,255,0.08)" }
                      }
                      aria-pressed={active}
                    >
                      {id === "onehot" ? "One-hot" : "Ordinal"}
                    </button>
                  )
                })}
              </div>
            </div>

            <div className="space-y-2">
              <div className="text-[10px] font-black uppercase tracking-[0.3em] text-white/45">Model</div>
              <div className="flex gap-2 flex-wrap">
                {(["logreg", "rf", "gb"] as const).map((id) => {
                  const active = model === id
                  const label = id === "logreg" ? "LogReg" : id === "rf" ? "RF" : "GB"
                  return (
                    <button
                      key={id}
                      onClick={() => setModel(id)}
                      className={[
                        "px-4 py-3 rounded-2xl border text-[10px] font-black uppercase tracking-[0.25em] transition-colors",
                        active ? "text-black" : "text-white/65 hover:text-white",
                      ].join(" ")}
                      style={
                        active
                          ? { background: "rgba(255,255,255,0.92)", borderColor: "rgba(255,255,255,0.18)" }
                          : { background: "rgba(255,255,255,0.04)", borderColor: "rgba(255,255,255,0.08)" }
                      }
                      aria-pressed={active}
                    >
                      {label}
                    </button>
                  )
                })}
              </div>
            </div>
          </div>

          <div className="rounded-[2.5rem] border border-white/10 bg-black/30 p-6 md:p-8 space-y-5">
            <div className="text-[10px] font-black uppercase tracking-[0.3em] text-white/45">Flow</div>
            <div className="flex flex-wrap gap-2">
              {steps.map((s) => (
                <span
                  key={s.label}
                  className="px-3 py-2 rounded-2xl border text-[10px] font-black uppercase tracking-[0.2em]"
                  style={{
                    borderColor: s.active ? "rgb(var(--ay-accent-rgb) / 0.30)" : "rgba(255,255,255,0.08)",
                    background: s.active ? "rgb(var(--ay-accent-rgb) / 0.10)" : "rgba(255,255,255,0.03)",
                    color: s.active ? "rgba(255,255,255,0.78)" : "rgba(255,255,255,0.42)",
                  }}
                >
                  {s.label}
                </span>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 rounded-[2.5rem] border border-white/10 bg-white/[0.03] p-6 md:p-8">
            <div className="space-y-1">
              <div className="text-[10px] font-black uppercase tracking-[0.3em] text-white/45">Accuracy</div>
              <div className="text-2xl md:text-3xl font-black tracking-tight text-white">{estimate.accPct}%</div>
            </div>
            <div className="space-y-1">
              <div className="text-[10px] font-black uppercase tracking-[0.3em] text-white/45">Latency</div>
              <div className="text-2xl md:text-3xl font-black tracking-tight text-white">{estimate.latencyMs} ms</div>
            </div>
            <div className="space-y-1">
              <div className="text-[10px] font-black uppercase tracking-[0.3em] text-white/45">Train</div>
              <div className="text-2xl md:text-3xl font-black tracking-tight text-white">{estimate.trainSec}s</div>
            </div>
          </div>

          <div className="text-xs text-white/45 font-medium leading-relaxed">
            Simulated estimates to illustrate common tradeoffs (not tied to a specific dataset).
          </div>
        </div>
      </div>
    </Card>
  )
}

function InteractiveTextCard() {
  const words = useMemo(() => ["ML workflows", "data products", "automation", "interfaces"], [])
  const [active, setActive] = useState(0)

  useEffect(() => {
    const id = window.setInterval(() => setActive((i) => (i + 1) % words.length), 2200)
    return () => window.clearInterval(id)
  }, [words.length])

  return (
    <Card
      title="Interactive Statement"
      subtitle="A polished loop: timing, motion, and clarity."
      icon={<Wand2 className="w-5 h-5 text-[rgb(var(--ay-accent-rgb))]" />}
      className="h-full"
    >
      <div className="relative rounded-[2.5rem] border border-white/10 bg-black/30 overflow-hidden p-8 md:p-12">
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              "radial-gradient(900px circle at 20% 0%, rgb(var(--ay-glow-rgb) / 0.22), transparent 60%)",
          }}
        />
        <div className="absolute inset-0 opacity-30 bg-[linear-gradient(transparent_0%,rgba(255,255,255,0.05)_45%,transparent_60%)] animate-shimmer" />
        <div className="relative z-10 space-y-6">
          <div className="text-3xl md:text-5xl font-black tracking-tight leading-tight text-white">
            I build{" "}
            <AnimatePresence mode="wait">
              <motion.span
                key={words[active]}
                initial={{ opacity: 0, y: 10, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -10, filter: "blur(8px)" }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="inline-block px-3 py-1 rounded-2xl border"
                style={{
                  borderColor: "rgb(var(--ay-accent-rgb) / 0.35)",
                  background: "rgb(var(--ay-accent-rgb) / 0.10)",
                  boxShadow: "0 0 30px rgb(var(--ay-glow-rgb) / 0.18)",
                }}
              >
                {words[active]}
              </motion.span>
            </AnimatePresence>{" "}
            that feel intelligent.
          </div>

          <div className="text-sm md:text-base text-white/60 max-w-2xl font-medium leading-relaxed">
            Clean interfaces and measurable outcomes — with just enough interaction to make the work memorable.
          </div>

          <div className="flex flex-wrap gap-3 pt-2">
            {["scikit-learn", "feature engineering", "computer vision", "data pipeline"].map((t) => (
              <span
                key={t}
                className="text-[10px] font-black uppercase tracking-[0.2em] px-3 py-2 rounded-2xl border border-white/10 bg-white/5 text-white/60"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Card>
  )
}

function TypingGameCard() {
  const phrases = useMemo(
    () => [
      "python",
      "pandas",
      "machine learning",
      "feature engineering",
      "computer vision",
      "automation",
      "data pipeline",
      "model export",
      "gesture control",
      "clean code",
    ],
    []
  )

  const [bestWpm, setBestWpm] = useLocalStorageState<number>("ay_typing_best_wpm", 0)
  const [running, setRunning] = useState(false)
  const [target, setTarget] = useState("")
  const [typed, setTyped] = useState("")
  const [startTs, setStartTs] = useState<number | null>(null)
  const [now, setNow] = useState(0)
  const [impactKey, setImpactKey] = useState(0)
  const [errorKey, setErrorKey] = useState(0)
  const [streak, setStreak] = useState(0)
  const [correctKeys, setCorrectKeys] = useState(0)
  const [totalKeys, setTotalKeys] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)

  const pickPhrase = () => {
    const p = phrases[Math.floor(Math.random() * phrases.length)]
    setTarget(p)
    setTyped("")
    setStreak(0)
    setCorrectKeys(0)
    setTotalKeys(0)
  }

  const start = () => {
    pickPhrase()
    setRunning(true)
    const ts = Date.now()
    setStartTs(ts)
    setNow(ts)
    window.setTimeout(() => inputRef.current?.focus(), 50)
  }

  const stop = () => {
    setRunning(false)
    setStartTs(null)
  }

  useEffect(() => {
    if (!running || startTs == null) return
    const id = window.setInterval(() => setNow(Date.now()), 250)
    return () => window.clearInterval(id)
  }, [running, startTs])

  const elapsedMinutes = useMemo(() => {
    if (!running || startTs == null) return 0
    if (now <= 0) return 0
    return (now - startTs) / 60000
  }, [now, running, startTs])

  const wpm = useMemo(() => {
    if (!running || elapsedMinutes <= 0) return 0
    const chars = correctKeys
    return Math.round((chars / 5) / elapsedMinutes)
  }, [correctKeys, elapsedMinutes, running])

  const accuracy = useMemo(() => {
    if (totalKeys === 0) return 100
    return Math.round((correctKeys / totalKeys) * 100)
  }, [correctKeys, totalKeys])

  const onChange = (v: string) => {
    if (!running) return
    const next = v.slice(0, target.length)
    const prevLen = typed.length
    const nextLen = next.length
    let correctDelta = 0

    if (nextLen > prevLen) {
      const newChar = next[nextLen - 1]
      const expected = target[nextLen - 1]
      setTotalKeys((k) => k + 1)

      if (newChar === expected) {
        correctDelta = 1
        setCorrectKeys((k) => k + 1)
        setStreak((s) => s + 1)
        setImpactKey((k) => k + 1)
      } else {
        setStreak(0)
        setErrorKey((k) => k + 1)
      }
    }

    setTyped(next)

    if (next === target && target.length > 0 && startTs != null) {
      const endTs = Date.now()
      setNow(endTs)
      const minutes = (endTs - startTs) / 60000
      const finalCorrect = correctKeys + correctDelta
      const finalWpm = minutes > 0 ? Math.round((finalCorrect / 5) / minutes) : 0
      if (finalWpm > bestWpm) setBestWpm(finalWpm)
      stop()
    }
  }

  const progress = target.length === 0 ? 0 : Math.round((typed.length / target.length) * 100)

  return (
    <Card
      title="Typing Drill"
      subtitle="A compact accuracy loop with satisfying feedback."
      icon={<Cpu className="w-5 h-5 text-[rgb(var(--ay-accent-rgb))]" />}
      className="h-full"
    >
      <div className="rounded-[2.75rem] border border-white/10 bg-black/40 overflow-hidden">
        <div className="p-6 md:p-8 space-y-6">
          <div className="flex items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div
                className="w-2 h-2 rounded-full"
                style={{ background: running ? "rgb(16 185 129 / 0.9)" : "rgb(148 163 184 / 0.6)" }}
              />
              <div className="text-[10px] font-black uppercase tracking-[0.3em] text-white/55">
                {running ? "Active" : "Idle"}
              </div>
            </div>
            <button
              onClick={running ? stop : start}
              className="px-4 py-3 rounded-2xl border text-[10px] font-black uppercase tracking-[0.25em] transition-all duration-300 hover:-translate-y-0.5"
              style={{
                borderColor: "rgb(var(--ay-accent-rgb) / 0.35)",
                background: running ? "rgba(255,255,255,0.06)" : "rgb(var(--ay-accent-rgb) / 0.12)",
                boxShadow: running ? undefined : "0 0 24px rgb(var(--ay-glow-rgb) / 0.18)",
              }}
            >
              {running ? "Stop" : "Start"}
            </button>
          </div>

          <div className="relative rounded-[2.5rem] border border-white/10 bg-black/30 overflow-hidden p-6 md:p-8">
            <div className="absolute inset-0 opacity-50" style={{ backgroundImage: "radial-gradient(900px circle at 20% 0%, rgb(var(--ay-glow-rgb) / 0.18), transparent 60%)" }} />

            <div className="relative z-10 space-y-5">
              <div className="flex items-start justify-between gap-6">
                <div className="space-y-2">
                  <div className="text-[10px] font-black uppercase tracking-[0.3em] text-white/45">Phrase</div>
                  <div className="text-white/75 font-medium leading-relaxed">
                    {target || "Press Start to load a phrase."}
                  </div>
                </div>

                <motion.div
                  key={impactKey}
                  initial={{ rotate: 0, y: 0 }}
                  animate={{ rotate: impactKey ? [0, -2, 2, 0] : 0, y: impactKey ? [0, -2, 0] : 0 }}
                  transition={{ duration: 0.25 }}
                  className="shrink-0"
                  aria-hidden="true"
                >
                  <div className="w-12 h-12 rounded-2xl border border-white/10 bg-white/5 flex items-center justify-center">
                    <Cpu className="w-6 h-6 text-[rgb(var(--ay-accent-rgb))]" />
                  </div>
                </motion.div>
              </div>

              <div className="space-y-3">
                <motion.div
                  key={errorKey}
                  initial={{ x: 0 }}
                  animate={errorKey ? { x: [0, -4, 4, -2, 2, 0] } : { x: 0 }}
                  transition={{ duration: 0.25 }}
                  className="relative"
                >
                  <motion.div
                    key={impactKey}
                    initial={{ scale: 1 }}
                    animate={{
                      scale: impactKey ? [1, 1.01, 1] : 1,
                      boxShadow: impactKey
                        ? ["0 0 0 rgba(0,0,0,0)", "0 0 28px rgb(var(--ay-glow-rgb) / 0.22)", "0 0 10px rgb(var(--ay-glow-rgb) / 0.14)"]
                        : "0 0 0 rgba(0,0,0,0)",
                    }}
                    transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                    className="rounded-[2rem]"
                  >
                    <input
                      ref={inputRef}
                      value={typed}
                      onChange={(e) => onChange(e.target.value)}
                      disabled={!running}
                      placeholder={running ? "Start typing here…" : "Press Start to begin…"}
                      className="w-full rounded-[2rem] border border-white/10 bg-white/5 px-6 py-6 text-white text-base md:text-lg placeholder:text-white/35 outline-none focus:border-[rgb(var(--ay-accent-rgb)/0.55)] focus:ring-2 focus:ring-[rgb(var(--ay-accent-rgb)/0.18)] transition"
                    />
                  </motion.div>
                </motion.div>

                <div className="flex items-center gap-3">
                  <div className="flex-1 h-1.5 rounded-full bg-white/5 overflow-hidden border border-white/10">
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${progress}%`,
                        background: "linear-gradient(90deg, rgb(var(--ay-accent-rgb) / 0.25), rgb(var(--ay-accent-rgb) / 0.9))",
                        boxShadow: "0 0 18px rgb(var(--ay-glow-rgb) / 0.18)",
                        transition: "width 180ms ease",
                      }}
                    />
                  </div>
                  <div className="text-[10px] font-black uppercase tracking-[0.25em] text-white/55">{progress}%</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 bg-white/[0.02] px-6 md:px-8 py-5">
          <div className="grid grid-cols-4 gap-4">
            <div className="space-y-1">
              <div className="text-[10px] font-black uppercase tracking-[0.3em] text-white/45">WPM</div>
              <div className="text-2xl font-black tracking-tight text-white">{running ? wpm : wpm || 0}</div>
            </div>
            <div className="space-y-1">
              <div className="text-[10px] font-black uppercase tracking-[0.3em] text-white/45">Accuracy</div>
              <div className="text-2xl font-black tracking-tight text-white">{accuracy}%</div>
            </div>
            <div className="space-y-1">
              <div className="text-[10px] font-black uppercase tracking-[0.3em] text-white/45">Streak</div>
              <div className="text-2xl font-black tracking-tight text-white">{streak}</div>
            </div>
            <div className="space-y-1">
              <div className="text-[10px] font-black uppercase tracking-[0.3em] text-white/45">Best</div>
              <div className="text-2xl font-black tracking-tight text-white">{bestWpm}</div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
}

export default function LabDashboard() {
  return (
    <div className="w-full max-w-[1440px] mx-auto pb-32">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
        
        {/* ROW 1: Typing Game & Interactive Text */}
        <div className="lg:col-span-7">
          <TypingGameCard />
        </div>
        <div className="lg:col-span-5">
          <InteractiveTextCard />
        </div>

        {/* ROW 2: ML Pipeline Full Banner */}
        <div className="lg:col-span-12">
          <PipelineBuilderCard />
        </div>

        {/* ROW 3: Lower Widgets */}
        <div className="lg:col-span-5">
          <ThemePanelCard />
        </div>
        <div className="lg:col-span-4">
          <CalendarWidgetCard />
        </div>
        <div className="lg:col-span-3">
          <ClickCounterCard />
        </div>
      </div>
    </div>
  )
}

