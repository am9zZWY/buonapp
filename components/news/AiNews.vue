<template>
  {{ news }}
</template>

<script lang="ts" setup>
import type { GptNews } from '~/types/news'

interface AiNewsProps {
  maxNews?: number,
  subjects?: string,
}

const props = withDefaults(defineProps<AiNewsProps>(), {
  maxNews: 5,
  subjects: 'climate,energy,health'
})

const { subjects } = toRefs(props)

const { data } = await useLazyFetch<GptNews[]>(`/api/news/ai/${subjects.value}`)
const news = computed(() => data.value?.map((summary) => summary.text).join(' | ') ?? 'No news yet')
</script>
