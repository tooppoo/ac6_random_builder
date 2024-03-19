<script lang="ts">
  import {createEventDispatcher} from "svelte";
  import type {AssemblyKey} from "~core/assembly/assembly.ts";
  import type {LockedParts} from "~core/assembly/random/lock.ts";
  import type {BaseACParts} from "~data/types/base/types.ts";

  export let id: AssemblyKey
  export let caption: string
  export let parts: readonly BaseACParts[]
  export let selected: BaseACParts
  export let tag = 'div'
  export let lock: LockedParts

  // handler
  const onChange = () => {
    if (lock.isLocking(id)) return

    dispatch('change', selected)
  }

  // setup
  const dispatch = createEventDispatcher<{ change: BaseACParts }>()
</script>

<svelte:element this={tag} class={$$props.class + ' container'}>
  <div class="row">
    <label
      for={id}
      class="col-12 col-sm-5 fs-4"
    >
      {caption}
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
