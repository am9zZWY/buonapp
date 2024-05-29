import useLTfNews from '~/composables/news/useLTfNews'

export default defineEventHandler(async (event) => {
  // Fetch the most important news from RSS feeds and summarize them
  return (await useLTfNews()).news.value
})
