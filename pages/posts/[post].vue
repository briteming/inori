<script setup lang="ts">
const route = useRoute()
const router = useRouter()

const content = ref<HTMLElement | null>(null)
const { data } = await useAsyncData('page-data', () => {
    return queryContent('/posts/' + route.params.post).findOne()
})

onMounted(() => {
  const navigate = () => {
    if (location.hash) {
      document.querySelector(decodeURIComponent(location.hash))
        ?.scrollIntoView({ behavior: 'smooth' })
    }
  }

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
    <main class="prose">
        <ContentRenderer  v-if="data" :value="data">
            <h1 class="text-4xl font-bold">{{ data.title }}</h1>
            <ContentRendererMarkdown ref="content" :value="data" />
        </ContentRenderer>
    </main>
</template>
<style ></style>