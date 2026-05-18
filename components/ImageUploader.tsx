'use client'

import { useRef } from 'react'
import { motion } from 'framer-motion'
import { Upload, X } from 'lucide-react'

interface Props {
  value: string
  onChange: (dataUrl: string) => void
  label: string
  placeholder?: string
  shape?: 'circle' | 'rounded' | 'square'
  compact?: boolean
}

export default function ImageUploader({
  value,
  onChange,
  label,
  placeholder = 'Upload image',
  shape = 'rounded',
  compact = false,
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null)

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => onChange(reader.result as string)
    reader.readAsDataURL(file)
    e.target.value = ''
  }

  const shapeClass =
    shape === 'circle' ? 'rounded-full' : shape === 'square' ? 'rounded-lg' : 'rounded-xl'

  if (compact) {
    return (
      <div>
        <label className="text-xs text-white/50 mb-1 block">{label}</label>
        <div className="flex items-center gap-2">
          {value ? (
            <div className="relative group">
              <img
                src={value}
                alt=""
                className={`w-9 h-9 object-cover border border-white/10 ${shapeClass}`}
              />
              <button
                onClick={() => onChange('')}
                className="absolute -top-1 -right-1 w-4 h-4 bg-red-500/80 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition"
              >
                <X size={8} className="text-white" />
              </button>
            </div>
          ) : null}
          <motion.button
            type="button"
            onClick={() => inputRef.current?.click()}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="flex items-center gap-1.5 text-[11px] text-white/40 hover:text-white/60 bg-white/[0.03] hover:bg-white/[0.06] px-2.5 py-1.5 rounded-lg border border-white/[0.06] transition"
          >
            <Upload size={10} />
            {value ? 'Replace' : placeholder}
          </motion.button>
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            onChange={handleFile}
            className="hidden"
          />
        </div>
      </div>
    )
  }

  return (
    <div>
      <label className="text-xs text-white/50 mb-1 block">{label}</label>
      {value ? (
        <div className="relative group mb-2">
          <img
            src={value}
            alt=""
            className={`w-full max-h-32 object-cover border border-white/10 ${shapeClass}`}
          />
          <motion.button
            type="button"
            onClick={() => onChange('')}
            whileHover={{ scale: 1.1 }}
            className="absolute top-2 right-2 w-6 h-6 bg-black/60 backdrop-blur rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition border border-white/10"
          >
            <X size={12} className="text-white/80" />
          </motion.button>
        </div>
      ) : null}
      <motion.button
        type="button"
        onClick={() => inputRef.current?.click()}
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
        className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border border-dashed border-white/10 hover:border-white/20 bg-white/[0.02] hover:bg-white/[0.04] transition text-xs text-white/30 hover:text-white/50"
      >
        <Upload size={14} />
        {value ? 'Replace image' : placeholder}
      </motion.button>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleFile}
        className="hidden"
      />
    </div>
  )
}
