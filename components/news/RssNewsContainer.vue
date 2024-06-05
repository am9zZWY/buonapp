<template>
  <div class="flex flex-col space-y-4 w-full">
    <div class="grid grid-cols-1 gap-4">
      <div class="bg-white-50 dark:bg-neutral-900 p-3 rounded-xl shadow-md dark:shadow-lg cursor-pointer">
        <input
          v-if="data && data.length > 0"
          v-model.trim="filter"
          class="text-gray-900 dark:text-gray-100 resize-none border-none focus:outline-none bg-transparent p-0 m-0"
          placeholder="Filter news"
          type="text"
        >
      </div>
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

const { data } = await useLazyFetch<RssNews[]>('/api/news/rss', {
  method: 'POST'
})
const filter = useState('filter', () => '')
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
