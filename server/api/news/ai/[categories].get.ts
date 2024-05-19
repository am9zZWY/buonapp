import type { NitroRuntimeConfig } from 'nitropack'
import useAiNews from '~/composables/useAiNews'
import pino from 'pino'

const logger = pino(
  {
    levelComparison: 'DESC',
    msgPrefix: '[[categories].get] '
  }
)

/**
 * Fetch the most important news from RSS feeds and summarize them
 * using OpenAI's GPT-3.5 model
 *
 * @param event
 * @returns Promise<string> The most important news summarized
 */
export default defineEventHandler(async (event) => {
  const config: NitroRuntimeConfig = useRuntimeConfig(event)
  const { openaiApiKey } = config
  if (!openaiApiKey) {
    logger.error('OpenAI API key not provided')
    throw createError({
      statusCode: 500,
      statusMessage: 'OpenAI API key not provided'
    })
  }

  const categories = getRouterParam(event, 'categories')
    ?.trim()
    ?.split(',')
    .map((category) => category.trim())

  if (!categories || !categories.length) {
    logger.error('Categories not provided')
    throw createError({
      statusCode: 400,
      statusMessage: 'Categories not provided'
    })
  }

  // Fetch the most important news from RSS feeds and summarize them
  const aiNews = await useAiNews(openaiApiKey)
  aiNews.setMaxTokens(50)
  aiNews.setMaxItems(3)
  aiNews.setCategories(categories)
  await aiNews.summarizeNews()

  return aiNews.aiNews.value
})
