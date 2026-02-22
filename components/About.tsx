'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { data } from '@/lib/data'

export function About() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="about" className="px-6 py-24 mx-auto max-w-4xl">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className="grid md:grid-cols-[1fr_2fr] gap-12 md:gap-16 items-start"
      >
        <div>
          <span className="text-sm font-mono tracking-widest uppercase text-neutral-400 dark:text-neutral-500">
            About
          </span>
        </div>

        <div className="flex flex-col gap-5">
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-50">
            Where engineering meets clarity.
          </h2>
          <p className="text-base sm:text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed">
            {data.bio}
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            {['10+ years exp.', 'Angular & React', 'UX & Systems'].map((tag) => (
              <span
                key={tag}
                className="text-xs font-medium px-3 py-1.5 rounded-full border border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  )
}
