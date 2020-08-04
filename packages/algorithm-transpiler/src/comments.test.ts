import comments from './comments'

test('remove comments from a line', () => {
  const result = comments('hi // Hi Hi Puffy AmiYumi')
  expect(result).toBe('hi')
})

test('remove comments from a lines (array)', () => {
  const result = comments(['hi // Teens Titans Go', 'apple // Steven Universe'])
  expect(result).toEqual(['hi', 'apple'])
})

test('remove comments from a lines (breaklines)', () => {
  const result = comments(['hi //Gravity Falls', 'apple //South Park'].join('\n'))
  expect(result).toBe('hi\napple')
})
