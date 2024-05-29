<template>
  <ClientOnly placeholder="Loading ...">
    <template v-if="news">
      {{ news }}
    </template>
    <template v-else>
      Loading ...
    </template>
  </ClientOnly>
</template>

<script lang="ts" setup>
import useLTfNews from '~/composables/news/useLTfNews'

const localTransformerNews = await useLTfNews()
const news = computed(() => localTransformerNews.news.value.map((summary) => summary.text).join(' | ') ?? 'No news yet')
</script>
