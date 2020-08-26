/* eslint-disable no-underscore-dangle */
import { Service } from '../models'

/**
 * Add once service.
 *
 * @param name - Service name.
 * @returns Service id.
 */
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
