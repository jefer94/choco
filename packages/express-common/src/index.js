import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'

export default function (app) {
  app
    .use(morgan('combined'))
    .use(helmet())
    .use(cors())
}