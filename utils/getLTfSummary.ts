import { pipeline, type SummarizationPipeline } from '@xenova/transformers'
import type { GenerationConfigType } from '@xenova/transformers/types/utils/generation'

let generator: SummarizationPipeline

async function getGenerator(progress_callback?: (status: string) => void): Promise<SummarizationPipeline> {
  if (!generator) {
    generator = await pipeline('summarization', 'Xenova/distilbart-xsum-12-6', {
      quantized: true,
      progress_callback
    })
  }
  return generator
}

export async function getLTfSummary(news: string, progress_callback?: (status: string) => void): Promise<string> {
  const generator = await getGenerator(progress_callback)

  const config: GenerationConfigType = {
    max_length: 25,
    min_length: 10,
    do_sample: true,
    early_stopping: false,
    length_penalty: -10.0,
    top_k: 50,
    top_p: 0.95,
    temperature: 0.4,
    num_return_sequences: 1,
    max_time: 25
  }

  const output = await generator(news, config)

  if (Array.isArray(output) && output.length > 0 && 'summary_text' in output[0]) {
    return output[0].summary_text as string
  } else if ('summary_text' in output) {
    return output.summary_text as string
  }

  throw new Error('Unexpected output format from summarization pipeline')
}
