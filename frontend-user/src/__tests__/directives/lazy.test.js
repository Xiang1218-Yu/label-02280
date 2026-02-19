import { describe, it, expect, beforeEach, vi } from 'vitest'
import { lazyDirective } from '@/directives/lazy'

describe('v-lazy 自定义指令', () => {
  let el
  let mockObserve
  let mockUnobserve
  let mockDisconnect
  let observerCallback

  beforeEach(() => {
    el = document.createElement('div')
    mockObserve = vi.fn()
    mockUnobserve = vi.fn()
    mockDisconnect = vi.fn()

    global.IntersectionObserver = class {
      constructor(callback) {
        observerCallback = callback
        this.observe = mockObserve
        this.unobserve = mockUnobserve
        this.disconnect = mockDisconnect
      }
    }
  })

  it('mounted 时应创建 IntersectionObserver 并观察元素', () => {
    lazyDirective.mounted(el, { value: null })
    expect(mockObserve).toHaveBeenCalledWith(el)
  })

  it('元素进入视口时应添加 visible 类', () => {
    lazyDirective.mounted(el, { value: null })
    observerCallback([{ isIntersecting: true, target: el }])
    expect(el.classList.contains('visible')).toBe(true)
  })

  it('元素未进入视口时不应添加 visible 类', () => {
    lazyDirective.mounted(el, { value: null })
    observerCallback([{ isIntersecting: false, target: el }])
    expect(el.classList.contains('visible')).toBe(false)
  })

  it('IMG 元素进入视口时应设置 src 并添加 lazy-loaded 类', () => {
    const img = document.createElement('img')
    const imgSrc = 'https://example.com/image.jpg'
    lazyDirective.mounted(img, { value: imgSrc })
    observerCallback([{ isIntersecting: true, target: img }])
    expect(img.src).toBe(imgSrc)
    expect(img.classList.contains('lazy-loaded')).toBe(true)
    expect(img.classList.contains('visible')).toBe(true)
  })

  it('非 IMG 元素不应设置 src', () => {
    lazyDirective.mounted(el, { value: 'some-value' })
    observerCallback([{ isIntersecting: true, target: el }])
    expect(el.getAttribute('src')).toBeNull()
    expect(el.classList.contains('visible')).toBe(true)
  })

  it('unmounted 时应断开 observer 连接', () => {
    lazyDirective.mounted(el, { value: null })
    lazyDirective.unmounted(el)
    expect(mockDisconnect).toHaveBeenCalled()
  })

  it('unmounted 时如果没有 observer 不应报错', () => {
    const cleanEl = document.createElement('div')
    expect(() => lazyDirective.unmounted(cleanEl)).not.toThrow()
  })
})
