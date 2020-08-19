import { Document } from 'mongoose'
import { ProjectPermission } from '../models'

export default async function fetchShareProjects(user: string):
  Promise<readonly Document[]> {
  return ProjectPermission.find({ user }).populate('user').exec()
}
