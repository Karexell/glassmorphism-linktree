'use client'

import { motion } from 'framer-motion'
import { TemplateProps } from '@/types'
import { getTheme, hexToRgba } from '@/lib/templateConfig'
import {
  Globe, Github, Twitter, Instagram, Youtube, Music,
  Mail, Link, ExternalLink, Linkedin, Twitch, Send
} from 'lucide-react'
import ShareButton from '@/components/ShareButton'

const iconMap: Record<string, React.ComponentType<any>> = {
  globe: Globe, github: Github, twitter: Twitter,
  instagram: Instagram, youtube: Youtube, music: Music,
  mail: Mail, link: Link, external: ExternalLink,
  linkedin: Linkedin, twitch: Twitch, send: Send,
}

export default function NebulaTemplate({ data, isPreview }: TemplateProps) {
  const theme = getTheme(data.templateId)

  const glassStyle = {
    background: hexToRgba(data.glassTint || '#ffffff', data.glassOpacity / 100),
    backdropFilter: `blur(${data.blurIntensity}px)`,
    WebkitBackdropFilter: `blur(${data.blurIntensity}px)`,
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: `${data.cardRadius || 20}px`,
  }

  const textColor = data.textColor || '#ffffff'

  return (
    <div
      className="min-h-[100dvh] flex items-center justify-center p-4 relative overflow-hidden"
      style={{ background: '#050010' }}
    >
      {/* Nebula particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.5, 0.2],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 5 + i * 2,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 0.5,
            }}
            className="absolute rounded-full blur-2xl"
            style={{
              width: `${60 + i * 20}px`,
              height: `${60 + i * 20}px`,
              left: `${15 + i * 15}%`,
              top: `${20 + (i % 3) * 25}%`,
              background: theme.particleColors[i % 2],
            }}
          />
        ))}
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
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-full max-w-md"
      >
        {/* Profile */}
        <motion.div style={glassStyle} className="p-5 sm:p-7 mb-4 text-center">
          <motion.div
            className="relative inline-block mb-4"
            whileHover={{ scale: 1.05 }}
          >
            {data.avatarUrl ? (
              <img
                src={data.avatarUrl}
                alt={data.name}
                className="w-20 h-20 sm:w-24 sm:h-24 object-cover ring-2"
                style={{ borderColor: `${theme.from}40`, borderRadius: data.avatarRadius === 9999 ? '9999px' : `${data.avatarRadius}px` }}
              />
            ) : (
              <div
                className="w-20 h-20 sm:w-24 sm:h-24 flex items-center justify-center text-2xl sm:text-3xl font-bold ring-2"
                style={{
                  background: `linear-gradient(135deg, ${theme.from}, ${theme.to})`,
                  borderColor: `${theme.from}40`,
                  borderRadius: data.avatarRadius === 9999 ? '9999px' : `${data.avatarRadius}px`,
                }}
              >
                {(data.name || '?').charAt(0).toUpperCase()}
              </div>
            )}
          </motion.div>
          <h1
            className="text-xl sm:text-2xl font-bold"
            style={{
              background: `linear-gradient(135deg, ${theme.from}, ${theme.to})`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            {data.name || 'Your Name'}
          </h1>
          <p className="text-xs sm:text-sm mt-2" style={{ color: `${textColor}66` }}>{data.bio || 'Your bio goes here'}</p>
        </motion.div>

        {/* Folders */}
        {data.folders.map((folder) => (
          <div key={folder.id} className="mb-3.5">
            {folder.name && (
              <h2
                className="text-[11px] font-semibold uppercase tracking-widest mb-2 px-1"
                style={{ color: data.folderNameColor || `${theme.from}60` }}
              >
                {folder.name}
              </h2>
            )}
            <div className="space-y-2">
              {folder.links.map((link, i) => {
                const IconComp = iconMap[link.icon || 'globe'] || Globe
                return (
                  <motion.a
                    key={link.id}
                    href={link.url || '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.06 }}
                    whileHover={{ scale: 1.02, x: 3 }}
                    whileTap={{ scale: 0.97 }}
                    style={{ ...glassStyle, borderRadius: `${(data.iconRadius || 12) + 8}px` }}
                    className="flex items-center gap-3 p-3.5 sm:p-4 cursor-pointer group transition-all"
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
                    {link.shareEnabled && (
                      <ShareButton
                        url={link.url}
                        shareText={link.shareText}
                        shareIcon={link.shareIcon}
                        shareButtonColor={link.shareButtonColor}
                        shareButtonTextColor={link.shareButtonTextColor}
                        iconRadius={data.iconRadius}
                      />
                    )}
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
