import mongoose from 'mongoose'
import Code from './code'
import Project from './project'

const host = process.env['MONGO_HOST'] || 'localhost'
const port = process.env['MONGO_PORT'] || '27017'
const db = process.env['MONGO_DB'] || 'algorithm'

mongoose.connect(`mongodb://${host}:${port}/${db}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

export const Code = mongoose.model('Code', mongoose.Schema(Code))
export const Project = mongoose.model('Project', mongoose.Schema(Project))