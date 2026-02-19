import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import SkillsView from '@/views/SkillsView.vue'

const stubs = {
  'el-icon': { template: '<span class="el-icon"><slot /></span>' },
  'transition-group': {
    template: '<div class="transition-group-stub"><slot /></div>',
    props: ['name', 'tag']
  }
}

describe('SkillsView 技能页面', () => {
  let pinia

  beforeEach(() => {
    pinia = createPinia()
    setActivePinia(pinia)
  })

  function createWrapper() {
    return mount(SkillsView, {
      global: {
        plugins: [pinia],
        stubs,
        directives: { lazy: {} }
      }
    })
  }

  it('应渲染技能页面', () => {
    const wrapper = createWrapper()
    expect(wrapper.find('.skills-page').exists()).toBe(true)
  })

  it('应显示页面标题', () => {
    const wrapper = createWrapper()
    expect(wrapper.text()).toContain('技术')
    expect(wrapper.text()).toContain('技能')
  })

  it('应有 5 个分类筛选按钮', () => {
    const wrapper = createWrapper()
    const tabs = wrapper.findAll('.filter-tab')
    expect(tabs.length).toBe(5)
  })

  it('分类按钮应包含正确的分类名', () => {
    const wrapper = createWrapper()
    const text = wrapper.text()
    expect(text).toContain('全部')
    expect(text).toContain('前端')
    expect(text).toContain('后端')
    expect(text).toContain('数据库')
    expect(text).toContain('工具')
  })

  it('默认应显示全部 11 个技能', () => {
    const wrapper = createWrapper()
    const cards = wrapper.findAll('.skill-card')
    expect(cards.length).toBe(11)
  })

  it('点击"前端"分类应只显示前端技能', async () => {
    const wrapper = createWrapper()
    const frontendTab = wrapper.findAll('.filter-tab')[1] // 前端
    await frontendTab.trigger('click')
    const cards = wrapper.findAll('.skill-card')
    expect(cards.length).toBe(4) // Vue.js, JavaScript, CSS/SCSS, React
  })

  it('点击"后端"分类应只显示后端技能', async () => {
    const wrapper = createWrapper()
    const backendTab = wrapper.findAll('.filter-tab')[2] // 后端
    await backendTab.trigger('click')
    const cards = wrapper.findAll('.skill-card')
    expect(cards.length).toBe(3) // Java, Spring Boot, Node.js
  })

  it('技能卡片应有名称、等级和百分比', () => {
    const wrapper = createWrapper()
    const firstCard = wrapper.findAll('.skill-card')[0]
    expect(firstCard.find('h3').exists()).toBe(true)
    expect(firstCard.find('.skill-level').exists()).toBe(true)
    expect(firstCard.find('.skill-percent').exists()).toBe(true)
  })

  it('技能卡片应有进度条', () => {
    const wrapper = createWrapper()
    const bars = wrapper.findAll('.skill-bar-wrapper')
    expect(bars.length).toBeGreaterThan(0)
  })

  it('技能卡片应有标签', () => {
    const wrapper = createWrapper()
    const tags = wrapper.findAll('.skill-tag')
    expect(tags.length).toBeGreaterThan(0)
  })

  it('应有 4 个技能概览环形图', () => {
    const wrapper = createWrapper()
    const rings = wrapper.findAll('.summary-card')
    expect(rings.length).toBe(4)
  })

  it('概览卡片应显示百分比', () => {
    const wrapper = createWrapper()
    const rings = wrapper.findAll('.summary-ring span')
    rings.forEach(ring => {
      expect(ring.text()).toMatch(/\d+%/)
    })
  })
})
