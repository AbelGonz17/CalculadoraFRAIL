// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@nuxt/eslint', '@nuxt/ui', '@pinia/nuxt'],

  devtools: {
    enabled: true
  },
  app: {
    head: {
      title: 'Print Services Manager',
      meta: [
        {
          name: 'description',
          content: 'Print Services Manager'
        }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/icon2.ico' }
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
