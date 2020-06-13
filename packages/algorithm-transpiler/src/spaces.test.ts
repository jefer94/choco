import spaces from './spaces'

test('remove spaces', () => {
  const code = [
    `                   variables               `,
    '         number              :         integer                ',
    '                             start',
    '                              ...                            ',
    'end                                          '
  ].join('\n')

  expect(spaces(code)).toBe([
    'variables',
    'number : integer',
    'start',
    '...',
    'end'
  ].join('\n'))
})

test('keep spaces in strings', () => {
  const code = [
    `                   variables               `,
    '         number              :         integer                ',
    '                             start',
    '                              ...                            ',
    '                              "     example   string      "                            ',
    '                              ...                            ',
    'end                                          '
  ].join('\n')

  expect(spaces(code)).toBe([
    'variables',
    'number : integer',
    'start',
    '...',
    '"     example   string      "',
    '...',
    'end'
  ].join('\n'))
})