<template>
  <div class="flex flex-col space-y-4">
    <div class="grid grid-cols-1 gap-4">
      <input v-model.trim="filter" type="text" placeholder="Filter news"
             class="border border-gray-300 p-2 rounded" />
      <template v-for="news in filteredData">
        <News :description="news.description" :title="news.title" :to="news.link" :pub-date="news.pubDate" />
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Rss } from '~/types/rss'
import News from '~/components/news/News.vue'

interface RssNewsProps {
  maxNews?: number
}

const props = withDefaults(defineProps<RssNewsProps>(), {
  maxNews: 3
})

const { data } = await useLazyFetch<Rss[]>('/api/rss')
const filter = ref<string>('')
const filteredData = computed<Rss[]>(() => {
  if (!data.value) {
    return []
  }

  if (!filter.value || filter.value === '') {
    return data.value.slice(0, props.maxNews)
  }

  return data.value?.filter((news: Rss) => cleanString(news.title).match(cleanString(filter.value))).slice(0, props.maxNews)
})

const cleanString = (str: string) => str.toLowerCase().replace(/[^a-zA-Z0-9]/g, '')
</script>
