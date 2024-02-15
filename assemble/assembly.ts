import type * as ArmUnits from "~/data/arm-units";
import type * as BackUnits from "~/data/back-units";
import type {Head} from "~/data/heads";
import type {Core} from "~/data/cores";
import type {Arms} from "~/data/arms";
import type * as Boosters from "../data/booster";
import type {FCS} from "~/data/fces";
import type {Generator} from "~/data/generators";
import type {Expansion} from "~/data/expansions";
import type {LegsNotTank, LegsTank} from "~/data/legs";

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
  expansion: Expansion | null
}>
