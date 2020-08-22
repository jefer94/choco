import { Service } from '../models'

export default async function addOnceService(name: string): Promise<void> {
  try {
    const scope = new Service({ name })
    await scope.save()
  }
  catch {}
}
