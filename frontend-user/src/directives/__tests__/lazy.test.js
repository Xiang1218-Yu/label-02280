import { describe, it, expect, vi, beforeEach } from 'vitest'
import { lazyDirective } from '../lazy'

describe('v-lazy 自定义指令', () => {
  let mockObserve, mockUnobserve, mockDisconnect

  beforeEach(() => {
    mockObserve = vi.fn()
    mockUnobserve = vi.fn()
    mockDisconnect = vi.fn()

    global.IntersectionObserver = class {
      constructor(callback) {
        this._callback = callback
        this.observe = mockObserve
        this.unobserve = mockUnobserve
        this.disconnect = mockDisconnect
      }
    }
  })

  it('mounted 应创建 IntersectionObserver', () => {
    const el = document.createElement('div')
    lazyDirective.mounted(el, { value: null })

    expect(mockObserve).toHaveBeenCalledWith(el)
    expect(el._lazyObserver).toBeDefined()
  })

  it('元素可见时应添加 visible 类', () => {
    const el = document.createElement('div')
    lazyDirective.mounted(el, { value: null })

    const observer = el._lazyObserver
    observer._callback([{ isIntersecting: true, target: el }])

    expect(el.classList.contains('visible')).toBe(true)
  })

  it('图片元素可见时应设置 src', () => {
    const el = document.createElement('img')
    const imgUrl = 'https://example.com/image.jpg'
    lazyDirective.mounted(el, { value: imgUrl })

    const observer = el._lazyObserver
    observer._callback([{ isIntersecting: true, target: el }])

    expect(el.src).toBe(imgUrl)
    expect(el.classList.contains('lazy-loaded')).toBe(true)
    expect(el.classList.contains('visible')).toBe(true)
  })

  it('元素不可见时不应添加类', () => {
    const el = document.createElement('div')
    lazyDirective.mounted(el, { value: null })

    const observer = el._lazyObserver
    observer._callback([{ isIntersecting: false, target: el }])

    expect(el.classList.contains('visible')).toBe(false)
  })

  it('unmounted 应断开 observer', () => {
    const el = document.createElement('div')
    lazyDirective.mounted(el, { value: null })
    lazyDirective.unmounted(el)

    expect(mockDisconnect).toHaveBeenCalledOnce()
  })

  it('unmounted 无 observer 不应报错', () => {
    const el = document.createElement('div')
    expect(() => lazyDirective.unmounted(el)).not.toThrow()
  })
})
