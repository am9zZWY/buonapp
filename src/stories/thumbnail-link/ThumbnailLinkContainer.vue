<template>
    <div class="mb-14">
        <h1 class="text-xl font-serif pb-5">{{ title }}</h1>
        <div class="flex-wrap justify-start gap-x-20">
            <slot></slot>
        </div>
    </div>
</template>

<script lang="ts" setup>
interface ThumbnailLinkContainerProps {
    title: string
}

const props = withDefaults(defineProps<ThumbnailLinkContainerProps>(), {
    title: 'New Title'
})
</script>
