import {Assembly} from "~core/assemble/assembly.ts";

export type ValidationResult = ValidationSuccess | ValidationFailure
export const success = (assembly: Assembly) => new ValidationSuccess(assembly)
export const failure = (errors: Error[]) => new ValidationFailure(errors)

type OnFail<T> = (errors: Error[]) => T
type Onsuccess<T> = (assembly: Assembly) => T

class ValidationSuccess {
  constructor(private readonly assembly: Assembly) {}

  fold<T>(_: OnFail<T>, f: Onsuccess<T>): T {
    return f(this.assembly)
  }
  concat(other: ValidationResult): ValidationResult {
    return other
  }
}
class ValidationFailure {
  constructor(private readonly errors: Error[]) {}

  fold<T>(f: OnFail<T>, _: Onsuccess<T>): T {
    return f(this.errors)
  }
  concat(other: ValidationResult): ValidationResult {
    return other.fold(
      errors => new ValidationFailure([...this.errors, ...errors]),
      (): ValidationResult => this
    )
  }
}