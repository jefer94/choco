import { createClient } from 'redis'

const client = createClient(process.env.REDIS)

// client.on('error', (error) => {
//   // console.log(chalk.red(error))
// })

export default client
