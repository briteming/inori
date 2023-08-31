<script lang="ts" setup>
import NavBar from './components/NavBar.vue'
import Footer from './components/Footer.vue'

import Social from './components/Social.vue'
</script>

<template>
  <NuxtLoadingIndicator />
  <header class="p-2em">
    <NavBar />
  </header>
  <aside>
    <Social />
  </aside>
  <main class="w-100% flex-1 px-7 py-10">
    <div class="m-auto max-w-70ch">
      <slot />
      <Footer />
    </div>
  </main>
</template>
