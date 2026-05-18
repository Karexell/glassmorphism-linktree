'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { EditorData, LinkItem, LinkFolder } from '@/types'
import { Plus, Trash2, GripVertical, FolderPlus, Folder, ChevronDown, ChevronRight, Image, Video, Repeat, Upload, X, Share2 } from 'lucide-react'
import ImageUploader from './ImageUploader'
import { useState, useRef } from 'react'

interface Props {
  data: EditorData
  onChange: (data: EditorData) => void
}

export default function EditorPanel({ data, onChange }: Props) {
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set(data.folders.map(f => f.id)))
  const videoInputRef = useRef<HTMLInputElement>(null)

  const update = (key: keyof EditorData, value: any) => {
    onChange({ ...data, [key]: value })
  }

  const toggleFolder = (id: string) => {
    setExpandedFolders(prev => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const addFolder = () => {
    const newFolder: LinkFolder = {
      id: Date.now().toString(),
      name: '',
      links: [],
    }
    update('folders', [...data.folders, newFolder])
    setExpandedFolders(prev => new Set(prev).add(newFolder.id))
  }

  const removeFolder = (folderId: string) => {
    update('folders', data.folders.filter(f => f.id !== folderId))
  }

  const updateFolderName = (folderId: string, name: string) => {
    update('folders', data.folders.map(f => f.id === folderId ? { ...f, name } : f))
  }

  const addLink = (folderId: string) => {
    const newLink: LinkItem = {
      id: Date.now().toString(),
      title: '',
      url: '',
      icon: 'globe',
      customIcon: '',
    }
    update('folders', data.folders.map(f =>
      f.id === folderId ? { ...f, links: [...f.links, newLink] } : f
    ))
  }

  const updateLink = (folderId: string, linkId: string, field: keyof LinkItem, value: any) => {
    update('folders', data.folders.map(f =>
      f.id === folderId
        ? { ...f, links: f.links.map(l => l.id === linkId ? { ...l, [field]: value } : l) }
        : f
    ))
  }

  const removeLink = (folderId: string, linkId: string) => {
    update('folders', data.folders.map(f =>
      f.id === folderId ? { ...f, links: f.links.filter(l => l.id !== linkId) } : f
    ))
  }

  const handleVideoFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => {
      update('backgroundUrl', reader.result as string)
      update('backgroundType', 'video')
    }
    reader.readAsDataURL(file)
    e.target.value = ''
  }

  const iconOptions = [
    'globe', 'github', 'twitter', 'instagram', 'youtube',
    'music', 'mail', 'linkedin', 'twitch', 'send', 'link',
  ]

  return (
    <div className="h-full overflow-y-auto p-5 sm:p-6 space-y-5 scrollbar-thin">
      {/* Profile Section */}
      <section>
        <h3 className="text-xs font-semibold text-white/40 uppercase tracking-wider mb-3">Profile</h3>
        <div className="space-y-3">
          <div>
            <label className="text-xs text-white/50 mb-1 block">Name</label>
            <input
              type="text"
              value={data.name}
              onChange={(e) => update('name', e.target.value)}
              placeholder="Your name"
              className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-white/20 focus:outline-none focus:border-white/25 transition"
            />
          </div>
          <div>
            <label className="text-xs text-white/50 mb-1 block">Bio</label>
            <textarea
              value={data.bio}
              onChange={(e) => update('bio', e.target.value)}
              placeholder="A short bio about yourself"
              rows={2}
              className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-white/20 focus:outline-none focus:border-white/25 transition resize-none"
            />
          </div>
          <ImageUploader
            value={data.avatarUrl}
            onChange={(v) => update('avatarUrl', v)}
            label="Avatar"
            placeholder="Upload avatar"
            shape="circle"
          />
        </div>
      </section>

      {/* Appearance Section */}
      <section>
        <h3 className="text-xs font-semibold text-white/40 uppercase tracking-wider mb-3">Appearance</h3>
        <div className="space-y-4">
          {/* Background Type Toggle */}
          <div>
            <label className="text-xs text-white/50 mb-1.5 block">Background</label>
            <div className="flex gap-1 mb-2">
              <button
                onClick={() => update('backgroundType', 'image')}
                className={`flex-1 flex items-center justify-center gap-1.5 text-[11px] py-2 rounded-lg border transition ${
                  data.backgroundType === 'image'
                    ? 'bg-white/[0.08] border-white/20 text-white/70'
                    : 'bg-white/[0.02] border-white/[0.06] text-white/30 hover:text-white/50'
                }`}
              >
                <Image size={12} /> Image
              </button>
              <button
                onClick={() => update('backgroundType', 'video')}
                className={`flex-1 flex items-center justify-center gap-1.5 text-[11px] py-2 rounded-lg border transition ${
                  data.backgroundType === 'video'
                    ? 'bg-white/[0.08] border-white/20 text-white/70'
                    : 'bg-white/[0.02] border-white/[0.06] text-white/30 hover:text-white/50'
                }`}
              >
                <Video size={12} /> Video
              </button>
            </div>

            {data.backgroundType === 'image' ? (
              <ImageUploader
                value={data.backgroundUrl}
                onChange={(v) => update('backgroundUrl', v)}
                label=""
                placeholder="Upload image"
                shape="rounded"
              />
            ) : (
              <div>
                {data.backgroundUrl && data.backgroundType === 'video' ? (
                  <div className="relative group mb-2">
                    <video
                      src={data.backgroundUrl}
                      muted
                      playsInline
                      className="w-full max-h-32 object-cover rounded-xl border border-white/10"
                    />
                    <button
                      onClick={() => { update('backgroundUrl', ''); update('backgroundType', 'image') }}
                      className="absolute top-2 right-2 w-6 h-6 bg-black/60 backdrop-blur rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition border border-white/10"
                    >
                      <X size={12} className="text-white/80" />
                    </button>
                  </div>
                ) : null}
                <motion.button
                  type="button"
                  onClick={() => videoInputRef.current?.click()}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border border-dashed border-white/10 hover:border-white/20 bg-white/[0.02] hover:bg-white/[0.04] transition text-xs text-white/30 hover:text-white/50"
                >
                  <Upload size={14} />
                  {data.backgroundUrl ? 'Replace video' : 'Upload video'}
                </motion.button>
                <input
                  ref={videoInputRef}
                  type="file"
                  accept="video/*"
                  onChange={handleVideoFile}
                  className="hidden"
                />
              </div>
            )}

            {/* Loop Toggle — only shown for video */}
            {data.backgroundType === 'video' && data.backgroundUrl && (
              <motion.button
                type="button"
                onClick={() => update('videoLoop', !data.videoLoop)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`mt-2 w-full flex items-center justify-center gap-2 py-2 rounded-lg border text-xs transition ${
                  data.videoLoop
                    ? 'bg-purple-500/20 border-purple-400/30 text-purple-300'
                    : 'bg-white/[0.03] border-white/[0.06] text-white/40 hover:text-white/60'
                }`}
              >
                <Repeat size={12} />
                {data.videoLoop ? 'Looping' : 'Loop off'}
              </motion.button>
            )}
          </div>
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-xs text-white/50">Glass Opacity</label>
              <span className="text-xs text-white/30">{data.glassOpacity}%</span>
            </div>
            <input
              type="range"
              min={2}
              max={25}
              value={data.glassOpacity}
              onChange={(e) => update('glassOpacity', Number(e.target.value))}
              className="w-full"
            />
          </div>
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-xs text-white/50">Blur Intensity</label>
              <span className="text-xs text-white/30">{data.blurIntensity}px</span>
            </div>
            <input
              type="range"
              min={10}
              max={50}
              value={data.blurIntensity}
              onChange={(e) => update('blurIntensity', Number(e.target.value))}
              className="w-full"
            />
          </div>
          <div>
            <label className="text-xs text-white/50 mb-1 block">Text Color</label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={data.textColor || '#ffffff'}
                onChange={(e) => update('textColor', e.target.value)}
                className="w-8 h-8 rounded-lg border border-white/10 cursor-pointer bg-transparent"
              />
              <span className="text-xs text-white/30">{data.textColor || '#ffffff'}</span>
            </div>
          </div>
          <div>
            <label className="text-xs text-white/50 mb-1 block">Folder Name Color</label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={data.folderNameColor || '#ffffff'}
                onChange={(e) => update('folderNameColor', e.target.value)}
                className="w-8 h-8 rounded-lg border border-white/10 cursor-pointer bg-transparent"
              />
              <span className="text-xs text-white/30">{data.folderNameColor || '#ffffff'}</span>
            </div>
          </div>
          <div>
            <label className="text-xs text-white/50 mb-1 block">Panel Tint</label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={data.glassTint || '#ffffff'}
                onChange={(e) => update('glassTint', e.target.value)}
                className="w-8 h-8 rounded-lg border border-white/10 cursor-pointer bg-transparent"
              />
              <span className="text-xs text-white/30">{data.glassTint || '#ffffff'}</span>
            </div>
          </div>
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-xs text-white/50">Card Corner</label>
              <span className="text-xs text-white/30">{data.cardRadius || 20}px</span>
            </div>
            <input
              type="range"
              min={0}
              max={32}
              value={data.cardRadius || 20}
              onChange={(e) => update('cardRadius', Number(e.target.value))}
              className="w-full"
            />
          </div>
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-xs text-white/50">Avatar Shape</label>
              <span className="text-xs text-white/30">{data.avatarRadius >= 9999 ? 'Circle' : `${data.avatarRadius}px`}</span>
            </div>
            <input
              type="range"
              min={0}
              max={100}
              value={data.avatarRadius >= 9999 ? 100 : data.avatarRadius}
              onChange={(e) => {
                const v = Number(e.target.value)
                update('avatarRadius', v >= 100 ? 9999 : v)
              }}
              className="w-full"
            />
          </div>
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-xs text-white/50">Icon Corner</label>
              <span className="text-xs text-white/30">{data.iconRadius || 12}px</span>
            </div>
            <input
              type="range"
              min={0}
              max={24}
              value={data.iconRadius || 12}
              onChange={(e) => update('iconRadius', Number(e.target.value))}
              className="w-full"
            />
          </div>
        </div>
      </section>

      {/* Folders Section */}
      <section>
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-xs font-semibold text-white/40 uppercase tracking-wider">Link Folders</h3>
          <motion.button
            onClick={addFolder}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-1.5 text-xs text-white/50 hover:text-white/80 bg-white/[0.04] hover:bg-white/[0.08] px-3 py-1.5 rounded-lg transition"
          >
            <FolderPlus size={12} /> New Folder
          </motion.button>
        </div>

        <div className="space-y-3">
          {data.folders.map((folder) => (
            <motion.div
              key={folder.id}
              layout
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white/[0.02] border border-white/[0.06] rounded-xl overflow-hidden"
            >
              {/* Folder header */}
              <div className="flex items-center gap-2 p-3 border-b border-white/[0.04]">
                <button
                  onClick={() => toggleFolder(folder.id)}
                  className="text-white/30 hover:text-white/60 transition"
                >
                  {expandedFolders.has(folder.id) ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                </button>
                <Folder size={12} className="text-white/30 flex-shrink-0" />
                <input
                  type="text"
                  value={folder.name}
                  onChange={(e) => updateFolderName(folder.id, e.target.value)}
                  placeholder="Folder name (optional)"
                  className="flex-1 bg-transparent text-xs text-white/70 placeholder-white/20 focus:outline-none"
                />
                <span className="text-[10px] text-white/20">{folder.links.length}</span>
                <button
                  onClick={() => removeFolder(folder.id)}
                  className="text-white/20 hover:text-red-400 transition ml-1"
                >
                  <Trash2 size={12} />
                </button>
              </div>

              {/* Folder contents */}
              <AnimatePresence>
                {expandedFolders.has(folder.id) && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="p-3 space-y-2.5">
                      {folder.links.map((link, i) => (
                        <div
                          key={link.id}
                          className="bg-white/[0.02] border border-white/[0.05] rounded-lg p-2.5 space-y-2"
                        >
                          <div className="flex items-center gap-2">
                            <GripVertical size={10} className="text-white/15" />
                            <span className="text-[10px] text-white/20 flex-1">Link {i + 1}</span>
                            <button
                              onClick={() => updateLink(folder.id, link.id, 'shareEnabled', !link.shareEnabled)}
                              className={`transition ${link.shareEnabled ? 'text-purple-400' : 'text-white/15 hover:text-white/40'}`}
                              title="Toggle share button"
                            >
                              <Share2 size={10} />
                            </button>
                            <button
                              onClick={() => removeLink(folder.id, link.id)}
                              className="text-white/15 hover:text-red-400 transition"
                            >
                              <Trash2 size={10} />
                            </button>
                          </div>
                          <input
                            type="text"
                            value={link.title}
                            onChange={(e) => updateLink(folder.id, link.id, 'title', e.target.value)}
                            placeholder="Link title"
                            className="w-full bg-white/[0.03] border border-white/[0.06] rounded-lg px-3 py-1.5 text-xs text-white placeholder-white/20 focus:outline-none focus:border-white/15 transition"
                          />
                          <input
                            type="url"
                            value={link.url}
                            onChange={(e) => updateLink(folder.id, link.id, 'url', e.target.value)}
                            placeholder="https://..."
                            className="w-full bg-white/[0.03] border border-white/[0.06] rounded-lg px-3 py-1.5 text-xs text-white placeholder-white/20 focus:outline-none focus:border-white/15 transition"
                          />
                          <select
                            value={link.icon}
                            onChange={(e) => updateLink(folder.id, link.id, 'icon', e.target.value)}
                            className="w-full bg-white/[0.03] border border-white/[0.06] rounded-lg px-3 py-1.5 text-xs text-white/50 focus:outline-none focus:border-white/15 transition appearance-none"
                          >
                            {iconOptions.map((icon) => (
                              <option key={icon} value={icon} className="bg-gray-900">{icon}</option>
                            ))}
                          </select>
                          <ImageUploader
                            value={link.customIcon || ''}
                            onChange={(v) => updateLink(folder.id, link.id, 'customIcon', v)}
                            label="Custom Icon"
                            placeholder="Upload icon"
                            shape="square"
                            compact
                          />
                          {link.shareEnabled && (
                            <div className="mt-1.5 pt-2 border-t border-white/[0.05] space-y-2">
                              <div className="text-[10px] text-purple-400/60 font-medium">Share Button</div>
                              <input
                                type="text"
                                value={link.shareText || ''}
                                onChange={(e) => updateLink(folder.id, link.id, 'shareText', e.target.value)}
                                placeholder="Share"
                                className="w-full bg-white/[0.03] border border-white/[0.06] rounded-lg px-3 py-1.5 text-xs text-white placeholder-white/20 focus:outline-none focus:border-white/15 transition"
                              />
                              <select
                                value={link.shareIcon || 'share'}
                                onChange={(e) => updateLink(folder.id, link.id, 'shareIcon', e.target.value)}
                                className="w-full bg-white/[0.03] border border-white/[0.06] rounded-lg px-3 py-1.5 text-xs text-white/50 focus:outline-none focus:border-white/15 transition appearance-none"
                              >
                                <option value="share" className="bg-gray-900">Share icon</option>
                                <option value="copy" className="bg-gray-900">Copy icon</option>
                                <option value="link" className="bg-gray-900">Link icon</option>
                              </select>
                              <div className="flex gap-2">
                                <div className="flex-1">
                                  <label className="text-[10px] text-white/30 mb-1 block">Button color</label>
                                  <input
                                    type="text"
                                    value={link.shareButtonColor || '#ffffff'}
                                    onChange={(e) => updateLink(folder.id, link.id, 'shareButtonColor', e.target.value)}
                                    placeholder="#ffffff"
                                    className="w-full bg-white/[0.03] border border-white/[0.06] rounded-lg px-3 py-1.5 text-xs text-white placeholder-white/20 focus:outline-none focus:border-white/15 transition"
                                  />
                                </div>
                                <div className="flex-1">
                                  <label className="text-[10px] text-white/30 mb-1 block">Text color</label>
                                  <input
                                    type="text"
                                    value={link.shareButtonTextColor || '#ffffff'}
                                    onChange={(e) => updateLink(folder.id, link.id, 'shareButtonTextColor', e.target.value)}
                                    placeholder="#ffffff"
                                    className="w-full bg-white/[0.03] border border-white/[0.06] rounded-lg px-3 py-1.5 text-xs text-white placeholder-white/20 focus:outline-none focus:border-white/15 transition"
                                  />
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      ))}

                      <motion.button
                        onClick={() => addLink(folder.id)}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full flex items-center justify-center gap-1.5 text-[11px] text-white/30 hover:text-white/50 bg-white/[0.02] hover:bg-white/[0.04] py-2 rounded-lg border border-dashed border-white/[0.06] transition"
                      >
                        <Plus size={10} /> Add Link
                      </motion.button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}

          {data.folders.length === 0 && (
            <div className="text-center py-8 text-white/15 text-xs">
              No folders yet. Add a folder to organize your links.
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
