<script lang="ts">
import { Tooltip } from '@sveltestrap/sveltestrap'
import {createEventDispatcher} from "svelte";

export let id: string
export let title: string
export let clickable: boolean = false
export let withTooltip: boolean = true

let isOpen: boolean = false

// handler
function onClick() {
  if (clickable) {
    isOpen = false

    dispatch('click')
  }
}

const dispatch = createEventDispatcher<{ click: null }>()
</script>

<span
  {...$$restProps}
  id={id}
  class={$$props.class + ` icon-button`}
  data-clickable={clickable}
  aria-label={title}
  role={clickable ? 'button' : 'img'}
/>
{#if withTooltip}
  <Tooltip target={id} placement="right" bind:isOpen>
    {@html title}
  </Tooltip>
{/if}

<style>
  span[data-clickable="true"] {
      cursor: pointer;
  }
  .icon-button {
      font-size: 30px;
      height: 48px;
      text-align: center;
      width: 48px;
  }
</style>