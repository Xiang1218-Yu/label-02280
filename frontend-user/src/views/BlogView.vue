<template>
  <!--
    博客页面 - BlogView
    Vue 技术点：Pinia 状态管理 + v-model 双向绑定 + 事件处理
  -->
  <div class="blog-page">
    <section class="blog-hero">
      <div class="container">
        <h1 class="section-title">技术<span class="highlight">博客</span></h1>
        <p class="section-subtitle">分享技术心得与实践经验</p>
      </div>
    </section>

    <section class="blog-content">
      <div class="container">
        <!-- 搜索和筛选 -->
        <div class="blog-toolbar">
          <div class="search-box">
            <el-icon><Search /></el-icon>
            <input
              v-model="blogStore.searchKeyword"
              type="text"
              placeholder="搜索文章..."
              class="search-input"
            />
            <button
              v-show="blogStore.searchKeyword"
              class="search-clear"
              @click="blogStore.setSearch('')"
            >
              <el-icon><Close /></el-icon>
            </button>
          </div>
          <div class="category-tabs">
            <button
              v-for="cat in blogStore.categories"
              :key="cat"
              class="cat-tab"
              :class="{ active: blogStore.currentCategory === cat }"
              @click="handleCategoryChange(cat)"
            >
              {{ cat }}
            </button>
          </div>
        </div>

        <!-- 文章列表 -->
        <div class="articles-grid">
          <transition-group name="article-list">
            <article
              v-for="article in paginatedArticles"
              :key="article.id"
              class="article-card"
            >
              <div class="article-body">
                <div class="article-meta">
                  <span class="article-category">{{ article.category }}</span>
                  <span><el-icon><Calendar /></el-icon> {{ article.date }}</span>
                  <span><el-icon><Clock /></el-icon> {{ article.readTime }} 分钟</span>
                </div>
                <h3>{{ article.title }}</h3>
                <p>{{ article.summary }}</p>
                <div class="article-tags">
                  <el-tag
                    v-for="tag in article.tags"
                    :key="tag"
                    size="small"
                    effect="plain"
                    round
                  >
                    {{ tag }}
                  </el-tag>
                </div>
              </div>
            </article>
          </transition-group>
        </div>

        <!-- 空状态 -->
        <div v-if="blogStore.filteredArticles.length === 0" class="empty-state">
          <el-icon :size="64"><DocumentDelete /></el-icon>
          <p>没有找到相关文章</p>
          <el-button type="primary" round @click="resetFilters">重置筛选</el-button>
        </div>

        <!-- 分页 -->
        <div v-if="totalPages > 1" class="pagination-wrapper">
          <el-pagination
            v-model:current-page="currentPage"
            :page-size="pageSize"
            :total="blogStore.filteredArticles.length"
            layout="total, prev, pager, next"
            background
          />
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { ElMessage } from 'element-plus'
import { useBlogStore } from '@/stores/blog'
import createLogger from '@/utils/logger'

const log = createLogger('BlogView')

const blogStore = useBlogStore()

const currentPage = ref(1)
const pageSize = 4

const totalPages = computed(() => Math.ceil(blogStore.filteredArticles.length / pageSize))

const paginatedArticles = computed(() => {
  const start = (currentPage.value - 1) * pageSize
  return blogStore.filteredArticles.slice(start, start + pageSize)
})

function handleCategoryChange(cat) {
  log.info('博客分类切换', { category: cat })
  blogStore.setCategory(cat)
  currentPage.value = 1
}

function resetFilters() {
  log.info('重置博客筛选条件')
  blogStore.setCategory('全部')
  blogStore.setSearch('')
  currentPage.value = 1
  ElMessage.success('已重置筛选条件')
}
</script>

<style lang="scss" scoped>
@use '@/assets/styles/variables' as *;

