<script lang="ts">
import BaseStatusBadge from "~view/status/base/BaseStatusBadge.svelte";

import {createEventDispatcher} from "svelte";

export let applied: boolean

// state
$: classes = [
  $$props.class || '',
  'bi',
  applied ? 'bi-filter-square-fill' : 'bi-filter-square'
].join(' ')

// handler
function onClick() {
  dispatch('click')
}

// setup
const dispatch = createEventDispatcher<{ click: null }>()
</script>

<BaseStatusBadge
  class={classes}
  data-clickable={true}
  title=""
  clickable={true}
  withTooltip={false}
  on:click={onClick}
/>
