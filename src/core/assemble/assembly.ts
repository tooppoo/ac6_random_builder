import type * as ArmUnits from "~data/arm-units.ts";
import type * as BackUnits from "~data/back-units.ts";
import type {Head} from "~data/heads.ts";
import type {Core} from "~data/cores.ts";
import type {Arms} from "~data/arms.ts";
import type {LegsNotTank, LegsTank} from "~data/legs.ts";
import type * as Boosters from "~data/booster.ts";
import type {FCS} from "~data/fces.ts";
import type {Generator} from "~data/generators.ts";
import type * as Expansion from "~data/expansions.ts";

export type Assembly = AssemblyNotTank | AssemblyWithTank

type AssemblyNotTank = BaseAssembly & Readonly<{
  legs: LegsNotTank
  booster: Boosters.Booster
}>
type AssemblyWithTank = BaseAssembly & Readonly<{
  legs: LegsTank
  booster: Boosters.NotEquipped
}>
type BaseAssembly = Readonly<{
  rightArmUnit: ArmUnits.ArmUnit | ArmUnits.NotEquipped
  leftArmUnit: ArmUnits.ArmUnit | ArmUnits.LeftArmUnit | ArmUnits.NotEquipped
  rightBackUnit: BackUnits.BackUnit | BackUnits.NotEquipped
  leftBackUnit: BackUnits.BackUnit | BackUnits.LeftBackUnit | BackUnits.NotEquipped

  head: Head
  core: Core
  arms: Arms

  fcs: FCS
  generator: Generator
  expansion: Expansion.Expansion | Expansion.NotEquipped
}>
