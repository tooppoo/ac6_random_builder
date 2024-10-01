<script lang="ts" context="module">
  export type ToggleOffCanvas = { open: boolean }
</script>
<script lang="ts">
  import { Offcanvas } from "@sveltestrap/sveltestrap";
  import {createEventDispatcher} from "svelte";

  export let id: string = ''
  export let open: boolean

  // handler
  const toggle = () => {
    dispatch('toggle', { open: !open })
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
>
  <slot slot="header" name="title"></slot>
  <slot name="body"></slot>
</Offcanvas>
