import { getLTfSummary } from '~/utils/getLTfSummary'

self.onmessage = async (event) => {
  const workerData = event.data
  const data = workerData.data
  switch (workerData.type) {
    case 'summarize':
      try {
        const progressCallback = (status: string) => {
          self.postMessage({ type: 'progress', status })
        }

        const news = data as string[]
        const summaries = await Promise.all(news.map(n => getLTfSummary(n, progressCallback)))
        self.postMessage({ type: 'summarized', data: summaries })
      } catch (error) {
        self.postMessage({ type: 'error', error })
      }
      break
    default:
      break
  }
}
