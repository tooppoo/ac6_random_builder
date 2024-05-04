<script lang="ts" context="module">
  import type {ToggleOffCanvas} from '~view/components/off-canvas/OffCanvas.svelte'
</script>
<script lang="ts">
  import OffCanvas from '~view/components/off-canvas/OffCanvas.svelte'
  import i18n from "~view/i18n/define.ts";

  import { createEventDispatcher } from 'svelte'

  export let open: boolean

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
    {$i18n.t('caption', { ns: 'assemblyStore' })}
  </svelte:fragment>
  <svelte:fragment slot="body">
  </svelte:fragment>
</OffCanvas>
