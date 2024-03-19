<script lang="ts">
  import {createEventDispatcher} from "svelte";
  import type {AssemblyKey} from "~core/assembly/assembly.ts";
  import type {LockedParts} from "~core/assembly/random/lock.ts";
  import type {BaseACParts} from "~data/types/base/types.ts";
  import LockBadge from "~view/status/badge/LockBadge.svelte";
  import StatusBadgeList from "~view/status/StatusBadgeList.svelte";

  export let id: AssemblyKey
  export let caption: string
  export let parts: readonly BaseACParts[]
  export let selected: BaseACParts
  export let tag = 'div'
  export let lock: LockedParts

  $: locked = lock.isLocking(id)

  // handler
  const onChange = () => {
    if (lock.isLocking(id)) return

    dispatch('change', selected)
  }
  const onToggleLock = () => {
    dispatch('toggle-lock', { value: !lock.isLocking(id) })
  }

  // setup
  const dispatch = createEventDispatcher<{
    change: BaseACParts,
    'toggle-lock': { value: boolean }
  }>()
</script>

<svelte:element this={tag} class={$$props.class + ' container'}>
  <div class="row text-start">
    <label
      for={id}
      class="col-12 col-sm-5 fs-4 d-flex justify-content-between"
    >
      {caption}
      <StatusBadgeList class="float-end">
        <LockBadge
          titleWhenLocked="このパーツは変更されません"
          titleWhenUnlocked="このパーツは変更されます"
          locked={lock.isLocking(id)}
          clickable={true}
          on:click={onToggleLock}
        />
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
