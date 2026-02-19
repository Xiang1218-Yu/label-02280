import { defineStore } from 'pinia'
import { ref } from 'vue'
import createLogger from '@/utils/logger'

const log = createLogger('MessageStore')

/**
 * 留言状态管理
 * Vue 技术点：Pinia 状态管理
 */
export const useMessageStore = defineStore('message', () => {
  const messages = ref([
    {
      id: 1,
      name: '张三',
      email: 'zhangsan@example.com',
      content: '网站做得很棒，设计感十足！',
      date: '2025年12月1日'
    },
    {
      id: 2,
      name: '李四',
      email: 'lisi@example.com',
      content: '博客文章写得很有深度，期待更多内容。',
      date: '2025年11月28日'
    },
    {
      id: 3,
      name: '王五',
      email: 'wangwu@example.com',
      content: '技术栈选型很合理，学到了很多。',
      date: '2025年11月15日'
    }
  ])

  function addMessage(msg) {
    if (!msg.name || !msg.content) {
      log.warn('添加留言失败：缺少必要字段', msg)
      return false
    }
    const now = new Date()
    const dateStr = `${now.getFullYear()}年${now.getMonth() + 1}月${now.getDate()}日`
    const newMsg = {
      id: Date.now(),
      ...msg,
      date: dateStr
    }
    messages.value.unshift(newMsg)
    log.info('新留言添加成功', { name: msg.name, id: newMsg.id })
    return true
  }

  return { messages, addMessage }
})
