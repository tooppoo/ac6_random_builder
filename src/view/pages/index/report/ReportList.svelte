<script lang="ts">
  import type { Assembly } from '~core/assembly/assembly'

  import { defaultReportAggregation } from '~view/pages/index/report/model/report'
  import ReportListEditor, { type SaveAggregation } from '~view/pages/index/report/ReportListEditor.svelte'
  import ReportListViewer from '~view/pages/index/report/ReportListViewer.svelte'

  // state
  export let assembly: Assembly

  let reportAggregation = defaultReportAggregation()
  let editing: boolean = false

  // handler
  function startEdit() {
    editing = true
  }
  function onSave({ detail }: CustomEvent<SaveAggregation>) {
    reportAggregation = detail.target
    editing = false
  }
  function onReset() {
    reportAggregation = reportAggregation
  }
</script>

{#if (editing)}
  <ReportListEditor
    assembly={assembly}
    reportAggregation={reportAggregation}
    on:save={onSave}
    on:reset={onReset}
  />
{:else}

  <ReportListViewer
    assembly={assembly}
    reportAggregation={reportAggregation}
    on:edit={startEdit}
  />
{/if}
