/**
 * Thanks to the Jina team for providing the code for the Local Transformers text classification pipeline
 * Thanks to @xenova for the transformers package
 *
 * https://huggingface.co/jinaai/jina-reranker-v1-tiny-en
 */

import type { PreTrainedTokenizer } from '@xenova/transformers'
import { AutoModelForSequenceClassification, AutoTokenizer } from '@xenova/transformers'

const model_id = 'jinaai/jina-reranker-v1-tiny-en'
let ranker: AutoModelForSequenceClassification
let tokenizer: PreTrainedTokenizer

/**
 * Get the Local Transformers text classification pipeline
 * @param progress_callback
 */
async function getRanker(progress_callback?: (status: string) => void) {
  if (!ranker) {
    tokenizer = await AutoTokenizer
      .from_pretrained(model_id)
    ranker = await AutoModelForSequenceClassification
      .from_pretrained(model_id, {
        quantized: false,
        progress_callback
      })
  }
  return ranker
}

export interface LTfDocumentRanking {
  corpus_id: number,
  score: number,
  text: string
}

/**
 * Sorts texts based on their importance using the Local Transformers text classification pipeline
 * @param data an object containing the query and the data to be ranked
 * @param progress_callback a callback function to report progress
 */
export async function getLTfDocumentRanking(data: {
  query: string,
  documents: string[]
}, progress_callback?: (status: string) => void): Promise<LTfDocumentRanking[]> {
  console.log('Ranking data:', data)
  const ranker = await getRanker(progress_callback)
  const { query, documents } = data
  const { top_k, return_documents } = { top_k: 5, return_documents: true }

  const inputs = tokenizer(
    new Array(documents.length).fill(query),
    { text_pair: documents, padding: true, truncation: true }
  )

  const { logits } = await ranker(inputs)
  const results: LTfDocumentRanking[] = logits
    .sigmoid()
    .tolist()
    .map(([score], i: number) => ({
      corpus_id: i,
      score,
      ...(return_documents ? { text: documents[i] } : {})
    }))
    .sort((a: { score: number }, b: { score: number }) => b.score - a.score)
    .slice(0, top_k)

  console.log('Sorted documents:', results)

  return results
}
