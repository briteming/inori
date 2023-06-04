<script setup lang="ts">
import mediumZoom from 'medium-zoom';
const route = useRoute()
const router = useRouter()

const content = ref<HTMLElement | null>(null)

onMounted(()=>{
  mediumZoom('[data-image-zoom]', {
    background: 'rgba(0, 0, 0, 0.8)',
    margin: 24,
    scrollOffset: 0,
  })
})
const navigate = (hash?: string) => {
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
  <section class="relative slide-enter-content">
    <ContentDoc :path="'/posts/' + route.params.post">
      <template #default="{ doc }">
        <!-- <DocBack /> -->
        <ContentRenderer ref="content" class="prose inori-content" :value="doc" />
        <DocsToc :toc="doc.body.toc" @move="move" />
      </template>

      <template #empty>
        <h1 class="text-center">
          Document is empty😅
        </h1>
      </template>

      <template #not-found>
        <h1 class="text-center">
          Not Found Any Document😗
        </h1>
      </template>
    </ContentDoc>
  </section>
</template>
<style ></style>