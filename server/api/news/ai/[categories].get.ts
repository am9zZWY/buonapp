import type { NitroRuntimeConfig } from 'nitropack'
import useAiNews from '~/composables/useAiNews'

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
    throw createError({
      statusCode: 500,
      statusMessage: 'OpenAI API key not provided'
    })
  }

  const categories = getRouterParam(event, 'categories')
    ?.trim()
    ?.split(',')
    .map((category) => category.trim())

  // Fetch the most important news from RSS feeds and summarize them
  const aiNews = await useAiNews(openaiApiKey)
  aiNews.setMaxTokens(50)
  aiNews.setMaxItems(3)
  aiNews.setCategories(categories)
  await aiNews.summarizeNews()

  return aiNews.aiNews.value
})
