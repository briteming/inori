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
    <div class="xl:flex fixed z-1 bottom-2em items-end">
        <div class="px-2em flex justify-end flex-col gap-1em border-r-2 h-60%">
            <a v-for="link in socialLinks" :key="link.title" :title="link.title" :href="link.path" class="hover"
                target="_blank">
                <div :class="link.icon" />
            </a>
        </div>
        <div class="text-7xl pointer-events-none op-10 text-end lh-2em select-none font-hand"
            style=" writing-mode: vertical-rl;">
            {{ siteConfig.author }}
        </div>
    </div>
</template>
