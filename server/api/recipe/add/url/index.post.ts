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



  return recipes
}
