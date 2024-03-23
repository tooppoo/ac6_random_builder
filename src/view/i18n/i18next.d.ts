import 'i18next'
import type { jaAssembly } from './locales/ja/assembly.ts'
import type { jaFilter } from './locales/ja/filter.ts'
import type { jaLock } from './locales/ja/lock.ts'
import type { jaPageIndex } from './locales/ja/pages/index.ts'

declare module 'i18next' {
  interface CustomTypeOptions {
    resources: {
      assembly: typeof jaAssembly
      lock: typeof jaLock
      filter: typeof jaFilter
      'page/index': typeof jaPageIndex
    }
  }
}
