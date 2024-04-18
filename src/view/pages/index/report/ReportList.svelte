<script lang="ts">
  import type { Assembly, AssemblyProperty } from '~core/assembly/assembly'
  import i18n from "~view/i18n/define.ts";
  import type { ReportStatus } from '~view/pages/index/report/ReportItem.svelte'
  import ReportItem from '~view/pages/index/report/ReportItem.svelte'

  export let assembly: Assembly

  let reportItems: ReadonlyArray<{
    key: Exclude<keyof AssemblyProperty, 'withinEnOutput' | 'withinLoadLimit'>,
    status: ReportStatus
  }> = [
    { key: 'ap', status: 'normal' },
    { key: 'weight', status: 'normal' },
    { key: 'load', status: assembly.withinLoadLimit ? 'normal' : 'danger' },
    { key: 'loadLimit', status: assembly.withinLoadLimit ? 'normal' : 'danger' },
    { key: 'enLoad', status: assembly.withinEnOutput ? 'normal' : 'danger' },
    { key: 'enOutput', status: assembly.withinEnOutput ? 'normal' : 'danger' },
    { key: 'enSurplus', status: assembly.withinEnOutput ? 'normal' : 'danger' },
    { key: 'enSupplyEfficiency', status: assembly.withinEnOutput ? 'normal' : 'danger' },
    { key: 'enRechargeDelay', status: assembly.withinEnOutput ? 'normal' : 'danger' },
    { key: 'coam', status: 'normal' },
  ]

</script>

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
