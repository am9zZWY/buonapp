import { defineStore } from 'pinia'
import { ref } from 'vue'

type Weather = {
  location: string,
  temperature: number,
  weather: string,
  lastUpdated: string
}

export const useWeatherStore = defineStore('weather', () => {
  const weather = ref({
    location: 'Posada, Italy',
    temperature: 20,
    weather: 'sunny',
    lastUpdated: '2021-09-01 12:00'
  })

  const fetchWeather = async (location?: string) => {
    console.log('Fetching weather data for:', location ?? weather.value.location)
    const data = await $fetch<Weather>('/api/weather/' + (location ?? weather.value.location))

    if (!data) {
      console.warn('Failed to fetch weather data')
      return
    }

    console.log('Fetched weather data:', data)
    weather.value.location = data.location
    weather.value.temperature = data.temperature
    weather.value.weather = data.weather
    weather.value.lastUpdated = data.lastUpdated
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
