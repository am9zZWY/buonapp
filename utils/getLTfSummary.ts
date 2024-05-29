import { pipeline, type SummarizationPipeline } from '@xenova/transformers'

let generator: SummarizationPipeline

async function getGenerator() {
  if (!generator) {
    generator = await pipeline('summarization', 'Xenova/distilbart-cnn-6-6')
  }
  return generator
}

export async function getLTfSummary(news: string[]): Promise<string[]> {
  const generator = await getGenerator()

  return await Promise.all(
    news.map(async n => {
      const output = await generator(n, {
        max_length: 60,
        min_length: 30,
        do_sample: false,
        early_stopping: true,
        num_beams: 4,
        length_penalty: -3.0,
        no_repeat_ngram_size: 3,
        top_k: 50,
        top_p: 0.95,
        temperature: 0.3
      })

      if (Array.isArray(output) && output.length > 0 && 'summary_text' in output[0]) {
        return output[0].summary_text as string
      } else if ('summary_text' in output) {
        return output.summary_text as string
      }

      throw new Error('Unexpected output format from summarization pipeline')
    })
  )
}
