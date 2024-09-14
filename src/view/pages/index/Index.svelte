
<script lang="ts">
  import {
    type Assembly,
    type AssemblyKey,
    assemblyKeys,
    spaceByWord
  } from "~core/assembly/assembly.ts"
  import { getCandidates } from "~core/assembly/candidates.ts"
  import {LockedParts} from "~core/assembly/random/lock.ts";
  import { RandomAssembly } from "~core/assembly/random/random-assembly.ts"
  import { logger } from '~core/utils/logger.ts'

  import LanguageForm from "~view/components/language/LanguageForm.svelte";
  import ErrorModal from "~view/components/modal/ErrorModal.svelte";
  import Margin from "~view/components/spacing/Margin.svelte";
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
  import { assemblyToSearch, searchToAssembly } from '~view/pages/index/interaction/share'
  import NavButton from "~view/pages/index/layout/navbar/NavButton.svelte";
  import ReportList from '~view/pages/index/report/ReportList.svelte'
  import ShareAssembly from '~view/pages/index/share/ShareAssembly.svelte'
  import StoreAssembly from "~view/pages/index/store/StoreAssembly.svelte";

  import {notEquipped} from "@ac6_assemble_tool/parts/types/base/category.ts";
  import {type Candidates, defineOrder, type OrderParts} from "@ac6_assemble_tool/parts/types/candidates.ts";

  import appPackage from '~root/package.json'

  import PartsSelectForm from "./form/PartsSelectForm.svelte"
  import Navbar from "./layout/Navbar.svelte";
  import ToolSection from "./layout/ToolSection.svelte"

  const appVersion = appPackage.version
  const regulation = 'v1.06.1'
  const tryLimit = 3000

  // state
  let initialCandidates: Candidates
  let candidates: Candidates
  let assembly: Assembly
  let randomAssembly = RandomAssembly.init({ limit: tryLimit })
  let lockedParts: LockedParts = LockedParts.empty
  let filter: FilterState

  let openWholeFilter: boolean = false
  let openShare: boolean = false
  let openAssemblyStore: boolean = false
  let errorMessage: string[] = []
  let browserBacking: boolean = false

  let orderParts: OrderParts

  $: {
    if (initialCandidates && filter && assembly && lockedParts) {
      try {
        logger.debug('update candidates', filter, lockedParts)

        updateCandidates()
      } catch (e) {
        logger.error(e)

        errorMessage = filterApplyErrorMessage(
          e instanceof UsableItemNotFoundError ? e : new Error(`${e}`), $i18n
        )
      }
    }
  }
  $: {
    if (assembly && initialCandidates && !browserBacking) {
      logger.debug('replace state', assemblyToSearch(assembly, initialCandidates))
      const url = new URL(location.href)
      const query = url.searchParams
      const assemblyQuery = assemblyToSearch(assembly, initialCandidates)

      assemblyQuery.forEach((v, k) => {
        query.set(k, v)
      })
      url.search = query.toString()

      history.pushState({}, '', url)
    }

    browserBacking = false
  }

  // handler
  const onChangeParts = ({ detail }: CustomEvent<ChangePartsEvent>) => {
    // @ts-expect-error TS2590
    assembly[detail.id] = detail.selected
    assembly = assembly
  }
  const onRandom = () => {
    try {
      logger.debug('on random', lockedParts, candidates.booster)
      const actualCandidates = (
        !lockedParts.isLocking('legs')
        && candidates.booster.length === 1
        && candidates.booster[0].category === notEquipped
      )
        // 脚部がロックされていないのに候補が未装備のみなら、たまたまタンク脚が選択されているだけなので
        // ランダムアセン時にブースターを制限する必要は無い
        // この処置が必要になるのはランダムアセン時のみなので、filterの処理には含めない
        ? { ...candidates, booster: initialCandidates.booster }
        : candidates

      assembly = randomAssembly.assemble(actualCandidates, { lockedParts })
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

  const buildAssemblyFromQuery = () => {
    assembly = searchToAssembly(new URL(location.href).searchParams, initialCandidates)
  }

  // setup
  const initialize = async () => {
    const version = await getCandidates(regulation)

    initialCandidates = candidates = version.candidates
    orderParts = defineOrder(version.orders)
    filter = initialFilterState(initialCandidates)

    buildAssemblyFromQuery()

    logger.debug('initialized', assembly)

    return version.version
  }
  window.addEventListener('popstate', () => {
    browserBacking = true
    buildAssemblyFromQuery()
  })
</script>

{#await initialize()}
  <div>loading...</div>
{:then version}
<Navbar>
  <NavButton
    id="random-assemble"
    class="me-3"
    title={$i18n.t('command.random.description', { ns: 'page/index' })}
    on:click={onRandom}
  >
    <i slot="icon" class="bi bi-tools"></i>
    {$i18n.t('command.random.label', { ns: 'page/index' })}
  </NavButton>
  <NavButton
    id="reset-lock"
    class="me-3"
    title={$i18n.t('command.resetLock.description', { ns: 'page/index' })}
    on:click={() => lockedParts = LockedParts.empty}
  >
    <i slot="icon" class="bi bi-unlock"></i>
    {$i18n.t('resetAllLock', { ns: 'lock' })}
  </NavButton>
  <NavButton
    id="open-whole-filter"
    class="me-3"
    title={$i18n.t('command.filterForWhole.description', { ns: 'page/index' })}
    on:click={() => openWholeFilter = true}
  >
    <i slot="icon" class="bi bi-filter-square"></i>
    {$i18n.t('filter', { ns: 'filter' })}
  </NavButton>
  <NavButton
    id="open-share"
    class="me-3"
    title={$i18n.t('share:caption')}
    on:click={() => openShare = true}
  >
    <i slot="icon" class="bi bi-share"></i>
    {$i18n.t('share:caption')}
  </NavButton>
  <NavButton
    id="open-assembly-store"
    title={$i18n.t('command.store.caption', { ns: 'page/index'})}
    on:click={() => openAssemblyStore = true}
  >
    <i slot="icon" class="bi bi-database"></i>
    {$i18n.t('command.store.caption', { ns: 'page/index'})}
  </NavButton>
</Navbar>

<header class="text-center mt-5">
  <h1>
    ARMORED CORE Ⅵ<br class="sp-only">
    ASSEMBLY TOOL
  </h1>
  <h2>
    for Regulation {version}
  </h2>
  <div>
    <LanguageForm />
  </div>
</header>

<article class="container text-center px-3">
  <ToolSection id="candidates-form" class="my-4 w-100">
    {#each assemblyKeys() as key}
      <PartsSelectForm
        id={key}
        class="mb-3 mb-sm-4"
        caption={spaceByWord(key).toUpperCase()}
        tag="section"
        parts={orderParts(key, candidates[key])}
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

  <ToolSection
    id="development-report"
    class="container mw-100 mx-0 my-4 w-100 text-center d-flex flex-column align-items-center"
  >
    <a
      class="d-block ms-1"
      href={import.meta.env.VITE_REPORT_REQUEST_URL}
      target="_blank"
    >
      {$i18n.t('report.request', { ns: 'page/index' })}
      <i class="bi bi-send" />
    </a>

    <Margin space={2} />

    <a
      class="d-block ms-1"
      href={import.meta.env.VITE_REPORT_BUG_URL}
      target="_blank"
    >
      {$i18n.t('report.bug', { ns: 'page/index' })}
      <i class="bi bi-send" />
    </a>
  </ToolSection>
</article>

<hr class="my-3" />

<footer class="text-center mb-3">
  <div>
    Created by <a id="link-to-linktr" href="https://linktr.ee/Philomagi">Philomagi</a>
  </div>
  <div>
    Source code is managed by <a id="link-to-src" href="https://github.com/tooppoo/ac6_assemble_tool/">Github</a>
  </div>
  <div>
    App Version v{appVersion}
  </div>
</footer>

<FilterByPartsOffCanvas
  id="filter-by-parts"
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
  id="filter-for-whole"
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
<ShareAssembly
  id="share-assembly"
  open={openShare}
  assembly={() => assembly}
  on:toggle={(e) => openShare = e.detail.open}
>
  <svelte:fragment slot="title">
    {$i18n.t('command.share.caption', { ns: 'page/index' })}
  </svelte:fragment>
</ShareAssembly>
<StoreAssembly
  id="store-assembly"
  open={openAssemblyStore}
  candidates={initialCandidates}
  assembly={assembly}
  on:toggle={(e) => openAssemblyStore = e.detail.open}
  on:apply={(e) => assembly = e.detail.assembly}
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
