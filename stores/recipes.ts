import {defineStore} from "pinia";
import {ref} from "vue";

type Recipe = {
    id: string
    title: string
    description: string
    ingredients: string[]
    steps: string[]
}

export const useRecipeStore = defineStore('recipes', () => {
    const recipes = ref<Recipe[]>([])
    const BASE_URL = 'https://tastebuddy-1-k6629823.deta.app/'

    // Fetch recipes from the server
    fetch(`${BASE_URL}recipes`).then((response) => {
        if (!response.ok) {
            throw new Error('Network response was not ok')
        }

        return response
    }).then((response) => {
        return response.json()
    }).then((data) => {
        recipes.value = data
    }).catch((error) => {
        console.error('There has been a problem with your fetch operation:', error)
    })

    return {recipes}
})
