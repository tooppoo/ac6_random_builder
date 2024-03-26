<script lang="ts" context="module">
  import i18n from "~view/i18n/define.ts";
  import type {CurrentFilter} from "~view/pages/index/interaction/filter.ts";

  export type ToggleFilter = { open: boolean }
  export type CheckFilter = {
    target: ReadonlyPartsFilterState
  }
</script>
<script lang="ts">

  import type {ReadonlyPartsFilterState} from "~core/assembly/filter/filter-set.ts";
  import {logger} from "~core/utils/logger.ts";

  import Margin from "~view/components/spacing/Margin.svelte";

  import Offcanvas from "bootstrap/js/dist/offcanvas";
  import {createEventDispatcher} from "svelte";
  import type {ChangeEventHandler} from "svelte/elements";

  export let open: boolean
  export let current: CurrentFilter

  let toggle: (op: boolean) => void = () => {}
  $: {
    toggle(open)
  }

  // handle
  const onChecked = (target: ReadonlyPartsFilterState): ChangeEventHandler<HTMLInputElement> => (e) => {
    logger.debug('filter-offcanvas-onChecked', { target, e })

    dispatch('change-filter', {
      target: {
        ...target,
        enabled: !target.enabled,
      },
    })
  }
  const onSelected = <T extends ReadonlyPartsFilterState>(target: T): ChangeEventHandler<HTMLSelectElement> => (e) => {
    logger.debug('filter-offcanvas-onSelected', { target, e })

    if (target.filter.type.id !== 'filterByProperty') return

    const options = e.currentTarget.options
    let selected: typeof target.filter.type.value = []
    for (let i = 0; i < options.length; i++) {
      const item = options.item(i)
      item && item.selected && selected.push(item.value)
    }

    const t = {
      ...target,
      filter: {
        ...target.filter,
        type: {
          ...target.filter.type,
          value: selected,
        }
      },
      enabled: selected.length > 0,
    }

    dispatch('change-filter', { target: t })
  }
  const resetSelect = (target: ReadonlyPartsFilterState) => () => {
    if (target.filter.type.id !== 'filterByProperty') return

    const result = {
      ...target,
      filter: {
        ...target.filter,
        type: {
          ...target.filter.type,
          value: target.filter.type.whole,
        }
      },
      enabled: false,
    }

    dispatch('change-filter', { target: result })
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
    'change-filter': CheckFilter
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
            {$i18n.t(`filter:${f.filter.name}`)}
          </label>
        </div>
      {/if}
      {#if f.filter.type.id === 'filterByProperty'}
        {@const formId = `${current.id}-${f.filter.name}-multi-select`}
        <div class="d-flex">
          <label for={formId} class="d-flex align-items-center me-2">
            {$i18n.t(`filter:${f.filter.name}`)}
          </label>
          <select id={formId} class="form-select" multiple on:change={onSelected(f)}>
            {#each f.filter.type.whole as v}
              <option value={v}>
                {$i18n.t(`${f.filter.type.property}:${v}`)}
              </option>
            {/each}
          </select>
          <button class="ms-2" on:click={resetSelect(f)}>RESET</button>
        </div>
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