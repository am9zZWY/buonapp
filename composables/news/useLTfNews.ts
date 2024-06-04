import type { RssNews } from '~/types/news'
import { ref } from 'vue'
import { cleanString, type CleanStringOptions, DEFAULT_CLEAN_STRING_OPTIONS } from '~/utils/cleanString'
import useLTf from '~/composables/ltf/useLtf'


export default async function() {
  const summarizedNews = ref<string[]>([])
  const rssNews = await $fetch<RssNews[]>('/api/news/rss?maxAge=1&max=3', {
    method: 'POST',
    body: JSON.stringify({
      url: [
        'https://www.reutersagency.com/feed/?best-regions=europe&post_type=best'
      ]
    })
  })
  const news = computed(() => summarizedNews.value.join(' | '))

  const summaryTransformer = useLTf('summarize')

  const downloadProgress = computed(() => summaryTransformer.downloadProgress.value)
  const statusMessage = computed(() => {
    if (downloadProgress.value < 100) {
      return 'Downloading transformer model: ' + downloadProgress.value + '%'
    } else {
      return 'Summarizing news...'
    }
  })

  // Function to handle messages from the worker
  summaryTransformer.onmessage.value = (event) => {
    const workerData = event.data

    switch (workerData.type) {
      case 'finished': {
        summarizedNews.value = workerData.data
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

  // Clean up the news feed
  const options: CleanStringOptions = DEFAULT_CLEAN_STRING_OPTIONS
  options.maxLength = undefined
  options.stripStopwords = false
  options.stripPunctuation = '+'

  // Clean up the news feed for the transformer
  const newsFeed = rssNews.map((item: RssNews) => `title: ${cleanString(item.title, options)}: ${cleanString(item.encoded, options)}`)

  // Start the transformer
  summaryTransformer.startTask(newsFeed)

  return {
    news,
    statusMessage,
    downloadProgress,
  }
}
