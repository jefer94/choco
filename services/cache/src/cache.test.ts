import request from 'supertest'
// import axios from 'axios';
// import redis from 'redis';
import { createClient as mockCreateClient, print as mockPrint } from 'redis-mock'
import app, { startDB } from './cache'

// console.log('mock', createClient)
// const calls = [];
// let mockGetReturns

jest.mock('redis', () => ({
  createClient: mockCreateClient,
  print: mockPrint
}))

startDB()

test('set cache', () =>
  // console.log('aoo', app)
  request(app)
    .post('/')
    .send({
      mode: 'set',
      key: 'fish',
      value: 'value'
    })
    .then((response) => {
      // console.log('response', response)
      expect(response.statusCode).toBe(204)
      expect(response.text).toBe('')
    }))

test('get cache', () =>
  // console.log('aoo', app)
  request(app)
    .post('/')
    .send({
      mode: 'get',
      key: 'fish'
    })
    .then((response) => {
      // console.log('response', response)
      expect(response.statusCode).toBe(200)
      expect(response.text).toBe('value')
    }))

// test('set cache', async () => {
//   const { listen } = await import('./cache');
//   listen()
//   const response = axios.post('/', {
//     mode: 'set',
//     key: 'fish',
//     value: 'value',
//   });

//   expect(response).toBe('');
// });

// test('get cache', async () => {
//   const { close } = await import('./cache');
//   mockGetReturns = 'Dopa';

//   const response = axios.post('/', {
//     mode: 'get',
//     key: 'fish',
//   });

//   expect(response).toBe(mockGetReturns);
//   close()
// });
