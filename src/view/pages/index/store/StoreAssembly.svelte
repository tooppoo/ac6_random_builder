<script lang="ts" context="module">
  import type {ToggleOffCanvas} from '~view/components/off-canvas/OffCanvas.svelte'
</script>
<script lang="ts">
  import type {Assembly} from "~core/assembly/assembly.ts";
  import {createAggregation, type StoredAssemblyAggregation} from "~core/assembly/store/stored-assembly.ts";

  import IconButton from "~view/components/button/IconButton.svelte";
  import TextButton from "~view/components/button/TextButton.svelte";
  import OffCanvas from '~view/components/off-canvas/OffCanvas.svelte'
  import i18n from "~view/i18n/define.ts";

  import type {Candidates} from "~data/types/candidates.ts";

  import { createEventDispatcher } from 'svelte'

  import {storedRepositoryStore} from "./repository-store.ts";

  export let open: boolean
  export let candidates: Candidates
  export let assembly: Assembly

  let newName: string = ''
  let newDescription: string = ''
  let dataList: StoredAssemblyMaybeDeleted[] = []

  // handler
  function onSubmitNewAssembly() {
    $storedRepositoryStore.storeNew(
      createAggregation({
        name: newName,
        description: newDescription,
        assembly,
      }),
      candidates
    )
  }
  function onApply(target: StoredAssemblyAggregation) {
    dispatch('apply', target)
  }
  function onDelete(target: StoredAssemblyAggregation) {
    $storedRepositoryStore.delete(target)

    dataList = dataList.map(d => ({ ...d, deleted: target.id === d.id }))
  }
  function onRestore(target: StoredAssemblyAggregation) {
    $storedRepositoryStore.insert(target, candidates)

    dataList = dataList.map(d => ({ ...d, deleted: target.id === d.id ? false : d.deleted }))
  }

  // setup
  function initialize() {
    $storedRepositoryStore.all(candidates).then((xs) => {
      dataList = xs.map(x => ({ ...x, deleted: false }))
    })
  }

  const dispatch = createEventDispatcher<{
    toggle: ToggleOffCanvas,
    apply: StoredAssemblyAggregation,
  }>()

  type StoredAssemblyMaybeDeleted = StoredAssemblyAggregation & {
    deleted: boolean
  }

  initialize()
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
      <form class="mb-3" on:submit|preventDefault={onSubmitNewAssembly}>
        <div class="form-label">
          {$i18n.t('addNewData.title', { ns: 'assemblyStore' })}
        </div>
        <input
          type="text"
          class="form-control mb-2"
          id="new-assembly-name"
          placeholder={$i18n.t('addNewData.name.caption', { ns: 'assemblyStore' })}
          bind:value={newName}
          required
        >
        <textarea
          class="form-control mb-2"
          id="new-assembly-description"
          placeholder={$i18n.t('addNewData.description.caption', { ns: 'assemblyStore' })}
          bind:value={newDescription}
        />
        <TextButton
          id="store-new-assembly"
          type="submit"
        >
          {$i18n.t('addNewData.add.caption', { ns: 'assemblyStore' })}
        </TextButton>
      </form>
    </div>
    <hr class="my-4">
    <div class="mb-3">
      <div class="mb-3">
        <div class="form-label">
          {$i18n.t('storedList.title', { ns: 'assemblyStore' })}
        </div>
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
                {$i18n.t('storedList.table.col.description', { ns: 'assemblyStore' })}
              </th>
              <th scope="col">
              </th>
            </tr>
          </thead>
          <tbody>
          {#each dataList as d}
            {#if (d.deleted)}
            <tr>
              <th scope="row" class="deleted">
                <del>{d.name}</del><br>
                {$i18n.t('storedList.table.state.deleted.caption', { ns: 'assemblyStore' })}
              </th>
              <td class="deleted">
                <del>{d.description}</del>
              </td>
              <td>
                <IconButton
                  title={$i18n.t('storedList.restore.caption', { ns: 'assemblyStore' })}
                  class="bi bi-recycle"
                  clickable={true}
                  on:click={() => onRestore(d)}
                />
              </td>
            </tr>
            {:else}
            <tr>
              <th scope="row">{d.name}</th>
              <td>{d.description}</td>
              <td>
                <IconButton
                  title={$i18n.t('storedList.apply.caption', { ns: 'assemblyStore' })}
                  class="bi bi-download"
                  clickable={true}
                  on:click={() => onApply(d)}
                />
                <IconButton
                  title={$i18n.t('storedList.delete.caption', { ns: 'assemblyStore' })}
                  class="bi bi-trash"
                  clickable={true}
                  on:click={() => onDelete(d)}
                />
              </td>
            </tr>
            {/if}
          {/each}
          </tbody>
        </table>
      </div>
    </div>
  </svelte:fragment>
</OffCanvas>

<style>
  .deleted {
    color: gray;
  }
</style>