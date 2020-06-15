const mockConfig = jest.fn()

jest.mock('dotenv', () => ({ __esModule: true,
  config: mockConfig }))

test('reset env', async () => {
  const dep = await import('./env')

  dep.resetEnv()
  expect(dep.env()).toEqual({})
  expect(process.env).toEqual({})
})

test('get cat', async () => {
  const dep = await import('./env')
  const loader = await import('./env-loader')

  dep.resetEnv()
  process.env.CAT = '9'
  loader.loadEnv()

  expect(dep.env('CAT')).toBe('9')
  expect(dep.env()).toEqual({ CAT: '9' })
})

test('set dog', async () => {
  const dep = await import('./env')
  const loader = await import('./env-loader')

  dep.resetEnv()
  loader.loadEnv()

  expect(dep.env('DOG', '7')).toBe('7')
  expect(dep.env('DOG')).toBe('7')
  expect(dep.env()).toEqual({ DOG: '7' })
})

test('get without loadEnv', async () => {
  const dep = await import('./env')
  const loader = await import('./env-loader')

  dep.resetEnv()

  process.env.ADC = '3'

  expect(dep.env('ADC')).toBe('3')
  loader.loadEnv()
  expect(dep.env()).toEqual({ ADC: '3' })
})
