import { getLTfSorting } from '~/utils/ltf/getLTfSorting'

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

        const texts = data as string[]
        const sorting = await getLTfSorting(texts, progressCallback)
        self.postMessage({ type: 'finished', data: sorting })
      } catch (error) {
        self.postMessage({ type: 'error', error })
      }
      break
    default:
      break
  }
}
