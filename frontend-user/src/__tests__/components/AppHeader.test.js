import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import { createRouter, createWebHistory } from 'vue-router'
import AppHeader from '@/components/AppHeader.vue'

// Mock Element Plus
const ElIcon = { template: '<span class="el-icon"><slot /></span>' }
const stubs = {
  ElIcon,
  House: { template: '<i />' },
  User: { template: '<i />' },
  Trophy: { template: '<i />' },
  Folder: { template: '<i />' },
  Document: { template: '<i />' },
  ChatDotRound: { template: '<i />' },
  Sunny: { template: '<i />' },
  Moon: { template: '<i />' },
  ThemeToggle: { template: '<div class="theme-toggle-stub" />' }
}

describe('AppHeader 组件', () => {
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
    return mount(AppHeader, {
      global: {
        plugins: [pinia, router],
        stubs
      }
    })
  }

  it('应渲染 header 元素', () => {
    const wrapper = createWrapper()
    expect(wrapper.find('header.app-header').exists()).toBe(true)
  })

  it('应显示 Logo 文字', () => {
    const wrapper = createWrapper()
    expect(wrapper.find('.logo-text').text()).toBe('Alex Chen')
  })

  it('应有 6 个导航链接', () => {
    const wrapper = createWrapper()
    const links = wrapper.findAll('.nav-link')
    expect(links.length).toBe(6)
  })

  it('导航链接应包含正确的路径', () => {
    const wrapper = createWrapper()
    const links = wrapper.findAll('.nav-link')
    const paths = links.map(l => l.attributes('href') || l.attributes('to'))
    expect(paths).toContain('/')
    expect(paths).toContain('/about')
    expect(paths).toContain('/skills')
    expect(paths).toContain('/portfolio')
    expect(paths).toContain('/blog')
    expect(paths).toContain('/contact')
  })

  it('应包含 ThemeToggle 组件', () => {
    const wrapper = createWrapper()
    expect(wrapper.find('.theme-toggle-stub').exists()).toBe(true)
  })

  it('菜单按钮点击应切换 menuOpen 状态', async () => {
    const wrapper = createWrapper()
    const menuBtn = wrapper.find('.menu-toggle')
    if (menuBtn.exists()) {
      await menuBtn.trigger('click')
      expect(wrapper.find('.nav-menu.active').exists()).toBe(true)
    }
  })

  it('Logo 应链接到首页', () => {
    const wrapper = createWrapper()
    const logo = wrapper.find('.logo')
    expect(logo.attributes('href') || logo.attributes('to')).toBe('/')
  })
})
