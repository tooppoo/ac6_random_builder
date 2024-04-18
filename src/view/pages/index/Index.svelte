
<script lang="ts">
  import {
    type Assembly,
    type AssemblyKey,
    assemblyKeys,
    createAssembly,
    spaceByWord
  } from "~core/assembly/assembly.ts"
  import { getCandidates } from "~core/assembly/candidates.ts"
  import {LockedParts} from "~core/assembly/random/lock.ts";
  import { RandomAssembly } from "~core/assembly/random/random-assembly.ts"
  import { logger } from '~core/utils/logger.ts'

  import ErrorModal from "~view/components/modal/ErrorModal.svelte";
  import i18n from "~view/i18n/define.ts";
  import FilterByPartsOffCanvas from "~view/pages/index/filter/FilterByPartsOffCanvas.svelte";
  import FilterForWholeOffCanvas from "~view/pages/index/filter/FilterForWholeOffCanvas.svelte";
  import type {ChangePartsEvent, ToggleLockEvent} from "~view/pages/index/form/PartsSelectForm.svelte";
  import {assemblyErrorMessage, filterApplyErrorMessage} from "~view/pages/index/interaction/error-message.ts";
  import {
    applyFilter, assemblyWithHeadParts,
    changePartsFilter,
    type FilterState,
    initialFilterState,
    toggleFilter, UsableItemNotFoundError
  } from "~view/pages/index/interaction/filter.ts";
  import NavButton from "~view/pages/index/layout/navbar/NavButton.svelte";
  import ReportList from '~view/pages/index/report/ReportList.svelte'

  import {armNotEquipped} from "~data/arm-units.ts";
  import {backNotEquipped} from "~data/back-units.ts";
  import type {Candidates} from "~data/types/candidates.ts";

  import appPackage from '~root/package.json'

  import PartsSelectForm from "./form/PartsSelectForm.svelte"
  import Navbar from "./layout/Navbar.svelte";
  import ToolSection from "./layout/ToolSection.svelte"

  const appVersion = appPackage.version
  const tryLimit = 3000

  // state
  let initialCandidates: Candidates
  let candidates: Candidates
  let assembly: Assembly
  let randomAssembly = RandomAssembly.init({ limit: tryLimit })
  let lockedParts: LockedParts = LockedParts.empty
  let filter: FilterState
  let openWholeFilter: boolean

  $: {
    if (initialCandidates && filter && assembly && lockedParts) {
      try {
        logger.debug('update candidates')

        updateCandidates()
      } catch (e) {
        logger.error(e)

        errorMessage = filterApplyErrorMessage(
          e instanceof UsableItemNotFoundError ? e : new Error(`${e}`), $i18n
        )
      }
    }
  }

  let errorMessage: string[] = []

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

      errorMessage = assemblyErrorMessage(
        e instanceof Error ? e : new Error(`${e}`),
        $i18n
      )
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

  const updateCandidates = () => {
    candidates = lockedParts.filter(applyFilter(initialCandidates, filter, { assembly, wholeFilter: filter.map }))
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
    <ReportList
      assembly={assembly}
    />
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
  on:change-filter={({ detail }) => {
    filter = changePartsFilter({ target: detail.target, state: filter })
    updateCandidates()
    assembly = assemblyWithHeadParts(candidates)
  }}
/>
<FilterForWholeOffCanvas
  open={openWholeFilter}
  initialCandidates={initialCandidates}
  candidates={candidates}
  assembly={assembly}
  lockedParts={lockedParts}
  filter={filter}
  randomAssembly={randomAssembly}
  on:toggle={(ev) => openWholeFilter = ev.detail.open}
  on:lock-legs={onLock}
  on:apply={({ detail }) => {
    if (detail.candidates) candidates = detail.candidates
    if (detail.assembly) assembly = detail.assembly
    if (detail.filter) filter = detail.filter
    if (detail.randomAssembly) randomAssembly = detail.randomAssembly
  }}
/>
{/await }
<ErrorModal
  id="index-error-modal"
  open={errorMessage.length !== 0}
  on:close={() => errorMessage = []}
>
  <svelte:fragment slot="title">
    ERROR
  </svelte:fragment>
  <svelte:fragment slot="button">
    OK
  </svelte:fragment>

  {#each errorMessage as row}
    {row}<br>
  {/each}
</ErrorModal>

<style>
  article {
    max-width: 1000px;
  }
</style>
