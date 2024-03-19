import { it, fc, test } from '@fast-check/vitest'
import { describe, expect } from 'vitest'
import { LockedParts } from '~core/assembly/random/lock.ts'
import { random } from '~core/utils/array.ts'
import { boosterNotEquipped } from '~data/booster.ts'
import { tank } from '~data/types/base/category.ts'
import { booster, notEquipped } from '~data/types/base/classification.ts'
import { candidates } from '~data/versions/v1.06.1.ts'
import { genAssembly, genAssemblyKeys, genLockedParts } from '~spec/helper.ts'

describe(LockedParts.name, () => {
  it.prop([genLockedParts()])(
    'list is same with lockedKeys',
    ({ lockedParts }) => {
      expect(lockedParts.list.length).toEqual(lockedParts.lockedKeys.length)
    },
  )
  test.prop(
    [
      genLockedParts(),
      genAssembly()
        .chain((a1) =>
          fc.record({
            a1: fc.constant(a1),
            a2: genAssembly(),
            key: genAssemblyKeys({ minLength: 1 }).map(random),
          }),
        )
        .filter(({ a1, a2, key }) => a1[key].name !== a2[key].name),
    ],
    {
      seed: 727061250,
      path: '2:12:3:2:0:2:0:2:0:0:0:12:35:2:4:2:2:2:3',
      endOnFailure: true,
    },
  )('lock state transition', ({ lockedParts }, { a1, a2, key }) => {
    const stat1 = lockedParts.lock(key, a1[key])
    expect(stat1.isLocking(key)).toBe(true)
    expect(stat1.lockedKeys).toContain(key)
    expect(stat1.get(key, () => a2[key])).toEqual(a1[key])

    const stat2 = lockedParts.unlock(key)
    expect(stat2.isLocking(key)).toBe(false)
    expect(stat2.lockedKeys).not.toContain(key)
    expect(stat2.get(key, () => a1[key])).toEqual(a1[key])

    const stat3 = lockedParts.lock(key, a2[key])
    expect(stat3.isLocking(key)).toBe(true)
    expect(stat3.lockedKeys).toContain(key)
    expect(stat3.get(key, () => a1[key])).toEqual(a2[key])

    const stat4 = lockedParts.lock(key, a1[key])
    expect(stat4.isLocking(key)).toBe(true)
    expect(stat4.lockedKeys).toContain(key)
    expect(stat4.get(key, () => a2[key])).toEqual(a1[key])
  })

  describe('when lock booster', () => {
    const genBooster = () =>
      fc.oneof(
        fc
          .integer({ min: 0, max: candidates.boosters.length - 1 })
          .map((i) => candidates.boosters[i]),
      )

    it.prop([
      genLockedParts(),
      fc.oneof(fc.constant(boosterNotEquipped), genBooster()),
    ])('not lock legs', ({ lockedParts }, booster) => {
      expect(lockedParts.lock('booster', booster).isLocking('legs')).toBe(false)
    })

    describe('with not-equipped', () => {
      it.prop([genLockedParts()])(
        'filter only tank legs',
        ({ lockedParts }) => {
          const filtered = lockedParts
            .lock('booster', boosterNotEquipped)
            .filter('legs', candidates.legs)

          expect(filtered.every((x) => x.category === tank)).toBe(true)
        },
      )
    })
    describe('with equipped', () => {
      it.prop([genLockedParts(), genBooster()])(
        'filter only two, four or reverse joint legs',
        ({ lockedParts }, booster) => {
          const filtered = lockedParts
            .lock('booster', booster)
            .filter('legs', candidates.legs)

          expect(filtered.every((x) => x.category !== tank)).toBe(true)
        },
      )
    })
  })

  describe('when lock legs', () => {
    const genLeg = () =>
      fc.oneof(
        fc
          .integer({ min: 0, max: candidates.legs.length - 1 })
          .map((i) => candidates.legs[i]),
      )

    it.prop([genLockedParts(), genLeg()])(
      'not lock booster',
      ({ lockedParts }, legs) => {
        expect(lockedParts.lock('legs', legs).isLocking('booster')).toBe(false)
      },
    )

    describe('with tank', () => {
      it.prop([
        genLockedParts(),
        genLeg().filter((l) => l.category === 'tank'),
      ])('booster should not be equipped', ({ lockedParts }, legs) => {
        const filtered = lockedParts
          .lock('legs', legs)
          .filter('booster', candidates.boosters)

        expect(filtered.every((x) => x.classification === notEquipped)).toBe(
          true,
        )
      })
    })
    describe('with not tank', () => {
      it.prop([
        genLockedParts(),
        genLeg().filter((l) => l.category !== 'tank'),
      ])('booster should not be equipped', ({ lockedParts }, legs) => {
        const filtered = lockedParts
          .lock('legs', legs)
          .filter('booster', candidates.boosters)

        expect(filtered.every((x) => x.classification === booster)).toBe(true)
      })
    })
  })
})
