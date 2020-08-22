import { Activity } from '../models'

export default async function addOnceActivity(name: string, service: string): Promise<void> {
  try {
    const scope = new Activity({ name, service })
    await scope.save()
  }
  catch {}
}
