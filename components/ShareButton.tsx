'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Share2, Copy, Link } from 'lucide-react'
import { hexToRgba } from '@/lib/templateConfig'

interface Props {
  url: string
  shareText?: string
  shareIcon?: 'share' | 'copy' | 'link'
  shareButtonColor?: string
  shareButtonTextColor?: string
  iconRadius?: number
}

export default function ShareButton({
  url,
  shareText = 'Share',
  shareIcon = 'share',
  shareButtonColor = '#ffffff',
  shareButtonTextColor = '#ffffff',
  iconRadius = 12,
}: Props) {
  const [copied, setCopied] = useState(false)
  const [open, setOpen] = useState(false)
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

    if (shareIcon === 'share' && navigator.share) {
      try {
        await navigator.share({ url })
        return
      } catch {
        // fallback to copy
      }
    }

    try {
      await navigator.clipboard.writeText(url)
    } catch {
      const textarea = document.createElement('textarea')
      textarea.value = url
      document.body.appendChild(textarea)
      textarea.select()
      document.execCommand('copy')
      document.body.removeChild(textarea)
    }
    setCopied(true)
    setTimeout(() => {
      setCopied(false)
      setOpen(false)
    }, 1500)
  }

  const IconComp = shareIcon === 'copy' ? Copy : shareIcon === 'link' ? Link : Share2

  return (
    <div ref={ref} className="relative flex-shrink-0" onClick={(e) => e.stopPropagation()}>
      <motion.button
        onClick={(e) => {
          e.preventDefault()
          e.stopPropagation()
          handleShare(e)
        }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium transition-colors"
        style={{
          background: hexToRgba(shareButtonColor, 0.15),
          border: '1px solid rgba(255, 255, 255, 0.12)',
          borderRadius: `${Math.max(iconRadius - 2, 6)}px`,
          color: shareButtonTextColor || '#ffffff',
        }}
      >
        {copied ? (
          <>
            <Copy size={12} />
            <span>Copied!</span>
          </>
        ) : (
          <>
            <IconComp size={12} />
            <span>{shareText}</span>
          </>
        )}
      </motion.button>
    </div>
  )
}
