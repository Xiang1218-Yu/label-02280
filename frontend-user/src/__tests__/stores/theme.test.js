import { describe, it, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useThemeStore } from '@/stores/theme'

describe('ThemeStore', () => {
  let store

  beforeEach(() => {
    setActivePinia(createPinia())
    store = useThemeStore()
  })

  it('默认应为暗色模式', () => {
    expect(store.isDark).toBe(true)
  })

  it('切换主题应改变 isDark 值', () => {
    store.toggleTheme()
    expect(store.isDark).toBe(false)
  })

  it('连续切换应恢复原始状态', () => {
    store.toggleTheme()
    store.toggleTheme()
    expect(store.isDark).toBe(true)
  })

  it('切换到亮色模式应给 html 添加 light 类', async () => {
    store.toggleTheme() // 切换到亮色
    // watch 是异步的，需要等待 nextTick
    await new Promise(r => setTimeout(r, 0))
    expect(document.documentElement.classList.contains('light')).toBe(true)
  })

  it('切换回暗色模式应移除 light 类', async () => {
    store.toggleTheme() // 亮色
    await new Promise(r => setTimeout(r, 0))
    store.toggleTheme() // 暗色
    await new Promise(r => setTimeout(r, 0))
    expect(document.documentElement.classList.contains('light')).toBe(false)
  })
})
