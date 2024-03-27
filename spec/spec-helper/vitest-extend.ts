import { expect, vi } from 'vitest'

expect.extend({
  between: (received, { begin, end }: ExpectedBetween) => ({
    message: () => `${received} is not between ${begin} and ${end}`,
    pass: begin <= received && received <= end,
    actual: received,
    expected: { begin, end },
  }),
})
type ExpectedBetween = { begin: number; end: number }
export type Between<R> = (expected: ExpectedBetween) => R

expect.extend({
  toHaveBeenCalledTimesWith(received, times: number, ...args) {
    if (!vi.isMockFunction(received)) {
      return { pass: false, message: () => `${received} is not mock function` }
    }

    const actual = received.mock.calls.filter(
      (mockArgs) => JSON.stringify(mockArgs) === JSON.stringify(args),
    ).length

    return {
      message: () =>
        `expected ${received.getMockName()} is called ${times} times with ${JSON.stringify(args)}, but called ${actual} times`,
      pass: actual === times,
      actual: [actual, args],
      expected: [times, args],
    }
  },
})
type ExpectedToHaveBeenCalledTimesWith = [number, ...unknown[]]
export type ToHaveBeenCalledTimesWith<R> = (
  ...expected: ExpectedToHaveBeenCalledTimesWith
) => R
