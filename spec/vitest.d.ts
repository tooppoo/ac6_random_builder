import type {
  Between,
  ToHaveBeenCalledTimesWith,
} from '~spec/spec-helper/vitest-extend.ts'

interface CustomMatchers<R = unknown> {
  between: Between<R>
  toHaveBeenCalledTimesWith: ToHaveBeenCalledTimesWith<R>
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare module 'vitest' {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  interface Assertion<T = any> extends CustomMatchers<T> {}
  interface AsymmetricMatchersContaining extends CustomMatchers {}
}
