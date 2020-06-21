import { Use } from './types'

const mockHttpCreateServer = jest.fn()
const mockHttpClose = jest.fn()

jest.mock('http', () => ({ __esModule: true,
  default: {
    createServer: () => ({
      listen: mockHttpCreateServer,
      close: mockHttpClose
    })
  } }))

test('middleware use http dependency', async () => {
  const use = (): Use => ({ use })
  const http = await import('./http')

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  http.listen({ use })
  expect(mockHttpCreateServer).toHaveBeenCalled()

  http.close()
  expect(mockHttpClose).toHaveBeenCalled()
})
