"use client"

import SectionWrapper from "@/components/SectionWrapper"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, BookOpen } from "lucide-react"

const featured = [
  {
    slug: "system-design-thinking",
    title: "System Design Thinking",
    description: "How I make trade-offs and keep projects shippable.",
    label: "Write-up",
  },
  {
    slug: "first-post",
    title: "Engineering Reflection",
    description: "What I’m optimizing for as an early-career builder.",
    label: "Write-up",
  },
]

export default function Blog() {
  return (
    <SectionWrapper id="blog" plain noPadding>
      <div className="space-y-16">
        <div className="flex flex-col md:flex-row justify-between items-end gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-3 text-blue-400 font-bold tracking-[0.2em] uppercase text-xs">
              <BookOpen size={16} />
              <span>Technical Writing</span>
            </div>
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter text-white">
              Engineering <span className="text-white/40 italic">Insights.</span>
            </h2>
            <p className="text-gray-400 max-w-xl text-lg leading-relaxed">
              Short write-ups and build notes. I keep these lightweight and focused on decisions, trade-offs, and outcomes.
            </p>
          </div>
          <Link 
            href="/blog" 
            className="group flex items-center gap-3 text-xs font-black text-white uppercase tracking-[0.2em] hover:text-blue-400 transition-colors duration-300"
          >
            <span>Open Blog</span>
            <div className="p-3 rounded-full bg-white/5 border border-white/10 group-hover:border-blue-500/30 group-hover:bg-blue-500/5 transition-all">
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
          {featured.map((post, index) => (
            <motion.div
              key={post.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.08 }}
              viewport={{ once: true }}
            >
              <Link
                href={`/blog/${post.slug}`}
                className="group relative block p-8 md:p-10 rounded-[2.5rem] border border-white/10 bg-white/[0.02] hover:bg-white/[0.05] transition-all duration-500 overflow-hidden h-full"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative z-10 space-y-6">
                  <div className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-500 group-hover:text-blue-400 transition-colors">
                    {post.label}
                  </div>
                  <div className="space-y-3">
                    <h3 className="text-2xl font-black text-white tracking-tight leading-snug group-hover:text-blue-400 transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-gray-500 leading-relaxed text-sm md:text-base group-hover:text-gray-400 transition-colors">
                      {post.description}
                    </p>
                  </div>
                  <div className="flex items-center gap-3 text-[10px] font-black text-white uppercase tracking-[0.3em] group-hover:translate-x-2 transition-transform duration-500">
                    <span>Read</span>
                    <ArrowRight size={14} className="text-blue-400" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: featured.length * 0.08 }}
            viewport={{ once: true }}
            className="group relative p-8 md:p-10 rounded-[2.5rem] border border-white/10 bg-white/[0.02] hover:bg-white/[0.05] transition-all duration-500 overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative z-10 space-y-6">
              <div className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-500 group-hover:text-blue-400 transition-colors">
                Drafting
              </div>
              <div className="space-y-3">
                <h3 className="text-2xl font-black text-white tracking-tight leading-snug">More case notes soon</h3>
                <p className="text-gray-500 leading-relaxed text-sm md:text-base">
                  Next up: AY Systems workflow breakdown, fraud classification evaluation notes, and GestureWave performance details.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </SectionWrapper>
  )
}
