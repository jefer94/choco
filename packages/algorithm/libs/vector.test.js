import Vector from './vector'

test('empty vector', () => {
  for (let i = 1; i < 10; i++) {
    const vector = new Vector(i)
    expect(vector.size).toBe(i)
    expect(vector.array).toHaveLength(0)
  }
})

test('empty arg', () => {
  expect(() => new Vector(0)).toThrow(new Error('ERROR: invalid array argument'))
})

test('vector show index 0', () => {
  expect(() => {
    const vector = new Vector(1)
    vector.show(0)
  }).toThrow(new Error('ERROR: array null point'))
})

test('add and show value', () => {
  const vector = new Vector(10)
  for (let i = 1; i <= 10; i++) {
    vector.add(i, i)
    expect(vector.show(i)).toBe(i)
  }
})

test('add index 0', () => {
  expect(() => {
    const vector = new Vector(1)
    vector.add(0, 0)
  }).toThrow(new Error('ERROR: array null point'))
})

test('vector overflow', () => {
  expect(() => {
    const vector = new Vector(10)
    for (let i = 1; i <= 10; i++) vector.add(i, i)
    vector.add(11, 11)
  }).toThrow(new Error('ERROR: array overflow'))
})

test('vector io toString', () => {
  const vector = new Vector(10)
  for (let i = 1; i < 10; i++) {
    expect(typeof vector.io).toBe('function')
    vector.io(i).add(i)
    expect(vector.io(i).toString()).toBe(i)
  }
})

test('vector io isVector', () => {
  const vector = new Vector(10)
  for (let i = 1; i < 10; i++) {
    expect(typeof vector.io).toBe('function')
    vector.io(i).add(i)
    expect(vector.io(i).isVector()).toBe(true)
  }
})

test('io and show value', () => {
  const vector = new Vector(10)
  for (let i = 1; i <= 10; i++) {
    expect(typeof vector.io).toBe('function')
    vector.io(i).add(i)
    expect(vector.io(i).show()).toBe(i)
  }
})

test('io add index 0', () => {
  expect(() => {
    const vector = new Vector(1)
    vector.io(0).add(0)
  }).toThrow(new Error('ERROR: array null point'))
})

test('io vector overflow', () => {
  expect(() => {
    const vector = new Vector(10)
    for (let i = 1; i <= 10; i++) vector.io(i).add(i)
    vector.io(11).add(11)
  }).toThrow(new Error('ERROR: array overflow'))
})
