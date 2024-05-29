import type { LTfNews, RssNews } from '~/types/news'
import { ref } from 'vue'
import useRssNews from '~/composables/news/useRssNews'
import { cleanString, type CleanStringOptions, DEFAULT_CLEAN_STRING_OPTIONS } from '~/utils/cleanString'
import { getLTfSummary } from '~/utils/getLTfSummary'


export default async function() {
  const news = ref<LTfNews[]>([])

  // Use RSS module to fetch news
  const rssNews = await useRssNews(true)
  await rssNews.reset()
  await rssNews.addNews('https://www.reutersagency.com/feed/?best-regions=europe&post_type=best')
  rssNews.maxAge.value = 1
  rssNews.maxNews.value = 3
  await rssNews.fetchRss()

  // Clean up the news feed
  const options: CleanStringOptions = DEFAULT_CLEAN_STRING_OPTIONS
  options.stripStopwords = false
  options.stripPunctuation = false

  const newsFeed = rssNews.news.value
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
