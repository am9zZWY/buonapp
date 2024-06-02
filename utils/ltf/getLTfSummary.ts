import { pipeline, type SummarizationPipeline } from '@xenova/transformers'
import type { GenerationConfigType } from '@xenova/transformers/types/utils/generation'

let generator: SummarizationPipeline
const model = 'Xenova/distilbart-xsum-12-1'
const task = 'summarization'

/**
 * Get the Local Transformers summarization pipeline
 * @param progress_callback
 */
async function getGenerator(progress_callback?: (status: string) => void): Promise<SummarizationPipeline> {
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
export async function getLTfSummary(text: string, progress_callback?: (status: string) => void): Promise<string> {
  const generator = await getGenerator(progress_callback)

  const config: GenerationConfigType = {
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
    return output[0].summary_text as string
  } else if ('summary_text' in output) {
    return output.summary_text as string
  }

  throw new Error('Unexpected output format from summarization pipeline')
}
