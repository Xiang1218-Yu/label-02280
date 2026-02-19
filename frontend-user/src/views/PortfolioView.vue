<template>
  <!--
    作品集 - PortfolioView
    Vue 技术点：v-for 列表渲染 + 自定义指令 v-lazy + computed 筛选
  -->
  <div class="portfolio-page">
    <section class="portfolio-hero">
      <div class="container">
        <h1 class="section-title">我的<span class="highlight">作品</span></h1>
        <p class="section-subtitle">精选项目展示</p>
      </div>
    </section>

    <section class="portfolio-filter">
      <div class="container">
        <div class="filter-tabs">
          <button
            v-for="tag in allTags"
            :key="tag"
            class="filter-tab"
            :class="{ active: activeTag === tag }"
            @click="activeTag = tag"
          >
            {{ tag }}
          </button>
        </div>
      </div>
    </section>

    <section class="portfolio-content">
      <div class="container">
        <transition-group name="portfolio-list" tag="div" class="portfolio-grid">
          <div
            v-for="project in filteredProjects"
            :key="project.id"
            class="project-card fade-in"
            v-lazy
          >
            <div class="project-header">
              <span class="project-badge">{{ project.category }}</span>
            </div>
            <div class="project-info">
              <h3>{{ project.title }}</h3>
              <p>{{ project.desc }}</p>
              <div class="project-tags">
                <el-tag v-for="tag in project.tags" :key="tag" size="small" effect="plain" round>
                  {{ tag }}
                </el-tag>
              </div>
            </div>
          </div>
        </transition-group>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import createLogger from '@/utils/logger'

const log = createLogger('PortfolioView')

const activeTag = ref('全部')

const projects = [
  {
    id: 1, title: '电商管理后台',
    desc: '基于 Vue 3 + Element Plus 的全功能电商管理系统。',
    tags: ['Vue 3', 'Element Plus', 'Spring Boot'], category: 'Web'
  },
  {
    id: 2, title: '实时聊天应用',
    desc: '基于 WebSocket 的实时聊天应用，支持群聊和私聊。',
    tags: ['Vue 3', 'Socket.io', 'Node.js'], category: 'Web'
  },
  {
    id: 3, title: '数据可视化大屏',
    desc: '企业级数据可视化大屏，实时展示业务数据。',
    tags: ['Vue 3', 'ECharts', 'WebSocket'], category: '可视化'
  },
  {
    id: 4, title: '个人博客系统',
    desc: '支持 Markdown 编辑的个人博客系统。',
    tags: ['Vue 3', 'Spring Boot', 'MySQL'], category: 'Web'
  },
  {
    id: 5, title: 'UI 组件库',
    desc: '基于 Vue 3 的轻量级 UI 组件库。',
    tags: ['Vue 3', 'TypeScript', 'Vite'], category: '开源'
  },
  {
    id: 6, title: '任务管理工具',
    desc: '看板式任务管理工具，支持拖拽排序。',
    tags: ['Vue 3', 'Drag & Drop', 'Pinia'], category: 'Web'
  }
]

const allTags = computed(() => {
  const tags = new Set(['全部'])
  projects.forEach(p => p.tags.forEach(t => tags.add(t)))
  return [...tags]
})

const filteredProjects = computed(() => {
  log.info('筛选项目', { tag: activeTag.value })
  if (activeTag.value === '全部') return projects
  return projects.filter(p => p.tags.includes(activeTag.value))
})
</script>

<style lang="scss" scoped>
@use '@/assets/styles/variables' as *;

.portfolio-hero {
  padding: $spacing-3xl 0 $spacing-xl;
  background: linear-gradient(160deg, #F8F9FE, #EDE9FE, #F0E6FF);
  .dark-mode & { background: linear-gradient(160deg, #0F0E17, #1A1A2E, #16213E); }
}

.portfolio-filter {
  padding: $spacing-xl 0;
  background: white;
  position: sticky;
  top: 72px;
  z-index: 10;
  box-shadow: $shadow-nav;
  backdrop-filter: blur(20px);
  .dark-mode & { background: rgba($bg-dark-card, 0.9); }
}

.filter-tabs {
  display: flex;
  gap: $spacing-sm;
  justify-content: center;
  flex-wrap: wrap;
}

.filter-tab {
  padding: $spacing-sm $spacing-lg;
  border: 2px solid transparent;
  border-radius: 50px;
  background: $bg-page;
  color: $text-secondary;
  font-size: $font-size-sm;
  font-weight: 500;
  cursor: pointer;
  transition: all $transition-spring;
  .dark-mode & { background: rgba(255,255,255,0.05); color: $text-light; }
  &:hover { border-color: $color-primary; color: $color-primary; }
  &.active {
    background: linear-gradient(135deg, $color-primary, $color-primary-dark);
    color: white;
    border-color: $color-primary;
    box-shadow: 0 4px 16px rgba($color-primary, 0.3);
  }
}

.portfolio-content { padding: $spacing-xl 0 $spacing-3xl; }

.portfolio-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: $spacing-lg;
  @media (max-width: $breakpoint-lg) { grid-template-columns: repeat(2, 1fr); }
  @media (max-width: $breakpoint-sm) { grid-template-columns: 1fr; }
}

.project-card {
  background: white;
  border-radius: $radius-lg;
  overflow: hidden;
  box-shadow: $shadow-card;
  transition: all $transition-spring;
  border: 1px solid transparent;
  .dark-mode & { background: $bg-dark-card; }
  &:hover {
    box-shadow: $shadow-hover;
    transform: translateY(-8px);
    border-color: rgba($color-primary, 0.12);
  }
}

.project-header {
  display: flex;
  align-items: center;
  padding: $spacing-md $spacing-lg;
  border-bottom: 1px solid rgba($color-primary, 0.08);
  .dark-mode & { border-color: rgba(255,255,255,0.06); }
}

.project-badge {
  background: linear-gradient(135deg, rgba($color-primary, 0.1), rgba($color-accent, 0.1));
  color: $color-primary;
  padding: 4px 12px;
  border-radius: 50px;
  font-size: $font-size-xs;
  font-weight: 500;
  .dark-mode & { background: rgba($color-primary, 0.2); }
}

.project-info {
  padding: $spacing-lg;
  h3 { font-size: $font-size-md; margin-bottom: $spacing-sm; }
  p { font-size: $font-size-sm; color: $text-secondary; line-height: 1.6; margin-bottom: $spacing-md; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; height: calc($font-size-sm * 1.6 * 2); .dark-mode & { color: $text-light; } }
}

.project-tags { display: flex; flex-wrap: wrap; gap: $spacing-xs; }

.portfolio-list-enter-active, .portfolio-list-leave-active { transition: all 0.4s ease; }
.portfolio-list-enter-from, .portfolio-list-leave-to { opacity: 0; transform: scale(0.9) translateY(10px); }
</style>
