import type { WeatherApiResponse } from '~/types/weather'
import type { NitroRuntimeConfig } from 'nitropack'

export default defineEventHandler(async (event) => {
  const config: NitroRuntimeConfig  = useRuntimeConfig(event)
  const { weatherApiKey } = config
  if (!weatherApiKey) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Weather API key not provided'
    })
  }

  const location = getRouterParam(event, 'location')

  // Check if location is provided
  if (!location) {
    throw createError({
      statusCode: 400,
      statusMessage: 'No location provided'
    })
  }

  const weather = {
    location: '',
    temperature: -1,
    weather: 'rainy',
    lastUpdated: 'never'
  }

  await fetch(`https://api.weatherapi.com/v
1/current.json?key=${weatherApiKey}&q=${location}`)
    .then((response) => response.json() as Promise<WeatherApiResponse>)
    .then((data: WeatherApiResponse) => {
      // Extract weather data
      weather.location = `${data.location.name}, ${data.location.country}`
      weather.temperature = data.current.temp_c
      weather.weather = data.current.condition.text
      weather.lastUpdated = new Date(data.current.last_updated_epoch * 1000).toLocaleString().replace(',', '').slice(0, -3)
    })
    .catch(() => {
      throw createError({
        statusCode: 500,
        statusMessage: 'Failed to fetch weather data'
      })
    })

  console.debug('Fetched weather data:', weather)

  // Send weather data
  return weather
})
