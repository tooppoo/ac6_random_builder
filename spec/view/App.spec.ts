import { cleanup, render, screen } from '@testing-library/svelte'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import App from '~view/App.svelte'

describe(`App.svelte`, () => {
  beforeEach(() => {
    render(App)
  })
  afterEach(() => {
    cleanup()
  })

  it('should contain game title in header', async () => {
    await vi.dynamicImportSettled()

    const header = screen.getByRole('heading', { level: 1 })

    expect(header.textContent).toContain('ARMORED CORE Ⅵ')
  })
  it('should contain select-form for each part', async () => {
    await vi.dynamicImportSettled()

    const selectBoxes = screen.getAllByRole('combobox')

    const expected = [
      'right-arm-unit',
      'left-arm-unit',
      'right-back-unit',
      'left-back-unit',
      'head',
      'core',
      'arms',
      'legs',
      'booster',
      'fcs',
      'generator',
      'expansion',
    ]

    expect(selectBoxes.map((e) => e.id)).toEqual(expected)
  })
})
