import type {
  Between,
  ToHaveBeenCalledTimesWith,
} from './vitest-extend'

interface CustomMatchers<R = unknown> {
  between: Between<R>
  toHaveBeenCalledTimesWith: ToHaveBeenCalledTimesWith<R>
}

declare module 'vitest' {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  interface Assertion<T = any> {
    between: Between<T>
    toHaveBeenCalledTimesWith: ToHaveBeenCalledTimesWith<T>
  }
  interface AsymmetricMatchersContaining extends CustomMatchers {
    between: Between<unknown>
    toHaveBeenCalledTimesWith: ToHaveBeenCalledTimesWith<unknown>
  }
}
