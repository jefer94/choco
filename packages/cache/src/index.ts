import { startDB, listen } from './cache'

startDB()
listen(6000)
