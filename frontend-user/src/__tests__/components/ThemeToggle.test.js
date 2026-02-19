import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import { useThemeStore } from '@/stores/theme'
import ThemeToggle from '@/components/ThemeToggle.vue'

// Mock Element Plus 组件
const ElIcon = { template: '<span class="el-icon"><slot /></span>' }
const Sunny = { template: '<i class="sunny" />' }
const Moon = { template: '<i class="moon" />' }

describe('ThemeToggle 组件', () => {
  let pinia

  beforeEach(() => {
    pinia = createPinia()
    setActivePinia(pinia)
  })

  function createWrapper() {
    return mount(ThemeToggle, {
      global: {
        plugins: [pinia],
        components: { ElIcon, Sunny, Moon },
        stubs: { transition: false }
      }
    })
  }

  it('应渲染切换按钮', () => {
    const wrapper = createWrapper()
    expect(wrapper.find('.theme-toggle').exists()).toBe(true)
  })

  it('按钮应有 aria-label 属性', () => {
    const wrapper = createWrapper()
    expect(wrapper.find('button').attributes('aria-label')).toBe('切换主题')
  })

  it('点击按钮应切换主题', async () => {
    const wrapper = createWrapper()
    const store = useThemeStore()
    expect(store.isDark).toBe(true)

    await wrapper.find('.theme-toggle').trigger('click')
    expect(store.isDark).toBe(false)
  })

  it('暗色模式下 title 应为"切换到亮色模式"', () => {
    const wrapper = createWrapper()
    expect(wrapper.find('button').attributes('title')).toBe('切换到亮色模式')
  })

  it('亮色模式下 title 应为"切换到暗色模式"', async () => {
    const wrapper = createWrapper()
    const store = useThemeStore()
    store.toggleTheme() // 切换到亮色
    await wrapper.vm.$nextTick()
    expect(wrapper.find('button').attributes('title')).toBe('切换到暗色模式')
  })
})
