import type { Assembly } from '~core/assembly/assembly';

export function stringifyAssembly(assembly: Assembly): string {
  return `RIGHT ARM UNIT: ${assembly.rightArmUnit.name}
LEFT ARM UNIT: ${assembly.leftArmUnit.name}
RIGHT BACK UNIT: ${assembly.rightBackUnit.name}
LEFT BACK UNIT: ${assembly.leftBackUnit.name}

HEAD: ${assembly.head.name}
CORE: ${assembly.core.name}
ARMS: ${assembly.arms.name}
LEGS: ${assembly.legs.name}

BOOSTER: ${assembly.booster.name}
FCS: ${assembly.fcs.name}
GENERATOR: ${assembly.generator.name}

EXPANSION: ${assembly.expansion.name}`
}
