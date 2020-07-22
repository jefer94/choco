import { homeRoute, docsRoute, consoleRoute } from './routes'

test('home route', () => {
  expect(homeRoute).toBe('/')
})

test('docs route', () => {
  expect(docsRoute).toBe('/docs')
})

test('console route', () => {
  expect(consoleRoute).toBe('/console')
})