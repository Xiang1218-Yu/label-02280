/**
 * 前端日志系统
 * 支持不同级别的日志输出，生产环境自动静默 debug 级别
 */

const LOG_LEVELS = { DEBUG: 0, INFO: 1, WARN: 2, ERROR: 3 }

const isProduction = import.meta.env?.PROD ?? false
const currentLevel = isProduction ? LOG_LEVELS.INFO : LOG_LEVELS.DEBUG

const logHistory = []
const MAX_HISTORY = 200

function formatTime() {
  const d = new Date()
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')} ${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}:${String(d.getSeconds()).padStart(2, '0')}.${String(d.getMilliseconds()).padStart(3, '0')}`
}

function addToHistory(level, module, message, data) {
  const entry = { time: formatTime(), level, module, message, data }
  logHistory.push(entry)
  if (logHistory.length > MAX_HISTORY) logHistory.shift()
  return entry
}

function createLogger(module) {
  return {
    debug(message, data = null) {
      const entry = addToHistory('DEBUG', module, message, data)
      if (currentLevel <= LOG_LEVELS.DEBUG) {
        console.log(`%c[${entry.time}] [DEBUG] [${module}]`, 'color: #6C63FF', message, data ?? '')
      }
    },
    info(message, data = null) {
      const entry = addToHistory('INFO', module, message, data)
      if (currentLevel <= LOG_LEVELS.INFO) {
        console.info(`%c[${entry.time}] [INFO] [${module}]`, 'color: #00C9A7', message, data ?? '')
      }
    },
    warn(message, data = null) {
      const entry = addToHistory('WARN', module, message, data)
      if (currentLevel <= LOG_LEVELS.WARN) {
        console.warn(`[${entry.time}] [WARN] [${module}]`, message, data ?? '')
      }
    },
    error(message, data = null) {
      const entry = addToHistory('ERROR', module, message, data)
      if (currentLevel <= LOG_LEVELS.ERROR) {
        console.error(`[${entry.time}] [ERROR] [${module}]`, message, data ?? '')
      }
    }
  }
}

export function getLogHistory() {
  return [...logHistory]
}

export function clearLogHistory() {
  logHistory.length = 0
}

export default createLogger
