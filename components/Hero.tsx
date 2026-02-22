'use client'

import Image from 'next/image'
import { useRef, useEffect } from 'react'
import { motion, type Variants } from 'framer-motion'
import { data } from '@/lib/data'

const container: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
    },
  },
}

const item: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
}

function ParticleWeb({ mouseRef }: { mouseRef: React.RefObject<{ x: number; y: number }> }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animId: number
    const COUNT = 70
    const MAX_DIST = 160
    const MOUSE_DIST = 220

    const particles: { x: number; y: number; vx: number; vy: number }[] = []

    const resize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }

    const init = () => {
      resize()
      particles.length = 0
      for (let i = 0; i < COUNT; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.45,
          vy: (Math.random() - 0.5) * 0.45,
        })
      }
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      for (const p of particles) {
        p.x += p.vx
        p.y += p.vy
        if (p.x < 0 || p.x > canvas.width)  p.vx *= -1
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1
      }

      const mx = mouseRef.current?.x ?? -9999
      const my = mouseRef.current?.y ?? -9999

      const isDark = document.documentElement.classList.contains('dark')
      const rgb = isDark ? '210,210,210' : '100,100,100'

      // Particle-to-particle lines
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < MAX_DIST) {
            const alpha = (1 - dist / MAX_DIST) * 0.35
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.strokeStyle = `rgba(${rgb},${alpha})`
            ctx.lineWidth = 0.8
            ctx.stroke()
          }
        }

        // Particle-to-mouse lines
        const mdx = particles[i].x - mx
        const mdy = particles[i].y - my
        const mdist = Math.sqrt(mdx * mdx + mdy * mdy)
        if (mdist < MOUSE_DIST) {
          const alpha = (1 - mdist / MOUSE_DIST) * 0.65
          ctx.beginPath()
          ctx.moveTo(particles[i].x, particles[i].y)
          ctx.lineTo(mx, my)
          ctx.strokeStyle = `rgba(${rgb},${alpha})`
          ctx.lineWidth = 0.8
          ctx.stroke()
        }
      }

      // Dots
      for (const p of particles) {
        ctx.beginPath()
        ctx.arc(p.x, p.y, 1.8, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${rgb},0.5)`
        ctx.fill()
      }

      animId = requestAnimationFrame(draw)
    }

    init()
    draw()

    const onResize = () => init()
    window.addEventListener('resize', onResize)
    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', onResize)
    }
  }, [mouseRef])

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 w-full h-full"
    />
  )
}

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const mouseRef = useRef({ x: -9999, y: -9999 })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = containerRef.current?.getBoundingClientRect()
    if (!rect) return
    mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top }
  }

  const handleMouseLeave = () => {
    mouseRef.current = { x: -9999, y: -9999 }
  }

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-screen overflow-hidden"
    >
      <ParticleWeb mouseRef={mouseRef} />

      <section className="relative flex min-h-screen flex-col items-start justify-center px-6 pt-24 pb-16 mx-auto max-w-4xl">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="flex flex-col gap-6"
        >
          <motion.div variants={item}>
            <Image
              src="/avatar.jpg"
              alt={data.name}
              width={80}
              height={80}
              className="rounded-full object-cover"
              priority
            />
          </motion.div>

          <motion.p
            variants={item}
            className="text-sm font-mono tracking-widest uppercase text-neutral-400 dark:text-neutral-500"
          >
            Software Engineer
          </motion.p>

          <motion.h1
            variants={item}
            className="text-5xl sm:text-6xl md:text-7xl font-semibold tracking-tight leading-[1.1] text-neutral-900 dark:text-neutral-50"
          >
            {data.name}
          </motion.h1>

          <motion.p
            variants={item}
            className="max-w-xl text-lg sm:text-xl text-neutral-500 dark:text-neutral-400 leading-relaxed"
          >
            {data.tagline}
          </motion.p>

          <motion.div variants={item} className="flex items-center gap-4 pt-2">
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex h-11 items-center justify-center rounded-full bg-neutral-900 dark:bg-neutral-50 px-6 text-sm font-medium text-white dark:text-neutral-900 transition-colors hover:bg-neutral-700 dark:hover:bg-neutral-200"
            >
              Get in touch
            </motion.a>
            <motion.a
              href="#about"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex h-11 items-center justify-center rounded-full border border-neutral-200 dark:border-neutral-800 px-6 text-sm font-medium text-neutral-700 dark:text-neutral-300 transition-colors hover:border-neutral-400 dark:hover:border-neutral-600"
            >
              About me
            </motion.a>
          </motion.div>
        </motion.div>
      </section>
    </div>
  )
}
