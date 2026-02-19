/**
 * 自定义指令 v-lazy
 * 用于图片懒加载和元素滚动渐入动画
 * Vue 技术点：自定义指令 (Custom Directives)
 */
export const lazyDirective = {
  mounted(el, binding) {
    const options = {
      root: null,
      rootMargin: '0px 0px 50px 0px',
      threshold: 0.1
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // 如果是图片元素，设置 src
          if (el.tagName === 'IMG' && binding.value) {
            el.src = binding.value
            el.classList.add('lazy-loaded')
          }
          // 添加可见类名用于动画
          el.classList.add('visible')
          observer.unobserve(el)
        }
      })
    }, options)

    observer.observe(el)
    el._lazyObserver = observer
  },

  unmounted(el) {
    if (el._lazyObserver) {
      el._lazyObserver.disconnect()
    }
  }
}
