<script lang="ts">
  import type { Assembly } from '~core/assembly/assembly'

  import { defaultReportAggregation } from '~view/pages/index/report/model/report'
  import ReportListViewer from '~view/pages/index/report/ReportListViewer.svelte'

  export let assembly: Assembly

  let reportAggregation = defaultReportAggregation()
</script>

<ReportListViewer
  assembly={assembly}
  reportAggregation={reportAggregation}
/>
