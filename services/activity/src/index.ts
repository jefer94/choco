import server from './server'
import db from './db'

db(process.env.MONGO)
server()
