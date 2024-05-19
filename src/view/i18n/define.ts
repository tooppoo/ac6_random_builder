import _i18next from 'i18next'
import { createI18nStore } from 'svelte-i18next'

import { enAssembly } from './locales/en/assembly.ts'
import { enAssemblyStore } from './locales/en/assemblyStore.ts'
import { enAttackType } from './locales/en/attackType.ts'
import { enError } from './locales/en/error.ts'
import { enFilter } from './locales/en/filter.ts'
import { enLock } from './locales/en/lock.ts'
import { enManufactures } from './locales/en/manufactures.ts'
import { enPageIndex } from './locales/en/pages'
import { enShare } from './locales/en/share.ts'
import { jaAssembly } from './locales/ja/assembly.ts'
import { jaAssemblyStore } from './locales/ja/assemblyStore.ts'
import { jaAttackType } from './locales/ja/attackType.ts'
import { jaError } from './locales/ja/error.ts'
import { jaFilter } from './locales/ja/filter.ts'
import { jaLock } from './locales/ja/lock.ts'
import { jaManufactures } from './locales/ja/manufactures.ts'
import { jaPageIndex } from './locales/ja/pages'
import { jaShare } from './locales/ja/share.ts'

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
export type I18Next = typeof _i18next
