const mockCors = jest.fn()
const mockHelmet = jest.fn()
const mockMorgan = jest.fn()
const mockExpressStatic = jest.fn()
const mockBodyParserJson = jest.fn()
const mockBodyParserUrlencoded = jest.fn()
const mockMethodOverride = jest.fn()

jest.mock('cors', () => ({ __esModule: true, default: mockCors }))
jest.mock('helmet', () => ({ __esModule: true, default: mockHelmet }))
jest.mock('morgan', () => ({ __esModule: true, default: mockMorgan }))
jest.mock('method-override', () => ({ __esModule: true, default: mockMethodOverride }))

jest.mock('express', () => ({ __esModule: true,
  default: {
    static: mockExpressStatic
  } }))

jest.mock('body-parser', () => ({ __esModule: true,
  default: {
    json: mockBodyParserJson,
    urlencoded: mockBodyParserUrlencoded
  } }))

test('common use all middlewares', async () => {
  const use = () => ({ use })
  const middlewares = await import('./middlewares')

  middlewares.default({ use }, __dirname)

  expect(mockCors).toHaveBeenCalled()
  expect(mockHelmet).toHaveBeenCalled()
  expect(mockMorgan).toHaveBeenCalled()
  expect(mockExpressStatic).toHaveBeenCalled()
  expect(mockBodyParserJson).toHaveBeenCalled()
  expect(mockBodyParserUrlencoded).toHaveBeenCalled()
  expect(mockMethodOverride).toHaveBeenCalled()
})
