import OpenAI from 'openai'
import type { AiNews, RssNews } from '~/types/news'
import useRssNews from '~/composables/useRssNews'
import { ref } from 'vue'

const MAX_TOKENS: number = 50

const STOP_WORDS = [
  'a', 'an', 'and', 'are', 'as', 'at', 'be', 'by', 'for', 'from', 'has', 'he', 'in', 'is', 'it', 'its', 'of', 'on', 'that', 'the', 'to', 'was', 'were', 'will', 'with', 'yet', // English
  'der', 'die', 'das', 'ein', 'eine', 'einer', 'einem', 'einen', 'eines', 'und', 'oder', 'aber', 'denn', 'weil', 'wenn', 'als', 'wie', 'dass', 'daß', 'denn', 'doch', 'nicht', 'nur', 'auch', 'sowie', 'sowohl', 'sogar', 'sondern' // German
]

/**
 * Clean up a string by removing HTML tags, URLs, punctuation, and truncating it
 * @param str
 * @param maxLength
 */
const cleanUpString = (str: string, maxLength?: number): string => {
  let cleanedStr = str

  // Remove HTML tags
  cleanedStr = cleanedStr.replace(/<[^>]*>/g, '')

  // Remove URLs
  cleanedStr = cleanedStr.replace(/https?:\/\/\S+/g, '')

  // Remove stop words
  const stopWordsPattern = new RegExp(`\\b(${STOP_WORDS.join('|')})\\b`, 'gi')
  cleanedStr = cleanedStr.replace(stopWordsPattern, '')

  // Remove punctuation and special characters
  cleanedStr = cleanedStr.replace(/[.,/#?!$%^&*;:{}=|+\[\]\-_`~()]/g, '')

  // Replace multiple spaces with a single space and trim leading/trailing spaces
  cleanedStr = cleanedStr.replace(/\s+/g, ' ').trim()

  // Truncate the string if it exceeds maxLength
  if (maxLength && cleanedStr.length > maxLength) {
    cleanedStr = cleanedStr.substring(0, maxLength).trim() + '...'
  }

  return cleanedStr
}


/**
 * Parse news summaries from a string
 * @param summaries
 */
const parseAndClean = (summaries?: string): AiNews[] => {
  if (!summaries) {
    return []
  }

  return summaries
    .split(/(?:\d+\.\s*(?=[A-Z]))|(?:\d\.?$)|(?:\-\s(?=[A-Z]))/g)  // Split using the regex pattern
    .map(summary =>
      summary.trim()
        .replace(/\n/g, ' ')
        .replace(/[/#!$%^&*;:{}=\-_`~()]+$/g, ''))
    .filter(summary => summary && summary.trim().split(' ').length > 3)
}


/**
 * Fetch the most important news from RSS feeds and summarize them
 * using OpenAI's GPT-3.5 model
 * @param openaiApiKey OpenAI API key
 */
export default async function(openaiApiKey: string) {
  const aiNews = ref<AiNews[]>([])

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
    .from(new Set(rssNews.rssNews.value))
    .map((item: RssNews) =>
      `${cleanUpString(item.title, 30)}: ${cleanUpString(item.description, 30)}`
    )
    .join('\n')
  console.debug('Cleaned up RSS News feed:', newsFeed)

  /**
   * Fetch the most important news from RSS feeds and summarize them
   * using OpenAI's GPT-3.5 model
   */
  const summarizeNews = async () => {
    const strCategories = newsCategories.value
      .slice(0, newsCategories.value.length - 1)
      .join(', ') + ' and ' + newsCategories.value[newsCategories.value.length - 1]

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
    console.log('AI news:', gptAiNews)

    // Parse the news summaries
    const parsedNews = parseAndClean(gptAiNews)

    if (gptAiNews) {
      aiNews.value = parsedNews
    } else {
      console.error('Error fetching AI news')
    }
  }

  /**
   * Set the maximum number of tokens for the AI model
   * @param tokens
   */
  const setMaxTokens = (tokens: number) => {
    if (tokens > MAX_TOKENS) {
      console.error('Max tokens cannot exceed ' + MAX_TOKENS)
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
