import dotenv from 'dotenv'

const config = jest.spyOn(dotenv, 'config')

test('dotenv has been called', async () => {
  await import('./')
  expect(config).toHaveBeenCalled()
  expect(config.mock).toBeTruthy()
  expect(typeof config.mock).toBe('object')

  const [args, ...restOfCalls] = config.mock.calls[0]

  expect(restOfCalls).toHaveLength(0)
  expect(typeof args).toBe('object')

  const { path, debug } = args

  expect(debug).toBeFalsy()
  expect(typeof path).toBe('string')
  expect(path).toBeTruthy()
})