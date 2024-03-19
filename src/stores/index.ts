import {ref} from 'vue'
import {defineStore} from 'pinia'

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

type Todo = {
    title: string
    description?: string
    completed: boolean
    createdDate: Date
    dueDate?: Date | undefined
    priority: 'low' | 'medium' | 'high'
}

export const todoStore = defineStore('todo', () => {
    const todos = ref<Map<string, Todo>>(new Map())

    function addTodo(title: string, dueDate: Date, description: string = '', priority: 'low' | 'medium' | 'high' = 'medium') {
        const createdDate = new Date()
        const id = createdDate.getTime().toString()

        todos.value.set(id, {
            title,
            description,
            completed: false,
            createdDate,
            dueDate,
            priority
        })
    }

    function removeTodo(id: string): boolean {
        return todos.value.delete(id)
    }

    return {todos, addTodo, removeTodo}
})
