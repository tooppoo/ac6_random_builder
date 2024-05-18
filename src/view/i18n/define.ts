import { enAssembly } from '~view/i18n/locales/en/assembly.ts'
import { enAssemblyStore } from '~view/i18n/locales/en/assemblyStore.ts'
import { enAttackType } from '~view/i18n/locales/en/attackType.ts'
import { enError } from '~view/i18n/locales/en/error.ts'
import { enFilter } from '~view/i18n/locales/en/filter.ts'
import { enLock } from '~view/i18n/locales/en/lock.ts'
import { enManufactures } from '~view/i18n/locales/en/manufactures.ts'
import { enPageIndex } from '~view/i18n/locales/en/pages'
import { enShare } from '~view/i18n/locales/en/share.ts'
import { jaAssemblyStore } from '~view/i18n/locales/ja/assemblyStore.ts'
import { jaAttackType } from '~view/i18n/locales/ja/attackType.ts'
import { jaError } from '~view/i18n/locales/ja/error.ts'
import { jaManufactures } from '~view/i18n/locales/ja/manufactures.ts'
import { jaShare } from '~view/i18n/locales/ja/share.ts'

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
      manufacture: jaManufactures,
      attack_type: jaAttackType,
      'page/index': jaPageIndex,
      error: jaError,
      share: jaShare,
      assembly_store: jaAssemblyStore,
    },
    en: {
      translation: {
        times: 'times',
      },
      assembly: enAssembly,
      filter: enFilter,
      lock: enLock,
      manufacture: enManufactures,
      attack_type: enAttackType,
      'page/index': enPageIndex,
      error: enError,
      share: enShare,
      assembly_store: enAssemblyStore,
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
