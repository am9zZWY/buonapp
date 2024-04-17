export default defineEventHandler(async (event) => {
  return [
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
})