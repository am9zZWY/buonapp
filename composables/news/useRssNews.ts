import type { RssNews } from '~/types/news'
import { fetchRss as utilsFetchRss } from '~/utils/fetchRss'
import { ref, watch } from 'vue'

const NEWS_URLS = [
  'https://www.tagesschau.de/xml/rss2' /* Tagesschau */
]

export default async function(noAutoFetch: boolean = false) {
  const news = ref<RssNews[]>([])
  const newsList = ref<Set<string>>(new Set(NEWS_URLS))
  /**
   * The maximum age of the news in days
   */
  const maxAge = ref<number>(2)
  /**
   * The maximum number of news from each feed
   */
  const maxNews = ref<number>(5)

  const fetchRss = async () => {
    try {
      news.value = await utilsFetchRss(Array.from(newsList.value), maxAge.value).then(news => news.slice(0, maxNews.value))
      console.debug('Fetched RSS feeds:', news.value)
    } catch (error) {
      console.error('Error fetching RSS feeds:', error)
    }
  }
  const autoFetch = async () => {
    if (!noAutoFetch) {
      return await fetchRss()
    }
  }

  await autoFetch()

  /**
   * Add a news URL to the set of urls
   * @param url
   */
  const addNews = async (url: string) => {
    newsList.value.add(url)
    await autoFetch()
  }

  /**
   * Reset the news list to the default list
   */
  const reset = async () => {
    newsList.value = new Set()
    news.value = []
  }

  /**
   * Remove a URL from the set of urls
   * and re-fetch everything
   * TODO: This is not optimal. In the best case it should only remove the items from the URL.
   * @param url
   */
  const removeNews = (url: string) => {
    newsList.value.delete(url)
    return autoFetch()
  }

  if (!noAutoFetch) {
    watch([maxAge, maxNews], fetchRss)
  }

  return { noAutoFetch, news, maxAge, maxNews, reset, addNews, removeNews, fetchRss }
}
