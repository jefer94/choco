import { print } from 'redis'
import client from '../db'

export default async function addActivityLog(key: string, value: string): Promise<boolean> {
  return client.set(key, value, print)
}
