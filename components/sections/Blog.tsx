import SectionWrapper from "@/components/SectionWrapper"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, BookOpen } from "lucide-react"

// Dummy data for now since we're in a client component but need post data
const posts = [
  {
    slug: "system-design-thinking",
    title: "System Design Thinking",
    description: "How I approach scalable architecture and trade-offs in engineering.",
    date: "Mar 2026"
  },
  {
    slug: "first-post",
    title: "Engineering Reflection",
    description: "Documenting my journey as a student builder and the importance of iteration.",
    date: "Feb 2026"
  }
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
              Thoughts on machine learning, system design, and the process of building intelligent software.
            </p>
          </div>
          <Link 
            href="/blog" 
            className="group flex items-center gap-3 text-xs font-black text-white uppercase tracking-[0.2em] hover:text-blue-400 transition-colors duration-300"
          >
            <span>View All Posts</span>
            <div className="p-3 rounded-full bg-white/5 border border-white/10 group-hover:border-blue-500/30 group-hover:bg-blue-500/5 transition-all">
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {posts.map((post, index) => (
            <motion.div
              key={post.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Link 
                href={`/blog/${post.slug}`}
                className="group relative p-8 md:p-12 rounded-[2.5rem] border border-white/10 bg-white/[0.02] hover:bg-white/[0.05] transition-all duration-500 flex flex-col justify-between h-full overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative z-10 space-y-8">
                  <div className="space-y-4">
                    <time className="text-[10px] font-black text-gray-500 uppercase tracking-[0.3em] group-hover:text-blue-400 transition-colors">
                      {post.date}
                    </time>
                    <h3 className="text-3xl md:text-4xl font-black text-white group-hover:text-blue-400 transition-colors duration-500 tracking-tight leading-tight">
                      {post.title}
                    </h3>
                    <p className="text-gray-500 leading-relaxed group-hover:text-gray-400 transition-colors duration-500 text-base md:text-lg">
                      {post.description}
                    </p>
                  </div>
                  <div className="flex items-center gap-3 text-[10px] font-black text-white uppercase tracking-[0.3em] group-hover:translate-x-2 transition-transform duration-500">
                    <span>Read Article</span>
                    <ArrowRight size={14} className="text-blue-400" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  )
}
