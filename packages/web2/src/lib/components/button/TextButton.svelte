
<script lang="ts">
  import {createEventDispatcher} from "svelte";
  import type {Action} from "svelte/action";

  export let action: Action = () => { }

  const dispatch = createEventDispatcher<{ click: null }>()
</script>

<button
  {...$$restProps}
  class={`${$$props.class || ''} btn btn-secondary bg-dark-subtle`}
  on:click={() => dispatch('click')}
  use:action
>
  <slot></slot>
</button>
