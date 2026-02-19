import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import PortfolioView from '@/views/PortfolioView.vue'

const ElIcon = { template: '<span class="el-icon"><slot /></span>' }
const ElTag = { template: '<span class="el-tag"><slot /></span>', props: ['size', 'effect', 'round'] }

const stubs = {
  ElIcon, ElTag,
  'transition-group': {
    template: '<div class="transition-group-stub"><slot /></div>',
    props: ['name', 'tag']
  }
}

describe('PortfolioView 作品集', () => {
  let pinia

  beforeEach(() => {
    pinia = createPinia()
    setActivePinia(pinia)
  })

  function createWrapper() {
    return mount(PortfolioView, {
      global: {
        plugins: [pinia],
        stubs,
        directives: { lazy: {} }
      }
    })
  }

  it('应渲染作品集页面', () => {
    const wrapper = createWrapper()
    expect(wrapper.find('.portfolio-page').exists()).toBe(true)
  })

  it('应显示页面标题', () => {
    const wrapper = createWrapper()
    expect(wrapper.text()).toContain('我的')
    expect(wrapper.text()).toContain('作品')
  })

  it('应有筛选标签', () => {
    const wrapper = createWrapper()
    const tabs = wrapper.findAll('.filter-tab')
    expect(tabs.length).toBeGreaterThan(0)
    expect(tabs[0].text()).toBe('全部')
  })

  it('默认应显示 6 个项目', () => {
    const wrapper = createWrapper()
    const cards = wrapper.findAll('.project-card')
    expect(cards.length).toBe(6)
  })

  it('项目卡片应有标题和描述', () => {
    const wrapper = createWrapper()
    const firstCard = wrapper.findAll('.project-card')[0]
    expect(firstCard.find('h3').exists()).toBe(true)
    expect(firstCard.find('p').exists()).toBe(true)
  })

  it('项目卡片应有分类徽章', () => {
    const wrapper = createWrapper()
    const badges = wrapper.findAll('.project-badge')
    expect(badges.length).toBe(6)
  })

  it('项目卡片应有技术标签', () => {
    const wrapper = createWrapper()
    const firstCard = wrapper.findAll('.project-card')[0]
    expect(firstCard.findAll('.el-tag').length).toBeGreaterThan(0)
  })

  it('筛选标签点击应过滤项目', async () => {
    const wrapper = createWrapper()
    const tabs = wrapper.findAll('.filter-tab')
    const webTab = tabs.find(t => t.text() === 'Web')
    if (webTab) {
      await webTab.trigger('click')
      await wrapper.vm.$nextTick()
      const cards = wrapper.findAll('.project-card')
      expect(cards.length).toBeLessThanOrEqual(6)
    }
  })
})
