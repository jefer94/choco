import { Document } from 'mongoose'
import { Project } from '../models'

export default async function fetchShareProjects(userId: string):
  Promise<readonly Document[]> {
  return Project.find({ userId }).exec()
}
