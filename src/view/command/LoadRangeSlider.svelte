<script lang="ts">
  import {createEventDispatcher} from "svelte";
  import {sum} from "~core/utils/array.ts";
  import {roundUpByRealPart} from "~core/utils/number.ts";
  import type {Candidates} from "~data/types/candidates.ts";
  import CoamRangeSlider from './base/RangeSlider.svelte'

  export let candidates: Candidates

  const max = (() => {
    type WithWeight = Readonly<{ weight: number }>
    const descByPrice = (a: WithWeight, b: WithWeight) => b.weight - a.weight
    const sort = <T extends WithWeight>(xs: readonly T[]): readonly T[] => [...xs].sort(descByPrice)

    const total = sum([
      sort(candidates.rightArmUnits)[0],
      sort(candidates.leftArmUnits)[0],
      sort(candidates.rightBackUnits)[0],
      sort(candidates.leftBackUnits)[0],
      sort(candidates.heads)[0],
      sort(candidates.cores)[0],
      sort(candidates.arms)[0],
      sort(candidates.boosters)[0],
      sort(candidates.fcses)[0],
      sort(candidates.generators)[0],
    ].map(p => p.weight))

    return roundUpByRealPart(2)(total)
  })()

  let value: number = max

  const onChange = ({ detail }: CustomEvent<{ value: number }>) => {
    value = detail.value

    dispatch('change', detail)
  }

  const dispatch = createEventDispatcher<{ change: { value: number } }>()
</script>

<CoamRangeSlider
  id={$$props.id} class={$$props.class}
  label="積載量上限"
  max={max}
  value={value}
  step={10}
  on:change={onChange}
/>
