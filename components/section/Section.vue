<template>
  <div class="w-full mb-14 rounded-xl p-3 pt-4" :class="[{'shadow-inner': !noShadow}]">
    <h1 class="text-xl font-serif font-bold">{{ title }}</h1>
    <h2 class="text-gray-800 dark:text-slate-400" v-if="subtitle">{{ subtitle }}</h2>
    <div class="mt-10 flex-wrap justify-start gap-x-20 gap-y-10 flex">
      <slot></slot>
    </div>
    <slot name="full-width"></slot> <!-- This is a named slot -->
  </div>
</template>

<script lang="ts" setup>
interface SectionProps {
  title: string,
  subtitle?: string,
  noShadow?: boolean
}

withDefaults(defineProps<SectionProps>(), {
  title: 'New Title',
  noShadow: false
})
</script>