.blog-hero {
  padding: $spacing-3xl 0 $spacing-xl;
  background: linear-gradient(160deg, #F8F9FE, #EDE9FE, #F0E6FF);
  .dark-mode & { background: linear-gradient(160deg, #0F0E17, #1A1A2E, #16213E); }
}

.blog-content { padding: $spacing-xl 0 $spacing-3xl; }

.blog-toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: $spacing-lg;
  margin-bottom: $spacing-xl;
  flex-wrap: wrap;
}

.search-box {
  display: flex;
  align-items: center;
  background: white;
  border: 2px solid rgba($color-primary, 0.1);
  border-radius: 50px;
  padding: $spacing-sm $spacing-lg;
  gap: $spacing-sm;
  min-width: 280px;
  transition: all $transition-fast;
  .dark-mode & { background: $bg-dark-card; border-color: rgba(255,255,255,0.08); }
  &:focus-within { border-color: $color-primary; box-shadow: 0 0 0 4px rgba($color-primary, 0.1); }
  .el-icon { color: $text-light; font-size: 18px; }
}

.search-input {
  border: none;
  outline: none;
  background: transparent;
  font-size: $font-size-sm;
  flex: 1;
  color: $text-primary;
  .dark-mode & { color: $text-white; }
  &::placeholder { color: $text-light; }
}

.search-clear {
  background: none;
  border: none;
  cursor: pointer;
  color: $text-light;
  display: flex;
  padding: 0;
  transition: all $transition-fast;
  &:hover { color: $color-accent; transform: rotate(90deg); }
}

.category-tabs { display: flex; gap: $spacing-sm; flex-wrap: wrap; }

.cat-tab {
  padding: 6px $spacing-md;
  border: 2px solid transparent;
  border-radius: 50px;
  background: $bg-page;
  color: $text-secondary;
  font-size: $font-size-xs;
  font-weight: 500;
  cursor: pointer;
  transition: all $transition-spring;
  .dark-mode & { background: rgba(255,255,255,0.05); color: $text-light; }
  &:hover { border-color: $color-primary; color: $color-primary; }
  &.active {
    background: linear-gradient(135deg, $color-primary, $color-primary-dark);
    color: white;
    border-color: $color-primary;
    box-shadow: 0 4px 12px rgba($color-primary, 0.3);
  }
}

.articles-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: $spacing-lg;
  @media (max-width: $breakpoint-md) { grid-template-columns: 1fr; }
}

.article-card {
  background: white;
  border-radius: $radius-lg;
  overflow: hidden;
  box-shadow: $shadow-card;
  transition: all $transition-spring;
  border: 1px solid transparent;
  .dark-mode & { background: $bg-dark-card; }
  &:hover {
    box-shadow: $shadow-hover;
    transform: translateY(-6px);
    border-color: rgba($color-primary, 0.12);
  }
}

.article-category {
  background: linear-gradient(135deg, rgba($color-primary, 0.9), rgba($color-primary-dark, 0.9));
  color: white;
  padding: 4px $spacing-md;
  border-radius: 50px;
  font-size: $font-size-xs;
  font-weight: 500;
}

.article-body { padding: $spacing-lg; }

.article-meta {
  display: flex;
  gap: $spacing-lg;
  margin-bottom: $spacing-sm;
  span {
    display: flex;
    align-items: center;
    gap: 4px;
    font-size: $font-size-xs;
    color: $text-light;
  }
}

.article-body h3 { font-size: $font-size-lg; margin-bottom: $spacing-sm; line-height: 1.4; }

.article-body p {
  font-size: $font-size-sm;
  color: $text-secondary;
  line-height: 1.7;
  margin-bottom: $spacing-md;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  .dark-mode & { color: $text-light; }
}

.article-tags { display: flex; gap: $spacing-xs; flex-wrap: wrap; margin-top: $spacing-md; }

.empty-state {
  text-align: center;
  padding: $spacing-3xl;
  color: $text-light;
  p { margin: $spacing-md 0 $spacing-lg; font-size: $font-size-md; }
}

.pagination-wrapper {
  display: flex;
  justify-content: center;
  margin-top: $spacing-xl;
}

.article-list-enter-active, .article-list-leave-active { transition: all 0.4s ease; }
.article-list-enter-from, .article-list-leave-to { opacity: 0; transform: translateY(20px); }
</style>
