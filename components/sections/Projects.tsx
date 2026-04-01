"use client"

import SectionWrapper from "@/components/SectionWrapper"
import { AnimatePresence, motion } from "framer-motion"
import { ExternalLink, Github, Sparkles } from "lucide-react"
import { useEffect, useMemo, useState, type ReactNode } from "react"

const projects = [
  {
    id: 1,
    title: "AY Systems — Agent-Based AutoML Pipeline",
    description:
      "A modular AutoML pipeline built around an orchestrator + specialized agents for preprocessing, feature engineering, training, evaluation, and export.",
    impact: "Flagship · End-to-end ML workflow",
    tech: ["Python", "scikit-learn", "Pandas", "Streamlit", "Orchestration"],
    highlights: [
      { label: "Built", text: "Config-driven stages: data → features → train → evaluate → report/artifacts." },
      { label: "Why", text: "Moves beyond notebooks by enforcing repeatability, logging, and comparable experiments." },
      { label: "Ownership", text: "Designed and implemented end-to-end (architecture → code → UX)." },
    ],
    links: [{ kind: "github", href: "https://github.com/adityayadav161003/ay-systems", label: "Repo" }],
    deepDive: {
      problem:
        "Most student ML projects stop at a notebook. I wanted a repeatable workflow that can run end-to-end on new tabular datasets with consistent preprocessing, evaluation, and artifacts.",
      approach:
        "I split the pipeline into an orchestrator + specialized agents. Each agent owns a stage (data, features, training, evaluation, reporting) and communicates through structured outputs so experiments remain comparable.",
      flow: [
        "Data ingestion (CSV / dataset config)",
        "Preprocessing (missing values, encoding decisions, scaling)",
        "Feature engineering stage",
        "Model training (multiple candidates)",
        "Evaluation (task-appropriate metrics)",
        "Export artifacts (model + report)",
      ],
      results: [
        "Reliable runs with consistent outputs and logs.",
        "Comparable experiments across models via standardized evaluation.",
        "Artifacts exported for later reuse (model + report).",
      ],
      tradeoffs: [
        "Kept model search lightweight (internship-ready) rather than building a full hyperparameter platform.",
        "Prioritized clarity and extensibility over squeezing max leaderboard accuracy.",
      ],
      challenges: [
        "Designing interfaces between agents so later stages don’t depend on hidden state.",
        "Avoiding one-off preprocessing that breaks comparability across runs.",
      ],
      next: [
        "Add dataset schema validation + stronger leakage checks.",
        "Add experiment tracking with versioned configs and a comparison view.",
      ],
    },
    featured: true,
  },
  {
    id: 2,
    title: "GestureWave AI",
    description:
      "A real-time, touch-free gesture control prototype using OpenCV + MediaPipe to track hands and map gestures to actions.",
    impact: "Computer Vision · Real-time interaction",
    tech: ["OpenCV", "MediaPipe", "Python", "Computer Vision"],
    highlights: [
      { label: "Built", text: "Hand tracking + gesture recognition loop designed for real-time feedback (20–25 FPS)." },
      { label: "Focus", text: "Latency, stability, and clean gesture-to-action mapping." },
      { label: "Ownership", text: "Implemented the full CV pipeline and interaction logic." },
    ],
    links: [{ kind: "private", label: "Private Repo — demo available" }],
    deepDive: {
      problem:
        "Build a touch-free interaction prototype that feels responsive in real time, not just a vision demo.",
      approach:
        "Use MediaPipe for hand landmarks, extract simple gesture signals, and map them into stable actions with smoothing so the UI doesn’t jitter.",
      flow: [
        "Webcam frame capture",
        "Hand landmark detection (MediaPipe)",
        "Gesture feature extraction (relative positions / thresholds)",
        "Smoothing + debouncing",
        "Gesture → action mapping",
        "Real-time feedback loop (20–25 FPS target)",
      ],
      results: [
        "Real-time loop at ~20–25 FPS in typical conditions.",
        "Stable interaction patterns via smoothing and thresholds.",
      ],
      tradeoffs: [
        "Chose a simpler gesture set for reliability over supporting many complex gestures.",
        "Optimized for responsiveness and stability rather than perfect classification accuracy.",
      ],
      challenges: ["Jittery detections in imperfect lighting.", "Balancing sensitivity vs false triggers."],
      next: ["Add calibration mode per user.", "Add a lightweight model-based gesture classifier for ambiguous cases."],
    },
    featured: false,
  },
  {
    id: 3,
    title: "AutoML Engine for Tabular Data",
    description:
      "A tabular ML automation tool that standardizes preprocessing, compares multiple models, and surfaces metrics in a consistent format.",
    impact: "ML Tooling · Faster experiments",
    tech: ["scikit-learn", "EDA", "Feature Engineering", "Model Evaluation"],
    highlights: [
      { label: "Built", text: "Automated preprocessing + model comparison with consistent evaluation outputs." },
      { label: "Outcome", text: "Reduced repetitive setup work (~15% faster iteration in my experiments)." },
      { label: "Ownership", text: "Built to make experimentation repeatable and easy to extend." },
    ],
    links: [{ kind: "private", label: "Private Repo — demo available" }],
    deepDive: {
      problem:
        "Training tabular models repeatedly involves the same setup work. I wanted a small tool that standardizes preprocessing + evaluation so comparisons are faster and fair.",
      approach:
        "Automate preprocessing steps (missing values, encoding, scaling), run a small set of candidate models, and output consistent metrics and summaries.",
      flow: [
        "Dataset load + target selection",
        "Preprocessing config (encoding/scaling/imputation)",
        "Candidate model training",
        "Evaluation (task-aware metrics)",
        "Rank + summarize results",
      ],
      results: ["~15% faster iteration in my experiments by cutting repetitive setup.", "More consistent comparisons across models."],
      tradeoffs: ["Kept the model set compact to stay fast and readable.", "Focused on reproducibility over exhaustive search."],
      challenges: ["Handling mixed categorical + numeric data cleanly.", "Avoiding evaluation noise from inconsistent splits."],
      next: ["Add cross-validation option + confidence intervals.", "Add model card export for best run."],
    },
    featured: false,
  },
  {
    id: 4,
    title: "Full-Stack Portfolio Website",
    description:
      "This site: a product-quality portfolio focused on clarity, performance, and interaction polish — built to be recruiter-friendly.",
    impact: "Product UI · Real deployment",
    tech: ["Next.js 16", "TypeScript", "Tailwind CSS", "Framer Motion"],
    highlights: [
      { label: "Built", text: "A premium UI with responsive layout, micro-interactions, and a canvas starfield background." },
      { label: "Why", text: "Designed for fast scanning: role, proof, projects, and contact within seconds." },
      { label: "Ownership", text: "Designed and implemented end-to-end." },
    ],
    links: [
      { kind: "github", href: "https://github.com/adityayadav161003/ay-systems", label: "Repo" },
      { kind: "demo", href: "https://ay-systems-iota.vercel.app", label: "Live" },
    ],
    deepDive: {
      problem:
        "Most portfolios look good but don’t build trust. I wanted a site that reads like a product: clear hierarchy, proof, and fast conversion.",
      approach:
        "Build a consistent section system, a premium dark aesthetic, and intentional micro-interactions while keeping performance and readability strong.",
      flow: ["Hero + trust signals", "Projects as proof", "Skills for scanning", "Lab for interaction craft", "Contact for conversion"],
      results: ["Clearer recruiter scan path and stronger proof-first project structure.", "Polished interaction feel without adding gimmicks."],
      tradeoffs: ["Kept effects lightweight (no heavy 3D libs).", "Focused on readability on mobile and recruiter screens."],
      challenges: ["Balancing visual richness with layout stability across breakpoints.", "Avoiding ‘template portfolio’ signals."],
      next: ["Add 1–2 deeper case studies with diagrams.", "Add per-project demo clips where available."],
    },
    featured: false,
  }
]

