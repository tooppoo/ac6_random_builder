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
      bind:value={selected}
      on:change={onChange}
    >
      {#each parts as p}
        <option value={p} selected={selected.name === p.name}>{p.name}</option>
      {/each}
    </select>
  </div>
</svelte:element>
