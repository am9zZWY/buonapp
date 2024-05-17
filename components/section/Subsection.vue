<template>
  <div class="w-full my-5">
    <h1 v-if="title" class="text-lg font-bold font-serif">{{ title }}</h1>
    <h2 v-if="subtitle" class="text-gray-800 dark:text-slate-400">{{ subtitle }}</h2>
    <div class="mt-10 flex-wrap justify-start gap-x-20 gap-y-10 flex">
      <slot/>
    </div>
    <slot name="full-width"/> <!-- This is a named slot -->
  </div>
</template>

<script lang="ts" setup>
interface SectionProps {
  title?: string,
  subtitle?: string
}

defineProps<SectionProps>()
</script>
