/**
 * Recipe type
 * @typedef {Object} MelaRecipe
 *
 * @description Recipe type for the BuonApp app. It uses the Mela file format.
 *
 * @author https://mela.recipes/fileformat/index.html
 */
export type MelaRecipe = {
  categories?: string // Unique identifier
  cookTime: string
  createdAt?: Date // Description of the recipe
  favorite?: boolean // Array of image URLs, separated by commas
  id: string, // Array of categories, separated by commas
  images?: string, // Yield or serving size
  ingredients: string, // Prep time
  instructions: string, // Cook time
  link: string, // Total time
  name: string, // Ingredients, separated by newlines
  notes: string, // Instructions, separated by newlines
  prepTime: string, // Notes or tips
  tags?: string[], // Any kind of link to the recipe
  text: string, // Whether the recipe is a favorite
  totalTime: string // Array of tags
  yield: string // Date the recipe was created
}

export type Recipe = {
  categories?: string[]
  cookTime: string
  createdAt?: Date
  favorite?: boolean
  id: string
  images?: string[]
  ingredients: string[]
  instructions: {
    step: number
    text: string
  }[]
  link: string
  name: string
  notes: string,
  prepTime: string
  tags?: string[]
  text: string
  totalTime: string
  yield: string
}

export function prepareRecipe(recipe: MelaRecipe): Recipe {
  const images = recipe.images?.split(',')
  const ingredients = recipe.ingredients.split('\n')
  const instructions = recipe.instructions.split('\n').map((instruction, index) => {
    // Check if the instruction includes a step number
    const step = index + 1
    const text = instruction.replace(/^\d+\. /, '')

    return {
      step,
      text
    }
  })

  return {
    categories: recipe.categories?.split(','),
    cookTime: recipe.cookTime,
    createdAt: recipe.createdAt,
    favorite: recipe.favorite,
    id: recipe.id,
    images,
    ingredients,
    instructions,
    link: recipe.link,
    name: recipe.name,
    notes: recipe.notes,
    prepTime: recipe.prepTime,
    tags: recipe.tags,
    text: recipe.text,
    totalTime: recipe.totalTime,
    yield: recipe.yield
  }
}
