export interface News {
  text: string,
}

/**
 * RSS news type
 */
export interface RssNews extends News {
  title: string,
  encoded: string,
  pubDate: string,
  link: string,
}

/**
 * GPT news type
 */
export interface GptNews extends News {
}

/**
 * Transformer type
 */
export interface LTfNews extends News {
  source: string,
}
