/**
 * WeatherApiResponse
 *
 * @description Weather API response type for the BuonApp app.
 * @see https://www.weatherapi.com/docs/
 */
export type WeatherApiResponse = {
  location: {
    name: string
    country: string
  }
  current: {
    temp_c: number
    condition: {
      text: string
    }
    last_updated_epoch: number
  }
}

/**
 * Weather
 *
 * @description Internal Weather type for the BuonApp app.
 */
export type Weather = {
  location: string,
  temperature: number,
  weather: string,
  lastUpdated: string
}
