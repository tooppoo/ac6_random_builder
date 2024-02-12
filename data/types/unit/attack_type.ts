// 各種武器の攻撃属性

export type AttackType =
| typeof kinetic
| typeof explosive
| typeof energy
| typeof coral
| typeof none

/** 実弾 */
export const kinetic = 'kinetic' as const
/** 爆発 */
export const explosive = 'explosive' as const
/** EN */
export const energy = 'energy' as const
/** コーラル */
export const coral = 'coral' as const
/** 盾など、攻撃手段無し */
export const none = 'none' as const
