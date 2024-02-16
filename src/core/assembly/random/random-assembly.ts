import {Assembly} from "~core/assembly/assembly.ts";
import {Candidates} from "~core/assembly/candidates.ts";
import {randomBuild, Randomizer} from "~core/assembly/random/random-builder.ts";
import {Validator} from "~core/assembly/random/validator/base.ts";
import {success, ValidationResult} from "~core/assembly/random/validator/result.ts";
import {notOverEnergyOutput} from "~core/assembly/random/validator/validators.ts";

type AssembleOption = Readonly<{
  /** 乱数生成器 */
  random?: Randomizer
}>
const defaultOption: Required<AssembleOption> = {
  random: () => Math.random(),
}

export class RandomAssembly {
  static init(): RandomAssembly {
    return new RandomAssembly([
      notOverEnergyOutput,
    ])
  }

  private constructor(private readonly validators: Validator[]) {}

  addValidator(validator: Validator): RandomAssembly  {
    return new RandomAssembly([...this.validators, validator])
  }

  assemble(candidates: Candidates, option: AssembleOption = defaultOption): Assembly {
    const { random } = { ...defaultOption, ...option }

    return this.validate(randomBuild(candidates, random)).fold(
      (_errors) => {
        return this.assemble(candidates, option)
      },
      a => a
    )
  }

  validate(assembly: Assembly):  ValidationResult {
    return this.validators.reduce(
      (r, v) => r.concat(v.validate(assembly)),
      success(assembly)
    )
  }
}
