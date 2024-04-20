<script lang="ts" context="module">
  export type SaveAggregation = Readonly<{ target: ReportAggregation }>
</script>
<script lang="ts">

  import type { Assembly } from '~core/assembly/assembly'
  import type { EmptyObject } from '~core/utils/type'

  import IconButton from '~view/components/button/IconButton.svelte'
  import i18n from "~view/i18n/define.ts";
  import { ReportAggregation, Report } from '~view/pages/index/report/model/report'
  import ReportItem from '~view/pages/index/report/ReportItem.svelte'

  import { createEventDispatcher } from 'svelte'

  // state
  export let assembly: Assembly
  export let reportAggregation: ReportAggregation

  let editingReportAggregation: ReportAggregation
  $: editingReportAggregation = reportAggregation

  function visibleStatus(report: Report): { class: string, title: string } {
    return report.show
      ? { title: '表示しない', class: 'bi-eye' }
      : { title: '表示する', class: 'bi-eye-slash' }
  }

  // handler
  function editReport(blockId: string, report: Report): void {
    editingReportAggregation = editingReportAggregation.updateReport(blockId, report)
  }
  function showAll() {
    editingReportAggregation = editingReportAggregation.showAll()
  }

  function onSave() {
    dispatch('save', { target: editingReportAggregation })
  }
  function onReset() {
    dispatch('reset', {})
  }

  const dispatch = createEventDispatcher<{
    save: SaveAggregation,
    reset: EmptyObject,
    showAll: SaveAggregation,
  }>()
</script>

<div class="d-flex justify-content-end">
  <IconButton
    id="show-all-report-status"
    class="bi bi-eye me-3"
    title={$i18n.t('command.report.showAll', { ns: 'page/index' })}
    clickable={true}
    on:click={showAll}
  />
  <IconButton
    id="reset-report-status"
    class="bi bi-arrow-counterclockwise me-3"
    title={$i18n.t('command.report.reset', { ns: 'page/index' })}
    clickable={true}
    on:click={onReset}
  />
  <IconButton
    id="save-report-status"
    class="bi bi-check-square-fill text-info me-3"
    title={$i18n.t('command.report.save', { ns: 'page/index' })}
    clickable={true}
    on:click={onSave}
  />
</div>
<hr>
{#each editingReportAggregation.allBlocks as block, i}
  {#if (i !== 0)}
    <hr>
  {/if}
  <div>
    <div class="row mb-3">
      {#each block.allReports as report}
        <div
          class="editable-report-item mb-3 col-6 col-sm-4 col-md-3"
          draggable="true"
        >
          <IconButton
            id={`toggle-visible-${report.key}`}
            class={`toggle-visible bi ${visibleStatus(report).class}`}
            title={visibleStatus(report).title}
            clickable={true}
            on:click={() => editReport(block.id, report.toggleShow())}
          />
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
    border: solid 0.5px;
    /* cursor: grab; */
  }
  /* .editable-report-item:hover {
    background-color: rgba(100, 100, 100, 0.5);
  } */
</style>