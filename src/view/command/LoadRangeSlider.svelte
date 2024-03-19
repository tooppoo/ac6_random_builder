<script lang="ts">
  import Dropdown from "bootstrap/js/dist/dropdown";
  import type {Action} from "svelte/action";
  import {createEventDispatcher} from "svelte";
  import { type Assembly } from "~core/assembly/assembly.ts"
  import type {LockedParts} from "~core/assembly/random/lock.ts";
  import {sum} from "~core/utils/array.ts";
  import {roundUpByRealPart} from "~core/utils/number.ts";
  import type {Candidates} from "~data/types/candidates.ts";
  import LockBadge from "~view/status/badge/LockBadge.svelte";
  import StatusBadgeList from "~view/status/StatusBadgeList.svelte";
  import RangeSlider from './base/RangeSlider.svelte'

  // state
  export let candidates: Candidates
  export let assembly: Assembly
  export let lock: LockedParts

  const { max, min } = getMinAndMax()

  let value: number = max

  // handler
  const onChange = ({ detail }: CustomEvent<{ value: number }>) => {
    value = detail.value

    dispatch('change', detail)
  }
  const onSetLoadLimit = () => {
    value = assembly.loadLimit

    dispatch('change', { value })
  }
  const onToggleLock = () => {
    dispatch('toggle-lock', { value: !lock.isLocking('legs') })
  }

  // setup
  function getMinAndMax(): { max: number, min: number } {
    type WithWeight = Readonly<{ weight: number }>
    type Sort = <T extends WithWeight>(xs: readonly T[]) => readonly T[]

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
  }
  const dispatch = createEventDispatcher<{
    change: { value: number },
    'toggle-lock': { value: boolean },
  }>()

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
  <StatusBadgeList class="ms-2" slot="status">
    {#if lock.isLocking('legs')}
      <LockBadge titleWhenLocked="脚部を固定しています" locked={true} />
    {/if}
  </StatusBadgeList>
  <div
    slot="label" let:labelId let:text
    id={labelId} class="dropdown input-group-text "
    use:dropdown
  >
    <span class="dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">
      {text}
    </span>
    <ul class="dropdown-menu">
      <li>
        <button class="dropdown-item" on:click={onToggleLock}>
          {#if lock.isLocking('legs')}
            脚部固定を解除
          {:else}
            脚部を固定
          {/if}
        </button>
      </li>
      <li><button class="dropdown-item" on:click={onSetLoadLimit}>脚部の積載上限を適用</button></li>
    </ul>
  </div>
</RangeSlider>

<style>
</style>
