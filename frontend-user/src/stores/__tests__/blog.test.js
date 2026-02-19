import { describe, it, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useBlogStore } from '../blog'

describe('BlogStore', () => {
  let store

  beforeEach(() => {
    setActivePinia(createPinia())
    store = useBlogStore()
  })

  it('应有6篇初始文章', () => {
    expect(store.articles.length).toBe(6)
  })

  it('categories 应包含全部和各分类', () => {
    expect(store.categories).toContain('全部')
    expect(store.categories).toContain('前端')
    expect(store.categories).toContain('后端')
    expect(store.categories).toContain('运维')
  })

  it('setCategory 应筛选文章', () => {
    store.setCategory('前端')
    expect(store.currentCategory).toBe('前端')
    expect(store.filteredArticles.every(a => a.category === '前端')).toBe(true)
    expect(store.currentPage).toBe(1)
  })

  it('setSearch 应按关键词过滤', () => {
    store.setSearch('Vue')
    expect(store.searchKeyword).toBe('Vue')
    expect(store.filteredArticles.length).toBeGreaterThan(0)
    expect(store.filteredArticles.every(a =>
      a.title.toLowerCase().includes('vue') || a.summary.toLowerCase().includes('vue')
    )).toBe(true)
  })

  it('setSearch 空字符串应返回全部', () => {
    store.setSearch('')
    expect(store.filteredArticles.length).toBe(6)
  })

  it('分类+搜索组合筛选', () => {
    store.setCategory('前端')
    store.setSearch('CSS')
    expect(store.filteredArticles.length).toBeGreaterThan(0)
    store.filteredArticles.forEach(a => {
      expect(a.category).toBe('前端')
    })
  })

  it('文章日期应为中文格式', () => {
    store.articles.forEach(a => {
      expect(a.date).toMatch(/\d{4}年\d{1,2}月\d{1,2}日/)
    })
  })
})
