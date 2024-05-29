import useRss from '~/composables/useRssNews'
import { z } from 'zod'

// Schema for the query parameters
const rssSchema = z.object({
  maxAge: z.string().optional(),
  max: z.string().optional()
})

// Define the event handler for the RSS news endpoint
export default defineEventHandler(async (event) => {
  const rss = await useRss()
  rss.noWatch.value = true

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

  return rss.rssNews.value
})
