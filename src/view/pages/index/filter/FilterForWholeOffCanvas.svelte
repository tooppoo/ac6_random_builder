<script lang="ts" context="module">
  import type {Assembly} from "~core/assembly/assembly.ts";
  import type {LockedParts} from "~core/assembly/random/lock.ts";
  import type {RandomAssembly} from "~core/assembly/random/random-assembly.ts";
  
  import type {ToggleOffCanvas} from '~view/components/off-canvas/OffCanvas.svelte'
  import type {FilterState} from "~view/pages/index/interaction/filter.ts";

  import type {Candidates} from "@ac6_assemble_tool/parts/types/candidates.ts";

  export type ToggleFilter = ToggleOffCanvas
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

  import TextButton from "~view/components/button/TextButton.svelte";
  import OffCanvas from '~view/components/off-canvas/OffCanvas.svelte'
  import i18n from "~view/i18n/define.ts";
  import CoamRangeSlider from "~view/pages/index/filter/range/CoamRangeSlider.svelte";
  import type {ToggleLock} from "~view/pages/index/filter/range/LoadRangeSlider.svelte";
  import LoadRangeSlider from "~view/pages/index/filter/range/LoadRangeSlider.svelte";
  import {
    assemblyWithHeadParts,
    enableFilterOnAllParts, initialFilterState,
  } from "~view/pages/index/interaction/filter.ts";

  import {createEventDispatcher} from "svelte";

  export let open: boolean
  export let filter: FilterState
  export let assembly: Assembly
  export let initialCandidates: Candidates
  export let candidates: Candidates
  export let randomAssembly: RandomAssembly
  export let lockedParts: LockedParts

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
  const dispatch = createEventDispatcher<{
    toggle: ToggleFilter
    apply: ApplyWhole
    'lock-legs': ToggleLock
  }>()
</script>

<OffCanvas
  id={$$props.id || ''}
  open={open}
  on:toggle={(e) => dispatch('toggle', e.detail)}
>
  <svelte:fragment slot="title">
    {$i18n.t('filter', { ns: 'filter' })}
  </svelte:fragment>
  <svelte:fragment slot="body">
    <TextButton
      id="exclude-all-not-equipped"
      on:click={() => onApply({
        filter: enableFilterOnAllParts(excludeNotEquipped.name, filter),
        assembly: assemblyWithHeadParts(candidates),
      })}
      class="my-3 w-100 p-2"
    >
      {$i18n.t('excludeAllNotEquipped', { ns: 'filter' })}
    </TextButton>
    <TextButton
      id="not-use-hanger"
      on:click={() => onApply({
        filter: enableFilterOnAllParts(notUseHanger.name, filter),
        assembly: assemblyWithHeadParts(candidates)
      })}
      class="my-3 w-100 p-2"
    >
      {$i18n.t('notUseAllHanger', { ns: 'filter' })}
    </TextButton>
    <TextButton
      id="reset-filter"
      on:click={() => onApply({ filter: initialFilterState(initialCandidates)})}
      class="my-3 w-100 p-2"
    >
      {$i18n.t('resetAllFilter', { ns: 'filter' })}
    </TextButton>

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
  </svelte:fragment>
</OffCanvas>

<style>
</style>