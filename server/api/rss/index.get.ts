import { parseXml } from '@rgrove/parse-xml'
import { Rss } from '~/types/rss'

const news_urls = [
  'https://www.ansa.it/sito/notizie/topnews/topnews_rss.xml',
  'https://www.tagesschau.de/xml/rss2',
  'https://www.aljazeera.com/xml/rss/all.xml',
]

async function getNewsFeed() {
  const requests = news_urls.map(url =>
    fetch(url)
      .then(response => response.text())
      .then((data: string) => {
        const document = parseXml(data)
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

export default defineEventHandler(async (event) => {
  return getNewsFeed()
})
