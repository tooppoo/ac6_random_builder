
<script lang="ts">
  import {type Assembly, type AssemblyKey, createAssembly} from "~core/assembly/assembly.ts"
  import { getCandidates } from "~core/assembly/candidates.ts"
  import {excludeNotEquipped} from "~core/assembly/filter/filters.ts";
  import {LockedParts} from "~core/assembly/random/lock.ts";
  import { RandomAssembly } from "~core/assembly/random/random-assembly.ts"
  import {totalCoamNotOverMax, totalLoadNotOverMax} from "~core/assembly/random/validator/validators.ts";
  import { logger } from '~core/utils/logger.ts'

  import FilterOffCanvas from "~view/form/FilterOffCanvas.svelte";
  import {
    applyFilter, assemblyWithHeadParts,
    changePartsFilter, enableFilterOnAllParts,
    type FilterState,
    initialFilterState,
    toggleFilter
  } from "~view/index/interaction/filter.ts";

  import {armNotEquipped} from "~data/arm-units.ts";
  import {backNotEquipped} from "~data/back-units.ts";
  import {boosterNotEquipped} from "~data/booster.ts";
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
  const onChangeParts = <T extends keyof Assembly>(target: T) => (ev: CustomEvent) => {
    assembly[target] = ev.detail
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

  const onLock = (key: AssemblyKey) => (ev: CustomEvent<{ value: boolean }>) => {
    lockedParts = ev.detail.value
      ? lockedParts.lock(key, assembly[key])
      : lockedParts.unlock(key)
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
    <!-- UNIT -->
    <PartsSelectForm
      id="rightArmUnit"
      class="mb-3 mb-sm-4"
      caption="RIGHT ARM UNIT"
      tag="section"
      parts={candidates.rightArmUnit}
      selected={assembly.rightArmUnit}
      lock={lockedParts}
      filter={filter}
      on:toggle-lock={onLock('rightArmUnit')}
      on:toggle-filter={openFilter}
      on:change={onChangeParts('rightArmUnit')}
    />
    <PartsSelectForm
      id="leftArmUnit"
      class="mb-3 mb-sm-4"
      caption="LEFT ARM UNIT"
      tag="section"
      parts={candidates.leftArmUnit}
      selected={assembly.leftArmUnit}
      lock={lockedParts}
      filter={filter}
      on:toggle-lock={onLock('leftArmUnit')}
      on:toggle-filter={openFilter}
      on:change={onChangeParts('leftArmUnit')}
    />
    <PartsSelectForm
      id="rightBackUnit"
      class="mb-3 mb-sm-4"
      caption="RIGHT BACK UNIT"
      tag="section"
      parts={candidates.rightBackUnit}
      selected={assembly.rightBackUnit}
      lock={lockedParts}
      filter={filter}
      on:toggle-lock={onLock('rightBackUnit')}
      on:toggle-filter={openFilter}
      on:change={onChangeParts('rightBackUnit')}
    />
    <PartsSelectForm
      id="leftBackUnit"
      class="mb-3 mb-sm-4"
      caption="LEFT BACK UNIT"
      tag="section"
      parts={candidates.leftBackUnit}
      selected={assembly.leftBackUnit}
      lock={lockedParts}
      filter={filter}
      on:toggle-lock={onLock('leftBackUnit')}
      on:toggle-filter={openFilter}
      on:change={onChangeParts('leftBackUnit')}
    />
    <!-- FRAME -->
    <PartsSelectForm
      id="head"
      class="mb-3 mb-sm-4"
      caption="HEAD"
      tag="section"
      parts={candidates.head}
      selected={assembly.head}
      lock={lockedParts}
      filter={filter}
      on:toggle-lock={onLock('head')}
      on:toggle-filter={openFilter}
      on:change={onChangeParts('head')}
    />
    <PartsSelectForm
      id="core"
      class="mb-3 mb-sm-4"
      caption="CORE"
      tag="section"
      parts={candidates.core}
      selected={assembly.core}
      lock={lockedParts}
      filter={filter}
      on:toggle-lock={onLock('core')}
      on:toggle-filter={openFilter}
      on:change={onChangeParts('core')}
    />
    <PartsSelectForm
      id="arms"
      class="mb-3 mb-sm-4"
      caption="ARMS"
      tag="section"
      parts={candidates.arms}
      selected={assembly.arms}
      lock={lockedParts}
      filter={filter}
      on:toggle-lock={onLock('arms')}
      on:toggle-filter={openFilter}
      on:change={onChangeParts('arms')}
    />
    <PartsSelectForm
      id="legs"
      class="mb-3 mb-sm-4"
      caption="LEGS"
      tag="section"
      parts={candidates.legs}
      selected={assembly.legs}
      lock={lockedParts}
      filter={filter}
      on:toggle-lock={onLock('legs')}
      on:toggle-filter={openFilter}
      on:change={onChangeParts('legs')}
    />
    <!-- INNER -->
    <PartsSelectForm
      id="booster"
      class="mb-3 mb-sm-4"
      caption="BOOSTER"
      tag="section"
      parts={[...candidates.booster, boosterNotEquipped]}
      selected={assembly.booster}
      lock={lockedParts}
      filter={filter}
      on:toggle-lock={onLock('booster')}
      on:toggle-filter={openFilter}
      on:change={onChangeParts('booster')}
    />
    <PartsSelectForm
      id="fcs"
      class="mb-3 mb-sm-4"
      caption="FCS"
      tag="section"
      parts={candidates.fcs}
      selected={assembly.fcs}
      lock={lockedParts}
      filter={filter}
      on:toggle-lock={onLock('fcs')}
      on:toggle-filter={openFilter}
      on:change={onChangeParts('fcs')}
    />
    <PartsSelectForm
      id="generator"
      class="mb-3 mb-sm-4"
      caption="GENERATOR"
      tag="section"
      parts={candidates.generator}
      selected={assembly.generator}
      lock={lockedParts}
      filter={filter}
      on:toggle-lock={onLock('generator')}
      on:toggle-filter={openFilter}
      on:change={onChangeParts('generator')}
    />
    <!-- EXPANSION -->
    <PartsSelectForm
      id="expansion"
      caption="EXPANSION"
      tag="section"
      parts={candidates.expansion}
      selected={assembly.expansion}
      lock={lockedParts}
      filter={filter}
      on:toggle-lock={onLock('expansion')}
      on:toggle-filter={openFilter}
      on:change={onChangeParts('expansion')}
    />
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
      on:toggle-lock={onLock('legs')}
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
  on:check-filter={(ev) => {
    filter = changePartsFilter({ changed: ev.detail.target, state: filter })

    assembly = assemblyWithHeadParts(candidates)
  }}
/>
{/await }

<style>
  article {
    max-width: 1000px;
  }
</style>
