<script lang="ts">
  import type { Assembly } from '~core/assembly/assembly'

  import i18n from "~view/i18n/define.ts";
  import { ReportAggregation } from '~view/pages/index/report/model/report'
  import ReportItem from '~view/pages/index/report/ReportItem.svelte'

  export let assembly: Assembly
  export let reportAggregation: ReportAggregation
</script>

{#each reportAggregation.blocks as block, i}
  {#if (i !== 0)}
    <hr>
  {/if}
  <div>
    <div class="row mb-3">
      {#each block.reports as report}
        <div
          class="editable-report-item mb-3 col-6 col-sm-4 col-md-3"
          draggable="true"
        >
          <ReportItem
            caption={$i18n.t(report.key, { ns: 'assembly' })}
            value={assembly[report.key]}
            status={report.statusFor(assembly)}
          />
        </div>
      {/each}
    </div>
  </div>
{/each}

<style scoped>
  .editable-report-item {
    cursor: grab;
  }
  .editable-report-item:hover {
    background-color: rgba(100, 100, 100, 0.5);
  }
</style>