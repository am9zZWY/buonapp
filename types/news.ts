/**
 * RSS news type
 */
export type RssNews = {
  title: string,
  link: string,
  description: string,
  pubDate: string,
  origin: string
}

/**
 * AI news type
 * Is alias of string
 */
export type AiNews = string
