import { jaError } from '~view/i18n/locales/ja/error.ts'

import _i18next from 'i18next'
import { createI18nStore } from 'svelte-i18next'

import { jaAssembly } from './locales/ja/assembly.ts'
import { jaFilter } from './locales/ja/filter.ts'
import { jaLock } from './locales/ja/lock.ts'
import { jaPageIndex } from './locales/ja/pages'

_i18next.init({
  lng: 'ja',
  fallbackLng: false,
  returnEmptyString: false,
  resources: {
    ja: {
      translation: {
        times: '回',
      },
      assembly: jaAssembly,
      filter: jaFilter,
      lock: jaLock,
      'page/index': jaPageIndex,
      error: jaError,
    },
  },
  interpolation: {
    escapeValue: false,
  },
})

const i18n = createI18nStore(_i18next)

export default i18n
export const i18next = _i18next
export type I18Next = typeof i18next
