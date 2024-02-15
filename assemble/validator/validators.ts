import {Validator} from "./base";
import {Assembly} from "../assembly";
import {failure, success, ValidationResult} from "./result";
import {sum} from "~/utils/array";

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
