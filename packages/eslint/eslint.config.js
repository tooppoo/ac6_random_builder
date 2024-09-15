import { config as tsConfig } from 'typescript-eslint'

import { fromBase } from './configs.js'

export default tsConfig(...fromBase())
