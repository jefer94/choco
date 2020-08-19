import { Document } from 'mongoose'
import { Project } from '../models'

export default async function fetchOwnProjects(userId: string):
  Promise<readonly Document[]> {
  return Project.find({ userId }).exec()
}
