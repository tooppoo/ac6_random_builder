<script lang="ts">
  import BaseStatusBadge from "~view/index/status/base/BaseStatusBadge.svelte";

  import {createEventDispatcher} from "svelte";

  export let titleWhenLocked: string = ''
  export let titleWhenUnlocked: string = ''
  export let locked: boolean = false
  export let clickable: boolean = false

  let title: string = ''
  let classes: string = ''

  // state
  $: classes = ['bi'].concat(locked ? 'bi-file-lock-fill' : 'bi-file-lock').join(' ')
  $: title = locked ? titleWhenLocked : titleWhenUnlocked

  // handler
  function onClick() {
    dispatch('click')
  }

  // setup
  const dispatch = createEventDispatcher<{ click: null }>()
</script>

<BaseStatusBadge
  class={classes}
  data-clickable={clickable}
  title={title}
  clickable={clickable}
  on:click={onClick}
/>
