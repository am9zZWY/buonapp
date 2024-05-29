import useRssNews from '~/composables/news/useRssNews'
import { z } from 'zod'

// Schema for the query parameters
const rssSchema = z.object({
  maxAge: z.string().optional(),
  max: z.string().optional()
})

const rssBodySchema = z.object({
  url: z.array(z.string()).optional()
})

// Define the event handler for the RSS news endpoint
export default defineEventHandler(async (event) => {
  const rss = await useRssNews(true)

  // URLS in body
  const body = await readValidatedBody(event, body => rssBodySchema.parse(body))
  if (body.url) {
    await rss.reset()
    body.url.forEach(url => rss.addNews(url))
  }

  // Validate the query parameters
  const query = await getValidatedQuery(event, query => rssSchema.parse(query))
  const maxAge = query.maxAge
  const maxNews = query.max

  console.debug('maxAge:', maxAge)
  console.debug('maxNews:', maxNews)

  if (maxAge) {
    rss.maxAge.value = Number(maxAge)
  }

  if (maxNews) {
    rss.maxNews.value = Number(maxNews)
  }

  // Fetch the RSS news
  await rss.fetchRss()

  return rss.news.value
})
