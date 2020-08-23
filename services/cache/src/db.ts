import { createClient } from 'redis'

const client = createClient()

// client.on('error', (error) => {
//   // console.log(chalk.red(error))
// })

export default client
