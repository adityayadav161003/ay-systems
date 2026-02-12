import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import About from '@/components/sections/About'
import Projects from '@/components/sections/Projects'
import Blog from '@/components/sections/Blog'
import Contact from '@/components/sections/Contact'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <>
      <Navbar />

      <main className="bg-black text-white">
        <Hero />
        <About />
        <Projects />
        <Blog />
        <Contact />
      </main>

      
    </>
  )
}
