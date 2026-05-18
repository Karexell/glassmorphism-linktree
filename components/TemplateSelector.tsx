'use client'

import { motion } from 'framer-motion'
import { TemplateId } from '@/types'

const templates: { id: TemplateId; name: string; gradient: string }[] = [
  {
    id: 'cosmic',
    name: 'Cosmic',
    gradient: 'from-purple-600 to-blue-600',
  },
  {
    id: 'aurora',
    name: 'Aurora',
    gradient: 'from-emerald-500 to-cyan-500',
  },
  {
    id: 'nebula',
    name: 'Nebula',
    gradient: 'from-pink-500 to-purple-600',
  },
]

interface Props {
  selected: TemplateId
  onSelect: (id: TemplateId) => void
}

export default function TemplateSelector({ selected, onSelect }: Props) {
  return (
    <div className="flex gap-3">
      {templates.map((t) => (
        <motion.button
          key={t.id}
          onClick={() => onSelect(t.id)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`relative flex flex-col items-center gap-2 p-3 rounded-2xl transition-all duration-300 ${
            selected === t.id
              ? 'bg-white/10 border border-white/20'
              : 'bg-white/[0.03] border border-white/[0.06] hover:bg-white/[0.06]'
          }`}
        >
          <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${t.gradient} opacity-80`} />
          <span className="text-xs text-white/60 font-medium">{t.name}</span>
          {selected === t.id && (
            <motion.div
              layoutId="template-indicator"
              className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-6 h-0.5 bg-white/40 rounded-full"
            />
          )}
        </motion.button>
      ))}
    </div>
  )
}
