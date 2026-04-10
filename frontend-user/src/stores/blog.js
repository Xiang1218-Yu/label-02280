import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import createLogger from '@/utils/logger'

const log = createLogger('BlogStore')

export const useBlogStore = defineStore('blog', () => {
  const searchKeyword = ref('')
  const currentCategory = ref('全部')
  const currentPage = ref(1)
  const pageSize = 4

  const articles = ref([
    {
      id: 1,
      title: 'Vue 3 Composition API 实战指南',
      summary: '深入探讨 Composition API 的核心概念，包括 ref、reactive、computed 和 watch 的最佳实践。',
      content: 'Composition API 是 Vue 3 最重要的特性之一。它提供了一种更灵活的方式来组织组件逻辑。',
      date: '2024年12月15日',
      rawDate: '2024-12-15',
      category: '前端',
      tags: ['Vue 3', '前端'],
      readTime: 8
    },
    {
      id: 2,
      title: 'Spring Boot 3 微服务架构设计',
      summary: '从零搭建 Spring Boot 3 微服务项目，涵盖服务注册、配置中心、网关等核心组件。',
      content: 'Spring Boot 3 带来了对 Java 17+ 的原生支持和 GraalVM 原生镜像编译能力。',
      date: '2024年11月28日',
      rawDate: '2024-11-28',
      category: '后端',
      tags: ['Java', '后端'],
      readTime: 12
    },
    {
      id: 3,
      title: 'CSS 现代布局技巧',
      summary: '掌握 Grid、Flexbox、Container Queries 等现代 CSS 布局方案。',
      content: 'CSS Grid 和 Flexbox 是现代网页布局的两大支柱。',
      date: '2024年11月10日',
      rawDate: '2024-11-10',
      category: '前端',
      tags: ['CSS', '前端'],
      readTime: 6
    },
    {
      id: 4,
      title: 'MySQL 性能优化实战',
      summary: '索引优化、查询分析、慢查询排查，全方位提升数据库性能。',
      content: '数据库性能优化是后端开发的核心技能。',
      date: '2024年10月22日',
      rawDate: '2024-10-22',
      category: '后端',
      tags: ['MySQL', '后端'],
      readTime: 10
    },
    {
      id: 5,
      title: 'TypeScript 高级类型体操',
      summary: '深入理解条件类型、映射类型、模板字面量类型等高级特性。',
      content: 'TypeScript 的类型系统是图灵完备的。',
      date: '2024年10月5日',
      rawDate: '2024-10-05',
      category: '前端',
      tags: ['TypeScript', '前端'],
      readTime: 9
    },
    {
      id: 6,
      title: 'Docker 容器化部署最佳实践',
      summary: '从 Dockerfile 编写到 docker-compose 编排，掌握容器化部署全流程。',
      content: '容器化是现代应用部署的标准方式。',
      date: '2024年9月18日',
      rawDate: '2024-09-18',
      category: '运维',
      tags: ['Docker', '运维'],
      readTime: 7
    }
  ])

  const categories = computed(() => {
    const cats = new Set(['全部'])
    articles.value.forEach(a => cats.add(a.category))
    return [...cats]
  })

  const filteredArticles = computed(() => {
    let result = articles.value
    if (currentCategory.value !== '全部') {
      result = result.filter(a => a.category === currentCategory.value)
    }
    if (searchKeyword.value.trim()) {
      const q = searchKeyword.value.toLowerCase()
      result = result.filter(a =>
        a.title.toLowerCase().includes(q) ||
        a.summary.toLowerCase().includes(q)
      )
    }
    return result
  })

  const setSearch = (val) => {
    log.info('搜索关键词变更', { keyword: val })
    searchKeyword.value = val
    currentPage.value = 1
  }
  const setCategory = (cat) => {
    log.info('分类切换', { category: cat })
    currentCategory.value = cat
    currentPage.value = 1
  }
  return {
    searchKeyword, currentCategory, currentPage, pageSize,
    articles, categories, filteredArticles,
    setSearch, setCategory
  }
})
