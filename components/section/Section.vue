<template>
  <div class="w-full mb-14 rounded-xl py-4">
    <h1 class="text-xl font-serif font-bold">{{ title }}</h1>
    <h2 v-if="subtitle" class="text-gray-800 dark:text-slate-400">{{ subtitle }}</h2>
    <div class="mt-2 flex-wrap justify-start gap-x-20 gap-y-10 flex">
      <slot name="before"/>
    </div>
    <div class="mt-10 flex-wrap justify-start gap-x-20 gap-y-10 flex">
      <slot/>
    </div>
    <slot name="full-width"/> <!-- This is a named slot -->
  </div>
</template>

<script lang="ts" setup>
interface SectionProps {
  title: string,
  subtitle?: string,
}

withDefaults(defineProps<SectionProps>(), {
  title: '',
  subtitle: undefined,
})
</script>
