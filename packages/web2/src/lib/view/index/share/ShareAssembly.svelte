<script lang="ts" context="module">
  import type {ToggleOffCanvas} from '$lib/components/off-canvas/OffCanvas.svelte'
</script>
<script lang="ts">

  import Switch from '$lib/components/form/Switch.svelte'
  import OffCanvas from '$lib/components/off-canvas/OffCanvas.svelte'
  import i18n, {type I18Next} from "$lib/i18n/define";
  import { stringifyAssembly, stringifyStatus } from '$lib/view/index/interaction/share'

  import type { Assembly } from '@ac6_assemble_tool/core/assembly/assembly'
  import { createEventDispatcher } from 'svelte'

  export let assembly: () => Assembly
  export let prefix: () => string = () => ''
  export let open: boolean

  let copyAsText: () => void = defaultCopyAsText

  // handler
  const copyAsTextWithStatus = () => {
    const text = `${stringifyAssembly(assembly())}
    
${stringifyStatus(assembly(), $i18n)}`

    navigator.clipboard.writeText(prefix() + text)
  }

  // setup
  const dispatch = createEventDispatcher<{
    toggle: ToggleOffCanvas
  }>()

  function defaultCopyAsText() {
    navigator.clipboard.writeText(prefix() + stringifyAssembly(assembly()))
  }
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
    <div id="share-by-text" class="d-flex justify-content-begin align-items-center mb-3">
      <div class="share-label me-3">
        {$i18n.t('share:command.text.caption')}
        <Switch
          id={`${$$props.id}-flexSwitchCheckDefault`}
          on:enabled={() => copyAsText = copyAsTextWithStatus}
          on:disabled={() => copyAsText = defaultCopyAsText}
        >
          {$i18n.t('share:command.text.withStatus')}
        </Switch>
      </div>
      <div class="share-button">
        <button
          id="share-assembly-as-text"
          class="btn btn-dark border-secondary"
          on:click={copyAsText}
        >
          <i class="bi bi-clipboard"></i>
        </button>
      </div>
    </div>
    <div id="share-by-url" class="d-flex justify-content-begin align-items-center">
      <div class="share-label me-3">
        {$i18n.t('share:command.url.caption')}
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
