<script lang="ts">
  import type { Assembly } from '~core/assembly/assembly'

  import i18n from "~view/i18n/define.ts";
  import { ReportAggregation } from '~view/pages/index/report/model/report'
  import ReportItem from '~view/pages/index/report/ReportItem.svelte'

  export let assembly: Assembly
  export let reportAggregation: ReportAggregation
</script>

{#each reportAggregation.blocks as block}
  <hr>
  <div>
    <div class="row mb-3">
      {#each block.reports as report}
        <ReportItem
          caption={$i18n.t(report.key, { ns: 'assembly' })}
          class="mb-3"
          value={assembly[report.key]}
          status={report.statusFor(assembly)}
        />
      {/each}
    </div>
  </div>
{/each}

<style scoped>
  hr:first-of-type {
    display: none;
  }
</style>
