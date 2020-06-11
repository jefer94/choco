/* eslint-disable jsdoc/check-examples */
/* eslint-disable no-shadow */
import http from 'http'
import { env } from '@choco/env'
import socket from 'socket.io'
import chalk from 'chalk'

/** @module @choco/middlewares */

let server
const { log } = console
const io = socket({
  path: '/io/webrtc'
})

/**
 * Listen Express app.
 *
 * @param {object} app - Express app.
 * @example
 * import express from 'express'
 * const app = express()
 * listen(app)
 */
export function listen(app) {
  server = http.createServer(app)
  const port = env('PORT') || 3000
  server.listen(port, () => {
    log(`
      PORT: ${chalk.red(port)}
      ENV: ${chalk.red(app.get('env'))}
    `)
  })

  io.listen(server)
  // bind socket.io to that server
  const peers = io.of(/^\/peer-\w+$/)

  // keep a reference of all socket connections
  const connectedPeers = new Map()

  peers.on('connection', (socket) => {
    log(chalk.green('socket.id', socket.id))
    socket.emit('connection-success', { success: socket.id })

    connectedPeers.set(socket.id, socket)
    log('Connected peers: ', connectedPeers.size)

    socket.on('disconnect', () => {
      log(chalk.red('disconnected'))
      connectedPeers.delete(socket.id)
      log('Connected peers: ', connectedPeers.size)
    })

    socket.on('message', (data) => {
      // send to the other peer(s) if any
      // eslint-disable-next-line no-restricted-syntax
      for (const [socketID, socket] of connectedPeers.entries()) {
        if (socketID !== data.socketID) {
          socket.emit('message', data.payload)
        }
      }
    })

    // send to the other peer(s) if any
    socket.on('offerOrAnswer', (data) => {
      log('offerOrAnswer', data)
      // eslint-disable-next-line no-restricted-syntax
      for (const [socketID, socket] of connectedPeers.entries()) {
        if (socketID !== data.socketID) {
          socket.emit('offerOrAnswer', data.payload)
        }
      } // don't send to self
    })

    // send candidate to the other peer(s) if any
    socket.on('candidate', (data) => {
      // eslint-disable-next-line no-restricted-syntax
      for (const [socketID, socket] of connectedPeers.entries()) {
        // don't send to self
        if (socketID !== data.socketID) {
          socket.emit('candidate', data.payload)
        }
      }
    })

    // sends interpreters contacted to the requester
    socket.on('peersContacted', (data) => {
      // eslint-disable-next-line no-restricted-syntax
      for (const [socketID, socket] of connectedPeers.entries()) {
        // don't send to self
        if (socketID !== data.socketID) {
          socket.emit('peersContacted', data.payload)
        }
      }
    })

    // sends a notification that lets the requester know that there were not peers contacted
    socket.on('noPeersFound', (data) => {
      // eslint-disable-next-line no-restricted-syntax
      for (const [socketID, socket] of connectedPeers.entries()) {
        // don't send to self
        if (socketID !== data.socketID) {
          socket.emit('noPeersFound', data.payload)
        }
      }
    })

    // send to the other peer(s) if any
    socket.on('callEnded', (data) => {
      log('callEnded', data)
      // eslint-disable-next-line no-restricted-syntax
      for (const [socketID, socket] of connectedPeers.entries()) {
        if (socketID !== data.socketID) {
          socket.emit('callEnded', data.payload)
        }
      } // don't send to self
    })
  })
}

/**
 * Close http connection if exist.
 *
 */
export function close() {
  if (server) { server.close() }
}
