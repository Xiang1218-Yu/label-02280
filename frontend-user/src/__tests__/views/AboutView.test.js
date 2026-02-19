import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import AboutView from '@/views/AboutView.vue'

const ElIcon = { template: '<span class="el-icon"><slot /></span>' }
const ElTag = { template: '<span class="el-tag"><slot /></span>', props: ['effect', 'round', 'type', 'size'] }
const stubs = {
  ElIcon, ElTag,
  User: { template: '<i />' },
  ArrowUp: { template: '<i />' },
  ArrowDown: { template: '<i />' },
  Camera: { template: '<i />' },
  Reading: { template: '<i />' },
  Bicycle: { template: '<i />' },
  Headset: { template: '<i />' }
}

describe('AboutView 关于我', () => {
  let pinia

  beforeEach(() => {
    pinia = createPinia()
    setActivePinia(pinia)
  })

  function createWrapper() {
    return mount(AboutView, {
      global: {
        plugins: [pinia],
        stubs,
        directives: { lazy: {} }
      }
    })
  }

  it('应渲染关于页面', () => {
    const wrapper = createWrapper()
    expect(wrapper.find('.about-page').exists()).toBe(true)
  })

  it('应显示页面标题', () => {
    const wrapper = createWrapper()
    expect(wrapper.text()).toContain('关于')
  })

  it('应显示个人名字 Alex Chen', () => {
    const wrapper = createWrapper()
    expect(wrapper.text()).toContain('Alex Chen')
  })

  it('应显示个人简介标签', () => {
    const wrapper = createWrapper()
    const tags = wrapper.findAll('.el-tag')
    expect(tags.length).toBeGreaterThan(0)
  })

  it('应有 5 个时间线条目', () => {
    const wrapper = createWrapper()
    const items = wrapper.findAll('.timeline-item')
    expect(items.length).toBe(5)
  })

  it('时间线条目应有日期和标题', () => {
    const wrapper = createWrapper()
    const items = wrapper.findAll('.timeline-card')
    items.forEach(item => {
      expect(item.find('.timeline-date').exists()).toBe(true)
      expect(item.find('h3').exists()).toBe(true)
    })
  })

  it('点击时间线卡片应展开/收起详情', async () => {
    const wrapper = createWrapper()
    const firstCard = wrapper.findAll('.timeline-card')[0]

    // 点击展开
    await firstCard.trigger('click')
    await wrapper.vm.$nextTick()
    // 检查 expandedIndex 变化
    expect(wrapper.findAll('.expand-btn')[0].text()).toContain('收起')

    // 再次点击收起
    await firstCard.trigger('click')
    await wrapper.vm.$nextTick()
    expect(wrapper.findAll('.expand-btn')[0].text()).toContain('展开详情')
  })

  it('应有 4 个兴趣爱好卡片', () => {
    const wrapper = createWrapper()
    const hobbies = wrapper.findAll('.hobby-card')
    expect(hobbies.length).toBe(4)
  })

  it('兴趣爱好卡片应有名称和描述', () => {
    const wrapper = createWrapper()
    const hobbies = wrapper.findAll('.hobby-card')
    hobbies.forEach(card => {
      expect(card.find('h4').exists()).toBe(true)
      expect(card.find('p').exists()).toBe(true)
    })
  })

  it('应显示头像区域', () => {
    const wrapper = createWrapper()
    expect(wrapper.find('.avatar-wrapper').exists()).toBe(true)
  })
})
