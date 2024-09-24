<script lang="ts">
  // Clickで表示/非表示が切り替わるTooltip

  import { Tooltip } from '@sveltestrap/sveltestrap'
  import { onDestroy, onMount } from 'svelte'

  export let target: HTMLElement | string
  /** tooltipの表示/非表示状態 */
  export let timeout: number = 3000

  /** Tooltipコンポーネント内部のON/OFF状態 */
  let showTooltip: boolean = false
  let tooltipState: boolean = true
  let tooltipTimer: ReturnType<typeof setTimeout> | undefined

  let targetEl: HTMLElement | undefined
  $: targetEl = typeof target === 'string' ? document.getElementById(target)! : target

  // handler
  $: {
    if (!tooltipState) {
      // Tooltipコンポーネント側で非表示にされた場合
      // 連動してこのコンポーネント側でも非表示状態に切替る
      showTooltip = false

      clearTimeout(tooltipTimer)
      tooltipTimer = (void 0)
    }
  }
  $: {
    if (targetEl) {
      targetEl.removeEventListener('click', handleClickTargetElement)
      targetEl.addEventListener('click', handleClickTargetElement)
    }
  }

  onDestroy(() => {
    if (targetEl) {
      targetEl.removeEventListener('click', handleClickTargetElement)
    }
  })

  function handleClickTargetElement() {
    showTooltip = true
    tooltipState = true

    tooltipTimer = setTimeout(
      () => {
        showTooltip = false
        tooltipState = false
      },
      timeout
    )
  }
</script>

{#if targetEl && showTooltip}
  <Tooltip target={targetEl} bind:isOpen={tooltipState}>
    <slot></slot>
  </Tooltip>
{/if}
