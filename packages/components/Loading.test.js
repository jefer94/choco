import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import PulseLoader from 'react-spinners/PulseLoader'
import Loading from './Loading'

jest.mock('react-spinners/PulseLoader')
PulseLoader.prototype.render.mockReturnValue(
  <>
    secret replace
  </>
)

test('load spinner', () => {
  const { getAllByText } = render(<Loading />)
  const [spinner, ...restOfResults] = getAllByText('secret replace')
  expect(restOfResults).toHaveLength(0)
  expect(spinner).toBeTruthy()
})
