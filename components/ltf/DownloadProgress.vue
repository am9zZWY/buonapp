<template>
  <span class="inline-block bg-primary-500 text-white px-2 py-0.5 my-0.5 rounded-2xl text-xs">
    {{ progress }}%
    Downloading ...
  </span>
  <UProgress :value="progress" />
</template>

<script lang="ts" setup>
interface DownloadProgressProps {
  progress: number,
  hideTimeout?: number
}

const props = withDefaults(defineProps<DownloadProgressProps>(), {
  progress: 0,
  hideTimeout: 500
})
const { progress } = toRefs(props)
</script>
