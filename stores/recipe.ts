import { defineStore } from 'pinia'
import type { MelaRecipe } from '~/types/melaRecipe'
import { getDailyElement } from '~/utils/getDailyElement'

const localStorage = import.meta.server ? null : window.localStorage

export const useRecipeStore = defineStore('recipeList', () => {
  const recipeMap = useState('recipes', () => ({} as Record<string, MelaRecipe>))
  const recipeList = computed(() => Object.values(recipeMap.value ?? {}))
  const recipeOfTheDay = computed(() => getDailyElement(recipeList.value))

  const prepareStore = async () => {
    // Fetch recipes from server
    const serverRecipes = await $fetch<MelaRecipe[]>('/api/recipe/get/list')

    if (!serverRecipes) {
      console.warn('Failed to fetch recipes from server')
    } else {
      console.info('Fetched recipes:', serverRecipes)
      recipeMap.value = serverRecipes.reduce((acc, recipe) => {
        acc[recipe.id] = recipe
        return acc
      }, {} as Record<string, MelaRecipe>)
    }

    // Get recipes from local storage
    const localRecipes = localStorage?.getItem('recipeList')
    if (localRecipes) {
      const parsedLocalRecipes = JSON.parse(localRecipes) as MelaRecipe[]

      // Merge local recipes with server recipes
      parsedLocalRecipes.forEach(localRecipe => {
        // Overwrite server recipes with local recipes
        recipeMap.value![localRecipe.id] = localRecipe
        console.info('Merged local recipe:', localRecipe)
      })
    }
  }

  const saveRecipe = async (recipe: MelaRecipe) => {
    if (!recipe.id) {
      // Generate a new id
      recipe.id = Math.random().toString(36).slice(2, 5)
    }

    await $fetch('/api/recipe/add/save', {
      method: 'POST',
      body: JSON.stringify(recipe)
    })

    // Check if recipe already exists
    if (recipeMap.value![recipe.id]) {
      console.warn('Recipe already exists:', recipe)
    }

    // Save to store
    recipeMap.value![recipe.id] = recipe

    // Save to localStore
    localStorage?.setItem('recipeList', JSON.stringify(recipeList.value))

    // Return the recipe id
    return recipe.id
  }

  const removeRecipe = async (recipeId: string) => {
    /* await $fetch('/api/recipe/remove', {
      method: 'POST',
      body: JSON.stringify(recipeId)
    }) */

    // Remove from store
    // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
    delete recipeMap.value![recipeId]

    // Save to localStore
    localStorage?.setItem('recipeList', JSON.stringify(recipeList.value))
  }

  prepareStore()

  return { recipeList, recipeMap, recipeOfTheDay, saveRecipe, removeRecipe }
})
