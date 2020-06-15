const mockConfig = jest.fn()

jest.mock('dotenv', () => ({ __esModule: true,
  config: mockConfig }))

test('dotenv has been called', async () => {
  const dep = await import('./env-loader')
  dep.loadEnv()

  expect(mockConfig).toHaveBeenCalled()
  expect(mockConfig.mock).toBeTruthy()
  expect(typeof mockConfig.mock).toBe('object')

  const [args, ...restOfCalls] = mockConfig.mock.calls[0]

  expect(restOfCalls).toHaveLength(0)
  expect(typeof args).toBe('object')

  const { path, debug } = args

  expect(debug).toBeFalsy()
  expect(typeof path).toBe('string')
  expect(path).toBeTruthy()
})

test('dotenv has been called with arguments', async () => {
  const loader = await import('./env-loader')
  const dep = await import('./env')
  loader.loadEnv({ CAT: '5' })

  expect(mockConfig).toHaveBeenCalled()
  expect(mockConfig.mock).toBeTruthy()
  expect(typeof mockConfig.mock).toBe('object')

  const [args, ...restOfCalls] = mockConfig.mock.calls[0]

  expect(restOfCalls).toHaveLength(0)
  expect(typeof args).toBe('object')

  const { path, debug } = args

  expect(debug).toBeFalsy()
  expect(typeof path).toBe('string')
  expect(path).toBeTruthy()

  expect(dep.env('CAT')).toBe('5')
})
