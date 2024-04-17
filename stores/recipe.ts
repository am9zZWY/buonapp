import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { MelaRecipe } from '~/types/melaRecipe'

export const useRecipeStore = defineStore('recipes', () => {
  const recipeList = ref<MelaRecipe[]>()
  const recipeMap = ref<Record<string, MelaRecipe>>()

  const fetchRecipes = async () => {
    const data = await $fetch<MelaRecipe[]>('/api/recipe/1')

    if (!data) {
      console.warn('Failed to fetch recipes')
      return
    }

    console.log('Fetched recipes:', data)
    recipeList.value = data
    recipeMap.value = data.reduce((acc, recipe) => {
      acc[recipe.id] = recipe
      return acc
    }, {} as Record<string, MelaRecipe>)
  }

  fetchRecipes()

  return { recipes: recipeList, recipeMap }
})
