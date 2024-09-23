<script lang="ts">
  import TextButton from "$lib/components/button/TextButton.svelte";

  import { Tooltip } from '@sveltestrap/sveltestrap'
  import {createEventDispatcher} from "svelte";

  export let id: string = ''
  export let title: string

  let isOpen: boolean = false

  const onClick = () => {
    isOpen = false

    dispatch('click')
  }

  const dispatch = createEventDispatcher<{ click: null }>()
</script>

<TextButton
  id={id}
  class={`${$$props.class || ''}`}
  aria-label={title}
  on:click={onClick}
>
  <slot name="icon"></slot>
  <slot></slot>
</TextButton>
<Tooltip
  target={id}
  placement="left"
  aria-label={title}
  bind:isOpen
>
  {@html title}
</Tooltip>
