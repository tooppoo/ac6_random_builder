<script lang="ts" context="module">
  import type {ToggleOffCanvas} from '~view/components/off-canvas/OffCanvas.svelte'
  import type {CurrentFilter} from "~view/pages/index/interaction/filter";

  export type ToggleFilter = ToggleOffCanvas
</script>
<script lang="ts">
  import OffCanvas from '~view/components/off-canvas/OffCanvas.svelte'
  import Margin from "~view/components/spacing/Margin.svelte";
  import EnableTypeFilter from "~view/pages/index/filter/filter-by-parts/EnableTypeFilter.svelte";
  import type {ChangeFilter} from "~view/pages/index/filter/filter-by-parts/event";
  import FilterByPropertyTypeFilter from "~view/pages/index/filter/filter-by-parts/FilterByPropertyTypeFilter.svelte";

  import {createEventDispatcher} from "svelte";

  export let open: boolean
  export let current: CurrentFilter

  let toggle: (op: boolean) => void = () => {}
  $: {
    toggle(open)
  }

  // handle
  const onChangeFilter = (e: CustomEvent<ChangeFilter>) => {
    dispatch('change-filter', e.detail)
  }

  // setup
  const dispatch = createEventDispatcher<{
    toggle: ToggleFilter
    'change-filter': ChangeFilter
  }>()
</script>

<OffCanvas
  id={$$props.id || ''}
  open={open}
  on:toggle={(e) => dispatch('toggle', e.detail)}
>
  <svelte:fragment slot="title">
    <span class="text-uppercase">
      {`${current.name || ''} FILTER`}
    </span>
  </svelte:fragment>
  <svelte:fragment slot="body">
    {#each current.filter.list as f}
      {#if f.filter.type.id === 'enable'}
        <EnableTypeFilter
          state={f}
          on:change-filter={onChangeFilter}
        />
      {/if}
      {#if f.filter.type.id === 'filterByProperty'}
        <FilterByPropertyTypeFilter
          current={current}
          state={f}
          on:change-filter={onChangeFilter}
        />
      {/if}
      <Margin space={4} />
    {/each}
  </svelte:fragment>
</OffCanvas>
