import get from './get'

type GetObject<T> = {
  readonly data?: {
    readonly key: string
    readonly value: T
  }
  readonly error?: string
}

export default async function getObject<T>(key: string): Promise<GetObject<T>> {
  try {
    const res = await get(key)
    return { data: { key, value: JSON.parse(res.data.value) } }
  }
  catch {
    return { error: 'invalid object' }
  }
}
