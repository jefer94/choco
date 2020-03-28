import axios from 'axios'
import redis from 'redis'

const calls = []
let getReturns

// const get
const get = (key, callback) => {
  callback(null, getReturns)
}
const set = jest.fn()

jest.mock('redis', {
  get,
  set
})

test('set cache', async () => {
  await import('./')
  const response = axios.post('/', {
    mode: 'set',
    key: 'fish',
    value: 'value'
  })

  expect(response).toBe('')
})

test('get cache', async () => {
  await import('./')

  getReturns = 'Dopa'

  const response = axios.post('/', {
    mode: 'get',
    key: 'fish',
  })

  expect(response).toBe(getReturns)
})