<script lang="ts">
import Tooltip from "bootstrap/js/dist/tooltip";

export let title: string

function tooltip(el: HTMLElement) {
  new Tooltip(el)
}
</script>

<i
  class={$$props.class}
  data-bs-toggle="tooltip"
  data-bs-title={title}
  use:tooltip
/>
