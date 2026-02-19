import { describe, it, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useMessageStore } from '../message'

describe('MessageStore', () => {
  let store

  beforeEach(() => {
    setActivePinia(createPinia())
    store = useMessageStore()
  })

  it('应有3条初始留言', () => {
    expect(store.messages.length).toBe(3)
  })

  it('初始留言应有完整字段', () => {
    store.messages.forEach(msg => {
      expect(msg).toHaveProperty('id')
      expect(msg).toHaveProperty('name')
      expect(msg).toHaveProperty('email')
      expect(msg).toHaveProperty('content')
      expect(msg).toHaveProperty('date')
    })
  })

  it('留言日期应为中文格式', () => {
    store.messages.forEach(msg => {
      expect(msg.date).toMatch(/\d{4}年\d{1,2}月\d{1,2}日/)
    })
  })

  it('addMessage 应添加新留言到顶部', () => {
    const newMsg = { name: '测试用户', email: 'test@example.com', content: '测试留言内容' }
    store.addMessage(newMsg)

    expect(store.messages.length).toBe(4)
    expect(store.messages[0].name).toBe('测试用户')
    expect(store.messages[0].email).toBe('test@example.com')
    expect(store.messages[0].content).toBe('测试留言内容')
  })

  it('addMessage 应自动生成中文日期', () => {
    store.addMessage({ name: '测试', email: 'a@b.com', content: '内容' })
    const date = store.messages[0].date
    expect(date).toMatch(/\d{4}年\d{1,2}月\d{1,2}日/)
  })

  it('addMessage 应自动生成 id', () => {
    store.addMessage({ name: 'A', email: 'a@b.com', content: '内容1' })
    expect(store.messages[0].id).toBeDefined()
    expect(typeof store.messages[0].id).toBe('number')
  })
})
