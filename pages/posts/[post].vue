<script setup lang="ts">
const route = useRoute()
const { data } = await useAsyncData('page-data', () => queryContent('/posts/' + route.params.post).findOne())
</script>

<template>
    <NuxtLayout>
        <main class="post">
            <ContentRenderer v-if="data" :value="data">
                <h1 class="text-4xl font-bold">{{ data.title }}</h1>
                <ContentRendererMarkdown :value="data" />
            </ContentRenderer>
        </main>
    </NuxtLayout>
</template>
<style ></style>