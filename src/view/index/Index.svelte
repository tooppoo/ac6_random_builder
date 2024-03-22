
<script lang="ts">
  import {type Assembly, type AssemblyKey, assemblyKeys, createAssembly, spaceByWord} from "~core/assembly/assembly.ts"
  import { getCandidates } from "~core/assembly/candidates.ts"
  import {excludeNotEquipped} from "~core/assembly/filter/filters.ts";
  import {LockedParts} from "~core/assembly/random/lock.ts";
  import { RandomAssembly } from "~core/assembly/random/random-assembly.ts"
  import {totalCoamNotOverMax, totalLoadNotOverMax} from "~core/assembly/random/validator/validators.ts";
  import { logger } from '~core/utils/logger.ts'

  import FilterOffCanvas from "~view/index/form/FilterOffCanvas.svelte";
  import type {ChangePartsEvent, ToggleLockEvent} from "~view/index/form/PartsSelectForm.svelte";
  import {
    applyFilter, assemblyWithHeadParts,
    changePartsFilter, enableFilterOnAllParts,
    type FilterState,
    initialFilterState,
    toggleFilter
  } from "~view/index/interaction/filter.ts";

  import {armNotEquipped} from "~data/arm-units.ts";
  import {backNotEquipped} from "~data/back-units.ts";
  import type {Candidates} from "~data/types/candidates.ts";

  import CoamRangeSlider from "./command/CoamRangeSlider.svelte";
  import LoadRangeSlider from "./command/LoadRangeSlider.svelte";
  import PartsSelectForm from "./form/PartsSelectForm.svelte"
  import ToolSection from "./layout/ToolSection.svelte"
  import ReportItem from "./report/ReportItem.svelte"

  import appPackage from '~root/package.json'

  const appVersion = appPackage.version
  const tryLimit = 3000

  // state
  let initialCandidates: Candidates
  let candidates: Candidates
  let assembly: Assembly
  let randomAssembly = RandomAssembly.init({ limit: tryLimit })
  let lockedParts: LockedParts = LockedParts.empty
  let filter: FilterState = initialFilterState()
  $: candidates = applyFilter(initialCandidates, filter)

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

      alert(`
        試行上限以内のランダム生成に失敗しました（試行上限: ${tryLimit}）
        条件を緩めると、成功の可能性が上がります
      `)
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
<header class="text-center mt-5">
  <h1>
    ARMORED CORE Ⅵ<br class="sp-only">
    ASSEMBLY TOOL
  </h1>
  <h3>
    for {version}
  </h3>
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

  <ToolSection id="assembly-command" class="my-4 w-100">
    <button
      id="generate-random"
      on:click={onRandom}
      class="my-3 w-100 p-2"
    >
      ランダムアセンブル
    </button>
    <button
      id="reset-lock"
      on:click={() => lockedParts = LockedParts.empty}
      class="my-3 w-100 p-2"
    >
      すべてのロックを解除
    </button>
    <button
      id="exclude-all-not-equipped"
      on:click={() => {
        filter = enableFilterOnAllParts(excludeNotEquipped.name, filter)
        assembly = assemblyWithHeadParts(candidates)
      }}
      class="my-3 w-100 p-2"
    >
      すべての非武装を除外
    </button>
    <button
      id="reset-filter"
      on:click={() => filter = initialFilterState()}
      class="my-3 w-100 p-2"
    >
      すべての絞り込みを解除
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
  </ToolSection>

  <ToolSection id="assembly-report" class="container mw-100 mx-0 my-4 w-100">
    <div class="row mb-3">
      <ReportItem
        caption="AP"
        class="mb-3"
        value={assembly.ap}
      />
      <ReportItem
        caption="総重量"
        class="mb-3"
        value={assembly.weight}
      />
      <ReportItem
        caption="積載量"
        class="mb-3"
        value={assembly.load}
        status={assembly.withinLoadLimit ? 'normal' : 'danger'}
      />
      <ReportItem
        caption="積載上限"
        class="mb-3"
        value={assembly.loadLimit}
        status={assembly.withinLoadLimit ? 'normal' : 'danger'}
      />
      <ReportItem
        caption="EN負荷"
        class="mb-3"
        value={assembly.enLoad}
        status={assembly.withinEnOutput ? 'normal' : 'danger'}
      />
      <ReportItem
        caption="EN出力"
        class="mb-3"
        value={assembly.enOutput}
        status={assembly.withinEnOutput ? 'normal' : 'danger'}
      />
      <ReportItem
        caption="総COAM"
        class="mb-3"
        value={assembly.coam}
      />
    </div>
  </ToolSection>
</article>

<footer class="text-center mb-3">
  <div>
    Created by <a href="https://linktr.ee/Philomagi">Philomagi</a>
  </div>
  <div>
    Source code is <a href="https://github.com/tooppoo/ac6_assemble_tool/">here</a>
  </div>
  <div>
    App Version v{appVersion}
  </div>
</footer>

<FilterOffCanvas
  open={filter.open}
  current={filter.current}
  on:toggle={(ev) => filter.open = ev.detail.open}
  on:check-filter={({ detail }) => {
    filter = changePartsFilter({ changed: detail.target, state: filter })

    assembly = assemblyWithHeadParts(candidates)
  }}
/>
{/await }

<style>
  article {
    max-width: 1000px;
  }
</style>
