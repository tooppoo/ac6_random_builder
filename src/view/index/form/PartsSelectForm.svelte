<script lang="ts" context="module">
  export type ChangePartsEvent = Readonly<{ id: AssemblyKey, selected: BaseACParts<Classification> }>
  export type ToggleLockEvent = Readonly<{ id: AssemblyKey, value: boolean }>
  export type ToggleFilterEvent = Readonly<{ id: AssemblyKey }>
</script>
<script lang="ts">
  import type {AssemblyKey} from "~core/assembly/assembly.ts";
  import type {LockedParts} from "~core/assembly/random/lock.ts";

  import i18n from "~view/i18n/define.ts";
  import FilterBadge from "~view/index/form/status/badge/FilterBadge.svelte";
  import LockBadge from "~view/index/form/status/badge/LockBadge.svelte";
  import StatusBadgeList from "~view/index/form/status/StatusBadgeList.svelte";
  import {anyFilterContain, anyFilterEnabled, type FilterState} from "~view/index/interaction/filter.ts";

  import type {Classification} from "~data/types/base/classification.ts";
  import type {BaseACParts} from "~data/types/base/types.ts";

  import {createEventDispatcher} from "svelte";

  export let id: AssemblyKey
  export let caption: string
  export let parts: readonly BaseACParts<Classification>[]
  export let selected: BaseACParts<Classification>
  export let tag = 'div'
  export let lock: LockedParts
  export let filter: FilterState

  $: {
    if (!parts.find(p => p.name === selected.name)) {
      dispatch('change', { id, selected: parts[0] })
    }
  }

  // handler
  const onChange = () => {
    if (lock.isLocking(id)) return

    dispatch('change', { id, selected })
  }
  const onToggleLock = () => {
    dispatch('toggle-lock', { id, value: !lock.isLocking(id) })
  }
  const onToggleFilter = () => {
    dispatch('toggle-filter', { id })
  }

  // setup
  const dispatch = createEventDispatcher<{
    change: ChangePartsEvent,
    'toggle-lock': ToggleLockEvent,
    'toggle-filter': ToggleFilterEvent,
  }>()

</script>

<svelte:element this={tag} class={($$props.class || '') + ' container'}>
  <div class="row text-start">
    <label
      for={id}
      class="p-0 col-12 col-sm-5 fs-4 d-flex justify-content-between"
    >
      {caption}
      <StatusBadgeList>
        <LockBadge
          titleWhenLocked={$i18n.t('locked', { ns: 'lock' })}
          titleWhenUnlocked={$i18n.t('unlocked', { ns: 'lock' })}
          locked={lock.isLocking(id)}
          clickable={true}
          on:click={onToggleLock}
        />
        {#if anyFilterContain(id, filter)}
          <FilterBadge
            title={$i18n.t('filterByParts.description', { ns: 'filter' })}
            applied={anyFilterEnabled(id, filter)}
            on:click={onToggleFilter}
          />
        {/if}
      </StatusBadgeList>
    </label>
    <select
      id={id}
      class="col-12 col-sm-7 fs-4"
      disabled={lock.isLocking(id)}
      bind:value={selected}
      on:change={onChange}
    >
      {#each parts as p}
        <option value={p} selected={selected.name === p.name}>{p.name}</option>
      {/each}
    </select>
  </div>
</svelte:element>
