<script lang="ts" context="module">
  export type ToggleOffCanvas = { open: boolean }
</script>
<script lang="ts">
  import { Offcanvas, OffcanvasBody, OffcanvasHeader } from "@sveltestrap/sveltestrap";
  import {createEventDispatcher} from "svelte";

  export let id: string = ''
  export let open: boolean

  // handler
  const toggle = () => {
    dispatch('toggle', { open: !open })
  }
  const hide = () => {
    dispatch('toggle', { open: false })
  }

  // setup
  const dispatch = createEventDispatcher<{
    toggle: ToggleOffCanvas
  }>()
</script>

<Offcanvas
  id={id}
  placement="end"
  backdrop={false}
  scroll={true}
  isOpen={open}
  {toggle}
  aria-labelledby="{id}-offcanvasRightLabel"
>
  <OffcanvasHeader id="{id}-offcanvasRightLabel" slot="header">
    <slot name="title"></slot>
  </OffcanvasHeader>
  <slot name="body"></slot>
</Offcanvas>
