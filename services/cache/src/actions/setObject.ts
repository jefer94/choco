import set from './set'

type SetObject = {
  readonly data?: {
    readonly key: string
    readonly value: string
  }
  readonly error?: string
}

export default function setObject<T>(key: string, value: T): Promise<SetObject> {
  const json = JSON.stringify(value)
  return set(key, json)
}
