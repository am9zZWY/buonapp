import { pipeline } from '@xenova/transformers'

export async function getLocalTransformerSummary(news: string): Promise<string> {
  const generator = await pipeline('summarization', 'Xenova/distilbart-cnn-6-6')
  const output = await generator(news, {
    max_new_tokens: 100
  })

  const summary = Array.isArray(output) ? output[0] : output

  // If summarization single output, return it
  if (summary && 'summary_text' in summary) {
    return summary.summary_text
  }

  // If summarization multi output, return the first one
  return summary[0].summary_text
}
