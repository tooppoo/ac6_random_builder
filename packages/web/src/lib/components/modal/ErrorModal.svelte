<script lang="ts">
  import { Modal, ModalBody, ModalFooter, ModalHeader } from "@sveltestrap/sveltestrap";
  import {createEventDispatcher} from "svelte";

  export let id: string
  export let open: boolean

  const labelId = `${id}-label`

  // handler
  function onClose() {
    dispatch('close')
  }

  // setup
  const dispatch = createEventDispatcher<{ close: null }>()
</script>

<Modal
  id={id}
  backdrop="static"
  keyboard={false}
  aria-labelledby={labelId}
  aria-hidden="true"
  isOpen={open}
>
  <ModalHeader>
    <h1 class="modal-title fs-5" id={labelId}>
      <slot name="title"></slot>
    </h1>
    <button type="button" class="btn-close" on:click={onClose} aria-label="Close"></button>
  </ModalHeader>
  <ModalBody>
    <slot></slot>
  </ModalBody>
  <ModalFooter>
    <button type="button" on:click={onClose} class="btn btn-primary">
      <slot name="button"></slot>
    </button>
  </ModalFooter>
</Modal>
