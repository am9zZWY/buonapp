/**
 * Thanks to @xenova for the transformers package
 *
 * https://github.com/xenova
 */
import { pipeline } from '@xenova/transformers'

let generator
const model = 'Xenova/distilbart-xsum-12-1'
const task = 'summarization'

/**
 * Get the Local Transformers summarization pipeline
 * @param progress_callback
 */
async function getGenerator(progress_callback) {
  if (!generator) {
    generator = await pipeline(task, model, {
      quantized: true,
      progress_callback
    })
  }
  return generator
}

/**
 * Get a summary of the given text using the Local Transformers summarization pipeline
 * @param text the text to summarize
 * @param progress_callback a callback function to report progress
 */
async function getLTfSummary(text, progress_callback) {
  const generator = await getGenerator(progress_callback)

  const config = {
    max_length: 25,
    min_length: 10,
    do_sample: true,
    early_stopping: false,
    temperature: 0.9,
    num_return_sequences: 1,
    max_time: 25,
    top_k: 50,
    top_p: 0.95,
    num_beams: 5,
    length_penalty: -2.0,
    no_repeat_ngram_size: 2
  }

  const output = await generator(text, config)

  if (Array.isArray(output) && output.length > 0 && 'summary_text' in output[0]) {
    return output[0].summary_text
  } else if ('summary_text' in output) {
    return output.summary_text
  }

  throw new Error('Unexpected output format from summarization pipeline')
}

self.addEventListener('message', async (event) => {
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

        console.log('data', data)

        const text = data
        const summaries = await Promise.all(text.map(n => getLTfSummary(n, progressCallback)))
        self.postMessage({ type: 'finished', data: summaries })
      } catch (error) {
        self.postMessage({ type: 'error', error })
      }
      break
    default:
      break
  }
})
