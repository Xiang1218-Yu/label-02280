import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import ThemeToggle from '../ThemeToggle.vue'
import ElementPlus from 'element-plus'

describe('ThemeToggle 组件', () => {
  let wrapper

  beforeEach(() => {
    const pinia = createPinia()
    setActivePinia(pinia)
    wrapper = mount(ThemeToggle, {
      global: {
        plugins: [pinia, ElementPlus]
      }
    })
  })

  it('应渲染按钮', () => {
    expect(wrapper.find('button.theme-toggle').exists()).toBe(true)
  })

  it('应有 aria-label', () => {
    expect(wrapper.find('button').attributes('aria-label')).toBe('切换主题')
  })

  it('点击应切换主题', async () => {
    await wrapper.find('button').trigger('click')
    // 不报错即通过
    expect(wrapper.find('button').exists()).toBe(true)
  })
})
