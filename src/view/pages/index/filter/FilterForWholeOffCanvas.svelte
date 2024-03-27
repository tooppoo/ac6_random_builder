<script lang="ts" context="module">
  import type {Assembly} from "~core/assembly/assembly.ts";
  import type {LockedParts} from "~core/assembly/random/lock.ts";
  import type {RandomAssembly} from "~core/assembly/random/random-assembly.ts";
  
  import type {FilterState} from "~view/pages/index/interaction/filter.ts";

  import type {Candidates} from "~data/types/candidates.ts";

  export type ToggleFilter = { open: boolean }
  export type ApplyWhole = Partial<Readonly<{
    assembly: Assembly
    randomAssembly: RandomAssembly
    candidates: Candidates
    filter: FilterState
  }>>
</script>
<script lang="ts">
  import {excludeNotEquipped, notUseHanger} from "~core/assembly/filter/filters.ts";
  import {totalCoamNotOverMax, totalLoadNotOverMax} from "~core/assembly/random/validator/validators.ts";
  import {logger} from "~core/utils/logger.ts";

  import i18n from "~view/i18n/define.ts";
  import CoamRangeSlider from "~view/pages/index/filter/range/CoamRangeSlider.svelte";
  import type {ToggleLock} from "~view/pages/index/filter/range/LoadRangeSlider.svelte";
  import LoadRangeSlider from "~view/pages/index/filter/range/LoadRangeSlider.svelte";
  import {
    assemblyWithHeadParts,
    enableFilterOnAllParts, initialFilterState,
  } from "~view/pages/index/interaction/filter.ts";

  import Offcanvas from "bootstrap/js/dist/offcanvas";
  import {createEventDispatcher} from "svelte";

  export let open: boolean
  export let filter: FilterState
  export let assembly: Assembly
  export let initialCandidates: Candidates
  export let candidates: Candidates
  export let randomAssembly: RandomAssembly
  export let lockedParts: LockedParts

  let toggle: (op: boolean) => void = () => {}
  $: {
    toggle(open)
  }

  // handler
  const onApply = (param: Partial<ApplyWhole>) => {
    const event = {
      filter: param.filter || undefined,
      assembly: param.assembly || undefined,
      candidates: param.candidates || undefined,
      randomAssembly : param.randomAssembly || undefined,
    }

    dispatch('apply', event)

    logger.debug({ event, param })
  }

  // setup
  function setOffcanvas(el: HTMLElement) {
    const offcanvas = new Offcanvas(el)

    el.addEventListener('hide.bs.offcanvas', () => {
      dispatch('toggle', { open: false })
    })

    toggle = (op: boolean) => {
      op ? offcanvas.show() : offcanvas.hide()
    }
  }

  const dispatch = createEventDispatcher<{
    toggle: ToggleFilter
    apply: ApplyWhole
    'lock-legs': ToggleLock
  }>()
</script>

<div
  id={$$props.id || ''}
  class="offcanvas offcanvas-end"
  tabindex="-1"
  data-bs-scroll="true"
  data-bs-backdrop="true"
  aria-labelledby="offcanvasRightLabel"
  use:setOffcanvas
>
  <div class="offcanvas-header">
    <h5 class="offcanvas-title" id="offcanvasRightLabel">
      {$i18n.t('filter', { ns: 'filter' })}
    </h5>
    <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
  </div>
  <div class="offcanvas-body">
    <button
      id="exclude-all-not-equipped"
      on:click={() => onApply({
        filter: enableFilterOnAllParts(excludeNotEquipped.name, filter),
        assembly: assemblyWithHeadParts(candidates),
      })}
      class="my-3 w-100 p-2"
    >
      {$i18n.t('excludeAllNotEquipped', { ns: 'filter' })}
    </button>
    <button
      id="not-use-hanger"
      on:click={() => onApply({
        filter: enableFilterOnAllParts(notUseHanger.name, filter),
        assembly: assemblyWithHeadParts(candidates)
      })}
      class="my-3 w-100 p-2"
    >
      {$i18n.t('notUseAllHanger', { ns: 'filter' })}
    </button>
    <button
      id="reset-filter"
      on:click={() => onApply({ filter: initialFilterState(initialCandidates)})}
      class="my-3 w-100 p-2"
    >
      {$i18n.t('resetAllFilter', { ns: 'filter' })}
    </button>

    <CoamRangeSlider
      class="my-3 w-100"
      candidates={candidates}
      on:change={(ev) => onApply({
        randomAssembly: randomAssembly.addValidator('total-coam-limit', totalCoamNotOverMax(ev.detail.value)),
      })}
    />
    <LoadRangeSlider
      class="my-3 w-100"
      candidates={candidates}
      assembly={assembly}
      lock={lockedParts}
      on:change={(ev) => onApply({
        randomAssembly: randomAssembly.addValidator('total-load-limit', totalLoadNotOverMax(ev.detail.value))
      })}
      on:toggle-lock={(ev) => dispatch('lock-legs', ev.detail)}
    />
  </div>
</div>

<style>
</style>