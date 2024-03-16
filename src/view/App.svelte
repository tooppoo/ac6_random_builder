
<script lang="ts">
  import { candidates as c } from "~core/assembly/candidates.ts";
  import PartsSelectForm from "./form/PartsSelectForm.svelte";

  let candidates = c
</script>

<article class="container text-center">
  <h1>
    ARMORED CORE Ⅵ<br class="sp-only">
    ASSEMBLY TOOL
  </h1>
  <section id="candidates-form">
    <PartsSelectForm
      id="right-arm-unit"
      caption="RIGHT ARM UNIT"
      tag="section"
      parts={candidates.rightArmUnits}
    />
    <PartsSelectForm
      id="left-arm-unit"
      caption="LEFT ARM UNIT"
      tag="section"
      parts={candidates.leftArmUnits}
    />
    <PartsSelectForm
      id="right-back-unit"
      caption="RIGHT BACK UNIT"
      tag="section"
      parts={candidates.rightBackUnits}
    />
    <PartsSelectForm
      id="left-back-unit"
      caption="LEFT BACK UNIT"
      tag="section"
      parts={candidates.leftBackUnits}
    />

    <PartsSelectForm
      id="head"
      caption="HEAD"
      tag="section"
      parts={candidates.heads}
    />
    <PartsSelectForm
      id="core"
      caption="CORE"
      tag="section"
      parts={candidates.cores}
    />
    <PartsSelectForm
      id="arms"
      caption="ARMS"
      tag="section"
      parts={candidates.arms}
    />
    <PartsSelectForm
      id="legs"
      caption="LEGS"
      tag="section"
      parts={candidates.legs}
    />

    <PartsSelectForm
      id="booster"
      caption="BOOSTER"
      tag="section"
      parts={candidates.boosters}
    />
    <PartsSelectForm
      id="fcs"
      caption="FCS"
      tag="section"
      parts={candidates.fcses}
    />
    <PartsSelectForm
      id="generator"
      caption="GENERATOR"
      tag="section"
      parts={candidates.generators}
    />

    <PartsSelectForm
      id="expansion"
      caption="EXPANSION"
      tag="section"
      parts={candidates.expansions}
    />
  </section>
</article>

<style>
</style>
