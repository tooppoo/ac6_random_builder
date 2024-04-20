<script lang="ts" context="module">
  export type ReportStatus = 'danger' | 'warning' | 'normal'
</script>
<script lang="ts">
  export let status: ReportStatus = 'normal'

  const textClass = (base: string, stat: ReportStatus) => {
    switch(stat) {
      case 'danger': return `${base} text-danger`
      case 'warning': return `${base} text-warning`
      case 'normal': return base
    }
  }

  $: captionClass = textClass('fs-4', status)
  $: valueClass = textClass('fs-5', status)
</script>

<div class={$$props.class}>
  <div class={captionClass}>{$$props.caption}</div>
  <div class={valueClass}>{$$props.value}</div>
</div>
