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

export default function CosmicTemplate({ data, isPreview }: TemplateProps) {
  const theme = getTheme(data.templateId)

  const glassStyle = {
    background: hexToRgba(data.glassTint || '#ffffff', data.glassOpacity / 100),
    backdropFilter: `blur(${data.blurIntensity}px)`,
    WebkitBackdropFilter: `blur(${data.blurIntensity}px)`,
    border: '1px solid rgba(255, 255, 255, 0.15)',
    borderRadius: `${data.cardRadius || 20}px`,
  }

  const textColor = data.textColor || '#ffffff'

  return (
    <div
      className="min-h-[100dvh] flex items-center justify-center p-4 relative overflow-hidden"
      style={{ background: '#050010' }}
    >
      {/* Floating orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ y: [-20, 20, -20], x: [-10, 10, -10] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full blur-3xl"
          style={{ background: theme.orbColors[0] }}
        />
        <motion.div
          animate={{ y: [20, -20, 20], x: [10, -10, 10] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-1/4 right-1/4 w-48 h-48 rounded-full blur-3xl"
          style={{ background: theme.orbColors[1] }}
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
        transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="relative z-10 w-full max-w-md"
      >
        {/* Avatar + Name Card */}
        <motion.div
          style={glassStyle}
          className="p-6 sm:p-8 mb-4 text-center"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.3 }}
        >
          {data.avatarUrl ? (
            <motion.img
              src={data.avatarUrl}
              alt={data.name}
              className="w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-4 object-cover border-2 border-white/20"
              style={{ borderRadius: data.avatarRadius === 9999 ? '9999px' : `${data.avatarRadius}px` }}
              whileHover={{ scale: 1.1, rotate: 5 }}
            />
          ) : (
            <motion.div
              className="w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-4 flex items-center justify-center text-2xl sm:text-3xl font-bold"
              style={{ background: `linear-gradient(135deg, ${theme.from}, ${theme.to})`, borderRadius: data.avatarRadius === 9999 ? '9999px' : `${data.avatarRadius}px` }}
              whileHover={{ scale: 1.1, rotate: 5 }}
            >
              {(data.name || '?').charAt(0).toUpperCase()}
            </motion.div>
          )}
          <h1 className="text-xl sm:text-2xl font-bold mb-2" style={{ color: textColor }}>{data.name || 'Your Name'}</h1>
          <p className="text-xs sm:text-sm leading-relaxed" style={{ color: `${textColor}99` }}>{data.bio || 'Your bio goes here'}</p>
        </motion.div>

        {/* Folders */}
        {data.folders.map((folder) => (
          <div key={folder.id} className="mb-4">
            {folder.name && (
              <h2 className="text-[11px] font-semibold uppercase tracking-widest mb-2 px-1" style={{ color: data.folderNameColor || `${textColor}4D` }}>
                {folder.name}
              </h2>
            )}
            <div className="space-y-2.5">
              {folder.links.map((link, i) => {
                const IconComp = iconMap[link.icon || 'globe'] || Globe
                return (
                  <motion.a
                    key={link.id}
                    href={link.url || '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06 }}
                    whileHover={{ scale: 1.03, x: 5 }}
                    whileTap={{ scale: 0.98 }}
                    style={{ ...glassStyle, borderRadius: `${(data.iconRadius || 12) + 8}px` }}
                    className="flex items-center gap-3 sm:gap-4 p-3.5 sm:p-4 cursor-pointer group transition-all duration-300 hover:bg-white/10"
                  >
                    <div
                      className="w-10 h-10 flex items-center justify-center overflow-hidden flex-shrink-0"
                      style={{ background: link.customIcon ? 'transparent' : theme.iconBg, borderRadius: `${data.iconRadius || 12}px` }}
                    >
                      {link.customIcon ? (
                        <img src={link.customIcon} alt="" className="w-full h-full object-cover" style={{ borderRadius: `${data.iconRadius || 12}px` }} />
                      ) : (
                        <IconComp size={18} style={{ color: `${textColor}CC` }} />
                      )}
                    </div>
                    <span className="flex-1 font-medium text-sm" style={{ color: `${textColor}E6` }}>{link.title || 'Link'}</span>
                    <ExternalLink size={14} style={{ color: `${textColor}4D` }} className="group-hover:text-white/60 transition-colors flex-shrink-0" />
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
