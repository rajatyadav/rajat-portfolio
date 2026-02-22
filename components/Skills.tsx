'use client'

import { useRef } from 'react'
import { motion, useInView, type Variants } from 'framer-motion'
import { data } from '@/lib/data'

const container: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.06,
    },
  },
}

const skillItem: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
}

export function Skills() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="skills" className="px-6 py-24 mx-auto max-w-4xl">
      <div className="grid md:grid-cols-[1fr_2fr] gap-12 md:gap-16 items-start">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <span className="text-sm font-mono tracking-widest uppercase text-neutral-400 dark:text-neutral-500">
            Skills
          </span>
        </motion.div>

        <div className="flex flex-col gap-6">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-2xl sm:text-3xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-50"
          >
            Tools I build with.
          </motion.h2>

          <motion.ul
            variants={container}
            initial="hidden"
            animate={isInView ? 'show' : 'hidden'}
            className="flex flex-wrap gap-3"
          >
            {data.skills.map((skill) => (
              <motion.li
                key={skill}
                variants={skillItem}
                whileHover={{ y: -3, scale: 1.04 }}
                className="cursor-default px-4 py-2.5 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 text-sm font-medium text-neutral-700 dark:text-neutral-300 transition-colors hover:border-neutral-400 dark:hover:border-neutral-600 hover:bg-white dark:hover:bg-neutral-800"
              >
                {skill}
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </div>
    </section>
  )
}
