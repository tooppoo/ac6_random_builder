
export type WeaponType =
  | typeof semi_auto
  | typeof full_auto
  | typeof burst
  | typeof charge
  | typeof homing
  | typeof melee
  | typeof shield

/** セミオート */
export const semi_auto = 'semi_auto' as const
/** フルオート */
export const full_auto = 'full_auto' as const
/** バースト */
export const burst = 'burst' as const
/** チャージ */
export const charge = 'charge' as const
/** 誘導兵装 */
export const homing = 'homing' as const
/** 近接武器 */
export const melee = 'melee' as const
/** シールド */
export const shield = 'shield' as const
