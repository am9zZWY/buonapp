import { pipeline, type SummarizationPipeline } from '@xenova/transformers'
import type { GenerationConfigType } from '@xenova/transformers/types/utils/generation'

let generator: SummarizationPipeline
const model = 'Xenova/LaMini-Flan-T5-783M'


/**
 * Get the Local Transformers summarization pipeline
 * @param progress_callback
 */
async function getGenerator(progress_callback?: (status: string) => void): Promise<SummarizationPipeline> {
  if (!generator) {
    generator = await pipeline('summarization', model, {
      quantized: true,
      progress_callback
    })
  }
  return generator
}

/**
 * Get a summary of the given text using the Local Transformers summarization pipeline
 * @param texts the text to summarize
 * @param progress_callback a callback function to report progress
 */
export async function getLTfSorting(texts: string[], progress_callback?: (status: string) => void): Promise<string[]> {
  const generator = await getGenerator(progress_callback)

  const config: GenerationConfigType = {
    max_time: 25
  }

  const sortingPrompt = 'Sort the following items in order of importance:'
  const input = sortingPrompt + '\n' + texts.join('\n')

  const output = await generator(input, config)

  console.log('output', output)

  return texts
}
