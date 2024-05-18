<script lang="ts" context="module">
  import type {ToggleOffCanvas} from '~view/components/off-canvas/OffCanvas.svelte'
</script>
<script lang="ts">
  import type { Assembly } from '~core/assembly/assembly'

  import OffCanvas from '~view/components/off-canvas/OffCanvas.svelte'
  import i18n from "~view/i18n/define.ts";
  import { stringifyAssembly, stringifyStatus } from '~view/pages/index/interaction/share'

  import { createEventDispatcher } from 'svelte'
  import type { ChangeEventHandler } from 'svelte/elements'

  export let assembly: () => Assembly
  export let prefix: () => string = () => ''
  export let open: boolean

  let copy: () => void = defaultCopyWay

  // handler
  const onChangeTextCopyWay: ChangeEventHandler<HTMLInputElement> = (e) => {
    const withStatus = e.currentTarget.checked

    copy = withStatus
      ? () => {
          const text = `${stringifyAssembly(assembly())}
          
${stringifyStatus(assembly())}`

          navigator.clipboard.writeText(prefix() + text)
        }
      : defaultCopyWay
  }

  // setup
  const dispatch = createEventDispatcher<{
    toggle: ToggleOffCanvas
  }>()

  function defaultCopyWay() {
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
        <div class="form-check form-switch">
          <input
            class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault"
            on:change={onChangeTextCopyWay}
          >
          <label class="form-check-label" for="flexSwitchCheckDefault">
            {$i18n.t('share:command.text.withStatus')}
          </label>
        </div>
      </div>
      <div class="share-button">
        <button
          id="share-assembly-as-text"
          class="btn btn-dark border-secondary"
          on:click={copy}
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
