/**
 * Stop words are common words that are filtered out from text data before or after processing.
 */
const STOP_WORDS = [
  'a', 'an', 'and', 'are', 'as', 'at', 'be', 'by', 'for', 'from', 'has', 'he', 'in', 'is', 'it', 'its', 'of', 'on', 'that', 'the', 'to', 'was', 'were', 'will', 'with', 'yet', // English
  'der', 'die', 'das', 'ein', 'eine', 'einer', 'einem', 'einen', 'eines', 'und', 'oder', 'aber', 'denn', 'weil', 'wenn', 'als', 'wie', 'dass', 'daß', 'denn', 'doch', 'nicht', 'nur', 'auch', 'sowie', 'sowohl', 'sogar', 'sondern' // German
]

/**
 * Clean up a string by removing HTML tags, URLs, punctuation, and truncating it
 * @param str
 * @param maxLength
 */
export function cleanString(str: string, maxLength?: number): string {
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
