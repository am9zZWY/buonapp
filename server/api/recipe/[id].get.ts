import { MelaRecipe } from '~/types/melaRecipe'

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')

  // Check if recipe ID is provided
  if (!id) {
    throw createError({
      statusCode: 400,
      statusMessage: 'No recipe ID provided'
    })
  }

  /* if (!recipe) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Recipe not found'
    })
  } */

  return await getRecipe(id)
})

const getRecipe = async (id: string) => {
  // Fetch recipe from database
  console.debug('Fetching recipe:', id)

  const recipes: MelaRecipe[] = [
    {
      id: '1',
      name: 'Spaghetti Carbonara',
      text: 'A classic Italian pasta dish',
      images: 'https://source.unsplash.com/800x600/?spaghetti',
      ingredients: '- Spaghetti\n- Pancetta\n- Eggs\n- Parmesan cheese\n- Black pepper',
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
