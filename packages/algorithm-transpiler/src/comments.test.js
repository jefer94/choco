import comments from './comments'

test('remove comments from a line', () => {
  expect(comments('hi // Hi Hi Puffy AmiYumi')).toBe('hi')
})

test('remove comments from a lines (array)', () => {
  testMultilinesResultInArray(comments(['hi // Teens Titans Go', 'apple // Steven Universe']))
})

test('remove comments from a lines (breaklines)', () => {
  const result = comments(['hi //Gravity Falls', 'apple //South Park'].join('\n'))
  testMultilinesResultInArray(result.split('\n'))
})

function testMultilinesResultInArray(result) {
  const [hi, apple, ...restOfStuff] = result

  expect(restOfStuff).toHaveLength(0)
  expect(hi).toBe('hi')
  expect(apple).toBe('apple')
}