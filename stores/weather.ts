import { defineStore } from 'pinia'
import type { Weather } from '~/types/weather'

const localStorage = import.meta.server ? null : window.localStorage


export const useWeatherStore = defineStore('weather', () => {
  const weather = useState('weather', () => ({
    location: 'Posada, Italy',
    temperature: 20,
    weather: 'Sunny',
    lastUpdated: '5/12/2021 10:00:00'
  }))

  const fetchWeather = async (location?: string) => {
    console.info('Fetching weather data for:', location ?? weather.value.location)
    const data = await $fetch<Weather>('/api/weather/' + (location ?? weather.value.location))

    if (!data) {
      console.warn('Failed to fetch weather data')
      return
    }

    console.info('Weather data:', data)
    weather.value.location = data.location
    weather.value.temperature = data.temperature
    weather.value.weather = data.weather
    weather.value.lastUpdated = data.lastUpdated
  }
  fetchWeather()

  const updateLocation = (location: string | null) => {
    if (!location) {
      console.warn('Location is empty')
      return
    }

    weather.value.location = location.split(',')[0].trim()
    localStorage?.setItem('location', location)

    console.info('Updating location:', weather.value.location)
    fetchWeather(weather.value.location)
  }

  // Fetch weather data on startup
  const locationFromStorage = localStorage?.getItem('location')
  if (locationFromStorage) {
    weather.value.location = locationFromStorage
  }


  return {
    weather,
    updateLocation
  }
})
