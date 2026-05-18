import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Glass Links — Linktree Builder',
  description: 'Create stunning glassmorphism link-in-bio pages',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-[#050010] text-white min-h-screen overflow-hidden">
        {children}
      </body>
    </html>
  )
}
