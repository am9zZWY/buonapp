import useRss from '~/composables/useRssNews'

export default defineEventHandler(async (event) => {
  const rss = useRss()

  return (await rss).rssNews.value
})
