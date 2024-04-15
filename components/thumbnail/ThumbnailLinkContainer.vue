<template>
  <div class="mb-14">
    <h1 class="text-xl font-serif font-bold">{{ title }}</h1>
    <h2 class="text-lg font-serif font-extralight text-gray-800 dark:text-slate-400" v-if="subtitle">{{ subtitle }}</h2>
    <div class="mt-10 flex-wrap justify-start gap-x-20 gap-y-10 flex">
      <slot></slot>
    </div>
    <slot name="full-width"></slot> <!-- This is a named slot -->
  </div>
</template>

<script lang="ts" setup>
interface ThumbnailLinkContainerProps {
  title: string,
  subtitle?: string
}

withDefaults(defineProps<ThumbnailLinkContainerProps>(), {
  title: 'New Title'
})
</script>
