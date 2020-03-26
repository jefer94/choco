const cors = jest.fn()
const helmet = jest.fn()
const morgan = morgan.fn()

jest.mock('cors', cors)
jest.mock('helmet', helmet)
jest.mock('cors', cors)

test('common use all middlewares', async () => {
  const common = await import('./')

  common({ use() {} })

  expect(cors).toHaveBeenCalled()
  expect(helmet).toHaveBeenCalled()
  expect(morgan).toHaveBeenCalled()
})