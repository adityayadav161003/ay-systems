"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowLeft, ArrowRight } from "lucide-react"

type Post = {
  slug: string
  title: string
  description: string
}

export default function BlogPageClient({ posts }: { posts: Post[] }) {
  return (
    <main className="min-h-screen bg-[#050505] text-white px-4 md:px-8 lg:px-12 pt-[120px] md:pt-[160px] lg:pt-[180px] pb-16 overflow-x-hidden relative">
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-black -z-50" />
      <div className="fixed top-0 left-0 w-full h-[500px] bg-gradient-to-b from-blue-500/5 to-transparent blur-[120px] pointer-events-none -z-40" />

      <div className="max-w-[1240px] mx-auto space-y-16">
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
          className="space-y-6 text-center"
        >
          <div className="flex items-center justify-center gap-2">
            <motion.div
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-2 h-2 rounded-full bg-blue-400"
            />
            <span className="text-xs font-bold text-blue-400 tracking-[0.3em] uppercase">Engineering Thoughts</span>
          </div>

          <div className="space-y-4">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-white leading-tight">
              Engineering <span className="text-white/40 italic">Thoughts.</span>
            </h1>
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-base md:text-lg text-white/70 max-w-2xl mx-auto leading-relaxed"
          >
            Real perspectives on system design, architecture decisions, and engineering trade-offs.
          </motion.p>
        </motion.div>

        {/* Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post, index) => (
            <motion.div
              key={post.slug}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Link
                href={`/blog/${post.slug}`}
                className="group relative block p-8 md:p-10 rounded-[2.5rem] border border-white/10 bg-white/[0.02] hover:bg-white/[0.05] transition-all duration-500 overflow-hidden h-full"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative z-10 space-y-6">
                  <div className="space-y-3">
                    <h2 className="text-2xl font-black text-white tracking-tight leading-snug group-hover:text-blue-400 transition-colors">
                      {post.title}
                    </h2>
                    <p className="text-gray-500 leading-relaxed text-sm md:text-base group-hover:text-gray-400 transition-colors">
                      {post.description}
                    </p>
                  </div>
                  <div className="flex items-center gap-3 text-[10px] font-black text-white uppercase tracking-[0.3em] group-hover:translate-x-2 transition-transform duration-500">
                    <span>Read Note</span>
                    <ArrowRight size={14} className="text-blue-400" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  )
}
