import { cleanup, render, screen } from '@testing-library/svelte'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'

import Layout from './+layout.svelte'

describe('layout', () => {
  beforeEach(() => {
    render(Layout)
  })
  afterEach(() => {
    cleanup()
  })

  it('should use font-monorepo', () => {
    const root = screen.getByTestId('layout-root')

    expect(root.classList.contains('font-monospace')).toBe(true)
  })
  it('should set favicon', () => {
    expect(document.head.querySelector('link[rel="icon"]')).not.toBeNull()
  })
})
