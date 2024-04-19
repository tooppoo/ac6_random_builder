<script lang="ts">
  import type { Assembly } from '~core/assembly/assembly'
  import IconButton from '~view/components/button/IconButton.svelte'
  import i18n from '~view/i18n/define'

  import { defaultReportAggregation } from '~view/pages/index/report/model/report'
  import ReportListEditor from '~view/pages/index/report/ReportListEditor.svelte'
  import ReportListViewer from '~view/pages/index/report/ReportListViewer.svelte'

  // state
  export let assembly: Assembly

  let reportAggregation = defaultReportAggregation()
  let editing: boolean = false

  // handler
  function toggleReport() {
    editing = !editing
  }
</script>


{#if (editing)}
  <div class="d-flex justify-content-end">
    <IconButton
      id="edit-report"
      class="bi bi-arrow-counterclockwise fs-2 me-3"
      title={$i18n.t('command.report.reset', { ns: 'page/index' })}
      clickable={true}
    />
    <IconButton
      id="edit-report"
      class="bi bi-check-square-fill text-info fs-2 me-3"
      title={$i18n.t('command.report.save', { ns: 'page/index' })}
      clickable={true}
      on:click={toggleReport}
    />
  </div>
  <hr>
  <ReportListEditor
    assembly={assembly}
    reportAggregation={reportAggregation}
  />
{:else}
  <div class="d-flex justify-content-end">
    <IconButton
      id="edit-report"
      class="bi bi-pencil-square fs-2 me-3"
      title={$i18n.t('command.report.edit', { ns: 'page/index' })}
      clickable={true}
      on:click={toggleReport}
    />
  </div>
  <hr>
  <ReportListViewer
    assembly={assembly}
    reportAggregation={reportAggregation}
  />
{/if}
