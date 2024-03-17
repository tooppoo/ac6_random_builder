
<script lang="ts">
  import { type Assembly, createAssembly } from "~core/assembly/assembly.ts"
  import { getCandidates } from "~core/assembly/candidates.ts"
  import { RandomAssembly } from "~core/assembly/random/random-assembly.ts"
  import {totalCoamNotOverMax} from "~core/assembly/random/validator/validators.ts";
  import type {Candidates} from "~data/types/candidates.ts";
  import {version as v1_06_1} from "~data/versions/v1.06.1.ts";
  import CoamRangeSlider from "~view/form/CoamRangeSlider.svelte";
  import PartsSelectForm from "./form/PartsSelectForm.svelte"
  import ToolSection from "./form/ToolSection.svelte"
  import ReportItem from "./report/ReportItem.svelte"
  import appPackage from '~root/package.json'

  const appVersion = appPackage.version

  const initialize = async () => {
    const version = await getCandidates(v1_06_1)

    candidates = version.candidates
    assembly = createAssembly({
      rightArmUnit: version.armNotEquipped,
      leftArmUnit: version.armNotEquipped,
      rightBackUnit: version.backNotEquipped,
      leftBackUnit: version.backNotEquipped,
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

  // state
  let candidates: Candidates
  let assembly: Assembly
  let randomAssembly = RandomAssembly.init()

  // handler
  const onChangeParts = <T extends keyof Assembly>(target: T) => (ev: CustomEvent) => {
    assembly[target] = ev.detail
    assembly = assembly
  }
  const onRandom = () => {
    assembly = randomAssembly.assemble(candidates)
  }
  const onChangeMaxCoam = (ev: CustomEvent<{ value: number }>) => {
    randomAssembly = randomAssembly.addValidator('total-coam-limit', totalCoamNotOverMax(ev.detail.value))
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
  <ToolSection id="candidates-form" class="my-4">
    <!-- UNIT -->
    <PartsSelectForm
      id="right-arm-unit"
      class="mb-3"
      caption="RIGHT ARM UNIT"
      tag="section"
      parts={candidates.rightArmUnits}
      selected={assembly.rightArmUnit}
      on:change={onChangeParts('rightArmUnit')}
    />
    <PartsSelectForm
      id="left-arm-unit"
      class="mb-3"
      caption="LEFT ARM UNIT"
      tag="section"
      parts={candidates.leftArmUnits}
      selected={assembly.leftArmUnit}
      on:change={onChangeParts('leftArmUnit')}
    />
    <PartsSelectForm
      id="right-back-unit"
      class="mb-3"
      caption="RIGHT BACK UNIT"
      tag="section"
      parts={candidates.rightBackUnits}
      selected={assembly.rightBackUnit}
      on:change={onChangeParts('rightBackUnit')}
    />
    <PartsSelectForm
      id="left-back-unit"
      class="mb-3"
      caption="LEFT BACK UNIT"
      tag="section"
      parts={candidates.leftBackUnits}
      selected={assembly.leftBackUnit}
      on:change={onChangeParts('leftBackUnit')}
    />
    <!-- FRAME -->
    <PartsSelectForm
      id="head"
      class="mb-3"
      caption="HEAD"
      tag="section"
      parts={candidates.heads}
      selected={assembly.head}
      on:change={onChangeParts('head')}
    />
    <PartsSelectForm
      id="core"
      class="mb-3"
      caption="CORE"
      tag="section"
      parts={candidates.cores}
      selected={assembly.core}
      on:change={onChangeParts('core')}
    />
    <PartsSelectForm
      id="arms"
      class="mb-3"
      caption="ARMS"
      tag="section"
      parts={candidates.arms}
      selected={assembly.arms}
      on:change={onChangeParts('arms')}
    />
    <PartsSelectForm
      id="legs"
      class="mb-3"
      caption="LEGS"
      tag="section"
      parts={candidates.legs}
      selected={assembly.legs}
      on:change={onChangeParts('legs')}
    />
    <!-- INNER -->
    <PartsSelectForm
      id="booster"
      class="mb-3"
      caption="BOOSTER"
      tag="section"
      parts={candidates.boosters}
      selected={assembly.booster}
      on:change={onChangeParts('booster')}
    />
    <PartsSelectForm
      id="fcs"
      class="mb-3"
      caption="FCS"
      tag="section"
      parts={candidates.fcses}
      selected={assembly.fcs}
      on:change={onChangeParts('fcs')}
    />
    <PartsSelectForm
      id="generator"
      class="mb-3"
      caption="GENERATOR"
      tag="section"
      parts={candidates.generators}
      selected={assembly.generator}
      on:change={onChangeParts('generator')}
    />
    <!-- EXPANSION -->
    <PartsSelectForm
      id="expansion"
      class="mb-3"
      caption="EXPANSION"
      tag="section"
      parts={candidates.expansions}
      selected={assembly.expansion}
      on:change={onChangeParts('expansion')}
    />
  </ToolSection>

  <ToolSection id="assembly-command" class="my-4">
    <button
      id="generate-random"
      on:click={onRandom}
      class="my-3 mx-auto w-75 p-2"
    >
      ランダム生成
    </button>
    <CoamRangeSlider
      id="total-coam-range"
      class="my-3 mx-auto w-75"
      candidates={candidates}
      on:change={onChangeMaxCoam}
    />
  </ToolSection>

  <ToolSection id="assembly-report" class="my-4 container">
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
{/await }

<style>
  article {
    max-width: 800px;
  }
</style>
