<template>
  <div class="w-full my-5">
    <h1 class="text-lg font-bold font-serif" v-if="title">{{ title }}</h1>
    <div class="flex-wrap justify-start gap-x-20 gap-y-10 flex">
      <slot></slot>
    </div>
    <slot name="full-width"></slot> <!-- This is a named slot -->
  </div>
</template>

<script lang="ts" setup>
interface SectionProps {
  title?: string,
}

defineProps<SectionProps>()
</script>
