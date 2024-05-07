<script lang="ts" context="module">
  import type {ToggleOffCanvas} from '~view/components/off-canvas/OffCanvas.svelte'
</script>
<script lang="ts">
  import TextButton from "~view/components/button/TextButton.svelte";
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
    <div class="mb-3">
      <div class="mb-3">
        <label for="new-assembly-name" class="form-label">
          {$i18n.t('addNewData.title', { ns: 'assemblyStore' })}
        </label>
        <input type="text" class="form-control" id="new-assembly-name">
      </div>
      <div>
        <TextButton
          type="button"
        >
          {$i18n.t('addNewData.add.caption', { ns: 'assemblyStore' })}
        </TextButton>
      </div>
    </div>
    <hr>
    <div class="mb-3">
      <div class="mb-3">
        <label for="search-stored-assembly-by-name" class="form-label">
          {$i18n.t('storedList.title', { ns: 'assemblyStore' })}
        </label>
        <input
          id="search-stored-assembly-by-name"
          type="text"
          class="form-control"
          placeholder={$i18n.t('storedList.search.caption', { ns: 'assemblyStore' })}
        >
      </div>
      <div>
        <table class="table">
          <thead>
            <tr>
              <th scope="col">
                {$i18n.t('storedList.table.col.name', { ns: 'assemblyStore' })}
              </th>
              <th scope="col">
                {$i18n.t('storedList.table.col.apply', { ns: 'assemblyStore' })}
              </th>
            </tr>
          </thead>
          <tbody>
          </tbody>
        </table>
      </div>
    </div>
  </svelte:fragment>
</OffCanvas>
