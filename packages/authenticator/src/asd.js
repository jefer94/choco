const NATS = require('nats')
const nc = NATS.connect()

// Simple Publisher
nc.publish('foo', 'Hello World!')
nc.publish('help', 'Hello World!', 'elefante')
console.log(nc.subscribe('elefante', (msg, reply, subject, sid) => {
  console.log('elefante ' + msg + " it wasn't a request.")
}))
console.log(nc.subscribe('elefante', (msg, reply, subject, sid) => {
  console.log('elefante ' + msg + " it wasn't a request.")
}))
console.log(nc.subscribe('elefante', (msg, reply, subject, sid) => {
  console.log('elefante2 ' + msg + " it wasn't a request.")
}))
// nc.publish()

// Simple Subscriber
// nc.subscribe('foo', console.log)

// Unsubscribing
// const sid = nc.subscribe('foo', function (msg) {})
// nc.unsubscribe(sid)

// Subscription/Request callbacks are given multiple arguments:
// - msg is the payload for the message
// - reply is an optional reply subject set by the sender (could be undefined)
// - subject is the subject the message was sent (which may be more specific
//   than the subscription subject - see "Wildcard Subscriptions".
// - finally the subscription id is the local id for the subscription
//   this is the same value returned by the subscribe call.
nc.subscribe('foo', (msg, reply, subject, sid) => {
  if (reply) {
    nc.publish(reply, 'got ' + msg + ' on ' + subject + ' in subscription id ' + sid)
    return
  }
  console.log('Received a message: ' + msg + " it wasn't a request.")
})

// Request, creates a subscription to handle any replies to the request
// subject, and publishes the request with an optional payload. This usage
// allows you to collect responses from multiple services
nc.request('request', (msg) => {
  console.log('Got a response in msg stream: ' + msg)
})

// Request with a max option will unsubscribe after
// the first max messages are received. You can also specify the number
// of milliseconds you are willing to wait for the response - when a timeout
// is specified, you can receive an error
// nc.request('help', null, { max: 1, timeout: 1000 }, (msg) => {
//   if (msg instanceof NATS.NatsError && msg.code === NATS.REQ_TIMEOUT) {
//     console.log('request timed out')
//   } else {
//     console.log('Got a response for help: ' + msg)
//   }
// })

// Replies
nc.subscribe('help', function (request, replyTo) {
  nc.publish(replyTo, 'I can help!')
})

// Close connection
// nc.close()
