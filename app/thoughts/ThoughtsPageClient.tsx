"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Send, ArrowLeft, MessageCircle } from "lucide-react"
import Link from "next/link"
import { supabase } from "@/lib/supabase/client"
import type { Database } from "@/lib/supabase/database.types"

type Thought = Database['public']['Tables']['thoughts']['Row']

export default function ThoughtsPageClient() {
  const [thoughts, setThoughts] = useState<Thought[]>([])
  const [content, setContent] = useState("")
  const [name, setName] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [justSubmitted, setJustSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchThoughts()
    
    // Subscribe to real-time updates
    const channel = supabase
      .channel('thoughts-changes')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'thoughts',
          filter: 'approved=eq.true'
        },
        (payload) => {
          const newThought = payload.new as Thought
          // Deduplicate: skip if already added via optimistic update
          setThoughts((current) => {
            if (current.some((t) => t.id === newThought.id)) return current
            return [newThought, ...current]
          })
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [])

  const fetchThoughts = async () => {
    try {
      const res = await fetch("/api/thoughts")
      if (res.ok) {
        const data = await res.json()
        setThoughts(data)
      }
    } catch (error) {
      console.error("Failed to fetch thoughts:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!content.trim() || isSubmitting) return

    setIsSubmitting(true)
    try {
      const res = await fetch("/api/thoughts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content, name: name || null }),
      })

      if (res.ok) {
        const newThought = await res.json()
        // Immediately add to UI (optimistic update)
        setThoughts((current) => {
          if (current.some((t) => t.id === newThought.id)) return current
          return [newThought, ...current]
        })
        setContent("")
        setName("")
        setJustSubmitted(true)
        setTimeout(() => setJustSubmitted(false), 3000)
      }
    } catch (error) {
      console.error("Failed to submit thought:", error)
    } finally {
      setIsSubmitting(false)
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

  const charCount = content.length
  const maxChars = 500

  return (
    <main className="min-h-screen bg-[#050505] text-white px-4 md:px-8 lg:px-12 pt-[120px] md:pt-[140px] pb-24 overflow-x-hidden relative">
      {/* Background */}
      <div className="absolute inset-0 bg-black -z-50" />
      <div className="fixed top-0 left-0 w-full h-[500px] bg-gradient-to-b from-blue-500/5 to-transparent blur-[120px] pointer-events-none -z-40" />

      <div className="max-w-[900px] mx-auto space-y-16">
        {/* Back Link */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-white/50 hover:text-white transition-colors text-sm font-bold uppercase tracking-widest group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </Link>
        </motion.div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-6"
        >
          <div className="flex items-center gap-3 text-blue-400 font-bold tracking-[0.2em] uppercase text-xs">
            <MessageCircle size={16} />
            <span>Public Reflection Wall</span>
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-white leading-tight">
            Leave a <span className="text-white/40 italic">Thought.</span>
          </h1>

          <p className="text-base md:text-lg text-white/70 max-w-2xl leading-relaxed">
            A quiet space for reflections, signals, and thoughts. Share what's on your mind about engineering, systems, or the work.
          </p>
        </motion.div>

        {/* Input Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative p-8 md:p-10 rounded-[2.5rem] border border-white/10 bg-white/[0.02] backdrop-blur-xl overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-focus-within:opacity-100 transition-opacity duration-500" />
              
              <div className="relative z-10 space-y-6">
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Leave a reflection, signal, or thought..."
                  maxLength={maxChars}
                  rows={4}
                  className="w-full bg-transparent text-white placeholder:text-white/30 text-base md:text-lg leading-relaxed resize-none focus:outline-none"
                />

                <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your name (optional)"
                    maxLength={50}
                    className="w-full sm:w-auto bg-transparent border-b border-white/10 text-white placeholder:text-white/30 text-sm py-2 focus:outline-none focus:border-blue-400/50 transition-colors"
                  />

                  <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
                    <span className={`text-xs font-mono ${charCount > maxChars * 0.9 ? 'text-yellow-400' : 'text-white/40'}`}>
                      {charCount}/{maxChars}
                    </span>

                    <motion.button
                      type="submit"
                      disabled={!content.trim() || isSubmitting}
                      whileHover={{ scale: content.trim() ? 1.02 : 1 }}
                      whileTap={{ scale: content.trim() ? 0.98 : 1 }}
                      className={`
                        flex items-center gap-2 px-6 py-3 rounded-full text-xs font-black uppercase tracking-[0.2em]
                        transition-all duration-300
                        ${content.trim() 
                          ? 'bg-white text-black hover:shadow-[0_0_30px_rgba(255,255,255,0.3)]' 
                          : 'bg-white/10 text-white/30 cursor-not-allowed'
                        }
                      `}
                    >
                      {isSubmitting ? (
                        <>
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            className="w-4 h-4 border-2 border-current border-t-transparent rounded-full"
                          />
                          Sending
                        </>
                      ) : (
                        <>
                          <Send size={14} />
                          Leave Thought
                        </>
                      )}
                    </motion.button>
                  </div>
                </div>
              </div>
            </div>

            {justSubmitted && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="text-center text-sm text-blue-400 font-medium"
              >
                ✓ Thought shared
              </motion.div>
            )}
          </form>
        </motion.div>

        {/* Thoughts Feed */}
        <div className="space-y-6">
          {isLoading ? (
            <div className="text-center py-16 text-white/40 text-sm">
              Loading thoughts...
            </div>
          ) : thoughts.length === 0 ? (
            <div className="text-center py-16 text-white/40 text-sm">
              Be the first to leave a thought.
            </div>
          ) : (
            thoughts.map((thought, index) => (
              <motion.div
                key={thought.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="relative p-6 md:p-8 rounded-[2rem] border border-white/10 bg-white/[0.02] backdrop-blur-sm overflow-hidden group hover:bg-white/[0.04] transition-all duration-300"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative z-10 space-y-4">
                  <p className="text-white/90 leading-relaxed text-sm md:text-base">
                    {thought.content}
                  </p>
                  
                  <div className="flex items-center justify-between text-xs text-white/40">
                    <span className="font-medium">
                      {thought.name || "Anonymous"}
                    </span>
                    <span className="font-mono">
                      {formatDate(thought.created_at)}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </main>
  )
}
