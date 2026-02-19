import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import { createRouter, createWebHistory } from 'vue-router'
import AppFooter from '@/components/AppFooter.vue'

const ElIcon = { template: '<span class="el-icon"><slot /></span>' }
const stubs = {
  ElIcon,
  Link: { template: '<i />' },
  Message: { template: '<i />' },
  ChatDotRound: { template: '<i />' }
}

describe('AppFooter 组件', () => {
  let pinia, router

  beforeEach(() => {
    pinia = createPinia()
    setActivePinia(pinia)
    router = createRouter({
      history: createWebHistory(),
      routes: [
        { path: '/', component: { template: '<div />' } },
        { path: '/about', component: { template: '<div />' } },
        { path: '/skills', component: { template: '<div />' } },
        { path: '/portfolio', component: { template: '<div />' } },
        { path: '/blog', component: { template: '<div />' } },
        { path: '/contact', component: { template: '<div />' } }
      ]
    })
  })

  function createWrapper() {
    return mount(AppFooter, {
      global: {
        plugins: [pinia, router],
        stubs
      }
    })
  }

  it('应渲染 footer 元素', () => {
    const wrapper = createWrapper()
    expect(wrapper.find('footer.app-footer').exists()).toBe(true)
  })

  it('应显示 Logo 文字', () => {
    const wrapper = createWrapper()
    expect(wrapper.find('.logo-text').text()).toBe('Alex Chen')
  })

  it('应显示当前年份', () => {
    const wrapper = createWrapper()
    const year = new Date().getFullYear()
    expect(wrapper.text()).toContain(String(year))
  })

  it('应显示版权信息', () => {
    const wrapper = createWrapper()
    expect(wrapper.text()).toContain('Alex Chen. All rights reserved.')
  })

  it('应显示技术栈标签', () => {
    const wrapper = createWrapper()
    const text = wrapper.text()
    expect(text).toContain('Vue 3')
    expect(text).toContain('Vite')
    expect(text).toContain('Element Plus')
    expect(text).toContain('Pinia')
    expect(text).toContain('SCSS')
  })

  it('应有快速导航链接', () => {
    const wrapper = createWrapper()
    const links = wrapper.findAll('a')
    expect(links.length).toBeGreaterThan(0)
  })
})
