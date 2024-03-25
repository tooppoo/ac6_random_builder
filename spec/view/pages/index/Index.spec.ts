import type { AssemblyKey } from '~core/assembly/assembly.ts'

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

    const expected: AssemblyKey[] = [
      'rightArmUnit',
      'leftArmUnit',
      'rightBackUnit',
      'leftBackUnit',
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
