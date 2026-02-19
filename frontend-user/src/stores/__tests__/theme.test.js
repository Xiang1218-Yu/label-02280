import { describe, it, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useThemeStore } from '../theme'

describe('ThemeStore', () => {
  let store

  beforeEach(() => {
    setActivePinia(createPinia())
    store = useThemeStore()
  })

  it('默认应为暗色模式', () => {
    expect(store.isDark).toBe(true)
  })

  it('toggleTheme 应切换主题', () => {
    store.toggleTheme()
    expect(store.isDark).toBe(false)

    store.toggleTheme()
    expect(store.isDark).toBe(true)
  })

  it('切换主题应更新 DOM class', async () => {
    store.toggleTheme() // 切到亮色
    await new Promise(r => setTimeout(r, 0))
    expect(document.documentElement.classList.contains('light')).toBe(true)

    store.toggleTheme() // 切回暗色
    await new Promise(r => setTimeout(r, 0))
    expect(document.documentElement.classList.contains('light')).toBe(false)
  })
})
