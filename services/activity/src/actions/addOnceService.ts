/* eslint-disable no-underscore-dangle */
import { Service } from '../models'

export default async function addOnceService(name: string): Promise<number> {
  try {
    const service = new Service({ name })
    await service.save()
    return service._id
  }
  catch {
    const service = await Service.findOne({ name }).exec()
    return service._id
  }
}
