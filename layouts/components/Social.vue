<script setup lang="ts">
import { siteConfig } from '@/site.config'

const socialLinks = [
  {
    title: 'Bilibili',
    path: 'https://space.bilibili.com/19510750',
    icon: 'i-simple-icons-bilibili',
  },
  {
    title: 'Twitter',
    path: 'https://twitter.com/deusyue',
    icon: 'i-simple-icons-twitter',
  },
  {
    title: 'Github',
    path: 'https://github.com/Deuscx',
    icon: 'i-carbon-logo-github',
  },
]
</script>

<template>
  <div class="fixed bottom-2em z-1 items-end xl:flex">
    <div class="h-60% flex flex-col justify-end gap-1em border-r-2 px-2em">
      <a
        v-for="link in socialLinks" :key="link.title" :title="link.title" :href="link.path" class="hover"
        target="_blank"
      >
        <div :class="link.icon" />
      </a>
    </div>
    <div
      class="font-hand pointer-events-none select-none text-end text-7xl lh-2em op-10"
      style=" writing-mode: vertical-rl;"
    >
      {{ siteConfig.author }}
    </div>
  </div>
</template>
