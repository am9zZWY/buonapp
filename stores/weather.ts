import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Weather } from '~/types/weather'

const localStorage = import.meta.server ? null : window.localStorage

export const useWeatherStore = defineStore('weather', () => {
  const weather = ref({
    location: 'Posada, Italy',
    temperature: 20,
    weather: 'Sunny',
    lastUpdated: '5/12/2021 10:00:00'
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

    weather.value.location = location.split(',')[0].trim()
    localStorage?.setItem('location', location)

    console.log('Changed location to: ' + location)
    fetchWeather(weather.value.location)
  }

  // Fetch weather data on startup
  const locationFromStorage = localStorage?.getItem('location')
  if (locationFromStorage) {
    weather.value.location = locationFromStorage
  }
  fetchWeather()

  return {
    weather,
    updateLocation
  }
})
