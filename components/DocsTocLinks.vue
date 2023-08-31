<!-- eslint-disable n/prefer-global/process -->
<script setup lang="ts">
import type { PropType } from 'vue'
import type { TocLink } from '@nuxt/content/dist/runtime/types'

defineProps({
  links: {
    type: Array as PropType<TocLink[]>,
    default: () => [],
  },
})

const emit = defineEmits(['move'])

const router = useRouter()

const { activeHeadings, updateHeadings } = useScrollspy()

if (process.client) {
  setTimeout(() => {
    updateHeadings([
      ...document.querySelectorAll('.inori-content h1'),
      ...document.querySelectorAll('.inori-content h2'),
      ...document.querySelectorAll('.inori-content h3'),
      ...document.querySelectorAll('.inori-content h4'),
    ])
  }, 300)
}

function scrollToHeading(id: string) {
  router.push(`#${id}`)
  emit('move', id)
}

function childMove(id: string) {
  emit('move', id)
}
</script>

<template>
  <ul>
    <li
      v-for="link in links"
      :key="link.text"
      class="ml4"
    >
      <a
        :href="`#${link.id}`"
        :class="[activeHeadings.includes(link.id) && 'text-primary']"
        @click.prevent="scrollToHeading(link.id)"
      >
        {{ link.text }}
      </a>
      <DocsTocLinks
        v-if="link.children"
        :links="link.children"
        @move="childMove($event)"
      />
    </li>
  </ul>
</template>

<style lang="scss" scoped>

</style>
