import _i18next from 'i18next'
import { createI18nStore } from 'svelte-i18next'

import { resources } from './resources'

_i18next.init({
  lng: 'ja',
  fallbackLng: false,
  returnEmptyString: false,
  resources,
  interpolation: {
    escapeValue: false,
  },
})

const i18n = createI18nStore(_i18next)

export default i18n
export type I18NextStore = typeof i18n
export type I18Next = typeof _i18next
