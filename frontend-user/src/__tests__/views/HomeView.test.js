import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'

// Mock Element Plus 组件
const ElIcon = { template: '<span class="el-icon"><slot /></span>' }
const stubs = {
  ElIcon,
  Folder: { template: '<i />' },
  ChatDotRound: { template: '<i />' },
  Calendar: { template: '<i />' },
  Star: { template: '<i />' },
  Document: { template: '<i />' },
  Monitor: { template: '<i />' },
  Setting: { template: '<i />' },
  DataAnalysis: { template: '<i />' },
  Upload: { template: '<i />' }
}

describe('HomeView 首页', () => {
  let pinia, router

  beforeEach(() => {
    vi.useFakeTimers()
    pinia = createPinia()
    setActivePinia(pinia)
    router = createRouter({
      history: createWebHistory(),
      routes: [
        { path: '/', component: HomeView },
        { path: '/portfolio', component: { template: '<div />' } },
        { path: '/contact', component: { template: '<div />' } }
      ]
    })
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  function createWrapper() {
    return mount(HomeView, {
      global: {
        plugins: [pinia, router],
        stubs,
        directives: { lazy: {} }
      }
    })
  }

  it('应渲染首页容器', () => {
    const wrapper = createWrapper()
    expect(wrapper.find('.home-page').exists()).toBe(true)
  })

  it('应显示 Hero 区域', () => {
    const wrapper = createWrapper()
    expect(wrapper.find('.hero-section').exists()).toBe(true)
  })

  it('应显示名字 Alex Chen', () => {
    const wrapper = createWrapper()
    expect(wrapper.find('.hero-name').text()).toBe('Alex Chen')
  })

  it('应显示问候语', () => {
    const wrapper = createWrapper()
    expect(wrapper.find('.hero-greeting').text()).toContain('你好')
  })

  it('应显示状态徽章"开放合作中"', () => {
    const wrapper = createWrapper()
    expect(wrapper.find('.hero-badge').text()).toContain('开放合作中')
  })

  it('应显示技术栈标签', () => {
    const wrapper = createWrapper()
    const badges = wrapper.findAll('.tech-badge')
    expect(badges.length).toBe(5)
    const texts = badges.map(b => b.text())
    expect(texts).toContain('Vue 3')
    expect(texts).toContain('Docker')
  })

  it('应有两个 CTA 按钮', () => {
    const wrapper = createWrapper()
    const btns = wrapper.findAll('.btn')
    expect(btns.length).toBe(2)
  })

  it('应显示 4 个统计卡片', () => {
    const wrapper = createWrapper()
    const cards = wrapper.findAll('.stat-card')
    expect(cards.length).toBe(4)
  })

  it('应显示 4 个功能特性卡片', () => {
    const wrapper = createWrapper()
    const cards = wrapper.findAll('.feature-card')
    expect(cards.length).toBe(4)
  })

  it('功能卡片应有标题和描述', () => {
    const wrapper = createWrapper()
    const cards = wrapper.findAll('.feature-card')
    cards.forEach(card => {
      expect(card.find('h3').exists()).toBe(true)
      expect(card.find('p').exists()).toBe(true)
    })
  })

  it('应有 25 个粒子元素', () => {
    const wrapper = createWrapper()
    const particles = wrapper.findAll('.particle')
    expect(particles.length).toBe(25)
  })

  it('打字效果应在挂载后开始', async () => {
    const wrapper = createWrapper()
    // 打字效果使用 setTimeout，需要多次推进
    for (let i = 0; i < 10; i++) {
      vi.advanceTimersByTime(120)
      await wrapper.vm.$nextTick()
    }
    const text = wrapper.find('.typing-text').text()
    expect(text.length).toBeGreaterThan(0)
  })

  it('滚动鼠标提示应存在', () => {
    const wrapper = createWrapper()
    expect(wrapper.find('.hero-scroll').exists()).toBe(true)
    expect(wrapper.text()).toContain('向下滚动')
  })
})
