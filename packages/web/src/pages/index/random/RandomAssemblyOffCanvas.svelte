<script lang="ts" context="module">
  import type {ToggleOffCanvas} from '~view/components/off-canvas/OffCanvas.svelte'
</script>
<script lang="ts">

  import OffCanvas from '~view/components/off-canvas/OffCanvas.svelte'
  // import i18n, {type I18Next} from "~view/i18n/define";

  import { createEventDispatcher } from 'svelte'

  export let open: boolean

  // handler

  // setup
  const dispatch = createEventDispatcher<{
    toggle: ToggleOffCanvas
  }>()
</script>

<OffCanvas
  id={$$props.id || ''}
  open={open}
  on:toggle={(e) => dispatch('toggle', e.detail)}
>
  <svelte:fragment slot="title">
    <slot name="title" />
  </svelte:fragment>
  <svelte:fragment slot="body">
    TEST
  </svelte:fragment>
</OffCanvas>
