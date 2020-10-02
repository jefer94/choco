import { print } from 'redis'
import client from '../db'

type Setter = {
  readonly data: {
    readonly key: string
    readonly value: string
  }
}

export default async function addActivityLog(key: string, value: string): Promise<Setter> {
  client.set(key, value, print)
  return { data: { key, value } }
}
