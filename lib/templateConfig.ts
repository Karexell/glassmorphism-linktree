export interface ThemeConfig {
  from: string
  to: string
  orbColors: string[]
  particleColors: string[]
  iconBg: string
}

const themes: Record<string, ThemeConfig> = {
  cosmic: {
    from: '#a855f7',
    to: '#6366f1',
    orbColors: ['rgba(168, 85, 247, 0.15)', 'rgba(99, 102, 241, 0.15)'],
    particleColors: ['rgba(168, 85, 247, 0.2)', 'rgba(99, 102, 241, 0.2)'],
    iconBg: 'rgba(168, 85, 247, 0.12)',
  },
  aurora: {
    from: '#06b6d4',
    to: '#8b5cf6',
    orbColors: ['rgba(6, 182, 212, 0.2)', 'rgba(139, 92, 246, 0.2)'],
    particleColors: ['rgba(6, 182, 212, 0.2)', 'rgba(139, 92, 246, 0.2)'],
    iconBg: 'rgba(6, 182, 212, 0.12)',
  },
  nebula: {
    from: '#ec4899',
    to: '#8b5cf6',
    orbColors: ['rgba(236, 72, 153, 0.15)', 'rgba(139, 92, 246, 0.15)'],
    particleColors: ['rgba(236, 72, 153, 0.2)', 'rgba(139, 92, 246, 0.2)'],
    iconBg: 'rgba(236, 72, 153, 0.12)',
  },
}

export function getTheme(templateId: string): ThemeConfig {
  return themes[templateId] || themes.cosmic
}

export function hexToRgba(hex: string, alpha: number): string {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  return `rgba(${r}, ${g}, ${b}, ${alpha})`
}
