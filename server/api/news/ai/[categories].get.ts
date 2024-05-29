import type { NitroRuntimeConfig } from 'nitropack'
import useAiNews from '~/composables/useChatGptNews'
import { z } from 'zod'

const categoriesSchema = z.object({
  categories: z.string()
})

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
  let errorMessage = ''
  if (!openaiApiKey) {
    errorMessage = 'OpenAI API key not provided'
    console.error(errorMessage)
    throw createError({
      statusCode: 500,
      statusMessage: errorMessage
    })
  }

  // Validate the categories
  const params = await getValidatedRouterParams(event, params => categoriesSchema.parse(params))
  if (!params) {
    errorMessage = 'Categories not provided'
    console.error(errorMessage)
    throw createError({
      statusCode: 400,
      statusMessage: errorMessage
    })
  }

  // Extract the categories from the URL
  const categories = params.categories
    .trim()
    .split(',')
    .map((category) => category.trim())

  // Fetch the most important news from RSS feeds and summarize them
  const aiNews = await useAiNews(openaiApiKey)
  aiNews.setMaxTokens(50)
  aiNews.setMaxItems(3)
  aiNews.setCategories(categories)
  await aiNews.summarizeNews()

  return aiNews.aiNews.value
})
