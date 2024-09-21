<script lang="ts" context="module">
  import type {ToggleOffCanvas} from '~view/components/off-canvas/OffCanvas.svelte'

  export type AssembleRandomly = Readonly<{
    assembly: Assembly
  }>
  export type ErrorOnAssembly = Readonly<{
    error: Error
  }>
</script>
<script lang="ts">

  import TextButton from '~view/components/button/TextButton.svelte'
  import OffCanvas from '~view/components/off-canvas/OffCanvas.svelte'
  import i18n from "~view/i18n/define";
  import { logger } from '~view/utils/logger'

  import type { Assembly } from '@ac6_assemble_tool/core/assembly/assembly'
  import type { LockedParts } from '@ac6_assemble_tool/core/assembly/random/lock'
  import type { RandomAssembly } from '@ac6_assemble_tool/core/assembly/random/random-assembly'
  import { notEquipped } from '@ac6_assemble_tool/parts/types/base/category'
  import type { Candidates } from '@ac6_assemble_tool/parts/types/candidates'
  import { createEventDispatcher } from 'svelte'

  export let open: boolean
  export let lockedParts: LockedParts
  export let initialCandidates: Candidates
  export let candidates: Candidates
  export let randomAssembly: RandomAssembly

  // handler
  const onRandom = () => {
    try {
      logger.debug('on random', lockedParts, candidates.booster)
      const actualCandidates = (
        !lockedParts.isLocking('legs')
        && candidates.booster.length === 1
        && candidates.booster[0].category === notEquipped
      )
        // 脚部がロックされていないのに候補が未装備のみなら、たまたまタンク脚が選択されているだけなので
        // ランダムアセン時にブースターを制限する必要は無い
        // この処置が必要になるのはランダムアセン時のみなので、filterの処理には含めない
        ? { ...candidates, booster: initialCandidates.booster }
        : candidates

      dispatch('random', {
        assembly: randomAssembly.assemble(actualCandidates, { lockedParts })
      })
    } catch (e) {
      logger.error(e)

      dispatch('error', {
        error: e instanceof Error ? e : new Error(`${e}`),
      })
    }
  }

  // setup
  const dispatch = createEventDispatcher<{
    toggle: ToggleOffCanvas,
    random: AssembleRandomly,
    error: ErrorOnAssembly,
  }>()
</script>

<OffCanvas
  id={$$props.id || ''}
  open={open}
  on:toggle={(e) => dispatch('toggle', e.detail)}
>
  <svelte:fragment slot="title">
    <slot name="title" />
  </svelte:fragment>
  <svelte:fragment slot="body">
    <div id="random-assembly" class="d-flex justify-content-bgein align-items-center mb-3">
      <TextButton
        type="button"
        class="w-100"
        on:click={onRandom}
      >
        <i class="bi bi-shuffle"></i>
        {$i18n.t('random:command.random.label')}
      </TextButton>
    </div>
  </svelte:fragment>
</OffCanvas>
