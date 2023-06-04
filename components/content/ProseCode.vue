<script lang="ts" setup>
import { useClipboard } from '@vueuse/core'
interface CodeProps {
    code: string
    language?: string
    filename?: string
    highlights?: number[]
    meta?: string
}
const props = defineProps<CodeProps>()

const { copy, isSupported } = useClipboard({ legacy: true })
const copied = ref(false)
function copyCode() {
    copy(props.code)
    copied.value = true
    setTimeout(() => {
        copied.value = false
    }, 1000)
}

</script>

<template>
    <div class="relative code-block ">
        <div v-if="filename" class="filename absolute top-0 right-0 op-0 transition-opacity backdrop-blur">
            {{ filename }}
        </div>
        <slot />
        <div v-if="isSupported" class="code-tools absolute bottom-0 right-0 op-0 transition-opacity">
            <button>
                <div v-if="copied" class="i-carbon-checkmark" />
                <div v-else class="i-carbon-copy" @click="copyCode()" />
            </button>
        </div>
    </div>
</template>
<style lang="scss" scoped>
.code-block {

    &:hover {
        .filename {
            opacity: 1;
        }

        .code-tools {
            opacity: 1;
        }
    }
}
</style>
