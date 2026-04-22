"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Send } from "lucide-react"

type Thought = {
  id: string
  content: string
  createdAt: string
  approved: boolean
}

export default function ThoughtsSection({ postSlug }: { postSlug?: string }) {
  const [thoughts, setThoughts] = useState<Thought[]>([])
  const [content, setContent] = useState("")
  const [loading, setLoading] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    fetchThoughts()
  }, [])

  async function fetchThoughts() {
    setLoading(true)
    try {
      const res = await fetch('/api/thoughts')
      const data = await res.json()
      setThoughts(data)
    } catch (error) {
      console.error('Failed to fetch thoughts')
    }
    setLoading(false)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!content.trim() || submitting) return

    setSubmitting(true)
    try {
      const res = await fetch('/api/thoughts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content, postSlug: postSlug || 'general' }),
      })

      if (res.ok) {
        setContent("")
        await fetchThoughts()
      }
    } catch (error) {
      console.error('Failed to submit thought')
    }
    setSubmitting(false)
  }

  return (
    <div className="space-y-12">
      {/* Submit Form */}
      <div className="space-y-4">
        <h3 className="text-2xl md:text-3xl font-black text-white tracking-tight">
          Leave a Thought
        </h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Share your perspective, critique, or idea..."
            className="w-full px-6 py-4 rounded-2xl bg-white/5 border border-white/10 text-white placeholder:text-gray-600 focus:border-cyan-500/50 focus:outline-none transition-colors resize-none"
            rows={4}
            maxLength={500}
          />
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-500">
              {content.length}/500
            </span>
            <motion.button
              type="submit"
              disabled={!content.trim() || submitting}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-cyan-500 text-black font-bold hover:bg-cyan-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send size={16} />
              {submitting ? 'Sending...' : 'Submit'}
            </motion.button>
          </div>
        </form>
      </div>

      {/* Thoughts List */}
      <div className="space-y-6">
        <h3 className="text-xl font-black text-white/80 tracking-tight">
          Recent Thoughts ({thoughts.length})
        </h3>

        {loading ? (
          <div className="text-gray-500 text-center py-8">Loading thoughts...</div>
        ) : thoughts.length === 0 ? (
          <div className="text-center py-12 px-6 rounded-2xl border border-white/10 bg-white/[0.02]">
            <p className="text-gray-500">Be the first to leave a thought.</p>
          </div>
        ) : (
          <AnimatePresence>
            {thoughts.map((thought, index) => (
              <motion.div
                key={thought.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: index * 0.05 }}
                className="p-6 rounded-2xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.05] transition-all"
              >
                <p className="text-gray-300 leading-relaxed">{thought.content}</p>
                <div className="mt-4 text-xs text-gray-600">
                  {new Date(thought.createdAt).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        )}
      </div>
    </div>
  )
}
