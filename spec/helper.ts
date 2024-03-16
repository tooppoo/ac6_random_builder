import fc from 'fast-check'

export function genRandomizer() {
  return fc.float({ min: 0, max: 1, noNaN: true, noDefaultInfinity: true })
}
