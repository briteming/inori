
// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  app: {
    baseURL: '/inori/',
    head: {
      link: [
        { rel: 'stylesheet', href: 'https://cdn.jsdelivr.net/npm/lxgw-wenkai-screen-webfont@1.1.0/style.css' }
      ],
    },
  },
  modules: [
    '@nuxt/content',
    '@nuxt/devtools',
    '@unocss/nuxt',
    '@vueuse/nuxt'
  ]
})