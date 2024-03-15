import { cleanup, render, screen } from '@testing-library/svelte'
import { afterEach, describe, expect, it } from 'vitest'
import App from '~view/App.svelte'

describe(`App.svelte`, () => {
  afterEach(() => {
    cleanup()
  })

  it('should contain game title in header', () => {
    render(App)

    const header = screen.getByRole('heading', { level: 1 })

    expect(header.textContent).toContain('ARMORED CORE Ⅵ')
  })
})
