import {Validator} from "./base.ts";
import {Assembly} from "../assembly.ts";
import {failure, success, ValidationResult} from "./result.ts";
import {sum} from "../../utils/array.ts";

export const notOverEnergyOutput: Validator = {
  validate(assembly: Assembly): ValidationResult {
    const totalEn = sum([
      assembly.rightArmUnit,
      assembly.leftArmUnit,
      assembly.head,
      assembly.core,
      assembly.arms,
      assembly.legs,
      assembly.booster,
      assembly.fcs,
    ].map(p => p.en_load))

    return assembly.generator.en_output >= totalEn
      ? success(assembly)
      : failure([new Error('EN output error')])
  },
}
