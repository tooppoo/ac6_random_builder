<script lang="ts">
  import Tooltip from "bootstrap/js/dist/tooltip";
  import {createEventDispatcher} from "svelte";

  let onClick: () => void = () => dispatch('click')

  export let title: string = ''

  // setup
  function setupTooltip(ev: HTMLElement) {
    const tooltip = new Tooltip(ev)

    onClick = () => {
      tooltip.hide()

      dispatch('click')
    }
  }
  const dispatch = createEventDispatcher<{ click: null }>()
</script>

<button
  class={`${$$props.class || ''} btn btn-secondary bg-dark-subtle me-3}`}
  data-bs-toggle="tooltip"
  data-bs-title={title}
  data-bs-placement="left"
  data-bs-html="true"
  on:click={onClick}
  use:setupTooltip
>
  <slot name="icon"></slot>
  <span class="d-none d-sm-inline">
    <slot></slot>
  </span>
</button>
