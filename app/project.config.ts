import type { ProjectConfig } from './types/config'

/**
 * Central configuration file for the project template.
 * Adjust these values to quickly re-brand and configure the application.
 */
export const projectConfig: ProjectConfig = {
  // Project Identity
  name: 'Calculadora FRAIL',
  description: 'Calculadora de Escala FRAIL',
  logo: '/img/logo-icon.jpg',      // Path to your logo (e.g., /logo.png)
  defaultLogo: '/img/logo-icon.jpg', // Fallback logo if the path above is not found
  
  // Theme & Appearance
  theme: {
    primary: 'cyan',   // Nuxt UI primary color (green, blue, sky, etc.)
    neutral: 'neutral', // Nuxt UI neutral color (slate, gray, etc.)
    radius: 0.75,       // Default border radius in rem
    sidebarWidth: 260,  // Sidebar width in pixels
    defaultAppearance: 'dark',

    // Design Tokens - Surface and text colors
    dark: {
      surface0: '#0c0c10',
      surface1: '#13131a',
      surface2: '#1a1a24',
      surface3: '#22222f',
      border: 'rgba(255,255,255,0.07)',
      borderHover: 'rgba(255,255,255,0.14)',
      textPrimary: '#f0f0f5',
      textSecondary: '#8b8ba7',
      textMuted: '#55556b'
    },
    light: {
      surface0: '#f1f5f9',
      surface1: '#ffffff',
      surface2: '#f8fafc',
      surface3: '#e2e8f0',
      border: 'rgba(0,0,0,0.08)',
      borderHover: 'rgba(0,0,0,0.16)',
      textPrimary: '#0f172a',
      textSecondary: '#475569',
      textMuted: '#b6b9bd'
    }
  },

  // Auth Configuration
  auth: {
    useMock: true,
    mockUser: {
      id: 1,
      userName: 'admin',
      nameUser: 'Administrador',
      email: 'admin@example.com',
      rol: 'Super Admin',
      token: 'mock-jwt-token',
      abilities: [
        { action: 'manage', subject: 'all' }
      ]
    }
  }
}
