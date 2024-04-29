<script lang="ts" context="module">
  import type {ToggleOffCanvas} from '~view/components/off-canvas/OffCanvas.svelte'
</script>
<script lang="ts">
  import OffCanvas from '~view/components/off-canvas/OffCanvas.svelte'
  import i18n from "~view/i18n/define.ts";

  import { createEventDispatcher } from 'svelte'
  import { stringifyAssembly } from '~view/pages/index/interaction/share'
  import type { Assembly } from '~core/assembly/assembly'

  export let assembly: Assembly
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
    {$i18n.t('caption', { ns: 'share' })}
  </svelte:fragment>
  <svelte:fragment slot="body">
    <button
      class="btn btn-dark border-secondary"
      on:click={() => navigator.clipboard.writeText(stringifyAssembly(assembly))}
    >
      {$i18n.t('command.clipboard.caption', { ns: 'share' })}
      <i class="bi bi-clipboard"></i>
    </button>
  </svelte:fragment>
</OffCanvas>
