import { describe, it, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useMessageStore } from '@/stores/message'

describe('MessageStore', () => {
  let store

  beforeEach(() => {
    setActivePinia(createPinia())
    store = useMessageStore()
  })

  describe('初始状态', () => {
    it('应有预设留言数据', () => {
      expect(store.messages.length).toBeGreaterThan(0)
    })

    it('每条留言应有完整字段', () => {
      store.messages.forEach(msg => {
        expect(msg).toHaveProperty('id')
        expect(msg).toHaveProperty('name')
        expect(msg).toHaveProperty('email')
        expect(msg).toHaveProperty('content')
        expect(msg).toHaveProperty('date')
      })
    })

    it('日期格式应为中文（年月日）', () => {
      store.messages.forEach(msg => {
        expect(msg.date).toMatch(/\d{4}年\d{1,2}月\d{1,2}日/)
      })
    })
  })

  describe('添加留言', () => {
    it('应能成功添加新留言', () => {
      const before = store.messages.length
      store.addMessage({
        name: '测试用户',
        email: 'test@example.com',
        content: '这是一条测试留言'
      })
      expect(store.messages.length).toBe(before + 1)
    })

    it('新留言应在列表最前面', () => {
      store.addMessage({
        name: '新用户',
        email: 'new@example.com',
        content: '最新留言内容'
      })
      expect(store.messages[0].name).toBe('新用户')
      expect(store.messages[0].content).toBe('最新留言内容')
    })

    it('新留言应自动生成 id 和日期', () => {
      store.addMessage({
        name: '自动字段',
        email: 'auto@example.com',
        content: '测试自动字段生成'
      })
      const msg = store.messages[0]
      expect(msg.id).toBeDefined()
      expect(typeof msg.id).toBe('number')
      expect(msg.date).toMatch(/\d{4}年\d{1,2}月\d{1,2}日/)
    })

    it('缺少 name 应返回 false', () => {
      const result = store.addMessage({ content: '没有名字' })
      expect(result).toBe(false)
    })

    it('缺少 content 应返回 false', () => {
      const result = store.addMessage({ name: '没有内容' })
      expect(result).toBe(false)
    })
  })
})
