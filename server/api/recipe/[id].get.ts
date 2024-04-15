import { Recipe } from '~/types/recipe'

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

  const recipes: Recipe[] = [
    {
      id: '1',
      name: 'Spaghetti Carbonara',
      text: 'A classic Italian pasta dish',
      ingredients: 'Spaghetti\nPancetta\nEggs\nParmesan cheese\nBlack pepper',
      instructions: '1. Cook spaghetti\n2. Fry pancetta\n3. Mix eggs, cheese, and pepper\n4. Combine everything\n5. Serve',
      yield: '4 servings',
      prepTime: '10 minutes',
      cookTime: '20 minutes',
      totalTime: '30 minutes',
      link: 'https://en.wikipedia.org/wiki/Carbonara',
      notes: 'Be careful not to scramble the eggs'
    }
  ]

  return recipes
}
