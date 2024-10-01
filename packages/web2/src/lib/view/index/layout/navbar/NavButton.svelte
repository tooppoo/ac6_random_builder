<script lang="ts">
  import TextButton from "$lib/components/button/TextButton.svelte";

  import {createEventDispatcher} from "svelte";

  export let id: string = ''
  export let title: string

  const onClick = () => {
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
