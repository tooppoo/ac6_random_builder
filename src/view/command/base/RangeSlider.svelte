<script lang="ts">
  import {createEventDispatcher} from "svelte";
  import type {ChangeEventHandler} from "svelte/elements";

  export let id: string
  export let label: string

  export let max: number
  export let min: number = 0
  export let value: number
  export let step: number = 1

  const dataList = (() => {
    const strMax = `${max}`
    const index = parseInt(strMax.replace(/0/g, ''))

    const unit = max / index

    return [...Array(index + 1)].map((_, i) => unit * i)
  })()

  const onChange: ChangeEventHandler<HTMLInputElement> = (ev) => {
    value = parseInt(ev.currentTarget.value)

    dispatch('change', { value })
  }

  const dispatch = createEventDispatcher<{ change: { value: number } }>()
</script>

<div id={id} class={$$props.class}>
  <label for={`${id}-range`} class="current-max-value mx-auto input-group input-group-sm">
    <span id={`${id}-current-max-value`} class="input-group-text">{label}</span>
    <input
      type="number"
      class="form-control form-control-sm"
      aria-label={label}
      aria-describedby={`${id}-current-max-value`}
      min={min} max={max}
      value={value}
      step={step}
      on:change={onChange}
    >
  </label>
  <input
    id={`${id}-range`}
    type="range"
    class="form-range w-100"
    min="0" max={max}
    value={value}
    step={step}
    on:change={onChange}
    list={`${id}-range-mark`}
  />
  <datalist id={`${id}-range-mark`} class="sp-only w-100">
    {#each dataList as v}
      <option value={v} label={`${v}`}>{v}</option>
    {/each}
  </datalist>
</div>

<style>
    .current-max-value {
        width: 220px;
    }

    datalist {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        writing-mode: vertical-lr;
    }
</style>
