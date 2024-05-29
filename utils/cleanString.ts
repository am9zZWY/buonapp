/**
 * Stop words are common words that are filtered out from text data before or after processing.
 */
const STOP_WORDS = [
  'a', 'an', 'and', 'are', 'as', 'at', 'be', 'by', 'for', 'from', 'has', 'he', 'in', 'is', 'it', 'its', 'of', 'on', 'that', 'the', 'to', 'was', 'were', 'will', 'with', 'yet', // English
  'der', 'die', 'das', 'ein', 'eine', 'einer', 'einem', 'einen', 'eines', 'und', 'oder', 'aber', 'denn', 'weil', 'wenn', 'als', 'wie', 'dass', 'daß', 'denn', 'doch', 'nicht', 'nur', 'auch', 'sowie', 'sowohl', 'sogar', 'sondern' // German
]

export interface CleanStringOptions {
  maxLength?: number
  stripStopwords?: boolean,
  stripPunctuation?: string | boolean
}

/**
 * Options for cleaning a string
 *
 * @param str The string to clean
 * @param maxLength The maximum length of the string
 * @param includeStopWords If true, stop words are not removed
 */
export const DEFAULT_CLEAN_STRING_OPTIONS: CleanStringOptions = {
  maxLength: undefined,
  stripStopwords: false,
  stripPunctuation: '.,/#?!$%^&*;:{}=|+\[\]\-_`~()'
}

/**
 * Clean up a string by removing HTML tags, URLs, punctuation, and truncating it
 * @param str The string to clean
 * @param options Options for cleaning the string
 */
export function cleanString(str: string, options: CleanStringOptions = DEFAULT_CLEAN_STRING_OPTIONS): string {
  const { maxLength, stripStopwords = false, stripPunctuation = '' } = options

  let cleanedStr = str
  if (!cleanedStr) {
    console.warn('Empty string')
    return ''
  }

  // Remove HTML tags
  cleanedStr = cleanedStr.replace(/<[^>]*>/g, '')

  // Remove URLs
  cleanedStr = cleanedStr.replace(/https?:\/\/\S+/g, '')

  // Remove stop words
  if (!stripStopwords) {
    const stopWordsPattern = new RegExp(`\\b(${STOP_WORDS.join('|')})\\b`, 'gi')
    cleanedStr = cleanedStr.replace(stopWordsPattern, '')
  }

  // Remove &#8230, &hellip;, and similar
  cleanedStr = cleanedStr.replace(/&[#\w]+;/g, '')

  // Remove punctuation and special characters
  if (stripPunctuation) {
    cleanedStr = cleanedStr.replace(new RegExp(`[${stripPunctuation}]`, 'g'), '')
  }

  // Replace multiple spaces with a single space and trim leading/trailing spaces
  cleanedStr = cleanedStr.replace(/\s+/g, ' ').trim()

  // Truncate the string if it exceeds maxLength
  if (maxLength && cleanedStr.length > maxLength) {
    cleanedStr = cleanedStr.substring(0, maxLength).trim() + '...'
  }

  return cleanedStr
}
