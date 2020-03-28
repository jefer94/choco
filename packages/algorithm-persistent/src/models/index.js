import mongoose from 'mongoose'
import CodeSchema from './code'
import ProjectSchema from './project'

const host = process.env['MONGO_HOST'] || 'localhost'
const port = process.env['MONGO_PORT'] || '27017'
const user = process.env['MONGO_USER'] || 'root'
const pass = process.env['MONGO_PASS'] || ''
const db = process.env['MONGO_DB'] || 'algorithm'

console.log('env', host, port, user, pass, db)

mongoose.connect(`mongodb://${user}:${pass}@${host}:${port}/${db}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

export const Code = mongoose.model('Code', mongoose.Schema(CodeSchema))
export const Project = mongoose.model('Project', mongoose.Schema(ProjectSchema))