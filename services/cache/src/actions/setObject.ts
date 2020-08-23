import set from './set'

export default function setObject<T>(key: string, value: T): Promise<boolean> {
  const json = JSON.stringify(value)
  return set(key, json)
}
