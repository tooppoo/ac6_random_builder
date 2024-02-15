// パーツ分類
export type Classification =
| ArmUnit
| BackUnit
| Head
| Arms
| Core
| Legs
| Booster
| FCS
| Generator
| Expansion

// UNIT
export const armUnit = 'arm-unit' as const
export const leftArmUnit = 'left-arm-unit' as const
export const armUnitNotEquipped = 'arm-unit-not-equipped' as const
export type ArmUnit = typeof armUnit | typeof leftArmUnit | typeof armUnitNotEquipped

export const backUnit = 'back-unit' as const
export const leftBackUnit = 'left-back-unit' as const
export const backUnitNotEquipped = 'back-unit-not-equipped' as const
export type BackUnit = typeof backUnit | typeof leftBackUnit | typeof backUnitNotEquipped

// FRAME
export const head = 'head' as const
export type Head = typeof head
export const arms = 'arms' as const
export type Arms = typeof arms
export const core = 'core' as const
export type Core = typeof core
export const legs = 'legs' as const
export type Legs = typeof legs

// INNER
export const booster = 'booster' as const
export const boosterNotEquipped = 'booster-not-equipped' as const
export type Booster = typeof booster | typeof boosterNotEquipped
export const fcs = 'fcs' as const
export type FCS = typeof fcs
export const generator = 'generator' as const
export type Generator = typeof generator

// EXPANSION
export const expansion = 'expansion' as const
export type Expansion = typeof expansion
