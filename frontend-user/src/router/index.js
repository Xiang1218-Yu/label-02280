import { createRouter, createWebHistory } from 'vue-router'
import createLogger from '@/utils/logger'
import { getStatisticsStore } from '@/stores/statistics'

const log = createLogger('Router')

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/HomeView.vue'),
    meta: { title: '首页' }
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('@/views/AboutView.vue'),
    meta: { title: '关于我' }
  },
  {
    path: '/skills',
    name: 'Skills',
    component: () => import('@/views/SkillsView.vue'),
    meta: { title: '技能' }
  },
  {
    path: '/portfolio',
    name: 'Portfolio',
    component: () => import('@/views/PortfolioView.vue'),
    meta: { title: '作品集' }
  },
  {
    path: '/blog',
    name: 'Blog',
    component: () => import('@/views/BlogView.vue'),
    meta: { title: '博客' }
  },
  {
    path: '/contact',
    name: 'Contact',
    component: () => import('@/views/ContactView.vue'),
    meta: { title: '联系我' }
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    redirect: '/'
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 }
  }
})

router.beforeEach((to, from) => {
  log.info('路由导航', { from: from.path, to: to.path, name: to.name })
  document.title = `${to.meta.title || '首页'} - Alex Chen`
})

router.afterEach((to) => {
  log.debug('路由导航完成', { path: to.path })

  const statisticsStore = getStatisticsStore()
  statisticsStore.incrementVisit()
})

export default router
