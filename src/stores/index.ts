import {ref} from 'vue'
import {defineStore} from 'pinia'

type Weather = {
    location: string,
    temperature: number,
    weather: string,
    lastUpdated: string
}

export const useWeatherStore = defineStore('weather', () => {
    const weather = ref<Weather>({
        location: 'Posada, Italy',
        temperature: 20,
        weather: 'sunny',
        lastUpdated: '2021-09-01 12:00'
    })

    const dateToLocaleString = (date: number) => {
        return new Date(date * 1000).toLocaleString().replace(',', '').slice(0, -3)
    }

    const fetchWeather = async (location?: string) => {
        fetch(`https://api.weatherapi.com/v
1/current.json?key=ed0259613b1d44d387890933241204&q=${location ?? weather.value.location}`)
            .then((response) => response.json())
            .then((data) => {
                weather.value.location = `${data.location.name}, ${data.location.country}`
                weather.value.temperature = data.current.temp_c
                weather.value.weather = data.current.condition.text
                weather.value.lastUpdated = dateToLocaleString(data.current.last_updated_epoch)
            })
    }

    const updateLocation = (location: string | null) => {
        if (!location) {
            console.warn('No location provided')
            return
        }

        weather.value.location = location
        console.log('Changed location to: ' + location)
        fetchWeather(weather.value.location)
    }

    fetchWeather()

    return {
        weather,
        updateLocation
    }
})

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
