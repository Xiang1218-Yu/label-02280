/**
 * Vitest 测试环境配置
 */

// Mock IntersectionObserver (jsdom 不支持)
global.IntersectionObserver = class MockIntersectionObserver {
  constructor(callback, options) {
    this.callback = callback
    this.options = options
    this.elements = []
  }
  observe(el) { this.elements.push(el) }
  unobserve() {}
  disconnect() {}
}

// Mock matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: (query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => {}
  })
})

// Mock scrollIntoView
Element.prototype.scrollIntoView = () => {}
