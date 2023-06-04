<script setup lang="ts">
import { withBase } from 'ufo'

const props = defineProps({
  src: {
    type: String,
    default: '',
  },
  alt: {
    type: String,
    default: '',
  },
  width: {
    type: [String, Number],
    default: undefined,
  },
  height: {
    type: [String, Number],
    default: undefined,
  },
})

const refinedSrc = computed(() => {
  if (props.src?.startsWith('/') && !props.src.startsWith('//'))
    return withBase(props.src, useRuntimeConfig().app.baseURL)

  return props.src
})
</script>

<template>
  <figure>
    <img data-image-zoom :src="refinedSrc" :alt="alt" :width="width" :height="height" loading="lazy">
    <figcaption>
      {{ alt }}
    </figcaption>
  </figure>
</template>
