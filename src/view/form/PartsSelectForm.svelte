<script lang="ts">
  import type {AssemblyKey} from "~core/assembly/assembly.ts";
  import type {LockedParts} from "~core/assembly/random/lock.ts";

  import {anyFilterContain, anyFilterEnabled, type FilterState} from "~view/index/interaction/filter.ts";
  import FilterBadge from "~view/status/badge/FilterBadge.svelte";
  import LockBadge from "~view/status/badge/LockBadge.svelte";
  import StatusBadgeList from "~view/status/StatusBadgeList.svelte";

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

  // handler
  const onChange = () => {
    if (lock.isLocking(id)) return

    dispatch('change', selected)
  }
  const onToggleLock = () => {
    dispatch('toggle-lock', { value: !lock.isLocking(id) })
  }
  const onToggleFilter = () => {
    dispatch('toggle-filter', { id })
  }

  // setup
  const dispatch = createEventDispatcher<{
    change: BaseACParts<Classification>,
    'toggle-lock': { value: boolean },
    'toggle-filter': { id: AssemblyKey },
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
          titleWhenLocked="このパーツは変更されません"
          titleWhenUnlocked="このパーツは変更されます"
          locked={lock.isLocking(id)}
          clickable={true}
          on:click={onToggleLock}
        />
        {#if anyFilterContain(id, filter)}
          <FilterBadge
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
