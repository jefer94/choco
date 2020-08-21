import { DocumentQuery } from 'mongoose'
import { Project, ProjectDocument } from '../models'

type ProjectQuery = DocumentQuery<ProjectDocument, ProjectDocument>

export default async function getProject(id: string): Promise<ProjectQuery> {
  return Project.findOne({ _id: id })
}
