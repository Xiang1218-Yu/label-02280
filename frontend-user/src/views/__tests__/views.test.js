import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import { createRouter, createMemoryHistory } from 'vue-router'
import ElementPlus from 'element-plus'
import HomeView from '../HomeView.vue'
import BlogView from '../BlogView.vue'
import ContactView from '../ContactView.vue'

// Mock IntersectionObserver 为 class
global.IntersectionObserver = class {
  constructor(callback) {
    this.callback = callback
  }
  observe() {}
  unobserve() {}
  disconnect() {}
}

const router = createRouter({
  history: createMemoryHistory(),
  routes: [
    { path: '/', component: HomeView },
    { path: '/blog', component: BlogView },
    { path: '/contact', component: ContactView },
    { path: '/portfolio', component: { template: '<div />' } },
    { path: '/about', component: { template: '<div />' } },
    { path: '/skills', component: { template: '<div />' } }
  ]
})

function mountView(component) {
  const pinia = createPinia()
  setActivePinia(pinia)
  return mount(component, {
    global: {
      plugins: [pinia, router, ElementPlus],
      directives: {
        lazy: { mounted() {}, unmounted() {} }
      }
    }
  })
}

describe('HomeView', () => {
  it('应渲染 hero 区域', () => {
    const wrapper = mountView(HomeView)
    expect(wrapper.find('.hero-section').exists()).toBe(true)
  })

  it('应显示名字 Alex Chen', () => {
    const wrapper = mountView(HomeView)
    expect(wrapper.text()).toContain('Alex Chen')
  })

  it('应有统计卡片', () => {
    const wrapper = mountView(HomeView)
    expect(wrapper.findAll('.stat-card').length).toBe(4)
  })

  it('应有功能特性卡片', () => {
    const wrapper = mountView(HomeView)
    expect(wrapper.findAll('.feature-card').length).toBe(4)
  })

  it('应有技术栈标签', () => {
    const wrapper = mountView(HomeView)
    expect(wrapper.findAll('.tech-badge').length).toBeGreaterThan(0)
  })
})

describe('BlogView', () => {
  it('应渲染博客页面', () => {
    const wrapper = mountView(BlogView)
    expect(wrapper.find('.blog-page').exists()).toBe(true)
  })

  it('应有搜索框', () => {
    const wrapper = mountView(BlogView)
    expect(wrapper.find('.search-input').exists()).toBe(true)
  })

  it('应有分类标签', () => {
    const wrapper = mountView(BlogView)
    expect(wrapper.findAll('.cat-tab').length).toBeGreaterThan(0)
  })

  it('应显示文章卡片', () => {
    const wrapper = mountView(BlogView)
    expect(wrapper.findAll('.article-card').length).toBeGreaterThan(0)
  })

  it('点击分类应筛选文章', async () => {
    const wrapper = mountView(BlogView)
    const tabs = wrapper.findAll('.cat-tab')
    const frontendTab = tabs.find(t => t.text() === '前端')
    if (frontendTab) {
      await frontendTab.trigger('click')
      expect(wrapper.findAll('.article-card').length).toBeLessThanOrEqual(4)
    }
  })
})

describe('ContactView', () => {
  it('应渲染联系页面', () => {
    const wrapper = mountView(ContactView)
    expect(wrapper.find('.contact-page').exists()).toBe(true)
  })

  it('应有联系表单', () => {
    const wrapper = mountView(ContactView)
    expect(wrapper.find('.contact-form').exists()).toBe(true)
  })

  it('应有联系信息卡片', () => {
    const wrapper = mountView(ContactView)
    expect(wrapper.findAll('.info-card').length).toBe(4)
  })

  it('应有留言板区域', () => {
    const wrapper = mountView(ContactView)
    expect(wrapper.find('.guestbook-section').exists()).toBe(true)
  })

  it('应显示初始留言', () => {
    const wrapper = mountView(ContactView)
    expect(wrapper.findAll('.guestbook-card').length).toBe(3)
  })
})
