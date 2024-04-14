/**
 * Recipe type
 * @typedef {Object} Recipe
 *
 * @description Recipe type for the BuonApp app. It uses the Mela file format.
 *
 * @author https://mela.recipes/fileformat/index.html
 */
export type Recipe = {
  id?: string // ID of the recipe
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
