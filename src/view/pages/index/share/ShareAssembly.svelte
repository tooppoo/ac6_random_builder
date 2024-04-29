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
    <div id="share-by-text" class="d-flex justify-content-begin align-items-center mb-3">
      <div class="share-label me-3">
        {$i18n.t('command.text.caption', { ns: 'share' })}
      </div>
      <div class="share-button">
        <button
          id="share-assembly-as-text"
          class="btn btn-dark border-secondary"
          on:click={() => navigator.clipboard.writeText(stringifyAssembly(assembly))}
        >
          <i class="bi bi-clipboard"></i>
        </button>
      </div>
    </div>
    <div id="share-by-url" class="d-flex justify-content-begin align-items-center">
      <div class="share-label me-3">
        {$i18n.t('command.url.caption', { ns: 'share' })}
      </div>
      <div class="share-button">
        <button
          id="share-assembly-as-link"
          class="btn btn-dark border-secondary"
          on:click={() => navigator.clipboard.writeText(location.href)}
        >
          <i class="bi bi-link"></i>
        </button>
      </div>
    </div>
  </svelte:fragment>
</OffCanvas>
