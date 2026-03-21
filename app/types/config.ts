export interface ThemeColors {
  primary: string
  neutral: string
  success: string
  warning: string
  error: string
  info: string
}

export interface ThemeSurfaces {
  surface0: string
  surface1: string
  surface2: string
  surface3: string
  border: string
  borderHover: string
  textPrimary: string
  textSecondary: string
  textMuted: string
}

export interface ProjectTheme {
  primary: string
  neutral: string
  radius: number
  sidebarWidth: number
  defaultAppearance: 'dark' | 'light' | 'system'
  dark: ThemeSurfaces
  light: ThemeSurfaces
}

export interface ProjectConfig {
  name: string
  description: string
  logo: string
  defaultLogo: string
  theme: ProjectTheme
  auth: {
    useMock: boolean
    mockUser: any
  }
}
