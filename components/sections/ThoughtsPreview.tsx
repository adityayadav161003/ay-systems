"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { MessageCircle, ArrowRight } from "lucide-react"
import Link from "next/link"
import SectionWrapper from "@/components/SectionWrapper"

type Thought = {
  id: string
  content: string
  name: string | null
  createdAt: string
}

export default function ThoughtsPreview() {
  const [thoughts, setThoughts] = useState<Thought[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchThoughts()
  }, [])

  const fetchThoughts = async () => {
    try {
      const res = await fetch("/api/thoughts")
      if (res.ok) {
        const data = await res.json()
        // Get latest 4 thoughts
        setThoughts(data.slice(0, 4))
      }
    } catch (error) {
      console.error("Failed to fetch thoughts:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffMins = Math.floor(diffMs / 60000)
    const diffHours = Math.floor(diffMs / 3600000)
    const diffDays = Math.floor(diffMs / 86400000)

    if (diffMins < 1) return "just now"
    if (diffMins < 60) return `${diffMins}m ago`
    if (diffHours < 24) return `${diffHours}h ago`
    if (diffDays < 7) return `${diffDays}d ago`
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" })
  }

  return (
    <SectionWrapper id="thoughts-preview" plain noPadding>
      <div className="space-y-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-end gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-3 text-blue-400 font-bold tracking-[0.2em] uppercase text-xs">
              <MessageCircle size={16} />
              <span>Signals from the System</span>
            </div>
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter text-white">
              Recent <span className="text-white/40 italic">Thoughts.</span>
            </h2>
            <p className="text-gray-400 max-w-xl text-lg leading-relaxed">
              Reflections, signals, and thoughts from the community. A quiet space for engineering perspectives.
            </p>
          </div>
          
          <Link 
            href="/thoughts" 
            className="group flex items-center gap-3 text-xs font-black text-white uppercase tracking-[0.2em] hover:text-blue-400 transition-colors duration-300"
          >
            <motion.span whileHover={{ x: 5 }} className="flex items-center gap-3">
              View All Thoughts
              <div className="p-3 rounded-full bg-white/5 border border-white/10 group-hover:border-blue-500/30 group-hover:bg-blue-500/5 transition-all">
                <ArrowRight size={16} className="transition-transform" />
              </div>
            </motion.span>
          </Link>
        </div>

        {/* Thoughts Grid */}
        {isLoading ? (
          <div className="text-center py-16 text-white/40 text-sm">
            Loading thoughts...
          </div>
        ) : thoughts.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <p className="text-white/40 text-sm mb-6">
              No thoughts yet. Be the first to share.
            </p>
            <Link
              href="/thoughts"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-black text-xs font-black uppercase tracking-[0.2em] hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] transition-all"
            >
              Leave a Thought
              <ArrowRight size={14} />
            </Link>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {thoughts.map((thought, index) => (
              <motion.div
                key={thought.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative p-6 md:p-8 rounded-[2rem] border border-white/10 bg-white/[0.02] backdrop-blur-sm overflow-hidden group hover:bg-white/[0.04] transition-all duration-300"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative z-10 space-y-4">
                  <p className="text-white/90 leading-relaxed text-sm md:text-base line-clamp-4">
                    {thought.content}
                  </p>
                  
                  <div className="flex items-center justify-between text-xs text-white/40">
                    <span className="font-medium">
                      {thought.name || "Anonymous"}
                    </span>
                    <span className="font-mono">
                      {formatDate(thought.createdAt)}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </SectionWrapper>
  )
}
