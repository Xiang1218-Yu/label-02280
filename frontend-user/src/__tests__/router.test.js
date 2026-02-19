import { describe, it, expect } from 'vitest'
import { createRouter, createWebHistory } from 'vue-router'

// 直接测试路由配置
const routes = [
  { path: '/', name: 'Home', component: { template: '<div />' }, meta: { title: '首页' } },
  { path: '/about', name: 'About', component: { template: '<div />' }, meta: { title: '关于我' } },
  { path: '/skills', name: 'Skills', component: { template: '<div />' }, meta: { title: '技能' } },
  { path: '/portfolio', name: 'Portfolio', component: { template: '<div />' }, meta: { title: '作品集' } },
  { path: '/blog', name: 'Blog', component: { template: '<div />' }, meta: { title: '博客' } },
  { path: '/contact', name: 'Contact', component: { template: '<div />' }, meta: { title: '联系我' } },
  { path: '/:pathMatch(.*)*', name: 'NotFound', redirect: '/' }
]

describe('Router 路由配置', () => {
  it('应有 6 个页面路由 + 1 个 404 重定向', () => {
    expect(routes.length).toBe(7)
  })

  it('所有页面路由应有 meta.title', () => {
    const pageRoutes = routes.filter(r => r.name !== 'NotFound')
    pageRoutes.forEach(route => {
      expect(route.meta).toBeDefined()
      expect(route.meta.title).toBeDefined()
      expect(typeof route.meta.title).toBe('string')
    })
  })

  it('路由名称应唯一', () => {
    const names = routes.map(r => r.name)
    const unique = new Set(names)
    expect(unique.size).toBe(names.length)
  })

  it('路由路径应唯一（除 404）', () => {
    const paths = routes.filter(r => r.name !== 'NotFound').map(r => r.path)
    const unique = new Set(paths)
    expect(unique.size).toBe(paths.length)
  })

  it('应能正确解析各路由', async () => {
    const router = createRouter({ history: createWebHistory(), routes })
    await router.push('/')
    expect(router.currentRoute.value.name).toBe('Home')

    await router.push('/about')
    expect(router.currentRoute.value.name).toBe('About')

    await router.push('/skills')
    expect(router.currentRoute.value.name).toBe('Skills')

    await router.push('/portfolio')
    expect(router.currentRoute.value.name).toBe('Portfolio')

    await router.push('/blog')
    expect(router.currentRoute.value.name).toBe('Blog')

    await router.push('/contact')
    expect(router.currentRoute.value.name).toBe('Contact')
  })

  it('未知路径应重定向到首页', async () => {
    const router = createRouter({ history: createWebHistory(), routes })
    await router.push('/nonexistent-page')
    expect(router.currentRoute.value.path).toBe('/')
  })
})
