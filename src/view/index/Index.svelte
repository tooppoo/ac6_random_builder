
<script lang="ts">
  import {
    type Assembly,
    type AssemblyKey,
    assemblyKeys,
    type AssemblyProperty,
    createAssembly,
    spaceByWord
  } from "~core/assembly/assembly.ts"
  import { getCandidates } from "~core/assembly/candidates.ts"
  import {excludeNotEquipped, notUseHanger} from "~core/assembly/filter/filters.ts";
  import {LockedParts} from "~core/assembly/random/lock.ts";
  import { RandomAssembly } from "~core/assembly/random/random-assembly.ts"
  import {totalCoamNotOverMax, totalLoadNotOverMax} from "~core/assembly/random/validator/validators.ts";
  import { logger } from '~core/utils/logger.ts'

  import ErrorModal from "~view/components/modal/ErrorModal.svelte";
  import i18n from "~view/i18n/define.ts";
  import FilterByPartsOffCanvas from "~view/index/filter/FilterByPartsOffCanvas.svelte";
  import FilterForWholeOffCanvas from "~view/index/filter/FilterForWholeOffCanvas.svelte";
  import CoamRangeSlider from "~view/index/filter/range/CoamRangeSlider.svelte";
  import LoadRangeSlider from "~view/index/filter/range/LoadRangeSlider.svelte";
  import type {ChangePartsEvent, ToggleLockEvent} from "~view/index/form/PartsSelectForm.svelte";
  import {
    applyFilter, assemblyWithHeadParts,
    changePartsFilter, enableFilterOnAllParts,
    type FilterState,
    initialFilterState,
    toggleFilter
  } from "~view/index/interaction/filter.ts";
  import NavButton from "~view/index/layout/navbar/NavButton.svelte";

  import {armNotEquipped} from "~data/arm-units.ts";
  import {backNotEquipped} from "~data/back-units.ts";
  import type {Candidates} from "~data/types/candidates.ts";

  import appPackage from '~root/package.json'

  import PartsSelectForm from "./form/PartsSelectForm.svelte"
  import Navbar from "./layout/Navbar.svelte";
  import ToolSection from "./layout/ToolSection.svelte"
  import ReportItem from "./report/ReportItem.svelte"
  import type {ReportStatus} from "./report/ReportItem.svelte";

  const appVersion = appPackage.version
  const tryLimit = 3000

  // state
  let initialCandidates: Candidates
  let candidates: Candidates
  $: {
    if (initialCandidates && filter && assembly && lockedParts) {
      candidates = lockedParts.filter(applyFilter(initialCandidates, filter, { assembly }))
    }
  }

  let assembly: Assembly
  let randomAssembly = RandomAssembly.init({ limit: tryLimit })
  let lockedParts: LockedParts = LockedParts.empty
  let filter: FilterState
  let openWholeFilter: boolean

  let reportItems: readonly {
    key: Exclude<keyof AssemblyProperty, 'withinEnOutput' | 'withinLoadLimit'>,
    status: ReportStatus
  }[]
  $: {
    if (assembly) {
      reportItems = [
        { key: 'ap', status: 'normal' },
        { key: 'weight', status: 'normal' },
        { key: 'load', status: assembly.withinLoadLimit ? 'normal' : 'danger' },
        { key: 'loadLimit', status: assembly.withinLoadLimit ? 'normal' : 'danger' },
        { key: 'enLoad', status: assembly.withinEnOutput ? 'normal' : 'danger' },
        { key: 'enOutput', status: assembly.withinEnOutput ? 'normal' : 'danger' },
        { key: 'coam', status: 'normal' },
      ]
    }
  }

  let openErrorModal: boolean = false

  // handler
  const onChangeParts = ({ detail }: CustomEvent<ChangePartsEvent>) => {
    // @ts-expect-error TS2590
    assembly[detail.id] = detail.selected
    assembly = assembly
  }
  const onRandom = () => {
    try {
      assembly = randomAssembly.assemble(candidates, { lockedParts })
    } catch (e) {
      logger.error(e)

      openErrorModal = true
    }
  }

  const onLock = ({ detail }: CustomEvent<ToggleLockEvent>) => {
    lockedParts = detail.value
      ? lockedParts.lock(detail.id, assembly[detail.id])
      : lockedParts.unlock(detail.id)
  }

  const openFilter = (ev: CustomEvent<{ id: AssemblyKey }>) => {
    filter = toggleFilter(ev.detail.id, filter)
  }

  // setup
  const initialize = async () => {
    const version = await getCandidates('v1.06.1')

    initialCandidates = candidates = version.candidates
    filter = initialFilterState(initialCandidates)

    assembly = createAssembly({
      rightArmUnit: armNotEquipped,
      leftArmUnit: armNotEquipped,
      rightBackUnit: backNotEquipped,
      leftBackUnit: backNotEquipped,
      head: version.heads[0],
      core: version.cores[0],
      arms: version.arms[0],
      legs: version.legs[0],
      booster: version.boosters[0],
      fcs: version.fcses[0],
      generator: version.generators[0],
      expansion: version.expansions[0],
    })

    return version.version
  }
