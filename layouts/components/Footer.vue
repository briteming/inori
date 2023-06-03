<script setup lang="ts">
import { siteConfig } from '@/site.config'
</script>

<template>
    <footer class="pt-5em color-inherit">
        <div class="flex items-center flex-col md:flex-row gap-1em">
            <span class="op-50">
                <a href="https://creativecommons.org/licenses/by-nc-sa/4.0/" target="_blank" rel="noopener noreferrer"
                    class="link">
                    CC BY-NC-SA 4.0
                </a>
                Copyright © 2023-Present {{ siteConfig.author }}
            </span>
        </div>
    </footer>
</template>
