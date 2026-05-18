'use client'

import { motion } from 'framer-motion'
import { TemplateProps } from '@/types'
import { getTheme, hexToRgba } from '@/lib/templateConfig'
import {
  Globe, Github, Twitter, Instagram, Youtube, Music,
  Mail, Link, ExternalLink, Linkedin, Twitch, Send
} from 'lucide-react'

const iconMap: Record<string, React.ComponentType<any>> = {
  globe: Globe, github: Github, twitter: Twitter,
  instagram: Instagram, youtube: Youtube, music: Music,
  mail: Mail, link: Link, external: ExternalLink,
  linkedin: Linkedin, twitch: Twitch, send: Send,
}

export default function AuroraTemplate({ data, isPreview }: TemplateProps) {
  const theme = getTheme(data.templateId)

  const glassStyle = {
    background: hexToRgba(data.glassTint || '#ffffff', data.glassOpacity / 100),
    backdropFilter: `blur(${data.blurIntensity}px)`,
    WebkitBackdropFilter: `blur(${data.blurIntensity}px)`,
    border: '1px solid rgba(255, 255, 255, 0.12)',
    borderRadius: `${data.cardRadius || 20}px`,
  }

  const textColor = data.textColor || '#ffffff'

  return (
    <div
      className="min-h-[100dvh] flex items-center justify-center p-4 relative overflow-hidden"
      style={{ background: '#050010' }}
    >
      {/* Aurora waves */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
          className="absolute -top-1/2 -left-1/2 w-full h-full"
          style={{
            background: `conic-gradient(from 0deg, transparent, ${theme.orbColors[0]}, transparent, ${theme.orbColors[1]}, transparent)`,
          }}
        />
        <motion.div
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 4, repeat: Infinity }}
          className="absolute top-0 left-0 right-0 h-1/2"
          style={{ background: `linear-gradient(to bottom, ${theme.orbColors[0]}, transparent)` }}
        />
      </div>

      {data.backgroundUrl && data.backgroundType === 'video' ? (
        <video
          src={data.backgroundUrl}
          autoPlay
          muted
          playsInline
          loop={data.videoLoop}
          className="absolute inset-0 w-full h-full object-cover"
        />
      ) : data.backgroundUrl ? (
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${data.backgroundUrl})` }}
        />
      ) : null}

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 w-full max-w-md"
      >
        {/* Header card */}
        <motion.div
          style={glassStyle}
          className="p-5 sm:p-6 mb-5 text-center"
          whileHover={{ scale: 1.01 }}
        >
          <div className="relative inline-block mb-4">
            {data.avatarUrl ? (
              <img
                src={data.avatarUrl}
                alt={data.name}
                className="w-18 h-18 sm:w-20 sm:h-20 object-cover border border-white/10"
                style={{ borderRadius: data.avatarRadius === 9999 ? '9999px' : `${data.avatarRadius}px` }}
              />
            ) : (
              <div
                className="w-18 h-18 sm:w-20 sm:h-20 flex items-center justify-center text-xl sm:text-2xl font-bold"
                style={{ background: `linear-gradient(135deg, ${theme.from}, ${theme.to})`, borderRadius: data.avatarRadius === 9999 ? '9999px' : `${data.avatarRadius}px` }}
              >
                {(data.name || '?').charAt(0).toUpperCase()}
              </div>
            )}
            <div className="absolute -bottom-1 -right-1 w-4 h-4 sm:w-5 sm:h-5 rounded-full border-2 border-black/50"
              style={{ background: theme.from }}
            />
          </div>
          <h1 className="text-lg sm:text-xl font-semibold mb-1" style={{ color: textColor }}>{data.name || 'Your Name'}</h1>
          <p className="text-xs sm:text-sm" style={{ color: `${textColor}80` }}>{data.bio || 'Your bio goes here'}</p>
        </motion.div>

        {/* Folders */}
        {data.folders.map((folder) => (
          <div key={folder.id} className="mb-4">
            {folder.name && (
              <h2 className="text-[11px] font-semibold uppercase tracking-widest mb-2 px-1" style={{ color: data.folderNameColor || `${textColor}4D` }}>
                {folder.name}
              </h2>
            )}
            <div className="grid grid-cols-1 gap-2.5">
              {folder.links.map((link, i) => {
                const IconComp = iconMap[link.icon || 'globe'] || Globe
                return (
                  <motion.a
                    key={link.id}
                    href={link.url || '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.06 }}
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    style={{ ...glassStyle, borderRadius: `${(data.iconRadius || 12) + 6}px` }}
                    className="flex items-center gap-3 p-3 sm:p-3.5 cursor-pointer group transition-all"
                  >
                    <div
                      className="w-10 h-10 flex items-center justify-center overflow-hidden flex-shrink-0"
                      style={{ background: link.customIcon ? 'transparent' : theme.iconBg, borderRadius: `${data.iconRadius || 12}px` }}
                    >
                      {link.customIcon ? (
                        <img src={link.customIcon} alt="" className="w-full h-full object-cover" style={{ borderRadius: `${data.iconRadius || 12}px` }} />
                      ) : (
                        <IconComp size={16} style={{ color: `${textColor}CC` }} />
                      )}
                    </div>
                    <span className="flex-1 font-medium text-sm" style={{ color: `${textColor}CC` }}>{link.title || 'Link'}</span>
                    <ExternalLink size={12} style={{ color: `${textColor}33` }} className="group-hover:text-white/40 transition-colors flex-shrink-0" />
                  </motion.a>
                )
              })}
            </div>
          </div>
        ))}

      </motion.div>
    </div>
  )
}
