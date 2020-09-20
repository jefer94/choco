/* eslint-disable no-underscore-dangle */
import { Service, ServiceDocument } from '../models'

type AddOnceService = {
  readonly data: ServiceDocument
}

/**
 * Add once service.
 * @param name - Service name.
 * @returns Service id.
 */
export default async function addOnceService(name: string): Promise<AddOnceService> {
  try {
    const service = new Service({ name })
    await service.save()
    return { data: service }
  }
  catch {
    const service = await Service.findOne({ name }).exec()
    return { data: service }
  }
}
