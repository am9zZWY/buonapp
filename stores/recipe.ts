import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { MelaRecipe } from '~/types/melaRecipe'

const localStorage = import.meta.server ? null : window.localStorage

export const useRecipeStore = defineStore('recipeList', () => {
  const recipeMap = ref<Record<string, MelaRecipe>>()
  const recipeList = computed(() => Object.values(recipeMap.value ?? {}))

  const prepareStore = async () => {
    // Fetch recipes from server
    const serverRecipes = await $fetch<MelaRecipe[]>('/api/recipe/list')

    if (!serverRecipes) {
      console.warn('Failed to fetch recipes from server')
    } else {
      console.log('Fetched recipes:', serverRecipes)
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
        console.log('Merged local recipe:', localRecipe)
      })
    }
  }

  const saveRecipe = async (recipe: MelaRecipe) => {
    if (!recipe.id) {
      // Generate a new id
      recipe.id = Math.random().toString(36).slice(2, 5)
    }

    $fetch('/api/recipe/save', {
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

  prepareStore()

  return { recipeList, recipeMap, saveRecipe }
})
