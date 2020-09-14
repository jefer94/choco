import { print } from 'redis'
import client from '../db'

type Set = {
  readonly data: {
    readonly key: string
    readonly value: string
  }
}

export default async function addActivityLog(key: string, value: string): Promise<Set> {
  client.set(key, value, print)
  return { data: { key, value } }
}
