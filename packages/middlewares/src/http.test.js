const mockHttpCreateServer = jest.fn()
const mockHttpClose = jest.fn()

jest.mock('http', () => ({ __esModule: true,
  default: {
    createServer: () => ({
      listen: mockHttpCreateServer,
      close: mockHttpClose
    })
  } }))

jest.mock('socket.io', () => ({ __esModule: true,
  default: () => ({
    listen: () => {},
    of: () => ({ on: () => {} }),
    on: () => {}
  }) }))

test('middleware use http dependency', async () => {
  const use = () => ({ use })
  const http = await import('./http')

  http.listen({ use })
  expect(mockHttpCreateServer).toHaveBeenCalled()

  http.close()
  expect(mockHttpClose).toHaveBeenCalled()
})
