<script lang="ts">
  import {createEventDispatcher} from "svelte";

  const onClick = () => dispatch('click')

  const dispatch = createEventDispatcher<{ click: null }>()
</script>

<button
  class={`${$$props.class || ''} btn btn-secondary bg-dark-subtle me-3}`}
  on:click={onClick}
>
  <slot name="icon"></slot>
  <span class="d-none d-sm-inline">
    <slot></slot>
  </span>
</button>
