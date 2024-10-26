<script lang="ts">
  import LanguageForm from '$lib/components/language/LanguageForm.svelte'

  import type { Regulation } from '@ac6_assemble_tool/parts/versions/regulation.types'

  export let regulation: Regulation
</script>

<header class="text-center mt-5">
  <h1>
    ARMORED CORE Ⅵ<br class="d-block d-md-none" />
    PARTS LIST TOOL
  </h1>
  <h2>
    for Regulation {regulation.version}
  </h2>
  <div>
    <LanguageForm />
  </div>
</header>
