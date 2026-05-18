'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MoreVertical, Share2, Copy, Check } from 'lucide-react'
import { hexToRgba } from '@/lib/templateConfig'

interface Props {
  url: string
  dotColor: string
  buttonLabel: string
  glassTint: string
  glassOpacity: number
  blurIntensity: number
  cardRadius: number
}

export default function ShareButton({
  url,
  dotColor,
  buttonLabel,
  glassTint,
  glassOpacity,
  blurIntensity,
  cardRadius,
}: Props) {
  const [open, setOpen] = useState(false)
  const [copied, setCopied] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    const handler = (e: MouseEvent | TouchEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
        setCopied(false)
      }
    }
    document.addEventListener('mousedown', handler)
    document.addEventListener('touchstart', handler)
    return () => {
      document.removeEventListener('mousedown', handler)
      document.removeEventListener('touchstart', handler)
    }
  }, [open])

  const handleShare = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    if (navigator.share) {
      try {
        await navigator.share({ url })
      } catch {
        // User cancelled or share failed — fallback to copy
        await copyToClipboard()
      }
    } else {
      await copyToClipboard()
    }
  }

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => {
        setCopied(false)
        setOpen(false)
      }, 1500)
    } catch {
      // Fallback for older browsers
      const textarea = document.createElement('textarea')
      textarea.value = url
      document.body.appendChild(textarea)
      textarea.select()
      document.execCommand('copy')
      document.body.removeChild(textarea)
      setCopied(true)
      setTimeout(() => {
        setCopied(false)
        setOpen(false)
      }, 1500)
    }
  }

  const toggleOpen = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setOpen(!open)
    setCopied(false)
  }

  return (
    <div ref={ref} className="relative flex-shrink-0" onClick={(e) => e.stopPropagation()}>
      {/* Three dots trigger */}
      <motion.button
        onClick={toggleOpen}
        whileHover={{ scale: 1.15 }}
        whileTap={{ scale: 0.9 }}
        className="flex items-center justify-center w-7 h-7 rounded-full transition-colors"
        style={{ color: dotColor || 'rgba(255,255,255,0.4)' }}
        aria-label="Share options"
      >
        <MoreVertical size={15} />
      </motion.button>

      {/* Popup */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 4 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 4 }}
            transition={{ duration: 0.18, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="absolute bottom-full right-0 mb-2 z-50"
          >
            <motion.button
              onClick={handleShare}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className="flex items-center gap-2 px-3.5 py-2 text-xs font-medium whitespace-nowrap shadow-lg"
              style={{
                background: hexToRgba(glassTint || '#ffffff', (glassOpacity / 100) * 1.5),
                backdropFilter: `blur(${blurIntensity}px)`,
                WebkitBackdropFilter: `blur(${blurIntensity}px)`,
                border: '1px solid rgba(255, 255, 255, 0.15)',
                borderRadius: `${Math.max((cardRadius || 20) - 8, 8)}px`,
                color: 'rgba(255, 255, 255, 0.85)',
              }}
            >
              {copied ? (
                <>
                  <Check size={12} className="text-green-400" />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  {buttonLabel.toLowerCase().includes('copy') ? (
                    <Copy size={12} />
                  ) : (
                    <Share2 size={12} />
                  )}
                  <span>{buttonLabel || 'Share'}</span>
                </>
              )}
            </motion.button>

            {/* Arrow */}
            <div
              className="absolute top-full right-3 w-0 h-0"
              style={{
                borderLeft: '5px solid transparent',
                borderRight: '5px solid transparent',
                borderTop: `5px solid ${hexToRgba(glassTint || '#ffffff', (glassOpacity / 100) * 1.5)}`,
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
