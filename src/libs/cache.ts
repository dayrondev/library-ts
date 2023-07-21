export function readFromCache<T>(key: string): T | null {
  try {
    const storedData = window.localStorage.getItem(key)
    if (storedData != null) return JSON.parse(storedData) as T
  } catch (error) {
    console.error(`Error reading from cache: ${String(error)}`)
  }
  return null
}

export function saveToCache<T>(key: string, value: T): void {
  try {
    window.localStorage.setItem(key, JSON.stringify(value))
  } catch (error) {
    console.error(`Error saving to cache: ${String(error)}`)
  }
}
