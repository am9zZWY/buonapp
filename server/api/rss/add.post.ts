import { MelaRecipe } from '~/types/melaRecipe'

export default defineEventHandler(async (event) => {
  const recipe = await readBody<MelaRecipe>(event)

  if (!recipe.name || !recipe.ingredients || !recipe.instructions) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Missing required fields'
    })
  }

  // Save recipe to database
  await saveRecipe(recipe)

  // Send recipe data
  setResponseStatus(event, 201)
  return `Recipe added: ${recipe.name}`
})

const saveRecipe = async (recipe: MelaRecipe) => {
  // Save recipe to database
  console.debug('Saving recipe:', recipe)

  // Simulate saving to database
  await new Promise((resolve) => setTimeout(resolve, 1000))

  console.debug('Recipe saved:', recipe)
}
