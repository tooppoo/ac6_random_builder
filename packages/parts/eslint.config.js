import { fromBase, importRules } from '@ac6_assemble_tool/eslint/configs'
import { config as tsConfig } from 'typescript-eslint'

export default tsConfig(
  ...fromBase([
    ...importRules({
      pathGroups: [
        {
          pattern: '~parts/**',
          group: 'builtin',
          position: 'before',
        },
      ],
    }),
  ]),
)
