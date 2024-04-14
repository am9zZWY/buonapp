/**
 * WeatherApiResponse
 *
 * @typedef {Object} WeatherApiResponse
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
