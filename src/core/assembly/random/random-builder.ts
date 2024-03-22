import {
  type Assembly,
  createAssembly,
  type RawAssembly,
} from '~core/assembly/assembly.ts'
import { random } from '~core/utils/array.ts'

import { type Booster, boosterNotEquipped } from '~data/booster.ts'
import { tank } from '~data/types/base/category.ts'
import { notEquipped } from '~data/types/base/classification.ts'
import type { Candidates } from '~data/types/candidates.ts'

import { LockedParts } from './lock.ts'

export type RandomBuildOption = Readonly<{
  randomizer?: () => number
  lockedParts?: LockedParts
}>

export const defaultRandomBuildOption: Required<RandomBuildOption> = {
  randomizer: () => Math.random(),
  lockedParts: LockedParts.empty,
}

export function randomBuild(
  candidates: Candidates,
  option: RandomBuildOption = defaultRandomBuildOption,
): Assembly {
  const { lockedParts, randomizer } = { ...defaultRandomBuildOption, ...option }

  /*
   * 「ロックからパーツを取得し、ロックされてなかった場合はランダム選択」という処理自体は
   *  ジェネリクスを活用することで単一の関数として共通化可能.
   *
   * 当初はその方法で実装していたが、結果として型定義の解析が非常に複雑になるらしく、
   * tscによるコンパイルで膨大なメモリが消費されるようになり、CIはおろかローカルですら
   * コンパイルが不可能になった（参考までに、16GBまでtscに割り当てても処理が完了せずOOMで中断）
   * 実例としては以下のジョブ.
   * https://github.com/tooppoo/ac6_assemble_tool/actions/runs/8343264527/job/22833141484
   *
   * 上記を回避するため、非常に冗長ながら処理を一元化せず、個別に処理を当てている.
   */

  const legs = lockedParts.get('legs', () =>
    random(lockedParts.filter('legs', candidates.legs), randomizer),
  )
  const base: Omit<RawAssembly, 'legs' | 'booster'> = {
    rightArmUnit: lockedParts.get('rightArmUnit', () =>
      random(
        lockedParts.filter('rightArmUnit', candidates.rightArmUnit),
        randomizer,
      ),
    ),
    leftArmUnit: lockedParts.get('leftArmUnit', () =>
      random(
        lockedParts.filter('leftArmUnit', candidates.leftArmUnit),
        randomizer,
      ),
    ),
    rightBackUnit: lockedParts.get('rightBackUnit', () =>
      random(
        lockedParts.filter('rightBackUnit', candidates.rightBackUnit),
        randomizer,
      ),
    ),
    leftBackUnit: lockedParts.get('leftBackUnit', () =>
      random(
        lockedParts.filter('leftBackUnit', candidates.leftBackUnit),
        randomizer,
      ),
    ),

    head: lockedParts.get('head', () =>
      random(lockedParts.filter('head', candidates.head), randomizer),
    ),
    core: lockedParts.get('core', () =>
      random(lockedParts.filter('core', candidates.core), randomizer),
    ),
    arms: lockedParts.get('arms', () =>
      random(lockedParts.filter('arms', candidates.arms), randomizer),
    ),

    fcs: lockedParts.get('fcs', () =>
      random(lockedParts.filter('fcs', candidates.fcs), randomizer),
    ),
    generator: lockedParts.get('generator', () =>
      random(lockedParts.filter('generator', candidates.generator), randomizer),
    ),

    expansion: lockedParts.get('expansion', () =>
      random(lockedParts.filter('expansion', candidates.expansion), randomizer),
    ),
  }

  switch (legs.category) {
    case tank:
      return createAssembly({ ...base, legs, booster: boosterNotEquipped })
    default: {
      const booster = lockedParts.get('booster', () =>
        random(lockedParts.filter('booster', candidates.booster), randomizer),
      )
      assertBoosterEquipped(booster)

      return createAssembly({
        ...base,
        legs,
        booster,
      })
    }
  }
}

function assertBoosterEquipped(
  b: RawAssembly['booster'],
): asserts b is Booster {
  if (b.classification === notEquipped)
    throw new Error(`${b.name} is not equipped`)

  return
}
