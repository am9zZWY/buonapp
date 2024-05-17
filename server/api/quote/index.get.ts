import type { QuotableQuote, Quote } from '~/types/quote'



export default defineEventHandler(async (event) => {
  return $fetch<QuotableQuote[]>('https://api.quotable.io/quotes/random?tags=wisdom|friendship|life|love|success')
    .then((data: QuotableQuote[]) => {
      const quote = data[0]

      return {
        quote: quote.content,
        author: quote.author,
      } as Quote
    })
})
