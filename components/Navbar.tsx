"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"

export default function Navbar() {
  const pathname = usePathname()
  const [activeHash, setActiveHash] = useState("")

  useEffect(() => {
    const handleHashChange = () => {
      setActiveHash(window.location.hash)
    }

    handleHashChange()
    window.addEventListener("hashchange", handleHashChange)

    return () => window.removeEventListener("hashchange", handleHashChange)
  }, [])

  const navItems = [
    { name: "About", href: "/#about", type: "hash" },
    { name: "Projects", href: "/#projects", type: "hash" },
    { name: "Blog", href: "/blog", type: "route" },
    { name: "Contact", href: "/#contact", type: "hash" },
  ]

  const isActive = (item: any) => {
    if (item.type === "route") {
      return pathname === item.href
    }
    if (item.type === "hash" && pathname === "/") {
      return activeHash === item.href.replace("/", "")
    }
    return false
  }

  return (
    <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50">
      <div className="flex items-center gap-8 px-8 py-3 rounded-full
        bg-black/70 backdrop-blur-2xl border border-white/10
        shadow-[0_0_30px_rgba(255,255,255,0.05)]">

        {navItems.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className={`relative text-sm font-medium transition-all duration-300
              ${
                isActive(item)
                  ? "text-white"
                  : "text-white/60 hover:text-white"
              }`}
          >
            {item.name}

            {isActive(item) && (
              <span className="absolute -bottom-2 left-1/2 -translate-x-1/2
                w-5 h-[2px] bg-white rounded-full" />
            )}
          </Link>
        ))}
      </div>
    </nav>
  )
}
