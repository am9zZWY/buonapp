/**
 * Get a pseudo-random element from an array depending on the day of the year
 * @param array The array to get the element from
 * @returns The element of the day
 */
export function getDailyElement<T>(array: T[]): T {
  // Calculate the day of the year
  const now: Date = new Date()
  const start: Date = new Date(now.getFullYear(), 0, 0)
  const diff: number = (now.getTime() - start.getTime()) +
    ((start.getTimezoneOffset() - now.getTimezoneOffset()) * 60 * 1000)
  const oneDay: number = 1000 * 60 * 60 * 24
  const day: number = Math.floor(diff / oneDay)

  // Sort array pseudo-randomly
  let state = 5021 % 2147483647
  if (state <= 0) {
    state += 2147483646
  }

  const getRandom = () => {
    state = (state * 16807) % 2147483647
    return (state - 1) / 2147483646
  }
  const randSortedArray = array.toSorted(() => getRandom() - 0.5)

  // Get the recipe of the day depending on the day of the year
  return randSortedArray[day % randSortedArray.length]
}
