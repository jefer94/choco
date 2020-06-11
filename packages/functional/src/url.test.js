import { url } from './url'

const host = 'potato.io'

test('return potato.io', () => {
  expect(url(host)).toBe(host)
})

test('return potato.io/path', () => {
  expect(url(host, 'path')).toBe(`${host}/path`)
  expect(url(host, '/path')).toBe(`${host}/path`)
})

test('return potato.io/path/subpath', () => {
  expect(url(host, 'path', 'subpath')).toBe(`${host}/path/subpath`)
  expect(url(host, '/path', '/subpath')).toBe(`${host}/path/subpath`)
})

test('return potato.io/path/subpath with undefined', () => {
  expect(url(host, undefined, 'path', 'subpath')).toBe(`${host}/path/subpath`)
  expect(url(host, '/path', undefined, '/subpath')).toBe(`${host}/path/subpath`)
})

test('return /path/subpath with undefined', () => {
  expect(url(undefined, 'path', 'subpath')).toBe('/path/subpath')
  expect(url('/path', undefined, '/subpath')).toBe('/path/subpath')
  expect(url('/path', '/subpath', undefined)).toBe('/path/subpath')
})
