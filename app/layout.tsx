import type { Metadata } from 'next'
import { Geist } from 'next/font/google'
import { Providers } from './providers'
import './globals.css'

const geist = Geist({
  subsets: ['latin'],
  variable: '--font-geist-sans',
})

export const metadata: Metadata = {
  title: 'Rajat Yadav — Software Engineer',
  description:
    'Design-minded software engineer with 10+ years of experience building modern web applications.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geist.variable} antialiased bg-white dark:bg-neutral-950 text-neutral-900 dark:text-neutral-50`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
