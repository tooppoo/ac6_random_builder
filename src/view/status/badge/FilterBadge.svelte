<script lang="ts">
import {createEventDispatcher} from "svelte";
import BaseStatusBadge from "~view/status/base/BaseStatusBadge.svelte";

export let applied: boolean

// state
let classes = ['bi',applied ? 'bi-filter-square-fill' : 'bi-filter-square'].join(' ')

// handler
function onClick() {
  dispatch('click')
}

// setup
const dispatch = createEventDispatcher<{ click: null }>()
</script>

<BaseStatusBadge
  class={$$props.class + ' ' + classes}
  data-clickable={true}
  title=""
  clickable={true}
  withTooltip={false}
  on:click={onClick}
/>
