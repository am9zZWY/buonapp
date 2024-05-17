import type { RssNews } from '~/types/news'
import { parseXml, type XmlDocument, type XmlElement } from '@rgrove/parse-xml'

/**
 * Check if an article is recent
 *
 * @param pubDate The publication date of the article
 * @param maxAge The maximum age of the article in days
 */
const isRecentArticle = (pubDate: string, maxAge: number): boolean => {
  const articleDate = new Date(pubDate);
  const currentDate = new Date();

  // Set the time part to zero to compare only the date
  currentDate.setHours(0, 0, 0, 0);
  articleDate.setHours(0, 0, 0, 0);

  // Calculate the date maxAge days ago
  const maxAgeDate = new Date(currentDate);
  maxAgeDate.setDate(currentDate.getDate() - maxAge);

  return articleDate >= maxAgeDate;
};


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

        if (!document || !document.children) {
          return []
        }

        const rssNode = document.children.find(node => node.type === 'element' && node.name === 'rss') as XmlElement
        if (!rssNode || !rssNode.children) {
          return []
        }

        const channelNode = rssNode.children.find(node => node.type === 'element' && node.name === 'channel') as XmlElement
        if (!channelNode || !channelNode.children) {
          return []
        }

        const items = channelNode.children.filter(node => node.type === 'element' && node.name === 'item') as XmlElement[]
        if (!items) {
          return []
        }

        // Extract the relevant information from the XML data
        return items
          .map(item => {
            const pubDate = item.children.find(node => node.name === 'pubDate')?.children[0]?.text
            const title = item.children.find(node => node.name === 'title')?.children[0]?.text
            const link = item.children.find(node => node.name === 'link')?.children[0]?.text
            const description = item.children.find(node => node.name === 'description')?.children[0]?.text
            const origin = url
            return { title, link, description, pubDate, origin }
          })
          .filter((item: RssNews) => item.pubDate && isRecentArticle(item.pubDate, maxAge)) as RssNews[]
      }
    ))
    // Flatten the result matrix
    .then(results => results.flat())
    // Sort by publication date
    .then(data => data.toSorted((a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime()))
}
