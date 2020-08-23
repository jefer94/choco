import get from './get'

export default async function getObject<T>(key: string): Promise<T> {
  try {
    const json = await get(key)
    return JSON.parse(json)
  }
  catch {
    return null
  }
}
