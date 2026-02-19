import { describe, it, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useBlogStore } from '@/stores/blog'

describe('BlogStore', () => {
  let store

  beforeEach(() => {
    setActivePinia(createPinia())
    store = useBlogStore()
  })

  describe('初始状态', () => {
    it('应有 6 篇文章', () => {
      expect(store.articles.length).toBe(6)
    })

    it('默认分类为"全部"', () => {
      expect(store.currentCategory).toBe('全部')
    })

    it('默认搜索关键词为空', () => {
      expect(store.searchKeyword).toBe('')
    })

    it('分类列表应包含"全部"和所有文章分类', () => {
      expect(store.categories).toContain('全部')
      expect(store.categories).toContain('前端')
      expect(store.categories).toContain('后端')
      expect(store.categories).toContain('运维')
    })

    it('每篇文章应有完整字段', () => {
      store.articles.forEach(article => {
        expect(article).toHaveProperty('id')
        expect(article).toHaveProperty('title')
        expect(article).toHaveProperty('summary')
        expect(article).toHaveProperty('date')
        expect(article).toHaveProperty('category')
        expect(article).toHaveProperty('tags')
        expect(article).toHaveProperty('readTime')
      })
    })

    it('日期格式应为中文（年月日）', () => {
      store.articles.forEach(article => {
        expect(article.date).toMatch(/\d{4}年\d{1,2}月\d{1,2}日/)
      })
    })
  })

  describe('分类筛选', () => {
    it('选择"前端"分类应只显示前端文章', () => {
      store.setCategory('前端')
      expect(store.filteredArticles.every(a => a.category === '前端')).toBe(true)
      expect(store.filteredArticles.length).toBeGreaterThan(0)
    })

    it('选择"后端"分类应只显示后端文章', () => {
      store.setCategory('后端')
      expect(store.filteredArticles.every(a => a.category === '后端')).toBe(true)
    })

    it('选择"全部"应显示所有文章', () => {
      store.setCategory('前端')
      store.setCategory('全部')
      expect(store.filteredArticles.length).toBe(6)
    })

    it('切换分类应重置页码', () => {
      store.currentPage = 3
      store.setCategory('前端')
      expect(store.currentPage).toBe(1)
    })
  })

  describe('搜索功能', () => {
    it('搜索"Vue"应返回包含 Vue 的文章', () => {
      store.setSearch('Vue')
      expect(store.filteredArticles.length).toBeGreaterThan(0)
      store.filteredArticles.forEach(a => {
        const match = a.title.toLowerCase().includes('vue') || a.summary.toLowerCase().includes('vue')
        expect(match).toBe(true)
      })
    })

    it('搜索不存在的关键词应返回空数组', () => {
      store.setSearch('不存在的关键词xyz')
      expect(store.filteredArticles.length).toBe(0)
    })

    it('清空搜索应恢复全部文章', () => {
      store.setSearch('Vue')
      store.setSearch('')
      expect(store.filteredArticles.length).toBe(6)
    })

    it('搜索应重置页码', () => {
      store.currentPage = 2
      store.setSearch('test')
      expect(store.currentPage).toBe(1)
    })

    it('搜索和分类可以组合使用', () => {
      store.setCategory('前端')
      store.setSearch('Vue')
      store.filteredArticles.forEach(a => {
        expect(a.category).toBe('前端')
        const match = a.title.toLowerCase().includes('vue') || a.summary.toLowerCase().includes('vue')
        expect(match).toBe(true)
      })
    })
  })
})
