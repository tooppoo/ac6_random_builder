<script lang="ts">
  import BaseStatusBadge from "~view/status/base/BaseStatusBadge.svelte";

  export let title: string
</script>

<BaseStatusBadge
  class="bi bi-file-lock-fill"
  title={title}
/>
