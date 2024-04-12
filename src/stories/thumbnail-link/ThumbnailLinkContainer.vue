<template>
    <div class="mb-14">
        <h1 class="text-xl font-serif font-bold">{{ title }}</h1>
        <h2 class="text-lg font-serif font-extralight text-gray-800" v-if="subtitle">{{ subtitle }}</h2>
        <div class="pt-5 flex-wrap justify-start gap-x-20 gap-y-10 flex">
            <slot></slot>
        </div>
    </div>
</template>

<script lang="ts" setup>
interface ThumbnailLinkContainerProps {
    title: string,
    subtitle?: string
}

const props = withDefaults(defineProps<ThumbnailLinkContainerProps>(), {
    title: 'New Title'
})
</script>
