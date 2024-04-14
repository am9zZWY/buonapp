import { Recipe } from '~/types/recipe'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { name, ingredients, steps, tags } = JSON.parse(body) as Recipe

  if (!name || !ingredients || !steps || !tags) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Missing required fields'
    })
  }

  const recipe = {
    name,
    ingredients,
    steps,
    tags
  }

  // Save recipe to database
  await saveRecipe(recipe)

  // Send recipe data
  setStatusCode(event, 201)
  return `Recipe added: ${name}`
})

const saveRecipe = async (recipe: Recipe) => {
  // Save recipe to database
  console.debug('Saving recipe:', recipe)

  // Simulate saving to database
  await new Promise((resolve) => setTimeout(resolve, 1000))

  console.debug('Recipe saved:', recipe)
}
