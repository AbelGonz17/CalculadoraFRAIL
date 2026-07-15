// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@nuxt/eslint', '@nuxt/ui', '@pinia/nuxt'],

  devtools: {
    enabled: true
  },
  app: {
    head: {
      title: 'Calculadora FRAIL - Dra. Laura E. López',
      meta: [
        {
          name: 'description',
          content: 'Calculadora clínica para evaluar la fragilidad mediante la escala FRAIL.'
        }
      ],
      link: [
        { rel: 'icon', type: 'image/jpeg', href: '/img/logo-icon.jpg' }
      ]
    }
  },

  css: ['~/assets/css/main.css'],

  routeRules: {
    '/': { prerender: true }
  },
  devServer: {
    port: 3010
  },

  compatibilityDate: '2025-01-15',

  eslint: {
    config: {
      stylistic: {
        commaDangle: 'never',
        braceStyle: '1tbs'
      }
    }
  }
})
