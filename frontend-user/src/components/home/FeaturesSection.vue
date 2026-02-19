<template>
  <!--
    首页能力展示区域
    Vue 技术点：v-for 列表渲染 + 动态 :style 绑定 + v-lazy 自定义指令
  -->
  <section class="featured-section">
    <div class="container">
      <h2 class="section-title">我能做<span class="highlight">什么</span></h2>
      <p class="section-subtitle">专注于全栈开发，从前端到后端，从设计到部署</p>
      <div class="features-grid">
        <div
          v-for="(feature, index) in features"
          :key="index"
          class="feature-card fade-in"
          v-lazy
        >
          <div class="feature-number">0{{ index + 1 }}</div>
          <div class="feature-icon" :style="{ background: feature.color }">
            <el-icon :size="28" color="#fff"><component :is="feature.icon" /></el-icon>
          </div>
          <h3>{{ feature.title }}</h3>
          <p>{{ feature.desc }}</p>
          <div class="feature-tags">
            <span v-for="tag in feature.tags" :key="tag">{{ tag }}</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const features = [
  {
    icon: 'Monitor', title: '前端开发',
    desc: '精通 Vue、React 等主流框架，注重用户体验与性能优化。',
    color: 'linear-gradient(135deg, #6C63FF, #8B83FF)',
    tags: ['Vue 3', 'React', 'TypeScript']
  },
  {
    icon: 'Setting', title: '后端开发',
    desc: '熟练使用 Spring Boot、Node.js 构建高可用的服务端应用。',
    color: 'linear-gradient(135deg, #FF6584, #FF8FA3)',
    tags: ['Spring Boot', 'Node.js', 'RESTful']
  },
  {
    icon: 'DataAnalysis', title: '数据库设计',
    desc: '擅长 MySQL、Redis 等数据库的架构设计与性能调优。',
    color: 'linear-gradient(135deg, #00C9A7, #00E4BF)',
    tags: ['MySQL', 'Redis', 'MongoDB']
  },
  {
    icon: 'Upload', title: 'DevOps',
    desc: '熟悉 Docker、CI/CD 流程，实现自动化部署与运维。',
    color: 'linear-gradient(135deg, #FFC75F, #FFD97D)',
    tags: ['Docker', 'K8s', 'CI/CD']
  }
]
</script>

<style lang="scss" scoped>
@use '@/assets/styles/variables' as *;

.featured-section { padding: $spacing-3xl 0; }

.features-grid {
  display: grid; grid-template-columns: repeat(4, 1fr); gap: $spacing-lg;
  @media (max-width: $breakpoint-lg) { grid-template-columns: repeat(2, 1fr); }
  @media (max-width: $breakpoint-sm) { grid-template-columns: 1fr; }
}

.feature-card {
  background: white; border-radius: $radius-lg; padding: $spacing-xl; text-align: center;
  box-shadow: $shadow-card; transition: all $transition-spring; position: relative; overflow: hidden;
  border: 1px solid transparent;
  .dark-mode & { background: $bg-dark-card; }
  &:hover {
    transform: translateY(-8px); box-shadow: $shadow-hover; border-color: rgba($color-primary, 0.15);
    .feature-number { opacity: 0.08; transform: scale(1.1); }
  }

  .feature-number {
    position: absolute; top: 12px; right: 16px; font-family: $font-heading;
    font-size: 48px; font-weight: 800; color: $color-primary; opacity: 0.05; transition: all $transition-normal;
  }
  .feature-icon {
    width: 64px; height: 64px; border-radius: $radius-lg; display: flex; align-items: center;
    justify-content: center; margin: 0 auto $spacing-md; box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  }
  h3 { font-size: $font-size-lg; margin-bottom: $spacing-sm; }
  p { font-size: $font-size-sm; color: $text-secondary; line-height: 1.7; margin-bottom: $spacing-md; .dark-mode & { color: $text-light; } }
  .feature-tags {
    display: flex; gap: $spacing-xs; justify-content: center; flex-wrap: wrap;
    span { padding: 2px 10px; background: rgba($color-primary, 0.06); color: $color-primary; border-radius: 50px; font-size: $font-size-xs; }
  }
}
</style>