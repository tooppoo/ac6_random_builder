<script lang="ts">
  import BaseStatusBadge from "~view/status/base/BaseStatusBadge.svelte";

  export let titleWhenLocked: string = ''
  export let titleWhenUnlocked: string = ''
  export let locked: boolean = true
  export let clickable: boolean = false

  $: classes = ['bi'].concat(locked ? 'bi-file-lock-fill' : 'bi-file-lock').join(' ')
  $: title = locked ? titleWhenLocked : titleWhenUnlocked
</script>

<BaseStatusBadge
  class={classes}
  data-clickable={clickable}
  title={title}
  clickable={clickable}
/>
