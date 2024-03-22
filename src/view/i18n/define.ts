import i18next from 'i18next'
import { createI18nStore } from 'svelte-i18next'

import { jaAssembly } from './locales/ja/assembly.ts'
import { jaFilter } from './locales/ja/filter.ts'
import { jaLock } from './locales/ja/lock.ts'
import { jaPageIndex } from './locales/ja/pages'

i18next.init({
  lng: 'ja',
  fallbackLng: false,
  returnEmptyString: false,
  resources: {
    ja: {
      assembly: jaAssembly,
      filter: jaFilter,
      lock: jaLock,
      pageIndex: jaPageIndex,
    },
  },
  interpolation: {
    escapeValue: false,
  },
})

const i18n = createI18nStore(i18next)
export default i18n
