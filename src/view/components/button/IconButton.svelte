<script lang="ts">
import Tooltip from "bootstrap/js/dist/tooltip";
import {createEventDispatcher} from "svelte";

export let title: string
export let clickable: boolean = false
export let withTooltip: boolean = true

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
  if (withTooltip) {
    tooltip = new Tooltip(el)
  }
}
const dispatch = createEventDispatcher<{ click: null }>()
</script>

<span
  {...$$restProps}
  id={$$props.id}
  class={$$props.class + ` icon-button`}
  data-bs-toggle="tooltip"
  data-bs-placement="left"
  data-bs-title={title}
  data-bs-html="true"
  data-clickable={clickable}
  use:bindTooltip
  on:click={onClick}
  role={clickable ? 'button' : 'img'}
/>

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