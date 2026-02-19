import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import BlogView from '@/views/BlogView.vue'
import { useBlogStore } from '@/stores/blog'

// Mock ElMessage
vi.mock('element-plus', () => ({
  ElMessage: Object.assign(vi.fn(), { success: vi.fn(), warning: vi.fn() })
}))

const ElIcon = { template: '<span class="el-icon"><slot /></span>' }
const ElTag = { template: '<span class="el-tag"><slot /></span>', props: ['size', 'effect', 'round'] }
const ElButton = { template: '<button class="el-button"><slot /></button>', props: ['type', 'round'] }
const ElPagination = { template: '<div class="el-pagination" />', props: ['currentPage', 'pageSize', 'total', 'layout', 'background'] }

const stubs = {
  ElIcon, ElTag, ElButton, ElPagination,
  Search: { template: '<i />' },
  Close: { template: '<i />' },
  Calendar: { template: '<i />' },
  Clock: { template: '<i />' },
  DocumentDelete: { template: '<i />' },
  'transition-group': {
    template: '<div class="transition-group-stub"><slot /></div>',
    props: ['name']
  }
}

describe('BlogView 博客页面', () => {
  let pinia

  beforeEach(() => {
    pinia = createPinia()
    setActivePinia(pinia)
  })

  function createWrapper() {
    return mount(BlogView, {
      global: {
        plugins: [pinia],
        stubs,
        directives: { lazy: {} }
      }
    })
  }

  it('应渲染博客页面', () => {
    const wrapper = createWrapper()
    expect(wrapper.find('.blog-page').exists()).toBe(true)
  })

  it('应显示页面标题', () => {
    const wrapper = createWrapper()
    expect(wrapper.text()).toContain('技术')
    expect(wrapper.text()).toContain('博客')
  })

  it('应有搜索框', () => {
    const wrapper = createWrapper()
    expect(wrapper.find('.search-box').exists()).toBe(true)
    expect(wrapper.find('.search-input').exists()).toBe(true)
  })

  it('应有分类标签', () => {
    const wrapper = createWrapper()
    const tabs = wrapper.findAll('.cat-tab')
    expect(tabs.length).toBeGreaterThan(0)
  })

  it('默认应显示前 4 篇文章（分页）', () => {
    const wrapper = createWrapper()
    const articles = wrapper.findAll('.article-card')
    expect(articles.length).toBe(4)
  })

  it('文章卡片应有标题、摘要', () => {
    const wrapper = createWrapper()
    const firstArticle = wrapper.findAll('.article-card')[0]
    expect(firstArticle.find('h3').exists()).toBe(true)
    expect(firstArticle.find('.article-body p').exists()).toBe(true)
  })

  it('文章卡片应有日期和阅读量元数据', () => {
    const wrapper = createWrapper()
    const meta = wrapper.findAll('.article-meta')[0]
    expect(meta.exists()).toBe(true)
    // 包含日期和阅读量两个 span（每个内含 el-icon 子 span）
    expect(meta.findAll('span').length).toBeGreaterThanOrEqual(2)
  })

  it('点击分类标签应筛选文章', async () => {
    const wrapper = createWrapper()
    const tabs = wrapper.findAll('.cat-tab')
    // 点击"前端"
    const frontendTab = tabs.find(t => t.text() === '前端')
    if (frontendTab) {
      await frontendTab.trigger('click')
      const articles = wrapper.findAll('.article-card')
      expect(articles.length).toBeLessThanOrEqual(4)
      expect(articles.length).toBeGreaterThan(0)
    }
  })

  it('搜索不存在的关键词应显示空状态', async () => {
    const wrapper = createWrapper()
    const store = useBlogStore()
    store.setSearch('不存在的关键词xyz')
    await wrapper.vm.$nextTick()
    expect(wrapper.find('.empty-state').exists()).toBe(true)
  })

  it('文章卡片应有分类标签', () => {
    const wrapper = createWrapper()
    const categories = wrapper.findAll('.article-category')
    expect(categories.length).toBeGreaterThan(0)
  })
})
