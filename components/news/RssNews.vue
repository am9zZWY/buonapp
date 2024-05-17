<template>
  <div class="flex flex-col space-y-4">
    <div class="grid grid-cols-1 gap-4">
      <input
        v-if="data && data.length > 0"
        v-model.trim="filter"
        class="border border-gray-300 p-2 rounded"
        placeholder="Filter news"
        type="text"
      >
      <template v-for="news in filteredData">
        <LazyNews
          :pub-date="news.pubDate"
          :title="news.title"
          :to="news.link"
        />
      </template>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { RssNews } from '~/types/news'

interface RssNewsProps {
  maxNews?: number
}

const props = withDefaults(defineProps<RssNewsProps>(), {
  maxNews: 3
})

const { data } = await useLazyFetch<RssNews[]>('/api/news/rss')
const filter = ref<string>('')
const filteredData = computed<RssNews[]>(() => {
  if (!data.value) {
    return []
  }

  if (!filter.value || filter.value === '') {
    return data.value.slice(0, props.maxNews)
  }

  return data.value
    ?.filter((news: RssNews) => cleanString(news.title).match(cleanString(filter.value)))
    .slice(0, props.maxNews)
})

const cleanString = (str: string) => str.toLowerCase().replace(/[^a-zA-Z0-9]/g, '')
</script>
