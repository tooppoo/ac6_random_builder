import * as ArmUnits from "~/data/arm-units";
import * as BackUnits from "~/data/back-units";
import {heads} from "~/data/heads";
import {cores} from "~/data/cores";
import {arms} from "~/data/arms";
import {legs} from "~/data/legs";
import {boosters} from "~/data/booster";
import {fcses} from "~/data/fces";
import {generators} from "~/data/generators";
import * as Expansion from "../data/expansions";

export const candidates = {
  rightArmUnits: [...ArmUnits.armUnits, ArmUnits.notEquipped],
  leftArmUnits: [...ArmUnits.armUnits, ...ArmUnits.leftArmUnits, ArmUnits.notEquipped],
  rightBackUnits: [...BackUnits.backUnits, BackUnits.notEquipped],
  leftBackUnits: [...BackUnits.backUnits, ...BackUnits.lefTBackUnits, BackUnits.notEquipped],

  heads,
  cores,
  arms,
  legs,

  boosters,
  fcses,
  generators,

  expansions: [...Expansion.expansions, Expansion.notEquipped],
} as const
export type Candidates = typeof candidates
