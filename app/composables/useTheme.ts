/**
 * useTheme — manages dark / light mode
 * Persists selection in localStorage and applies [data-theme] on <html>
 */
export type Theme = 'dark' | 'light'

export const useTheme = () => {
  const cookie = useCookie<Theme>('theme', {
    default: () => 'dark',
    sameSite: 'lax'
  })

  const theme = useState<Theme>('theme', () => cookie.value || 'dark')

  const applyTheme = (t: Theme) => {
    if (import.meta.client) {
      document.documentElement.setAttribute('data-theme', t)

      // Nuxt UI v4 reads the 'dark' class on <html> for component theming
      if (t === 'dark') {
        document.documentElement.classList.add('dark')
      } else {
        document.documentElement.classList.remove('dark')
      }
    }

    cookie.value = t
    theme.value = t
  }

  const toggleTheme = () => {
    applyTheme(theme.value === 'dark' ? 'light' : 'dark')
  }

  const initTheme = () => {
    if (import.meta.client) {
      const saved = cookie.value
      const preferred
        = saved
          ?? (window.matchMedia('(prefers-color-scheme: dark)').matches
            ? 'dark'
            : 'light')

      applyTheme(preferred)
    }
  }

  return { theme, toggleTheme, initTheme, applyTheme }
}
