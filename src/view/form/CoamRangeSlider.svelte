<script lang="ts">
  import {createEventDispatcher} from "svelte";
  import type {ChangeEventHandler} from "svelte/elements";
  import {sum} from "~core/utils/array.ts";
  import {roundUpByRealPart} from "~core/utils/number.ts";
  import type {Candidates} from "~data/types/candidates.ts";

  export let candidates: Candidates

  const max = (() => {
    type WithPrice = Readonly<{ price: number }>
    const descByPrice = (a: WithPrice, b: WithPrice) => b.price - a.price
    const sort = <T extends WithPrice>(xs: readonly T[]): readonly T[] => [...xs].sort(descByPrice)

    const total = sum([
      sort(candidates.rightArmUnits)[0],
      sort(candidates.leftArmUnits)[0],
      sort(candidates.rightBackUnits)[0],
      sort(candidates.leftBackUnits)[0],
      sort(candidates.heads)[0],
      sort(candidates.cores)[0],
      sort(candidates.arms)[0],
      sort(candidates.legs)[0],
      sort(candidates.boosters)[0],
      sort(candidates.fcses)[0],
      sort(candidates.generators)[0],
    ].map(p => p.price))

    return roundUpByRealPart(1)(total)
  })()
  const dataList = (() => {
    const strMax = `${max}`
    const index = parseInt(strMax.replace(/0/g, ''))

    const unit = max / index

    return [...Array(index + 1)].map((_, i) => unit * i)
  })()

  let value: number = max

  const onChange: ChangeEventHandler<HTMLInputElement> = (ev) => {
    value = parseInt(ev.currentTarget.value)

    dispatch('change', { value })
  }

  const dispatch = createEventDispatcher<{ change: { value: number } }>()
</script>

<div id={$$props.id} class={$$props.class}>
  <label for="coam-range" class="current-max-value mx-auto input-group input-group-sm">
    <span id="current-max-coam-value" class="input-group-text">総COAM上限</span>
    <input
      type="number"
      class="form-control form-control-sm"
      aria-label="Max COAM input"
      aria-describedby="current-max-coam-value"
      min="0" max={max}
      value={value}
      step="1000"
      on:change={onChange}
    >
  </label>
  <input
    id="coam-range"
    type="range"
    class="form-range w-100"
    min="0" max={max}
    value={value}
    step="1000"
    on:change={onChange}
    list="coam-range-mark"
  />
  <datalist id="coam-range-mark" class="sp-only w-100">
    {#each dataList as v}
      <option value={v} label={`${v}`}>{v}</option>
    {/each}
  </datalist>
</div>

<style>
  .current-max-value {
      width: 220px;
  }

  datalist#coam-range-mark {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      writing-mode: vertical-lr;
  }
</style>