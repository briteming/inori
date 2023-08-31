<script setup lang="ts">
import { formatDate } from '~/utils'
import type { ParsedContent } from '@/types/content'

defineOptions({
  name: 'PostsList',
})

const contents = await queryContent('/posts/').find() as ParsedContent[]

const posts = computed(() => contents.map(i => ({
  path: i._path,
  title: i.title,
  date: i.created_at,
  lang: i.lang,
})).sort((a, b) => +new Date(b.date) - +new Date(a.date)),
)

const getYear = (a: Date | string | number) => new Date(a).getFullYear()
const isFuture = (a?: Date | string | number) => a && new Date(a) > new Date()
const isSameYear = (a?: Date | string | number, b?: Date | string | number) => a && b && getYear(a) === getYear(b)
function isSameGroup(a, b) {
  return (isFuture(a.date) === isFuture(b?.date)) && isSameYear(a.date, b?.date)
}

function getGroupName(p) {
  if (isFuture(p.date))
    return 'Upcoming'
  return getYear(p.date)
}
</script>

<template>
  <ul>
    <template v-if="!posts.length">
      <div py2 op50>
        { nothing here yet }
      </div>
    </template>

    <template v-for="route, idx in posts" :key="route.path">
      <div
        v-if="!isSameGroup(route, posts[idx - 1])" slide-enter pointer-events-none relative h20 select-none :style="{
          '--enter-stage': idx - 2,
          '--enter-step': '60ms',
        }"
      >
        <span

          absolute left--3rem top--2rem text-8em font-bold color-transparent text-stroke-2 text-stroke-hex-aaa op10
        >{{ getGroupName(route) }}</span>
      </div>
      <div
        class="slide-enter" :style="{
          '--enter-stage': idx,
          '--enter-step': '60ms',
        }"
      >
        <component
          :is="route.path.includes('://') ? 'a' : 'RouterLink'" v-bind="route.path.includes('://') ? {
            href: route.path,
            target: '_blank',
            rel: 'noopener noreferrer',
          } : {
            to: route.path,
          }
          " class="item mb-6 mt-2 block font-normal no-underline"
        >
          <li class="no-underline" flex="~ col md:row gap-2 md:items-center">
            <div class="title text-lg leading-1.2em" flex="~ gap-2 wrap">
              <span
                v-if="route.lang === 'zh'" flex-none align-middle
                class="my-auto ml--12 mr2 hidden rounded bg-zinc:15 px-1 py-0.5 text-xs text-zinc5 md:block"
              >中文</span>
              <span align-middle>{{ route.title }}</span>
            </div>

            <div flex="~ gap-2 items-center">
              <span ws-nowrap text-sm op50>
                {{ formatDate(route.date, true) }}
              </span>
              <span
                v-if="route.lang === 'zh'" flex-none align-middle
                class="my-auto rounded bg-zinc:15 px-1 py-0.5 text-xs text-zinc5 md:hidden"
              >中文</span>
            </div>
          </li>
        </component>
      </div>
    </template>
  </ul>
</template>
