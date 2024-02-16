import {armUnits} from 'data/arm-units'
import {arms} from 'data/arms'
import {backUnits} from 'data/back-units'
import {boosters} from 'data/booster'
import {cores} from 'data/cores'
import {notEquipped as expNotEquipped} from 'data/expansions'
import {fcses} from 'data/fces'
import {generators} from 'data/generators'
import {heads} from 'data/heads'
import {legs, TwoLegs} from 'data/legs'
import {notOverEnergyOutput} from 'src/core/assembly/random/validator/validators'
import {describe, expect, it} from 'vitest'

describe('validator', () => {
  describe('not over energy output', () => {
    const baseAssembly = {
      rightArmUnit: armUnits.find((u) => u.name.includes('RANSETSU-RF'))!,
      leftArmUnit: armUnits.find((u) => u.name.includes('RANSETSU-RF'))!,
      rightBackUnit: backUnits.find((b) => b.name.includes('SHAO-WEI'))!,
      leftBackUnit: backUnits.find((b) => b.name.includes('SHAO-WEI'))!,

      head: heads.find((h) => h.name === 'VE-44B')!,
      arms: arms.find((a) => a.name === 'VE-46A')!,
      legs: legs.find((a) => a.name.includes('CRAWLER'))! as TwoLegs,

      booster: boosters.find((b) => b.name.includes('BST-G1/P10'))!,
      fcs: fcses.find((f) => f.name.includes('WLT 001'))!,
      generator: generators.find((g) => g.name.includes('JOSO'))!,

      expansion: expNotEquipped,
    } as const

    describe(`base is ${JSON.stringify(baseAssembly)}`, () => {
      describe.each([
        {
          core: cores.find((c) => c.name.includes('JAILBREAK'))!,
          expected: false,
        },
        {
          core: cores.find((c) => c.name.includes('NACHTREIHER'))!,
          expected: false,
        },
        {core: cores.find((c) => c.name.includes('VP-40S'))!, expected: true},
      ])('when core is $a', ({core, expected}) => {
        it(`should return ${expected} by isSuccess`, () => {
          expect(
            notOverEnergyOutput.validate({...baseAssembly, core}).isSuccess,
          ).toBe(expected)
        })
      })
    })
  })
})
