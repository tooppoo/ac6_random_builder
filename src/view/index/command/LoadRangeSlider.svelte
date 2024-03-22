<script lang="ts">
  import type {AssemblyKey, Assembly } from "~core/assembly/assembly.js";
  import type {LockedParts} from "~core/assembly/random/lock.ts";
  import {sum} from "~core/utils/array.ts";
  import {roundUpByRealPart} from "~core/utils/number.ts";

  import i18n from '~view/i18n/define.ts'
  import LockBadge from "~view/index/status/badge/LockBadge.svelte";
  import StatusBadgeList from "~view/index/status/StatusBadgeList.svelte";

  import type {Candidates} from "~data/types/candidates.ts";

  import Dropdown from "bootstrap/js/dist/dropdown";
  import {createEventDispatcher} from "svelte";
  import type {Action} from "svelte/action";

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
    'toggle-lock': { id: AssemblyKey, value: boolean },
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
