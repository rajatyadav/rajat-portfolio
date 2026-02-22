import { Navbar } from '@/components/Navbar'
import { Hero } from '@/components/Hero'
import { About } from '@/components/About'
import { Skills } from '@/components/Skills'
import { Contact } from '@/components/Contact'

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <div className="border-t border-neutral-100 dark:border-neutral-900" />
        <About />
        <div className="border-t border-neutral-100 dark:border-neutral-900" />
        <Skills />
        <div className="border-t border-neutral-100 dark:border-neutral-900" />
        <Contact />
      </main>
      <footer className="border-t border-neutral-100 dark:border-neutral-900 px-6 py-6 text-center text-xs text-neutral-400 dark:text-neutral-600">
        © {new Date().getFullYear()} Rajat Yadav
        <span className="mx-3 opacity-40">|</span>
        Vibe coded with Claude
      </footer>
    </>
  )
}
