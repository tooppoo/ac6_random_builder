<script lang="ts">
  import { Tooltip } from '@sveltestrap/sveltestrap'
  import {createEventDispatcher} from "svelte";
  import type {Action} from "svelte/action";

  export let id: string
  export let action: Action = () => { }
  export let tooltipText: string = ''

  const dispatch = createEventDispatcher<{ click: null }>()
</script>

<button
  id={id}
  {...$$restProps}
  class={`${$$props.class || ''} btn btn-secondary bg-dark-subtle`}
  on:click={() => dispatch('click')}
  use:action
>
  <slot></slot>
</button>
{#if tooltipText}
  <Tooltip target={id}>
    {@html tooltipText}
  </Tooltip>
{/if}
