import path from 'node:path'

function resolve(str: string) {
  return path.resolve(__dirname, str)
}
// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  // ssr: false,
  // extends: '@nuxt-themes/typo',
  app: {
    // baseURL: '/inori/',
    head: {
      link: [
        { rel: 'preload', as: 'style', href: 'https://cdn.jsdelivr.net/npm/lxgw-wenkai-screen-webfont@1.1.0/style.css' },
        { rel: 'stylesheet', href: 'https://cdn.jsdelivr.net/npm/lxgw-wenkai-screen-webfont@1.1.0/style.css' },
      ],
    },
  },
  components: [
    {
      global: true,
      path: resolve('./components'),
    },
    {
      global: true,
      path: resolve('./components/content'),
    },
  ],
  content: {
    highlight: {
      theme: {
        default: 'vitesse-light',
        dark: 'vitesse-dark',
      },
    },
  },
  modules: [
    '@nuxt/content',
    '@nuxt/devtools',
    '@unocss/nuxt',
    '@vueuse/nuxt',
  ],
})
