/* eslint-disable functional/no-loop-statement */
//  Hello World client
import * as zmq from 'zeromq'

async function runClient(): Promise<void> {
  console.log('Connecting to hello world server…')

  //  Socket to talk to server
  const sock = new zmq.Request()
  sock.connect('tcp://localhost:5555')

  for (let i = 0; i < 2; i++) {
    console.log('Sending Hello ', i)
    await sock.send(`Hello ${i} asdasdasd`)
    // await sock.send('Hello')
    const [result] = await sock.receive()
    console.log('Received ', result.toString(), i)
  }
}

runClient()