<script lang="ts" context="module">
  import type {ToggleOffCanvas} from '~view/components/off-canvas/OffCanvas.svelte'

  export type AssembleRandomly = Readonly<{
    assembly: Assembly
  }>
  export type ErrorOnAssembly = Readonly<{
    error: Error
  }>
  export type ApplyRandomFilter = Readonly<{
    randomAssembly: RandomAssembly
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
  import { disallowArmsLoadOver, disallowLoadOver, totalCoamNotOverMax, totalLoadNotOverMax } from '@ac6_assemble_tool/core/assembly/random/validator/validators'
  import { notEquipped } from '@ac6_assemble_tool/parts/types/base/category'
  import type { Candidates } from '@ac6_assemble_tool/parts/types/candidates'
  import { createEventDispatcher } from 'svelte'

  import CoamRangeSlider from './range/CoamRangeSlider.svelte'
  import LoadRangeSlider, { type ToggleLock } from './range/LoadRangeSlider.svelte'
  import Margin from '~view/components/spacing/Margin.svelte'
  import Switch from '~view/components/form/Switch.svelte'

  export let open: boolean
  export let lockedParts: LockedParts
  export let initialCandidates: Candidates
  export let candidates: Candidates
  export let randomAssembly: RandomAssembly
  export let assembly: Assembly

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
  const onApply = (param: ApplyRandomFilter) => {
    dispatch('filter', param)

    logger.debug({ param })
  }

  // setup
  const dispatch = createEventDispatcher<{
    toggle: ToggleOffCanvas,
    random: AssembleRandomly,
    error: ErrorOnAssembly,
    filter: ApplyRandomFilter
    'lock-legs': ToggleLock
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

    <hr class="w-100 my-4" />

    <div id="disallow-over-load">
      <Switch
        id={`${$$props.id}-disallow-over-load`}
        on:enabled={() => onApply({
          randomAssembly: randomAssembly.addValidator('disallow-over-load', disallowLoadOver()),
        })}
        on:disabled={() => onApply({
          randomAssembly: randomAssembly.removeValidator('disallow-over-load')
        })}
      >
        {$i18n.t('random:command.disallow_over_load.label')}
      </Switch>
    </div>
    <Margin space={3} />
    <div id="disallow-arms-over-load">
      <Switch
        id={`${$$props.id}-disallow-arms-over-load`}
        on:enabled={() => onApply({
          randomAssembly: randomAssembly.addValidator('disallow-arms-over-load', disallowArmsLoadOver()),
        })}
        on:disabled={() => onApply({
          randomAssembly: randomAssembly.removeValidator('disallow-arms-over-load')
        })}
      >
        {$i18n.t('random:command.disallow_arms_over_load.label')}
      </Switch>
    </div>
    <Margin space={3} />
    <CoamRangeSlider
      class="my-3 w-100"
      candidates={candidates}
      on:change={(ev) => onApply({
        randomAssembly: randomAssembly.addValidator('total-coam-limit', totalCoamNotOverMax(ev.detail.value)),
      })}
    />
    <Margin space={3} />
    <LoadRangeSlider
      class="my-3 w-100"
      candidates={candidates}
      assembly={assembly}
      lock={lockedParts}
      on:change={(ev) => onApply({
        randomAssembly: randomAssembly.addValidator('total-load-limit', totalLoadNotOverMax(ev.detail.value))
      })}
      on:toggle-lock={(ev) => dispatch('lock-legs', ev.detail)}
    />
  </svelte:fragment>
</OffCanvas>
