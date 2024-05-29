import type { LTfNews, RssNews } from '~/types/news'
import { ref } from 'vue'
import { cleanString, type CleanStringOptions, DEFAULT_CLEAN_STRING_OPTIONS } from '~/utils/cleanString'
import { getLTfSummary } from '~/utils/getLTfSummary'


export default async function() {
  const news = ref<LTfNews[]>([])

  const rssNews = await $fetch<RssNews[]>('/api/news/rss?maxAge=1&max=3', {
    method: 'POST',
    body: JSON.stringify({
      url: [
        'https://www.reutersagency.com/feed/?best-regions=europe&post_type=best'
      ]
    })
  })

  console.log('Fetched RSS news:', rssNews)

  // Clean up the news feed
  const options: CleanStringOptions = DEFAULT_CLEAN_STRING_OPTIONS
  options.stripStopwords = false
  options.stripPunctuation = false

  const newsFeed = rssNews
    .map((item: RssNews) =>
      `${item.title}: ${cleanString(item.text, options)}`
    )

  if (newsFeed.length === 0) {
    throw new Error('No news feed available')
  }

  // Use RSS module to fetch news
  news.value = await getLTfSummary(newsFeed)
    .then(summaries =>
      summaries
        .map((summary: string) => ({
          source: 'Reuters',
          text: summary
        })))

  return { news }
}
