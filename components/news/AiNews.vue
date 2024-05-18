<template>
  {{ news }}
</template>

<script lang="ts" setup>
import type { AiNews } from '~/types/news'

interface AiNewsProps {
  maxNews?: number,
  subjects?: string,
}

const props = withDefaults(defineProps<AiNewsProps>(), {
  maxNews: 5,
  subjects: 'AI',
})

const { subjects } = toRefs(props)

const { data } = await useLazyFetch<AiNews[]>(`/api/news/ai/${subjects.value}`)
const news = computed(() => data.value?.join(' | ') ?? 'No news yet')
</script>
