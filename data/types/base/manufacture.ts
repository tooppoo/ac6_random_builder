/**
 * パーツの製造企業
 */
export type Manufacture =
  | typeof baws
  | typeof elcano
  | typeof balam
  | typeof dafeng
  | typeof arquebus
  | typeof arquebus_add
  | typeof schneider
  | typeof rad
  | typeof rubicon_research_institute
  | typeof melinite
  | typeof vcpl
  | typeof takigawa
  | typeof furlong
  | typeof allmind

// ルビコン系
export const baws = 'baws' as const
export const elcano = 'elcano'  as const

// ベイラム系
export const balam = 'balam' as const
/** 大豊 */
export const dafeng = 'dafeng' as const

// アーキバス系
export const arquebus = 'arquebus' as const
export const arquebus_add = 'arquebus_add' as const
export const schneider = 'schneider' as const

// その他
export const rad = 'rad' as const
/** 技研 */
export const rubicon_research_institute = 'rubicon_research_institute' as const
export const melinite = 'melinite' as const
export const vcpl  = 'vcpl' as const
export const takigawa = 'takigawa' as const
/** ファーロン */
export const furlong = 'furlong' as const
export const allmind = 'allmind' as const
