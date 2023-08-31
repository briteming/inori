<script setup lang="ts">
const { height } = useWindowSize()
const { y } = useWindowScroll()

const isOverOneScreen = computed(() => y.value > height.value)

function backtop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  })
}
</script>

<template>
  <div v-show="isOverOneScreen" class="cursor-pointer">
    <!-- back top -->
    <div class="i-carbon-up-to-top" @click="backtop" />
  </div>
</template>

<style scoped></style>
