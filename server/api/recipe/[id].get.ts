import { Recipe } from '~/server/api/recipe/index'

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')

  // Check if recipe ID is provided
  if (!id) {
    throw createError({
      statusCode: 400,
      statusMessage: 'No recipe ID provided'
    })
  }

  const recipe = await getRecipe(id)
  if (!recipe) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Recipe not found'
    })
  }

  return recipe
})

const getRecipe = async (id: string) => {
  // Fetch recipe from database
  console.debug('Fetching recipe:', id)

  return {
    id,
    name: 'Spaghetti Carbonara',
    description: 'A classic Italian pasta dish',
    ingredients: ['Spaghetti', 'Eggs', 'Pancetta', 'Parmesan cheese', 'Black pepper'],
    steps: ['Cook spaghetti', 'Fry pancetta', 'Mix eggs and cheese', 'Combine everything', 'Serve with pepper']
  } as Recipe
}
