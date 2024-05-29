<template>
  <ClientOnly :placeholder="statusMessage">
    <template v-if="news">
      <NuxtLink to="/buone/notizie" class="hover:underline">
        {{ news }}
      </NuxtLink>
    </template>
    <template v-else>
      {{ statusMessage }}

      <!-- TODO: Find better loader -->
      <!-- <div class="loader" /> -->
    </template>
  </ClientOnly>
  <DevOnly>
    <pre>{{ downloadStatus }}</pre>
  </DevOnly>
</template>

<script lang="ts" setup>
import './TransformerNews.css'
import type { RssNews } from '~/types/news'
import { cleanString, type CleanStringOptions, DEFAULT_CLEAN_STRING_OPTIONS } from '~/utils/cleanString'

const statusMessage = computed(() => {
  if (Object.keys(downloadStatus.value).length == 0) {
    return 'Summarizing news...'
  } else {
    return 'Downloading transformer model...'
  }
})

type DownloadStatus = {
  progress: number
}
const downloadStatus = ref<{ [key: string]: DownloadStatus }>({})

const summarizedNews = ref<string[]>([])
const news = computed(() => summarizedNews.value.join(' | '))

// Import the worker script as a Web Worker
const worker = new Worker(new URL('~/services/LTf.worker.ts', import.meta.url), {
  type: 'module'
})

// Function to handle messages from the worker
worker.onmessage = (event) => {
  const workerData = event.data

  switch (workerData.type) {
    case 'summarized': {
      summarizedNews.value = workerData.data
      break
    }
    case 'progress': {
      const workerStatus = workerData.status
      const name = workerStatus.name + workerStatus.file

      if (workerStatus.status === 'progress') {
        if (!downloadStatus.value[name]) {
          downloadStatus.value[name] = {
            progress: workerStatus.progress
          }
        }

        if (workerStatus.progress === 100) {
          // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
          delete downloadStatus.value[name]
          break
        }

        downloadStatus.value[name].progress = workerStatus.progress
      } else {
        console.debug('Worker status:', workerStatus)
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

const newsFeed = rssNews.map((item: RssNews) => `${cleanString(item.title)}. ${cleanString(item.encoded, options)}`)

worker.postMessage({ type: 'summarize', data: newsFeed })
</script>
