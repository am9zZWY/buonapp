<template>
  <ClientOnly :placeholder="statusMessage">
    <template v-if="news">
      <NuxtLink to="/buone/notizie" class="hover:underline">
        {{ news }}
      </NuxtLink>
    </template>
    <template v-else>
      <span>{{ statusMessage }}</span>

      <div class="mt-2 w-64">
        <UProgress :value="currTotalDownload" :max="totalDownload" size="sm" />
      </div>
    </template>
  </ClientOnly>
  <DevOnly v-if="!news">
    <pre>{{ downloadStatus }}</pre>
    <pre>{{ currTotalDownload }} / {{ totalDownload }}</pre>
  </DevOnly>
</template>

<script lang="ts" setup>
import type { RssNews } from '~/types/news'
import { cleanString, type CleanStringOptions, DEFAULT_CLEAN_STRING_OPTIONS } from '~/utils/cleanString'
import useLTf from '~/composables/useLTf'

const downloadStatus = ref<{ [key: string]: number }>({})
const currTotalDownload = computed<number>(() => Object.values(downloadStatus.value).reduce((acc, curr) => acc + curr, 0))
const totalDownload = computed<number>(() => Object.values(downloadStatus.value).length * 100)
const statusMessage = computed(() => {
  if (currTotalDownload.value === totalDownload.value) {
    return 'Summarizing news...'
  } else {
    return 'Downloading transformer model...'
  }
})

const summarizedNews = ref<string[]>([])
const news = computed(() => summarizedNews.value.join(' | '))

const summaryTransformer = useLTf()
summaryTransformer.createWorker('summarize')

// Function to handle messages from the worker
summaryTransformer.onmessage.value = (event) => {
  const workerData = event.data

  switch (workerData.type) {
    case 'finished': {
      summarizedNews.value = workerData.data
      break
    }
    case 'progress': {
      const workerStatus = workerData.status
      const name = workerStatus.name + workerStatus.file

      if (workerStatus.status === 'progress') {
        if (!downloadStatus.value[name]) {
          downloadStatus.value[name] = workerStatus.progress
          break
        }

        if (downloadStatus.value[name] < workerStatus.progress) {
          downloadStatus.value[name] = workerStatus.progress
        }
      }
      break
    }
    case 'error': {
      console.error('Error:', workerData.error)
      break
    }
    default:
      console.error('Unknown worker message:', workerData)
  }
}

const rssNews = await $fetch<RssNews[]>('/api/news/rss?maxAge=1&max=3', {
  method: 'POST',
  body: JSON.stringify({
    url: [
      'https://www.reutersagency.com/feed/?best-regions=europe&post_type=best'
    ]
  })
})
// Clean up the news feed
const options: CleanStringOptions = DEFAULT_CLEAN_STRING_OPTIONS
options.maxLength = undefined
options.stripStopwords = false
options.stripPunctuation = '+'

const newsFeed = rssNews.map((item: RssNews) => `${cleanString(item.title, options)}. ${cleanString(item.encoded, options)}`)

summaryTransformer.startTask(newsFeed)
</script>
