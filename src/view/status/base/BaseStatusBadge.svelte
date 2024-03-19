<script lang="ts">
import Tooltip from "bootstrap/js/dist/tooltip";
import {createEventDispatcher} from "svelte";

export let title: string
export let clickable: boolean = false

let tooltip: Tooltip | null = null
$: {
  tooltip && tooltip.setContent({ '.tooltip-inner': title })
}

// handler
function onClick() {
  if (clickable) {
    tooltip && tooltip.hide()
    dispatch('click')
  }
}

// setup
function bindTooltip(el: HTMLElement) {
  tooltip = new Tooltip(el)
}
const dispatch = createEventDispatcher<{ click: null }>()
</script>

<span
  class={$$props.class}
  data-bs-toggle="tooltip"
  data-bs-title={title}
  data-clickable={clickable}
  use:bindTooltip
  on:click={onClick}
  role={clickable ? 'button' : 'img'}
/>

<style>
  span[data-clickable="true"] {
      cursor: pointer;
  }
</style>