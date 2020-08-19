import { Document } from 'mongoose'
import { Project } from '../models'

export default async function fetchOwnProjects(user: string):
  Promise<readonly Document[]> {
  return Project.find({ user }).exec()
}
