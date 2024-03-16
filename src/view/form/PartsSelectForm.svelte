<script lang="ts">
  import {createEventDispatcher} from "svelte";
  import type {BaseACParts} from "~data/types/base/types.ts";

  export let id: string
  export let caption: string
  export let parts: readonly BaseACParts[]
  export let selected: BaseACParts
  export let tag = 'div'

  const dispatch = createEventDispatcher<{ change: BaseACParts }>()

  const onChange = () => {
    dispatch('change', selected)
  }
</script>

<svelte:element this={tag}>
  <label for={id}>{caption}</label>
  <select id={id} bind:value={selected} on:change={onChange}>
    {#each parts as p}
      <option value={p} selected={selected.name === p.name}>{p.name}</option>
    {/each}
  </select>
</svelte:element>
