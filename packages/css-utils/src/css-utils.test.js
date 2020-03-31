import { getVar, setVar } from './css-utils'

test('set and get vars in camel case mode', () => {
  console.log(window.getComputedStyle)
  const vars = [
    ['coffee', '4321'],
    ['choco', '4123'],
    ['oreo', '2143'],
  ]
  vars.map(([key, value]) => {
    expect(getVar(key, true)).toBeFalsy()
    expect(setVar(key, value, true)).toBeFalsy()
    expect(getVar(key, true)).toBe(value)
  })
})

test('set and get vars', () => {
  const vars = [
    ['--nutella', '0987'],
    ['--cocosette', '0789'],
    ['--pizza', '8709'],
  ]
  vars.map(([key, value]) => {
    expect(getVar(key)).toBeFalsy()
    expect(setVar(key, value)).toBeFalsy()
    expect(getVar(key)).toBe(value)
  })
})
