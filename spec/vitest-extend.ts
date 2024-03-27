import { expect } from 'vitest'

expect.extend({
  between: (received, { begin, end }) => ({
    message: () => `${received} is not between ${begin} and ${end}`,
    pass: begin <= received && received <= end,
  }),
})
export type Between<R> = (expected: { begin: number; end: number }) => R
