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
