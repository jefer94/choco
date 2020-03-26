import dotenv from 'dotenv'

const config = jest.spyOn(dotenv, 'config')

test('dotenv has been called', () => {
  expect(config).toHaveBeenCalled()
  expect(config.mock).toBeTruthy()
  expect(typeof config.mock).toBe('array')

  const [args] = config.mock[0]

  expect(typeof args).toBe('object')

  const { path, debug } = args

  expect(debug).toBeFalsy()
  expect(typeof path).toBe('string')
  expect(path).toBeTruthy()
})