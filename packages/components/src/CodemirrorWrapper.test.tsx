import React from 'react'
import 'jest-styled-components'
import renderer from 'react-test-renderer'
import CodemirrorWrapper from './CodemirrorWrapper'
import { css } from 'styled-components'

test('it works', () => {
  [{
    height: '19px',
    theme: {
      surface: '#543',
      white: '#222',
      fontSize: '12px'
    }
  }, {
    height: '190px',
    theme: {
      surface: '#098',
      white: '#999',
      fontSize: '20px'
    }
  }].forEach(({ height, theme }) => {
    const tree = renderer.create(<CodemirrorWrapper height={height} theme={theme} />).toJSON()
    console.log(tree, document)
    expect(tree).toHaveStyleRule('height', height, {
      modifier: css`& > div`
    })
  })
})