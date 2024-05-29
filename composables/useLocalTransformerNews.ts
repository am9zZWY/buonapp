import type { RssNews } from '~/types/news'
import { ref } from 'vue'
import useRssNews from '~/composables/useRssNews'
import { cleanString } from '~/utils/cleanString'
import { getLocalTransformerSummary } from '~/utils/getLocalTransformerSummary'


export default async function() {
  const aiNews = ref<string>('')

  // Use RSS module to fetch news
  const rssNews = await useRssNews()
  rssNews.noWatch.value = true
  rssNews.maxAge.value = 2
  rssNews.maxNews.value = 1
  await rssNews.fetchRss()

  // Clean up the news feed
  const newsFeed = Array
    .from(new Set(rssNews.rssNews.value))
    .map((item: RssNews) =>
      `${cleanString(item.title, 30)}: ${cleanString(item.description, 30)}`
    )
    .join('\n')

  // Use RSS module to fetch news
  aiNews.value = await getLocalTransformerSummary(newsFeed)

  return { aiNews }
}
