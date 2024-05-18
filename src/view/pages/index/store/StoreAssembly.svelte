<script lang="ts" context="module">
  import type {ToggleOffCanvas} from '~view/components/off-canvas/OffCanvas.svelte'
</script>
<script lang="ts">
  import type {Assembly} from "~core/assembly/assembly.ts";
  import {filterByKeywords} from "~core/assembly/store/filter.ts";
  import {IndexedDbRepository} from "~core/assembly/store/repository/indexed-db/indexed-db-repository.ts";
  import {
    createAggregation,
    type StoredAssemblyAggregation,
    type StoredAssemblyRepository
  } from "~core/assembly/store/stored-assembly.ts";

  import IconButton from "~view/components/button/IconButton.svelte";
  import TextButton from "~view/components/button/TextButton.svelte";
  import OffCanvas from '~view/components/off-canvas/OffCanvas.svelte'
  import i18n from "~view/i18n/define.ts";

  import type {Candidates} from "~data/types/candidates.ts";

  import { createEventDispatcher } from 'svelte'
  import ShareAssembly from "~view/pages/index/share/ShareAssembly.svelte";

  export let open: boolean
  export let candidates: Candidates
  export let assembly: Assembly

  const repository: StoredAssemblyRepository = new IndexedDbRepository()

  let newName: string = ''
  let newDescription: string = ''
  let dataList: StoredAssemblyMaybeDeleted[] = []
  let keywords: string[] = []
  let showDataList: StoredAssemblyMaybeDeleted[]
  $: showDataList = filterByKeywords(keywords, dataList)

  type ShareMode =
    | {
        open: true
        target: StoredAssemblyAggregation
      }
    | {
        open: false
        target: null
      }
  let shareMode: ShareMode = { open: false, target: null }

  // handler
  function onSubmitNewAssembly() {
    repository.storeNew(
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
    repository.delete(target)

    dataList = dataList.map(d => ({ ...d, deleted: target.id === d.id }))
  }
  function onRestore(target: StoredAssemblyAggregation) {
    repository.insert(target, candidates)

    dataList = dataList.map(d => ({ ...d, deleted: target.id === d.id ? false : d.deleted }))
  }
  function onUpdateKeywords(target: Event) {
    const form = target.currentTarget as HTMLInputElement

    keywords = form.value.split(',').map(k => k.trim())
  }
  function onShare(target: StoredAssemblyAggregation) {
    shareMode = { open: true, target }
  }

  // setup
  function initialize() {
    repository.all(candidates).then((xs) => {
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
    {$i18n.t('assembly_store:caption')}
    <IconButton
      id="notice-for-store-assembly"
      title={$i18n.t('assembly_store:notice')}
      class="bi bi-info-circle"
      style="font-size: 18px;"
    />
  </svelte:fragment>
  <svelte:fragment slot="body">
    <div class="mb-3">
      <form class="mb-3" on:submit|preventDefault={onSubmitNewAssembly}>
        <div class="form-label">
          {$i18n.t('assembly_store:addNewData.title')}
        </div>
        <input
          type="text"
          class="form-control mb-2"
          id="new-assembly-name"
          placeholder={$i18n.t('assembly_store:addNewData.name.caption')}
          bind:value={newName}
          required
        >
        <textarea
          class="form-control mb-2"
          id="new-assembly-description"
          placeholder={$i18n.t('assembly_store:addNewData.description.caption')}
          bind:value={newDescription}
        />
        <TextButton
          id="store-new-assembly"
          type="submit"
        >
          {$i18n.t('assembly_store:addNewData.add.caption')}
        </TextButton>
      </form>
    </div>
    <hr class="my-4">
    <div class="mb-3">
      <div class="mb-3">
        <div class="form-label">
          {$i18n.t('assembly_store:storedList.title')}
        </div>
        <input
          id="search-stored-assembly-by-name"
          type="text"
          class="form-control"
          placeholder={$i18n.t('assembly_store:storedList.search.caption')}
          on:input={onUpdateKeywords}
        >
      </div>
      <div>
        <table class="table">
          <thead>
            <tr>
              <th scope="col">
                {$i18n.t('assembly_store:storedList.table.col.name')}
              </th>
              <th scope="col">
                {$i18n.t('assembly_store:storedList.table.col.description')}
              </th>
              <th scope="col">
              </th>
            </tr>
          </thead>
          <tbody>
          {#each showDataList as d}
            {#if (d.deleted)}
            <tr>
              <th scope="row" class="deleted">
                <del>{d.name}</del><br>
                {$i18n.t('assembly_store:storedList.table.state.deleted.caption')}
              </th>
              <td class="deleted">
                <del>{d.description}</del>
              </td>
              <td>
                <IconButton
                  title={$i18n.t('assembly_store:storedList.restore.caption')}
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
                  title={$i18n.t('assembly_store:storedList.apply.caption')}
                  class="bi bi-download"
                  clickable={true}
                  on:click={() => onApply(d)}
                />
                <IconButton
                  title={$i18n.t('assembly_store:storedList.delete.caption')}
                  class="bi bi-trash"
                  clickable={true}
                  on:click={() => onDelete(d)}
                />
                <IconButton
                  title={$i18n.t('assembly_store:storedList.share.caption')}
                  class="bi bi-share"
                  clickable={true}
                  on:click={() => onShare(d)}
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

{#if shareMode.open}
<ShareAssembly
  open={true}
  assembly={shareMode.target.assembly}
  on:toggle={(e) => {
    if (!e.open) {
      shareMode = { open: false, target: null }
    }
  }}
>
  <svelte:fragment slot="title">
    {$i18n.t('share:command.target.caption', { what: shareMode.target.name })}
  </svelte:fragment>
</ShareAssembly>
{/if}

<style>
  .deleted {
    color: gray;
  }
</style>
