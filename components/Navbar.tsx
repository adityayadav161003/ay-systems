"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"

type NavItem = {
  name: string
  href: string
  type: "hash" | "route"
}

const NAV_ITEMS: NavItem[] = [
  { name: "About", href: "/#about", type: "hash" },
  { name: "Experience", href: "/#experience", type: "hash" },
  { name: "Projects", href: "/#projects", type: "hash" },
  { name: "Skills", href: "/#skills", type: "hash" },
  { name: "Lab", href: "/#lab", type: "hash" },
  { name: "Blog", href: "/blog", type: "route" },
  { name: "Contact", href: "/#contact", type: "hash" },
]

export default function Navbar() {
  const pathname = usePathname()
  const [activeSection, setActiveSection] = useState<string>("")
  const [scrolled, setScrolled] = useState(false)
  const [hovered, setHovered] = useState<string | null>(null)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }

    handleScroll()

    window.addEventListener("scroll", handleScroll)

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  useEffect(() => {
    if (pathname !== "/") return

    const ids = NAV_ITEMS
      .filter((i) => i.type === "hash")
      .map((i) => i.href.replace("/#", ""))

    const setFromHash = () => {
      const h = window.location.hash?.replace("#", "")
      if (h && ids.includes(h)) setActiveSection(h)
    }

    const getElements = () =>
      ids
        .map((id) => document.getElementById(id))
        .filter((el): el is HTMLElement => Boolean(el))

    const updateActiveFromScroll = () => {
      const els = getElements()
      if (els.length === 0) return

      const probe = window.innerHeight * 0.33
      for (const el of els) {
        const r = el.getBoundingClientRect()
        if (r.top <= probe && r.bottom >= probe) {
          setActiveSection(el.id)
          return
        }
      }
    }

    let raf = 0
    const onScroll = () => {
      if (raf) return
      raf = window.requestAnimationFrame(() => {
        raf = 0
        updateActiveFromScroll()
      })
    }

    setFromHash()
    updateActiveFromScroll()

    window.addEventListener("hashchange", setFromHash)
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll)

    return () => {
      window.removeEventListener("hashchange", setFromHash)
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
      if (raf) window.cancelAnimationFrame(raf)
    }
  }, [pathname])

  const isActive = (item: NavItem) => {
    if (item.type === "route") {
      return pathname === item.href
    }
    if (item.type === "hash" && pathname === "/") {
      return activeSection === item.href.replace("/#", "")
    }
    return false
  }

  return (
    <motion.nav 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
      className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[94vw] max-w-[980px]"
    >
      <div
        className={[
          "relative flex items-center justify-center gap-1 md:gap-2 px-3 md:px-4 py-2.5 md:py-3 rounded-full border",
          "overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden",
          "transition-all duration-500",
          scrolled
            ? "bg-white/[0.07] backdrop-blur-3xl backdrop-saturate-150 border-white/12 shadow-[0_20px_80px_rgba(0,0,0,0.65)]"
            : "bg-white/[0.05] backdrop-blur-3xl backdrop-saturate-150 border-white/12 shadow-[0_12px_60px_rgba(0,0,0,0.55)]",
        ].join(" ")}
      >
        <div className="absolute inset-0 pointer-events-none opacity-80 bg-[radial-gradient(900px_circle_at_50%_0%,rgba(255,255,255,0.10),transparent_55%)]" />
        <div className="absolute inset-0 pointer-events-none opacity-70 bg-[linear-gradient(180deg,rgba(255,255,255,0.10)_0%,rgba(255,255,255,0.02)_55%,transparent_100%)]" />
        <div className="absolute inset-0 pointer-events-none opacity-40 bg-[linear-gradient(90deg,transparent_0%,rgba(255,255,255,0.05)_25%,transparent_55%)]" />

        {NAV_ITEMS.map((item) => {
          const active = isActive(item)
          const pillOn = hovered === item.name || active
          return (
            <Link
              key={item.name}
              href={item.href}
              onMouseEnter={() => setHovered(item.name)}
              onMouseLeave={() => setHovered(null)}
              className={[
                "relative shrink-0 px-3 md:px-4 py-2 rounded-full",
                "text-[11px] md:text-[12px] font-bold uppercase tracking-[0.22em]",
                "transition-colors duration-300",
                active ? "text-white" : "text-white/55 hover:text-white",
              ].join(" ")}
            >
              {pillOn ? (
                <motion.span
                  layoutId={active ? "ay-nav-active" : "ay-nav-hover"}
                  className="absolute inset-0 rounded-full"
                  style={{
                    background: active
                      ? "linear-gradient(180deg, rgb(var(--ay-accent-rgb) / 0.22), rgb(var(--ay-glow-rgb) / 0.10))"
                      : "linear-gradient(180deg, rgba(255,255,255,0.10), rgba(255,255,255,0.03))",
                    boxShadow: active ? "0 0 26px rgb(var(--ay-glow-rgb) / 0.22)" : "0 0 14px rgba(255,255,255,0.08)",
                  }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                />
              ) : null}

              <span className="relative z-10">{item.name}</span>

              {active ? (
                <motion.span
                  layoutId="ay-nav-underline"
                  className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-4 h-[2px] rounded-full"
                  style={{
                    background: "rgb(var(--ay-accent-rgb) / 0.95)",
                    boxShadow: "0 0 12px rgb(var(--ay-glow-rgb) / 0.55)",
                  }}
                />
              ) : null}
            </Link>
          )
        })}
      </div>
    </motion.nav>
  )
}
