<template>
  <div :class="`mx-2 bg-gray-300 dark:bg-white-600 w-px h-${height}`" />
</template>

<script setup lang="ts">
interface VSepProps {
  height?: string
}

withDefaults(defineProps<VSepProps>(), {
  height: '10'
})
</script>