</script>

{#await initialize()}
  <div>loading...</div>
{:then version}
<Navbar>
  <NavButton
    slot="random"
    class="me-3"
    title={$i18n.t('command.random.description', { ns: 'page/index' })}
    on:click={onRandom}
  >
    <i slot="icon" class="bi bi-tools"></i>
    {$i18n.t('command.random.label', { ns: 'page/index' })}
  </NavButton>
  <NavButton
    slot="reset-lock"
    class="me-3"
    title={$i18n.t('command.resetLock.description', { ns: 'page/index' })}
    on:click={() => lockedParts = LockedParts.empty}
  >
    <i slot="icon" class="bi bi-unlock"></i>
    {$i18n.t('resetAllLock', { ns: 'lock' })}
  </NavButton>
  <NavButton
    slot="filter"
    title={$i18n.t('command.filterForWhole.description', { ns: 'page/index' })}
    on:click={() => openWholeFilter = true}
  >
    <i slot="icon" class="bi bi-filter-square"></i>
    {$i18n.t('filter', { ns: 'filter' })}
  </NavButton>
</Navbar>

<header class="text-center mt-5">
  <h1>
    ARMORED CORE Ⅵ<br class="sp-only">
    ASSEMBLY TOOL
  </h1>
  <h2>
    for {version}
  </h2>
</header>

<article class="container text-center p-3">
  <ToolSection id="candidates-form" class="my-4 w-100">
    {#each assemblyKeys() as key}
      <PartsSelectForm
        id={key}
        class="mb-3 mb-sm-4"
        caption={spaceByWord(key).toUpperCase()}
        tag="section"
        parts={candidates[key]}
        selected={assembly[key]}
        lock={lockedParts}
        filter={filter}
        on:toggle-lock={onLock}
        on:toggle-filter={openFilter}
        on:change={onChangeParts}
      />
    {/each}
  </ToolSection>

  <ToolSection id="assembly-report" class="container mw-100 mx-0 my-4 w-100">
    <div class="row mb-3">
      {#each reportItems as { key, status }}
        <ReportItem
          caption={$i18n.t(key, { ns: 'assembly' })}
          class="mb-3"
          value={assembly[key]}
          status={status}
        />
      {/each}
    </div>
  </ToolSection>
</article>

<footer class="text-center mb-3">
  <div>
    Created by <a href="https://linktr.ee/Philomagi">Philomagi</a>
  </div>
  <div>
    Source code is managed by <a href="https://github.com/tooppoo/ac6_assemble_tool/">Github</a>
  </div>
  <div>
    App Version v{appVersion}
  </div>
</footer>

<FilterByPartsOffCanvas
  open={filter.open}
  current={filter.current}
  on:toggle={(ev) => filter.open = ev.detail.open}
  on:check-filter={({ detail }) => {
    filter = changePartsFilter({ target: detail.target, state: filter })

    assembly = assemblyWithHeadParts(candidates)
  }}
/>
<FilterForWholeOffCanvas
  open={openWholeFilter}
  on:toggle={(ev) => openWholeFilter = ev.detail.open}
>
  <button
    id="exclude-all-not-equipped"
    on:click={() => {
        filter = enableFilterOnAllParts(excludeNotEquipped.name, filter)
        assembly = assemblyWithHeadParts(candidates)
      }}
    class="my-3 w-100 p-2"
  >
    {$i18n.t('excludeAllNotEquipped', { ns: 'filter' })}
  </button>
  <button
    id="not-use-hanger"
    on:click={() => {
        filter = enableFilterOnAllParts(notUseHanger.name, filter)
        assembly = assemblyWithHeadParts(candidates)
      }}
    class="my-3 w-100 p-2"
  >
    {$i18n.t('notUseAllHanger', { ns: 'filter' })}
  </button>
  <button
    id="reset-filter"
    on:click={() => filter = initialFilterState(initialCandidates)}
    class="my-3 w-100 p-2"
  >
    {$i18n.t('resetAllFilter', { ns: 'filter' })}
  </button>

  <CoamRangeSlider
    class="my-3 w-100"
    candidates={candidates}
    on:change={(ev) =>
        randomAssembly.addValidator('total-coam-limit', totalCoamNotOverMax(ev.detail.value))
      }
  />
  <LoadRangeSlider
    class="my-3 w-100"
    candidates={candidates}
    assembly={assembly}
    lock={lockedParts}
    on:change={(ev) =>
        randomAssembly = randomAssembly.addValidator('total-load-limit', totalLoadNotOverMax(ev.detail.value))
      }
    on:toggle-lock={onLock}
  />
</FilterForWholeOffCanvas>
{/await }
<ErrorModal
  id="index-error-modal"
  open={openErrorModal}
  on:close={() => openErrorModal = false}
>
  <svelte:fragment slot="title">
    Assemble Error
  </svelte:fragment>
  TEST
  <svelte:fragment slot="button">
    OK
  </svelte:fragment>
</ErrorModal>

<style>
  article {
    max-width: 1000px;
  }
</style>
