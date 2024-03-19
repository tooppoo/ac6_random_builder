<script lang="ts">
import Tooltip from "bootstrap/js/dist/tooltip";
import {createEventDispatcher} from "svelte";

export let title: string
export let clickable: boolean = false

// handler
function onClick() {
  clickable && dispatch('click')
}

// setup
function tooltip(el: HTMLElement) {
  new Tooltip(el)
}
const dispatch = createEventDispatcher<{ click: null }>()
</script>

<span
  class={$$props.class}
  data-bs-toggle="tooltip"
  data-bs-title={title}
  data-clickable={clickable}
  use:tooltip
  on:click={onClick}
  role={clickable ? 'button' : 'img'}
/>

<style>
  span[data-clickable="true"] {
      cursor: pointer;
  }
</style>