<script lang="ts">
  import { defaultReportAggregation } from '$lib/view/index/report/model/report'
  import ReportListEditor, {
    type SaveAggregation,
  } from '$lib/view/index/report/ReportListEditor.svelte'
  import ReportListViewer from '$lib/view/index/report/ReportListViewer.svelte'

  import type { Assembly } from '@ac6_assemble_tool/core/assembly/assembly'

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

{#if editing}
  <ReportListEditor
    {assembly}
    {reportAggregation}
    on:save={onSave}
    on:reset={onReset}
  />
{:else}
  <ReportListViewer {assembly} {reportAggregation} on:edit={startEdit} />
{/if}
