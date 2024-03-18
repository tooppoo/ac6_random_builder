<script lang="ts">
  import {createEventDispatcher} from "svelte";
  import {sum} from "~core/utils/array.ts";
  import {roundUpByRealPart} from "~core/utils/number.ts";
  import type {Candidates} from "~data/types/candidates.ts";
  import RangeSlider from './base/RangeSlider.svelte'

  export let candidates: Candidates

  const max = (() => {
    type WithPrice = Readonly<{ price: number }>
    const sortDesc = <T extends WithPrice>(xs: readonly T[]): readonly T[] =>
      xs.toSorted((a: WithPrice, b: WithPrice) => b.price - a.price)

    const total = sum([
      sortDesc(candidates.rightArmUnits)[0],
      sortDesc(candidates.leftArmUnits)[0],
      sortDesc(candidates.rightBackUnits)[0],
      sortDesc(candidates.leftBackUnits)[0],
      sortDesc(candidates.heads)[0],
      sortDesc(candidates.cores)[0],
      sortDesc(candidates.arms)[0],
      sortDesc(candidates.legs)[0],
      sortDesc(candidates.boosters)[0],
      sortDesc(candidates.fcses)[0],
      sortDesc(candidates.generators)[0],
    ].map(p => p.price))

    return roundUpByRealPart(1)(total)
  })()

  let value: number = max

  const onChange = ({ detail }: CustomEvent<{ value: number }>) => {
    value = detail.value

    dispatch('change', detail)
  }

  const dispatch = createEventDispatcher<{ change: { value: number } }>()
</script>

<RangeSlider
  id="coam" class={$$props.class}
  label="総COAM上限"
  max={max}
  value={value}
  step={1000}
  on:change={onChange}
/>
