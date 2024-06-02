/**
 * Thanks to the Jina team for providing the code for the Local Transformers text classification pipeline
 * Thanks to @xenova for the transformers package
 *
 * https://huggingface.co/jinaai/jina-reranker-v1-tiny-en
 */

import { AutoModelForSequenceClassification, AutoTokenizer } from '@xenova/transformers'

const model_id = 'jinaai/jina-reranker-v1-tiny-en'
let ranker
let tokenizer

/**
 * Get the Local Transformers text classification pipeline
 * @param progress_callback
 */
async function getRanker(progress_callback) {
  if (!ranker) {
    tokenizer = await AutoTokenizer.from_pretrained(model_id)
    ranker = await AutoModelForSequenceClassification.from_pretrained(model_id, {
      quantized: false,
      progress_callback
    })
  }
  return ranker
}

/**
 * Sorts texts based on their importance using the Local Transformers text classification pipeline
 * @param data an object containing the query and the data to be ranked
 * @param progress_callback a callback function to report progress
 */
async function getLTfDocumentRanking(data, progress_callback) {
  console.log('Ranking data:', data)
  const ranker = await getRanker(progress_callback)
  const { query, documents } = data
  const { top_k, return_documents } = { top_k: 5, return_documents: true }

  const inputs = tokenizer(
    new Array(documents.length).fill(query),
    { text_pair: documents, padding: true, truncation: true }
  )

  const { logits } = await ranker(inputs)
  const results = logits
    .sigmoid()
    .tolist()
    .map((score, i) => ({
      corpus_id: i,
      score,
      ...(return_documents ? { text: documents[i] } : {})
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, top_k)

  console.log('Sorted documents:', results)

  return results
}

self.addEventListener('message', async (event) => {
  console.log('LTf.rank.worker.ts', event.data)
  const workerData = event.data
  const data = workerData.data
  switch (workerData.type) {
    case 'init':
      self.postMessage({ type: 'ready' })
      break
    case 'data':
      try {
        const progressCallback = (status) => {
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
});
