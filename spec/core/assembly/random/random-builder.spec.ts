import {tank} from "data/types/base/category";
import {booster, boosterNotEquipped} from "data/types/base/classification";
import {fc, it} from '@fast-check/vitest'
import {candidates} from "~core/assembly/candidates";
import {randomBuild} from "~core/assembly/random/random-builder";
import {describe} from 'vitest'

describe(randomBuild.name, () => {
  it.prop([
    fc.float({ min: 0, max: 1, noNaN: true, noDefaultInfinity: true }),
  ])('should build correct coupling booster and legs', (i) => {
    const actual = randomBuild(candidates, () => i)

    switch(actual.legs.category) {
      case tank:
        return actual.booster.classification === boosterNotEquipped
      default:
        return actual.booster.classification === booster
    }
  })
})
