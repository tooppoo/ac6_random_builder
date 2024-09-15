<script lang="ts" context="module">
  import type {AssemblyKey} from "@ac6_assemble_tool/core/assembly/assembly";

  export type ToggleLock = { id: AssemblyKey, value: boolean }
</script>
<script lang="ts">
  import type {Assembly } from "@ac6_assemble_tool/core/assembly/assembly";
  import type {LockedParts} from "@ac6_assemble_tool/core/assembly/random/lock";
  import {sum} from "@ac6_assemble_tool/core/utils/array";
  import {roundUpByRealPart} from "@ac6_assemble_tool/core/utils/number";

  import i18n from '~view/i18n/define.ts'
  import RangeSlider from '~view/pages/index/filter/range/base/RangeSlider.svelte'
  import LockBadge from "~view/pages/index/form/status/badge/LockBadge.svelte";
  import StatusBadgeList from "~view/pages/index/form/status/StatusBadgeList.svelte";

  import type {Candidates} from "@ac6_assemble_tool/parts/types/candidates.ts";

  import Dropdown from "bootstrap/js/dist/dropdown";
  import {createEventDispatcher} from "svelte";
  import type {Action} from "svelte/action";

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
    dispatch('toggle-lock', { id: 'legs', value: !lock.isLocking('legs') })
  }

  // setup
  function getMinAndMax(): { max: number, min: number } {
    type WithWeight = Readonly<{ weight: number }>
    type Sort = <T extends WithWeight>(xs: readonly T[]) => readonly T[]

    const desc: Sort = (xs) => xs.toSorted((a, b) => b.weight - a.weight)
    const asc: Sort = (xs) => xs.toSorted((a, b) => a.weight - b.weight)
    const total = (s: Sort): number => sum([
      s(candidates.rightArmUnit)[0],
      s(candidates.leftArmUnit)[0],
      s(candidates.rightBackUnit)[0],
      s(candidates.leftBackUnit)[0],
      s(candidates.head)[0],
      s(candidates.core)[0],
      s(candidates.arms)[0],
      s(candidates.booster)[0],
      s(candidates.fcs)[0],
      s(candidates.generator)[0],
    ].map(x => x.weight))

    const max = total(desc)
    const min = total(asc)

    return { max: roundUpByRealPart(2)(max), min }
  }
  const dispatch = createEventDispatcher<{
    change: { value: number },
    'toggle-lock': ToggleLock,
  }>()

  const dropdown: Action = (node) => {
    new Dropdown(node)
  }
</script>

<RangeSlider
  id="load" class={$$props.class}
  label={$i18n.t('maxLoadLimit', { ns: 'filter' })}
  max={max}
  min={min}
  value={value}
  step={10}
  on:change={onChange}
>
  <StatusBadgeList class="ms-2" slot="status">
    {#if lock.isLocking('legs')}
      <LockBadge
        titleWhenLocked={
          $i18n.t('lock:locking', {
            part: $i18n.t('legs', { ns: 'assembly' })
          })
        }
        locked={true}
      />
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
            {
              $i18n.t('lock:unlockAt', {
                part: $i18n.t('legs', { ns: 'assembly' })
              })
            }
          {:else}
            {
              $i18n.t('lock:lockAt', {
                part: $i18n.t('legs', { ns: 'assembly' })
              })
            }
          {/if}
        </button>
      </li>
      <li>
        <button class="dropdown-item" on:click={onSetLoadLimit}>
          { $i18n.t('applyCurrentLegsLoadLimit', { ns: 'filter' }) }
        </button>
      </li>
    </ul>
  </div>
</RangeSlider>

<style>
</style>
