import 'i18next'
import { jaAttackType } from '~view/i18n/locales/ja/attackType'
import type { jaError } from '~view/i18n/locales/ja/error'
import type { jaManufactures } from '~view/i18n/locales/ja/manufactures'

import type { jaAssembly } from './locales/ja/assembly'
import type { jaFilter } from './locales/ja/filter'
import type { jaLock } from './locales/ja/lock'
import type { jaPageIndex } from './locales/ja/pages/index'

declare module 'i18next' {
  interface CustomTypeOptions {
    resources: {
      assembly: typeof jaAssembly
      lock: typeof jaLock
      filter: typeof jaFilter
      manufacture: typeof jaManufactures
      attack_ype: typeof jaAttackType
      'page/index': typeof jaPageIndex
      error: typeof jaError
    }
  }
}
