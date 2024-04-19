import Index from '~view/pages/index/Index.svelte'

import { cleanup, render, screen } from '@testing-library/svelte'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

describe(`App.svelte`, () => {
  beforeEach(() => {
    render(Index)
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
      'select-rightArmUnit',
      'select-leftArmUnit',
      'select-rightBackUnit',
      'select-leftBackUnit',
      'select-head',
      'select-core',
      'select-arms',
      'select-legs',
      'select-booster',
      'select-fcs',
      'select-generator',
      'select-expansion',
    ]

    expect(selectBoxes.map((e) => e.id)).toEqual(expected)
  })
})
