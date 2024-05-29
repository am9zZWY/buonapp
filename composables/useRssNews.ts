import type { RssNews } from '~/types/news'
import { fetchRss as utilsFetchRss } from '~/utils/fetchRss'
import { ref, watch } from 'vue'

const NEWS_URLS = [
  'https://www.tagesschau.de/xml/rss2' /* Tagesschau */,
  'https://feeds.bbci.co.uk/news/rss.xml'  /* BBC News */,
  'https://rss.nytimes.com/services/xml/rss/nyt/HomePage.xml' /* New York Times */
]

export default async function() {
  const rssNews = ref<RssNews[]>([])
  const newsList = ref<Set<string>>(new Set(NEWS_URLS))
  /**
   * If set to true, the fetchRss function will not be called automatically
   * when parameters change
   */
  const noWatch = ref<boolean>(false)
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
      rssNews.value = await utilsFetchRss(Array.from(newsList.value), maxAge.value).then(news => news.slice(0, maxNews.value))
    } catch (error) {
      console.error('Error fetching RSS feeds:', error)
    }
  }
  await fetchRss()

  /**
   * Add a news URL to the set of urls
   * @param url
   */
  const addNews = async (url: string) => {
    newsList.value.add(url)
    await fetchRss()
  }

  /**
   * Remove a URL from the set of urls
   * and re-fetch everything
   * TODO: This is not optimal. In the best case it should only remove the items from the URL.
   * @param url
   */
  const removeNews = (url: string) => {
    newsList.value.delete(url)
    return fetchRss()
  }

  if (!noWatch.value) {
    watch([maxAge, maxNews], fetchRss)
  }

  return { noWatch, rssNews, maxAge, maxNews, addNews, removeNews, fetchRss }
}
