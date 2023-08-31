<script setup lang="ts">
import type { Toc } from '@nuxt/content/dist/runtime/types'

defineProps<{
  toc: Toc
}>()
const emit = defineEmits(['move'])
</script>

<template>
  <div class="absolute left-full top-0 h-full">
    <section class="sticky top-14 w-25em overflow-auto">
      <template v-if="toc?.links?.length">
        <div class="docs-toc-title">
          <span>Table of Contents</span>
        </div>

        <DocsTocLinks :links="toc.links" @move="(id) => emit('move', id)" />
      </template>
    </section>
  </div>
</template>

<style scoped></style>
