export interface LinkItem {
  id: string
  title: string
  url: string
  icon: string
  customIcon?: string
}

export interface LinkFolder {
  id: string
  name: string
  links: LinkItem[]
}

export type TemplateId = 'cosmic' | 'aurora' | 'nebula'

export interface EditorData {
  name: string
  bio: string
  avatarUrl: string
  backgroundUrl: string
  backgroundType: 'image' | 'video'
  videoLoop: boolean
  glassOpacity: number
  blurIntensity: number
  textColor: string
  folderNameColor: string
  glassTint: string
  cardRadius: number
  avatarRadius: number
  iconRadius: number
  templateId: string
  folders: LinkFolder[]
}

export interface TemplateProps {
  data: EditorData
  isPreview?: boolean
}
