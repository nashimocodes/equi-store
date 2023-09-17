/* eslint-disable n/prefer-global/process */
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  app: {
    head: {
      title: 'EQUI-STORE',
      meta: [
        {
          name: 'description',
          content: 'an opinionated nuxt starter template',
        },
      ],
      link: [
        {
          rel: 'icon',
          href: 'https://cdn.discordapp.com/attachments/1112797564778074182/1152923300423548959/EquiLogo.png',
        },
      ],
    },
  },

  modules: ['@vueuse/nuxt', '@unocss/nuxt'],
  css: [
    '@unocss/reset/tailwind.css',
    'notivue/notifications.css',
    'notivue/animations.css',
  ],
  imports: {
    imports: [
      {
        name: 'nanoid',
        from: 'nanoid',
      },
      {
        name: 'consola',
        from: 'consola',
      },
    ],
  },
  build: {
    transpile: ['trpc-nuxt'],
  },
  runtimeConfig: {
    CIRCLE_API_KEY: process.env.CIRCLE_API_KEY,
  },
})
