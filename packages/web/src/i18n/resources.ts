import { enAssembly } from '~view/i18n/locales/en/assembly'
import { enAssemblyStore } from '~view/i18n/locales/en/assemblyStore'
import { enAttackType } from '~view/i18n/locales/en/attackType'
import { enError } from '~view/i18n/locales/en/error'
import { enFilter } from '~view/i18n/locales/en/filter'
import { enLock } from '~view/i18n/locales/en/lock'
import { enManufactures } from '~view/i18n/locales/en/manufactures'
import { enPageIndex } from '~view/i18n/locales/en/pages'
import { enShare } from '~view/i18n/locales/en/share'
import { jaAssembly } from '~view/i18n/locales/ja/assembly'
import { jaAssemblyStore } from '~view/i18n/locales/ja/assemblyStore'
import { jaAttackType } from '~view/i18n/locales/ja/attackType'
import { jaError } from '~view/i18n/locales/ja/error'
import { jaFilter } from '~view/i18n/locales/ja/filter'
import { jaLock } from '~view/i18n/locales/ja/lock'
import { jaManufactures } from '~view/i18n/locales/ja/manufactures'
import { jaPageIndex } from '~view/i18n/locales/ja/pages'
import { jaShare } from '~view/i18n/locales/ja/share'

export const resources = {
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
} as const
