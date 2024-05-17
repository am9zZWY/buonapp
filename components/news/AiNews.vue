<template>
  {{ news }}
</template>

<script lang="ts" setup>
import type { AiNews } from '~/types/news'

const { data } = await useLazyFetch<AiNews[]>('/api/news/ai')
const news = computed(() => data.value?.join(' | ') ?? 'No news yet')
</script>
