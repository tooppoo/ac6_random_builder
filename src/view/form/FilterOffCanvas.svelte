<script lang="ts" context="module">
  import type {CurrentFilter} from "src/view/index/interaction/filter.ts";

  export type ToggleFilter = { open: boolean }
  export type CheckFilter = {
    target: ReadonlyPartsFilterState
  }
</script>
<script lang="ts">
  import Offcanvas from "bootstrap/js/dist/offcanvas";
  import {createEventDispatcher} from "svelte";
  import type {ChangeEventHandler} from "svelte/elements";
  import type {ReadonlyPartsFilterState} from "~core/assembly/filter/base.ts";
  import {excludeNotEquipped} from "~core/assembly/filter/filters.ts";
  import {logger} from "~core/utils/logger.ts";

  export let open: boolean
  export let current: CurrentFilter

  let toggle: (op: boolean) => void = () => {}
  $: {
    toggle(open)
  }

  const captions = {
    [excludeNotEquipped.name]: '非武装を除外する',
  } as const

  // handle
  const onChecked = (target: ReadonlyPartsFilterState): ChangeEventHandler<HTMLInputElement> => (_e) => {
    logger.debug('filter-offcanvas-onChecked', { target, _e })

    dispatch('check-filter', { target })
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
    'check-filter': CheckFilter
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
      <div class="form-check">
        <input
          id={f.filter.name}
          class="form-check-input"
          type="checkbox"
          value=""
          checked={f.enabled}
          on:change={onChecked(f)}
        >
        <label class="form-check-label" for={f.filter.name}>
          {captions[f.filter.name]}
        </label>
      </div>
    {/each}
  </div>
</div>

<style>
  #offcanvasRightLabel {
      text-transform: uppercase;
  }
</style>