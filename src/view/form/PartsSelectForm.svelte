<script lang="ts">
  export let id: string
  export let caption: string
  export let parts: ReadonlyArray<{ readonly name: string }>

  export let tag = 'div'
</script>

<svelte:element this={tag}>
  <label for={id}>{caption}</label>
  <select id={id}>
    {#each parts as p}
      <option>{p.name}</option>
    {/each}
  </select>
</svelte:element>
