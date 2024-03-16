import log, { type Logger } from 'loglevel'

const defaultLogger = log.getLogger('default')
defaultLogger.setDefaultLevel('warn')

if (import.meta.env.VITE_LOG_LEVEL) {
  defaultLogger.setLevel(import.meta.env.VITE_LOG_LEVEL)
}

type LoggingMethod = 'log' | 'debug' | 'info' | 'warn' | 'error' | 'trace'
export const logger: Pick<Logger, LoggingMethod> = defaultLogger
