<script lang="ts">
import BaseStatusBadge from "~view/pages/index/form/status/base/BaseStatusBadge.svelte";

import {createEventDispatcher} from "svelte";

export let applied: boolean
export let title: string

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
  class={`${$$props.class || ''} ${classes}`}
  data-clickable={true}
  title={title}
  clickable={true}
  withTooltip={true}
  on:click={onClick}
/>
