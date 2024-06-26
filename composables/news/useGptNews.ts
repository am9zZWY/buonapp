import OpenAI from 'openai'
import type { GptNews, RssNews } from '~/types/news'
import useRssNews from '~/composables/news/useRssNews'
import { ref } from 'vue'
import { cleanString } from '~/utils/cleanString'

const MAX_TOKENS: number = 50

/**
 * Parse news summaries from a string
 * @param summaries
 */
const parseAndCleanGptSummary = (summaries?: string): GptNews[] => {
  if (!summaries) {
    console.warn('Empty summaries')
    return []
  }

  return summaries
    .split(/(?:\d+\.\s*(?=[A-Z]))|(?:\d\.?$)|(?:\-\s(?=[A-Z]))/g)  // Split using the regex pattern
    .map(summary => ({
      text: summary.trim()
        .replace(/\n/g, ' ')
        .replace(/[/#!$%^&*;:{}=\-_`~()]+$/g, '')
    }))
    .filter(summary => summary && summary.text.trim().split(' ').length > 3)
}


/**
 * Fetch the most important news from RSS feeds and summarize them
 * using OpenAI's GPT-3.5 model
 * @param openaiApiKey OpenAI API key
 */
export default async function(openaiApiKey: string) {
  const aiNews = ref<GptNews[]>([])

  // Initialize OpenAI
  const openai = new OpenAI({ apiKey: openaiApiKey })
  // Configuration
  const maxTokens = ref<number>(MAX_TOKENS)
  const maxItems = ref<number>(4)
  const newsCategories = ref<string[]>(['political', 'digital', 'environmental'])

  // Use RSS module to fetch news
  const rssNews = await useRssNews()
  rssNews.maxAge.value = 2
  await rssNews.fetchRss()

  // Clean up the news feed
  const newsFeed = Array
    .from(new Set(rssNews.news.value))
    .map((item: RssNews) =>
      `${cleanString(item.title, 30)}: ${cleanString(item.text, 30)}`
    )
    .join('\n')
  console.info('Cleaned up RSS News feed:', newsFeed)

  /**
   * Fetch the most important news from RSS feeds and summarize them
   * using OpenAI's GPT-3.5 model
   */
  const summarizeNews = async () => {
    const strCategories = newsCategories.value
      .slice(0, newsCategories.value.length - 1)
      .join(', ') + ' and ' + newsCategories.value[newsCategories.value.length - 1]
    console.info('Summarizing news for categories:', strCategories)

    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: `Summarize German and global ${strCategories} news in a few keywords. Output should be in English.`
        },
        {
          role: 'user',
          content: `Pick the ${maxItems.value} most important news items from all and summarize them in 5-7 words: ${newsFeed}`
        }
      ],
      max_tokens: maxTokens.value,  // Strict token limit to enforce brevity
      temperature: 0.1 // Low temperature for deterministic and focused output
    })

    // Extract the AI news
    const gptAiNews = completion.choices[0].message.content?.trim()
    console.info('GPT AI News:', gptAiNews)

    // Parse the news summaries
    const parsedNews = parseAndCleanGptSummary(gptAiNews)

    if (gptAiNews) {
      aiNews.value = parsedNews
    } else {
      console.error('No AI news found')
    }
  }

  /**
   * Set the maximum number of tokens for the AI model
   * @param tokens
   */
  const setMaxTokens = (tokens: number) => {
    if (tokens > MAX_TOKENS) {
      console.warn('Exceeded maximum tokens')
      return
    }

    maxTokens.value = tokens
  }

  /**
   * Set the maximum number of news items to summarize
   * @param items
   */
  const setMaxItems = (items: number) => {
    maxItems.value = items
  }

  /**
   * Set the news categories to fetch
   * @param categories
   */
  const setCategories = (categories?: string[]) => {
    if (!categories) {
      return
    }

    newsCategories.value = categories
  }


  return { aiNews, setMaxTokens, setMaxItems, setCategories, summarizeNews }
}
