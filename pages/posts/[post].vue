<script setup lang="ts">
import mediumZoom from 'medium-zoom'

const route = useRoute()
const router = useRouter()

const content = ref<HTMLElement | null>(null)

onMounted(() => {
  mediumZoom('[data-image-zoom]', {
    background: 'rgba(0, 0, 0, 0.8)',
    margin: 24,
    scrollOffset: 0,
  })
})
function navigate(hash?: string) {
  if (location.hash || hash) {
    document.querySelector(decodeURIComponent(hash || location.hash))
      ?.scrollIntoView({ behavior: 'smooth' })
  }
}

function move(id: string) {
  setTimeout(() => navigate(`#${id}`), 300)
}
onMounted(() => {
  const handleAnchors = (
    event: MouseEvent & { target: HTMLElement },
  ) => {
    const link = event.target.closest('a')

    if (
      !event.defaultPrevented
      && link
      && event.button === 0
      && link.target !== '_blank'
      && link.rel !== 'external'
      && !link.download
      && !event.metaKey
      && !event.ctrlKey
      && !event.shiftKey
      && !event.altKey
    ) {
      const url = new URL(link.href)
      if (url.origin !== window.location.origin)
        return

      event.preventDefault()
      const { pathname, hash } = url
      if (hash && (!pathname || pathname === location.pathname)) {
        window.history.replaceState({}, '', hash)
        navigate()
      }
      else {
        router.push({ path: pathname, hash })
      }
    }
  }

  useEventListener(window, 'hashchange', navigate)
  useEventListener(content.value!, 'click', handleAnchors, { passive: false })

  navigate()
  setTimeout(navigate, 500)
})
</script>

<template>
  <section class="slide-enter-content relative">
    <ContentDoc :path="`/posts/${route.params.post}`">
      <template #default="{ doc }">
        <div class="mb4">
          <div class="text-4xl font-bold">
            {{ doc.title }}
          </div>
          <div>{{ formatReadTime(readTime(doc.description)) }}</div>
        </div>
        <ContentRenderer ref="content" class="inori-content prose" :value="doc" />
        <DocsToc :toc="doc.body.toc" @move="move" />
        <BackTop class="fixed bottom-10 right-10" />
        <PostComment :number="doc.number" />
      </template>

      <template #empty>
        <h1 class="text-center">
          Document is empty
        </h1>
      </template>

      <template #not-found>
        <h1 class="text-center">
          Not Found Any Document
        </h1>
      </template>
    </ContentDoc>
  </section>
</template>

<style></style>
