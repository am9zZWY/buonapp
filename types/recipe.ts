/**
 * Recipe type
 * @typedef {Object} Recipe
 *
 * @description Recipe type for the BuonApp app. It uses the Mela file format.
 *
 * @author https://mela.recipes/fileformat/index.html
 */
export type Recipe = {
  id: string // Unique identifier
  name: string
  text: string // Description of the recipe
  images?: string // Array of image URLs, separated by commas
  categories?: string, // Array of categories, separated by commas
  yield: string, // Yield or serving size
  prepTime: string, // Prep time
  cookTime: string, // Cook time
  totalTime: string, // Total time
  ingredients: string, // Ingredients, separated by newlines
  instructions: string, // Instructions, separated by newlines
  notes: string, // Notes or tips
  link: string, // Any kind of link to the recipe
  favorite?: boolean, // Whether the recipe is a favorite
  tags?: string[] // Array of tags
  createdAt?: Date // Date the recipe was created
}

export function recipeToMarkdown(recipe: Recipe): string {
  const tags = recipe.tags ? recipe.tags.join(', ') : ''
  const categories = recipe.categories ? recipe.categories.split(',').map((c) => c.trim()).join(', ') : ''
  const images = recipe.images ? recipe.images.split(',').map((i) => `![${recipe.name}](${i})`).join('\n') : ''
  const notes = recipe.notes ? `## Notes\n${recipe.notes}` : ''
  const link = recipe.link ? `[Link](${recipe.link})` : ''
  const favorite = recipe.favorite ? '⭐' : ''
  const createdAt = recipe.createdAt ? recipe.createdAt.toISOString() : ''
  const instructions = recipe.instructions.split('\n').map((i, idx) => `${idx + 1}. ${i}`).join('\n')
}
