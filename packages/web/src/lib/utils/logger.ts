import log, { type Logger, type LogLevelDesc } from 'loglevel'

import { PUBLIC_LOG_LEVEL } from '$env/static/public'

const defaultLogger = log.getLogger('default')
defaultLogger.setDefaultLevel('error')

if (PUBLIC_LOG_LEVEL) {
  defaultLogger.setLevel(parseAsLogLevel(PUBLIC_LOG_LEVEL, 'info'))
}

type LoggingMethod = 'log' | 'debug' | 'info' | 'warn' | 'error' | 'trace'
export const logger: Pick<Logger, LoggingMethod> = defaultLogger

function parseAsLogLevel(v: string, fallback: LogLevelDesc): LogLevelDesc {
  switch (v) {
    case 'debug':
    case 'info':
    case 'warn':
    case 'error':
    case 'trace':
    case 'silent':
      return v
    default:
      return fallback
  }
}