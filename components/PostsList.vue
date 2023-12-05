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
  labels: i.labels,
  description: i.description,
})).sort((a, b) => +new Date(b.date) - +new Date(a.date)),
)
</script>

<template>
  <ul>
    <template v-if="!posts.length">
      <div py2 op50>
        { nothing here yet }
      </div>
    </template>

    <template v-for="post in posts" :key="post.path">
      <section class="mb-6">
        <div class="flex items-center gap-4 no-underline">
          <RouterLink v-if="post.path" :to="post.path" class="block font-normal no-underline transition-all hover:op70">
            {{ post.title }}
          </RouterLink>
          <div v-if="post.labels">
            <div v-for="label in post.labels" :key="label.name">
              #{{ label.name }}
            </div>
          </div>
        </div>
        <div class="flex gap-4 ws-nowrap text-sm op50">
          <span>
            {{ formatDate(post.date) }}
          </span>
          <div>{{ formatReadTime(readTime(post.description)) }}</div>
        </div>
      </section>
    </template>
  </ul>
</template>
