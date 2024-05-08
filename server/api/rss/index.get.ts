import type { XmlDocument } from '@rgrove/parse-xml'
import { parseXml } from '@rgrove/parse-xml'
import type { Rss } from '~/types/rss'
import OpenAI from 'openai'
import type { NitroRuntimeConfig } from 'nitropack'

const news_urls = [
  'https://www.ansa.it/sito/notizie/topnews/topnews_rss.xml',
  'https://www.tagesschau.de/xml/rss2',
  'https://www.aljazeera.com/xml/rss/all.xml'
]

/**
 * Get news feed from multiple sources
 * @returns {Promise<Rss[]>} List of news items
 */
async function getNewsFeed(): Promise<Rss[]> {
  const requests = news_urls.map(url =>
    fetch(url)
      .then(response => response.text())
      .then((data: string) => {
        const document: XmlDocument = parseXml(data)
        if (!document) {
          return []
        }
        const items = document.children.find(node => node.name === 'rss')
          .children.find(node => node.name === 'channel')
          .children.filter(node => node.name === 'item')

        return items.map(item => {
          const title = item.children.find(node => node.name === 'title')?.children[0]?.text
          const link = item.children.find(node => node.name === 'link')?.children[0]?.text
          const description = item.children.find(node => node.name === 'description')?.children[0]?.text
          const pubDate = item.children.find(node => node.name === 'pubDate')?.children[0]?.text
          return { title, link, description, pubDate }
        }) as Rss[]
      })
  )
  return Promise.all(requests)
    // Flatten results
    .then(results => results.flat())
    // Sort by publication date
    .then(data => data.toSorted((a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime()))
}

async function getCompactNewsFeed(): Promise<string> {
  return getNewsFeed()
    .then(news => news.map(item => `${item.title}\n${item.description}`).join('\n\n'))
}

export default defineEventHandler(async (event) => {
  const config: NitroRuntimeConfig = useRuntimeConfig(event)
  const { openaiApiKey } = config
  if (!openaiApiKey) {
    throw createError({
      statusCode: 500,
      statusMessage: 'OpenAI API key not provided'
    })
  }

  const openai = new OpenAI({ apiKey: openaiApiKey })

  const completion = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo-instruct',
    messages: [
      { role: 'system', content: 'You are a helpful assistant.' },
      { role: 'user', content: 'What is the summary of the latest news in 3 sentences?' },
      { role: 'system', content: await getCompactNewsFeed() }
    ],
    max_tokens: 100,
    n: 1,
    stop: ['\n'],
    temperature: 0.5
  })

  return completion.choices[0].message.content
})
