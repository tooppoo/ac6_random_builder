
<script lang="ts">
  import { type Assembly, createAssembly } from "~core/assembly/assembly.ts";
  import { candidates as defaultCandidates } from "~core/assembly/candidates.ts";
  import {RandomAssembly} from "~core/assembly/random/random-assembly.ts";
  import PartsSelectForm from "./form/PartsSelectForm.svelte";
  import ToolSection from "./form/ToolSection.svelte";

  // state
  let candidates = defaultCandidates
  let assembly: Assembly = createAssembly({
    rightArmUnit: candidates.rightArmUnits[0],
    leftArmUnit: candidates.leftArmUnits[0],
    rightBackUnit: candidates.rightBackUnits[0],
    leftBackUnit: candidates.leftBackUnits[0],

    head: candidates.heads[0],
    core: candidates.cores[0],
    arms: candidates.arms[0],
    legs: candidates.legs[0],

    booster: candidates.boosters[0],
    fcs: candidates.fcses[0],
    generator: candidates.generators[0],

    expansion: candidates.expansions[0],
  })
  let randomAssembly = RandomAssembly.init()

  // handler
  const onChangeParts = <T extends keyof Assembly>(target: T) => (ev: CustomEvent) => {
    assembly[target] = ev.detail
    assembly = assembly
  }
  const onRandom = () => {
    assembly = randomAssembly.assemble(candidates)
  }
</script>

<header class="text-center mt-5">
  <h1>
    ARMORED CORE Ⅵ<br class="sp-only">
    ASSEMBLY TOOL
  </h1>
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

  <ToolSection id="assembly-tools" class="my-4">
    <button on:click={onRandom} class="w-75 p-2">ランダム生成</button>
  </ToolSection>

  <ToolSection id="assembly-view" class="my-4">
    <dl>
      <dt class="fs-3">AP</dt><dd class="fs-5">{assembly.ap}</dd>
      <dt class="fs-3">総重量</dt><dd class="fs-5">{assembly.weight}</dd>
    </dl>
  </ToolSection>
</article>

<footer class="text-center">
  <div>
    Created by <a href="https://linktr.ee/Philomagi">Philomagi</a>
  </div>
  <div>
    Source code is <a href="https://github.com/tooppoo/ac6_assemble_tool/">here</a>
  </div>
</footer>

<style>
  article {
    max-width: 800px;
  }
</style>
