import { describe, it, expect, beforeEach, vi } from 'vitest'
import createLogger, { getLogHistory, clearLogHistory } from '@/utils/logger'

describe('Logger 日志系统', () => {
  let logger

  beforeEach(() => {
    clearLogHistory()
    logger = createLogger('TestModule')
  })

  it('应能创建带模块名的 logger', () => {
    expect(logger).toBeDefined()
    expect(typeof logger.debug).toBe('function')
    expect(typeof logger.info).toBe('function')
    expect(typeof logger.warn).toBe('function')
    expect(typeof logger.error).toBe('function')
  })

  it('debug 日志应记录到历史', () => {
    logger.debug('测试 debug 消息')
    const history = getLogHistory()
    expect(history.length).toBe(1)
    expect(history[0].level).toBe('DEBUG')
    expect(history[0].module).toBe('TestModule')
    expect(history[0].message).toBe('测试 debug 消息')
  })

  it('info 日志应记录到历史', () => {
    logger.info('测试 info 消息', { key: 'value' })
    const history = getLogHistory()
    expect(history.length).toBe(1)
    expect(history[0].level).toBe('INFO')
    expect(history[0].data).toEqual({ key: 'value' })
  })

  it('warn 日志应记录到历史', () => {
    logger.warn('测试 warn 消息')
    const history = getLogHistory()
    expect(history[0].level).toBe('WARN')
  })

  it('error 日志应记录到历史', () => {
    logger.error('测试 error 消息')
    const history = getLogHistory()
    expect(history[0].level).toBe('ERROR')
  })

  it('日志历史应按时间顺序排列', () => {
    logger.info('第一条')
    logger.info('第二条')
    logger.info('第三条')
    const history = getLogHistory()
    expect(history.length).toBe(3)
    expect(history[0].message).toBe('第一条')
    expect(history[2].message).toBe('第三条')
  })

  it('clearLogHistory 应清空历史', () => {
    logger.info('消息')
    clearLogHistory()
    expect(getLogHistory().length).toBe(0)
  })

  it('日志条目应包含时间戳', () => {
    logger.info('时间戳测试')
    const entry = getLogHistory()[0]
    expect(entry.time).toBeDefined()
    expect(entry.time).toMatch(/\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}\.\d{3}/)
  })

  it('不同模块的 logger 应独立工作', () => {
    const logger2 = createLogger('OtherModule')
    logger.info('模块1消息')
    logger2.info('模块2消息')
    const history = getLogHistory()
    expect(history[0].module).toBe('TestModule')
    expect(history[1].module).toBe('OtherModule')
  })

  it('日志历史应限制在 200 条以内', () => {
    for (let i = 0; i < 210; i++) {
      logger.info(`消息 ${i}`)
    }
    const history = getLogHistory()
    expect(history.length).toBe(200)
    // 最早的 10 条应被移除
    expect(history[0].message).toBe('消息 10')
    expect(history[199].message).toBe('消息 209')
  })

  it('getLogHistory 应返回副本而非引用', () => {
    logger.info('测试')
    const h1 = getLogHistory()
    const h2 = getLogHistory()
    expect(h1).not.toBe(h2)
    expect(h1).toEqual(h2)
  })

  it('data 为 null 时应正常记录', () => {
    logger.info('无数据消息')
    const entry = getLogHistory()[0]
    expect(entry.data).toBeNull()
  })

  it('debug 应调用 console.log', () => {
    const spy = vi.spyOn(console, 'log').mockImplementation(() => {})
    logger.debug('控制台测试')
    expect(spy).toHaveBeenCalled()
    spy.mockRestore()
  })

  it('warn 应调用 console.warn', () => {
    const spy = vi.spyOn(console, 'warn').mockImplementation(() => {})
    logger.warn('警告测试')
    expect(spy).toHaveBeenCalled()
    spy.mockRestore()
  })

  it('error 应调用 console.error', () => {
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {})
    logger.error('错误测试')
    expect(spy).toHaveBeenCalled()
    spy.mockRestore()
  })
})
