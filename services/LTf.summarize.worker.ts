import { getLTfSummary } from '~/utils/ltf/getLTfSummary'

self.onmessage = async (event) => {
  const workerData = event.data
  const data = workerData.data
  switch (workerData.type) {
    case 'init':
      self.postMessage({ type: 'ready' })
      break
    case 'data':
      try {
        const progressCallback = (status: string) => {
          self.postMessage({ type: 'progress', status })
        }

        console.log('data', data)

        const text = data as string[]
        const summaries = await Promise.all(text.map(n => getLTfSummary(n, progressCallback)))
        self.postMessage({ type: 'finished', data: summaries })
      } catch (error) {
        self.postMessage({ type: 'error', error })
      }
      break
    default:
      break
  }
}
