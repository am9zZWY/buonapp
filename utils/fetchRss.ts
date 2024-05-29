import type { RssNews } from '~/types/news'
import { parseXml, type XmlDocument, type XmlElement } from '@rgrove/parse-xml'

/**
 * Check if an article is recent
 *
 * @param pubDate The publication date of the article
 * @param maxAge The maximum age of the article in days
 */
const isRecentArticle = (pubDate: string, maxAge: number): boolean => {
  const articleDate = new Date(pubDate)
  const currentDate = new Date()

  // Set the time part to zero to compare only the date
  currentDate.setHours(0, 0, 0, 0)
  articleDate.setHours(0, 0, 0, 0)

  // Calculate the date maxAge days ago
  const maxAgeDate = new Date(currentDate)
  maxAgeDate.setDate(currentDate.getDate() - maxAge)

  return articleDate >= maxAgeDate
}


const getChildren = (node: XmlDocument | XmlElement, name: string) => {
  return node.children.filter(node => node.type === 'element' && node.name === name)
}

/**
 * Fetch the news from the given RSS feeds
 * @param newsUrls
 * @param maxAge
 */
export async function fetchRss(newsUrls: string[], maxAge: number = 2): Promise<RssNews[]> {
  return Promise.all(
    // Fetch each url separately
    newsUrls.map(async url => {
        const data = await fetch(url).then(res => res.text())

        // Use parseXML from rgrove to parse the XML data
        const document: XmlDocument = parseXml(data)

      const root = getChildren(document, 'rss')[0] as XmlElement
      const channel = getChildren(root, 'channel')[0] as XmlElement

      const items = getChildren(channel, 'item') as XmlElement[]
        if (!items) {
          return []
        }

        // Extract the relevant information from the XML data
      const newsItems = items
          .map(item => {
            const pubDate = item.children.find(node => node.name === 'pubDate')?.children[0]?.text
            const title = item.children.find(node => node.name === 'title')?.children[0]?.text
            const link = item.children.find(node => node.name === 'link')?.children[0]?.text
            const text = item.children.find(node => node.name === 'description')?.children[0]?.text
            const origin = url
            return { title, link, text, pubDate, origin } as RssNews
          })

      // Filter out articles that are older than maxAge
      const newsItemsAfterPubDateCheck = newsItems.filter((item: RssNews) => item.pubDate && isRecentArticle(item.pubDate, maxAge))

      // If no recent news is found, return all news items
      if (newsItemsAfterPubDateCheck.length === 0 && newsItems.length > 0) {
        console.warn('No recent news found. Returning all news items.')
        return newsItems
      }

      return newsItems
      }
    ))
    // Flatten the result matrix
    .then(results => results.flat())
    // Sort by publication date
    .then(data => data.toSorted((a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime()))
}
