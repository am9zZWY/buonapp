export default defineEventHandler(async (event) => {
  const url = await readBody<string>(event)

  // Check if recipe URL is provided
  if (!url) {
    throw createError({
      statusCode: 400,
      statusMessage: 'No recipe URL provided'
    })
  }

  return await getRecipe(url)
})

function getRecipe(url: string) {
  // Fetch recipe from URL
  console.debug('Fetching recipe:', url)

  return {
    title: 'Recipe title',
    description: 'Recipe description',
    ingredients: ['Ingredient 1', 'Ingredient 2'],
    instructions: ['Instruction 1', 'Instruction 2']
  }
}
