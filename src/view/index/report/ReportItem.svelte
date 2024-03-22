<script lang="ts">
  export let status: 'danger' | 'warning' | 'normal' = 'normal'
  type Status = typeof status

  const textClass = (base: string, stat: Status) => {
    switch(stat) {
      case 'danger': return `${base} text-danger`
      case 'warning': return `${base} text-warning`
      case 'normal': return base
    }
  }

  $: captionClass = textClass('fs-4', status)
  $: valueClass = textClass('fs-5', status)
</script>

<div class={$$props.class + ' col-6 col-sm-4 col-md-3'}>
  <div class={captionClass}>{$$props.caption}</div>
  <div class={valueClass}>{$$props.value}</div>
</div>
