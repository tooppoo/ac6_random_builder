<script lang="ts">
  import Dropdown from "bootstrap/js/dist/dropdown";
  import type {Action} from "svelte/action";
  import {createEventDispatcher} from "svelte";
  import {sum} from "~core/utils/array.ts";
  import {roundUpByRealPart} from "~core/utils/number.ts";
  import type {Candidates} from "~data/types/candidates.ts";
  import RangeSlider from './base/RangeSlider.svelte'

  export let candidates: Candidates

  type WithWeight = Readonly<{ weight: number }>
  type Sort = <T extends WithWeight>(xs: readonly T[]) => readonly T[]

  const { max, min } = (() => {
    const desc: Sort = (xs) => xs.toSorted((a, b) => b.weight - a.weight)
    const asc: Sort = (xs) => xs.toSorted((a, b) => a.weight - b.weight)
    const total = (s: Sort): number => sum([
      s(candidates.rightArmUnits)[0],
      s(candidates.leftArmUnits)[0],
      s(candidates.rightBackUnits)[0],
      s(candidates.leftBackUnits)[0],
      s(candidates.heads)[0],
      s(candidates.cores)[0],
      s(candidates.arms)[0],
      s(candidates.boosters)[0],
      s(candidates.fcses)[0],
      s(candidates.generators)[0],
    ].map(x => x.weight))

    const max = total(desc)
    const min = total(asc)

    return { max: roundUpByRealPart(2)(max), min }
  })()

  let value: number = max

  const onChange = ({ detail }: CustomEvent<{ value: number }>) => {
    value = detail.value

    dispatch('change', detail)
  }

  const dispatch = createEventDispatcher<{ change: { value: number } }>()

  const dropdown: Action = (node) => {
    new Dropdown(node)
  }
</script>

<RangeSlider
  id="load" class={$$props.class}
  label="積載量上限"
  max={max}
  min={min}
  value={value}
  step={10}
  on:change={onChange}
>
  <div
    slot="label" let:labelId let:text
    id={labelId} class="dropdown input-group-text "
    use:dropdown
  >
    <span class="dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">
      {text}
    </span>
    <ul class="dropdown-menu">
      <li><button class="dropdown-item">Action</button></li>
      <li><button class="dropdown-item">Another action</button></li>
      <li><button class="dropdown-item">Something else here</button></li>
    </ul>
  </div>
</RangeSlider>

<style>
</style>
