<script setup lang="ts">
const props = defineProps<{
  number: string
}>()
onMounted(() => {
  const scriptContainer = document.getElementById('utterances')
  const script = document.createElement('script')
  script.src = 'https://utteranc.es/client.js'
  script.async = true
  script.setAttribute('issue-number', props.number)
  script.setAttribute('repo', 'deuscx/inori')
  script.setAttribute('theme', isDark.value ? 'gruvbox-dark' : 'github-light')
  script.crossOrigin = 'anonymous'

  scriptContainer && (scriptContainer.innerHTML = '')
  scriptContainer?.appendChild(script)
})

watch(isDark, () => {
  setCommentTheme(isDark.value)
})
function setCommentTheme(isDark: boolean) {
  if (document.querySelector('.utterances-frame')) {
    const commentTheme = isDark ? 'gruvbox-dark' : 'github-light'
    const message = {
      type: 'set-theme',
      theme: commentTheme,
    }
    const iframe = document.querySelector('.utterances-frame')
    iframe?.contentWindow?.postMessage(message, 'https://utteranc.es')
  }
}
</script>

<template>
  <div id="utterances" />
</template>

<style scoped></style>
