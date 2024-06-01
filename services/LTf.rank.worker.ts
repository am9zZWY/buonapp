import { getLTfDocumentRanking } from '~/utils/ltf/getLTfDocumentRanking'

self.onmessage = async (event) => {
  console.log('LTf.rank.worker.ts', event.data)
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

        const sorting = await getLTfDocumentRanking(data, progressCallback)
        self.postMessage({ type: 'finished', data: sorting })
      } catch (error) {
        console.error('Error in LTf.rank.worker.ts', error)
        self.postMessage({ type: 'error', error })
      }
      break
    default:
      console.error('Unknown message type in LTf.rank.worker.ts', workerData.type)
      break
  }
}
