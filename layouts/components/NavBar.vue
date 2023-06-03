<script setup lang="ts">
import { navLinks } from '@/site.config'
</script>

<template>
    <nav class="flex items-center justify-end gap-1.5em text-lg">
        <!-- <Avatar /> -->
        <NuxtLink v-for="link in navLinks" :key="link.path" class="text-gray-700 hover:op-100 op-60 transition-opacity" :title="link.title" :to="link.path">
            <span class="hidden md:inline">{{ link.title }}</span>
            <div :class="link.icon" class="md:hidden" />
        </NuxtLink>
        <ToggleTheme />
    </nav>
</template>
