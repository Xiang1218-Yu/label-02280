import { describe, it, expect } from 'vitest'
import router from '../index'

describe('Router 配置', () => {
  const routes = router.getRoutes()

  it('应有 7 个路由（含 NotFound 重定向）', () => {
    expect(routes.length).toBe(7)
  })

  it('页面路由应有 title meta', () => {
    const pageRoutes = routes.filter(r => r.name !== 'NotFound')
    pageRoutes.forEach(route => {
      if (route.meta) {
        expect(route.meta.title).toBeDefined()
        expect(typeof route.meta.title).toBe('string')
      }
    })
  })

  const expectedRoutes = [
    { path: '/', name: 'Home', title: '首页' },
    { path: '/about', name: 'About', title: '关于我' },
    { path: '/skills', name: 'Skills', title: '技能' },
    { path: '/portfolio', name: 'Portfolio', title: '作品集' },
    { path: '/blog', name: 'Blog', title: '博客' },
    { path: '/contact', name: 'Contact', title: '联系我' }
  ]

  expectedRoutes.forEach(({ path, name, title }) => {
    it(`路由 ${path} 应存在且配置正确`, () => {
      const route = routes.find(r => r.path === path)
      expect(route).toBeDefined()
      expect(route.name).toBe(name)
      expect(route.meta.title).toBe(title)
    })
  })

  it('路由组件应为懒加载函数', () => {
    const pageRoutes = routes.filter(r => r.name && r.name !== 'NotFound')
    pageRoutes.forEach(route => {
      // 懒加载组件存储在 components.default 中
      expect(route.components).toBeDefined()
      expect(route.components.default).toBeDefined()
    })
  })
})
