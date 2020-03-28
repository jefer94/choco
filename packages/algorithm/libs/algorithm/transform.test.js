import { forLoopCondition, doWhileLoopCondition } from './transform'

const forLoopConditionCode = `para (i = 1 hasta i = 9) hacer
  mostrar i
finpara`

test('for loop condition', () => {
  const res = forLoopCondition(forLoopConditionCode)

  expect(typeof res).toBe('string')

  const [line1, line2, line3, ...restOfLines] = res.split('\n')

  expect(line1).toBe('para (i = 1 ; i <= 9; i++) hacer')
  expect(line2).toBe('  mostrar i')
  expect(line3).toBe('finpara')
  expect(restOfLines.length).toBe(0)
})

const doWhileConditionCode = `repetir
  mostrar i
hasta (1 = 1)`

test('do while loop condition', () => {
  const res = doWhileLoopCondition(doWhileConditionCode)

  expect(typeof res).toBe('string')

  const [line1, line2, line3, ...restOfLines] = res.split('\n')

  expect(line1).toBe('repetir')
  expect(line2).toBe('  mostrar i')
  expect(line3).toBe('hasta (!(1 === 1))')
  expect(restOfLines.length).toBe(0)
})
