import {enAssembly} from "~view/i18n/locales/en/assembly.ts";
import {enAssemblyStore} from "~view/i18n/locales/en/assemblyStore.ts";
import {enAttackType} from "~view/i18n/locales/en/attackType.ts";
import {enError} from "~view/i18n/locales/en/error.ts";
import {enFilter} from "~view/i18n/locales/en/filter.ts";
import {enLock} from "~view/i18n/locales/en/lock.ts";
import {enManufactures} from "~view/i18n/locales/en/manufactures.ts";
import {enPageIndex} from "~view/i18n/locales/en/pages";
import {enShare} from "~view/i18n/locales/en/share.ts";
import {jaAssembly} from "~view/i18n/locales/ja/assembly.ts";
import {jaAssemblyStore} from "~view/i18n/locales/ja/assemblyStore.ts";
import {jaAttackType} from "~view/i18n/locales/ja/attackType.ts";
import {jaError} from "~view/i18n/locales/ja/error.ts";
import {jaFilter} from "~view/i18n/locales/ja/filter.ts";
import {jaLock} from "~view/i18n/locales/ja/lock.ts";
import {jaManufactures} from "~view/i18n/locales/ja/manufactures.ts";
import {jaPageIndex} from "~view/i18n/locales/ja/pages";
import {jaShare} from "~view/i18n/locales/ja/share.ts";

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
} as const;