type ProjectLink =
  | { kind: "github" | "demo"; href: string; label: string }
  | { kind: "private"; label: string }
type ProjectHighlight = { label: string; text: string }
type ProjectDeepDive = {
  problem: string
  approach: string
  flow: string[]
  results: string[]
  tradeoffs: string[]
  challenges: string[]
  next: string[]
}

export default function Projects() {
  const [activeId, setActiveId] = useState<number | null>(null)
  const activeProject = useMemo(() => projects.find((p) => p.id === activeId) ?? null, [activeId])

  useEffect(() => {
    if (!activeProject) return
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveId(null)
    }
    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [activeProject])

  return (
    <SectionWrapper id="projects" plain noPadding>
      <div className="space-y-16">
        <div className="flex flex-col md:flex-row justify-between items-end gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-3 text-blue-400 font-bold tracking-[0.2em] uppercase text-xs">
              <Sparkles size={16} />
              <span>Selected Works</span>
            </div>
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter text-white">
              Featured <span className="text-white/40 italic">Projects.</span>
            </h2>
            <p className="text-gray-400 max-w-xl text-lg leading-relaxed">
              Four builds that show how I work: practical ML workflows, real-time CV, tooling, and product-quality UI.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {projects.map((project, index) => (
            <motion.div 
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`group relative p-8 md:p-12 rounded-[2.5rem] border transition-all duration-700 overflow-hidden flex flex-col justify-between ${
                project.featured 
                  ? 'md:col-span-2 border-white/20 bg-gradient-to-br from-white/[0.05] to-transparent shadow-[0_0_80px_rgba(255,255,255,0.02)]' 
                  : 'border-white/10 bg-white/[0.02] hover:bg-white/[0.05]'
              }`}
            >
              {/* Animated Glow Border */}
              <div className="absolute inset-0 p-px bg-gradient-to-br from-transparent via-transparent to-transparent group-hover:from-blue-500/20 group-hover:via-purple-500/20 group-hover:to-blue-500/20 transition-all duration-1000" />
              
              {project.featured && (
                <div className="absolute top-8 right-8 px-4 py-1.5 rounded-full bg-blue-500 text-white text-[10px] font-black tracking-[0.2em] uppercase shadow-[0_0_20px_rgba(59,130,246,0.5)]">
                  Flagship
                </div>
              )}
              
              <div className="relative z-10 space-y-8">
                <div className="space-y-4">
                  <div className="space-y-1">
                    <p className="text-blue-400 text-xs font-bold tracking-[0.2em] uppercase">
                      {project.impact}
                    </p>
                    <h3 className={`font-black tracking-tight text-white group-hover:text-blue-400 transition-colors duration-500 ${project.featured ? 'text-3xl md:text-5xl' : 'text-2xl md:text-3xl'}`}>
                      {project.title}
                    </h3>
                  </div>
                  <p className={`text-gray-400 leading-relaxed ${project.featured ? 'text-lg md:text-xl max-w-3xl' : 'text-sm md:text-base'}`}>
                    {project.description}
                  </p>
                </div>

                <div className="space-y-6">
                  <div className="space-y-3">
                    {(project.highlights as ProjectHighlight[]).map((h) => (
                      <div key={h.label} className="text-sm text-gray-500 leading-relaxed">
                        <span className="text-white/80 font-black tracking-tight">{h.label}:</span>{" "}
                        <span className="text-gray-400">{h.text}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-2 md:gap-3">
                    {project.tech.map((t) => (
                      <span key={t} className="px-4 py-1.5 text-[10px] md:text-xs font-bold uppercase tracking-wider rounded-xl border border-white/10 bg-white/5 text-gray-300 group-hover:border-blue-500/30 group-hover:bg-blue-500/5 transition-all duration-500">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex flex-wrap gap-6 pt-4">
                  <button
                    onClick={() => setActiveId(project.id)}
                    className="flex items-center gap-2 text-xs md:text-sm font-bold text-white uppercase tracking-widest hover:text-blue-400 transition-colors duration-300 group/link"
                  >
                    <ExternalLink size={18} className="group-hover/link:scale-110 transition-transform" />
                    Deep Dive
                  </button>

                  {(project.links as ProjectLink[]).map((link) => {
                    if (link.kind === "private") {
                      return (
                        <div
                          key={`${project.id}-${link.kind}`}
                          className="flex items-center gap-2 text-xs md:text-sm font-bold text-white/55 uppercase tracking-widest"
                        >
                          <Github size={18} className="opacity-70" />
                          {link.label}
                        </div>
                      )
                    }

                    return (
                      <a
                        key={`${project.id}-${link.kind}`}
                        href={link.href}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-2 text-xs md:text-sm font-bold text-white uppercase tracking-widest hover:text-blue-400 transition-colors duration-300 group/link"
                      >
                        {link.kind === "github" ? (
                          <Github size={18} className="group-hover/link:scale-110 transition-transform" />
                        ) : (
                          <ExternalLink size={18} className="group-hover/link:scale-110 transition-transform" />
                        )}
                        {link.label}
                      </a>
                    )
                  })}
                </div>
              </div>

              {/* Decorative background element */}
              <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-blue-600/5 rounded-full blur-[100px] group-hover:bg-blue-600/10 transition-all duration-1000" />
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {activeProject ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[80]"
            aria-modal="true"
            role="dialog"
          >
            <button
              onClick={() => setActiveId(null)}
              className="absolute inset-0 bg-black/70 backdrop-blur-sm"
              aria-label="Close"
            />

            <div className="absolute inset-0 px-4 py-10 md:py-16 overflow-y-auto">
              <motion.div
                initial={{ opacity: 0, y: 18, scale: 0.985 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 18, scale: 0.985 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="relative max-w-4xl mx-auto rounded-[2.75rem] border border-white/10 bg-[#050505]/80 backdrop-blur-3xl shadow-2xl overflow-hidden"
              >
                <div className="absolute inset-0 opacity-70" style={{ backgroundImage: "radial-gradient(1200px circle at 20% 0%, rgba(59,130,246,0.16), transparent 55%)" }} />
                <div className="relative z-10 p-8 md:p-12 space-y-10">
                  <div className="flex items-start justify-between gap-8">
                    <div className="space-y-3">
                      <div className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-400">
                        Project Deep Dive
                      </div>
                      <div className="text-3xl md:text-5xl font-black tracking-tight text-white">{activeProject.title}</div>
                      <div className="text-white/65 text-base md:text-lg leading-relaxed">{activeProject.description}</div>
                    </div>
                    <button
                      onClick={() => setActiveId(null)}
                      className="shrink-0 px-4 py-3 rounded-2xl border border-white/10 bg-white/5 text-[10px] font-black uppercase tracking-[0.25em] text-white/70 hover:bg-white/10 hover:text-white transition-colors"
                    >
                      Close
                    </button>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {activeProject.tech.map((t) => (
                      <span
                        key={t}
                        className="px-4 py-1.5 text-[10px] md:text-xs font-bold uppercase tracking-wider rounded-xl border border-white/10 bg-white/5 text-gray-300"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <DeepDiveSection title="Problem">
                    <p className="text-white/75 leading-relaxed">{(activeProject.deepDive as ProjectDeepDive).problem}</p>
                  </DeepDiveSection>

                  <DeepDiveSection title="Approach">
                    <p className="text-white/75 leading-relaxed">{(activeProject.deepDive as ProjectDeepDive).approach}</p>
                  </DeepDiveSection>

                  <DeepDiveSection title="System Flow">
                    <ul className="space-y-3">
                      {(activeProject.deepDive as ProjectDeepDive).flow.map((step) => (
                        <li key={step} className="flex items-start gap-3 text-white/75">
                          <span className="mt-2 w-1.5 h-1.5 rounded-full bg-white/25 shrink-0" />
                          <span className="leading-relaxed">{step}</span>
                        </li>
                      ))}
                    </ul>
                  </DeepDiveSection>

                  <div className="grid md:grid-cols-2 gap-8">
                    <DeepDiveSection title="Results">
                      <ul className="space-y-3">
                        {(activeProject.deepDive as ProjectDeepDive).results.map((r) => (
                          <li key={r} className="flex items-start gap-3 text-white/75">
                            <span className="mt-2 w-1.5 h-1.5 rounded-full bg-emerald-400/60 shrink-0" />
                            <span className="leading-relaxed">{r}</span>
                          </li>
                        ))}
                      </ul>
                    </DeepDiveSection>

                    <DeepDiveSection title="My Role">
                      <div className="space-y-3">
                        {(activeProject.highlights as ProjectHighlight[])
                          .filter((h) => h.label === "Ownership" || h.label === "Built")
                          .map((h) => (
                            <div key={h.label} className="text-white/75 leading-relaxed">
                              <span className="text-white/85 font-black tracking-tight">{h.label}:</span> {h.text}
                            </div>
                          ))}
                      </div>
                    </DeepDiveSection>
                  </div>

                  <div className="grid md:grid-cols-2 gap-8">
                    <DeepDiveSection title="Tradeoffs">
                      <ul className="space-y-3">
                        {(activeProject.deepDive as ProjectDeepDive).tradeoffs.map((t) => (
                          <li key={t} className="flex items-start gap-3 text-white/75">
                            <span className="mt-2 w-1.5 h-1.5 rounded-full bg-white/25 shrink-0" />
                            <span className="leading-relaxed">{t}</span>
                          </li>
                        ))}
                      </ul>
                    </DeepDiveSection>

                    <DeepDiveSection title="Challenges">
                      <ul className="space-y-3">
                        {(activeProject.deepDive as ProjectDeepDive).challenges.map((c) => (
                          <li key={c} className="flex items-start gap-3 text-white/75">
                            <span className="mt-2 w-1.5 h-1.5 rounded-full bg-white/25 shrink-0" />
                            <span className="leading-relaxed">{c}</span>
                          </li>
                        ))}
                      </ul>
                    </DeepDiveSection>
                  </div>

                  <DeepDiveSection title="Next Improvements">
                    <ul className="space-y-3">
                      {(activeProject.deepDive as ProjectDeepDive).next.map((n) => (
                        <li key={n} className="flex items-start gap-3 text-white/75">
                          <span className="mt-2 w-1.5 h-1.5 rounded-full bg-blue-400/60 shrink-0" />
                          <span className="leading-relaxed">{n}</span>
                        </li>
                      ))}
                    </ul>
                  </DeepDiveSection>

                  <div className="flex flex-wrap gap-4 pt-2">
                    {(activeProject.links as ProjectLink[]).map((link) => {
                      if (link.kind === "private") {
                        return (
                          <div
                            key={`${activeProject.id}-${link.kind}-modal`}
                            className="px-5 py-3 rounded-2xl border border-white/10 bg-white/5 text-[10px] font-black uppercase tracking-[0.25em] text-white/60"
                          >
                            {link.label}
                          </div>
                        )
                      }

                      return (
                        <a
                          key={`${activeProject.id}-${link.kind}-modal`}
                          href={link.href}
                          target="_blank"
                          rel="noreferrer"
                          className="px-5 py-3 rounded-2xl border border-white/10 bg-white/5 text-[10px] font-black uppercase tracking-[0.25em] text-white/75 hover:bg-white/10 hover:text-white transition-colors"
                        >
                          {link.kind === "github" ? "Open Repo" : "Open Demo"}
                        </a>
                      )
                    })}
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </SectionWrapper>
  )
}

function DeepDiveSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="space-y-3">
      <div className="text-[10px] font-black uppercase tracking-[0.3em] text-white/55">{title}</div>
      <div className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-6 md:p-8">{children}</div>
    </div>
  )
}
