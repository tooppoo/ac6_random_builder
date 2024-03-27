<script lang="ts" context="module">
  import type {CurrentFilter} from "~view/pages/index/interaction/filter.ts";

  export type ToggleFilter = { open: boolean }
</script>
<script lang="ts">
  import {logger} from "~core/utils/logger.ts";

  import Margin from "~view/components/spacing/Margin.svelte";
  import EnableTypeFilter from "~view/pages/index/filter/filter-by-parts/EnableTypeFilter.svelte";
  import type {ChangeFilter} from "~view/pages/index/filter/filter-by-parts/event.ts";
  import FilterByPropertyTypeFilter from "~view/pages/index/filter/filter-by-parts/FilterByPropertyTypeFilter.svelte";

  import Offcanvas from "bootstrap/js/dist/offcanvas";
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
  function setOffcanvas(el: HTMLElement) {
    const offcanvas = new Offcanvas(el)

    el.addEventListener('hide.bs.offcanvas', () => {
      dispatch('toggle', { open: false })
    })

    toggle = (op: boolean) => {
      logger.debug({ current, open })

      op ? offcanvas.show() : offcanvas.hide()
    }
  }

  const dispatch = createEventDispatcher<{
    toggle: ToggleFilter
    'change-filter': ChangeFilter
  }>()
</script>

<div
  id={$$props.id || ''}
  class="offcanvas offcanvas-end"
  tabindex="-1"
  data-bs-scroll="true"
  data-bs-backdrop="false"
  aria-labelledby="offcanvasRightLabel"
  use:setOffcanvas
>
  <div class="offcanvas-header">
    <h5 class="offcanvas-title" id="offcanvasRightLabel">
      {`${current.name || ''} FILTER`}
    </h5>
    <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
  </div>
  <div class="offcanvas-body">
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
  </div>
</div>

<style>
  #offcanvasRightLabel {
      text-transform: uppercase;
  }
</style>