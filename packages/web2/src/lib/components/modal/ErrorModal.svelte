<script lang="ts">
  import Modal from "bootstrap/js/dist/modal";
  import {createEventDispatcher} from "svelte";

  export let id: string
  export let open: boolean

  const labelId = `${id}-label`

  // handler
  let openModal: () => void = () => {}
  let closeModal: () => void = () => {}
  $: {
    if (open) {
      openModal()
    }
    else {
      closeModal()
    }
  }

  function onClick() {
    dispatch('close')
  }

  // setup
  function setupModal(el: HTMLElement) {
    const modal = new Modal(el)

    openModal = () => {
      modal.show()
    }
    closeModal = () => {
      modal.hide()
    }
  }

  const dispatch = createEventDispatcher<{ close: null }>()
</script>

<div
  class="modal fade"
  id={id}
  data-bs-backdrop="static"
  data-bs-keyboard="false"
  tabindex="-1"
  aria-labelledby={labelId}
  aria-hidden="true"
  use:setupModal
>
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id={labelId}>
          <slot name="title"></slot>
        </h1>
        <button type="button" class="btn-close" on:click={onClick} aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <slot></slot>
      </div>
      <div class="modal-footer">
        <button type="button" data-bs-dismiss="modal" on:click={onClick} class="btn btn-primary">
          <slot name="button"></slot>
        </button>
      </div>
    </div>
  </div>
</div>
