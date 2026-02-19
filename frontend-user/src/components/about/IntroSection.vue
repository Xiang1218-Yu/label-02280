<template>
  <!--
    关于我 - 个人介绍区域
    Vue 技术点：v-for 列表渲染 + v-lazy 自定义指令
  -->
  <section class="about-intro">
    <div class="container">
      <div class="intro-grid">
        <div class="intro-avatar fade-in" v-lazy>
          <div class="avatar-wrapper">
            <div class="avatar-placeholder">
              <el-icon :size="64"><User /></el-icon>
            </div>
            <div class="avatar-decoration"></div>
            <div class="avatar-dots">
              <span v-for="n in 3" :key="n" class="dot" :style="{ animationDelay: n * 0.2 + 's' }"></span>
            </div>
          </div>
        </div>
        <div class="intro-content fade-in" v-lazy>
          <div class="intro-label">
            <el-icon><User /></el-icon>
            <span>个人简介</span>
          </div>
          <h2>Alex Chen</h2>
          <p class="intro-role">全栈开发工程师 / 技术博主</p>
          <p class="intro-text">
            我是一名拥有 5 年经验的全栈开发者，热衷于用技术解决实际问题。
            从前端的像素级还原到后端的高并发架构，我始终追求代码的优雅与高效。
            工作之余，我喜欢通过写博客和参与开源项目来分享知识、回馈社区。
          </p>
          <div class="intro-tags">
            <el-tag v-for="tag in personalTags" :key="tag" effect="plain" round>
              {{ tag }}
            </el-tag>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const personalTags = ['Vue.js', 'Spring Boot', 'TypeScript', '摄影', '阅读', '开源']
</script>

<style lang="scss" scoped>
@use '@/assets/styles/variables' as *;

.about-intro { padding: $spacing-3xl 0; }

.intro-grid {
  display: grid; grid-template-columns: 300px 1fr; gap: $spacing-3xl; align-items: center;
  @media (max-width: $breakpoint-md) { grid-template-columns: 1fr; text-align: center; }
}

.avatar-wrapper { position: relative; width: 250px; height: 250px; margin: 0 auto; }

.avatar-placeholder {
  width: 100%; height: 100%; border-radius: $radius-round;
  background: linear-gradient(135deg, rgba($color-primary, 0.1), rgba($color-accent, 0.1));
  display: flex; align-items: center; justify-content: center; color: $color-primary;
  position: relative; z-index: 1; border: 3px solid rgba($color-primary, 0.15);
}

.avatar-decoration {
  position: absolute; inset: -12px; border-radius: $radius-round;
  border: 2px dashed rgba($color-primary, 0.2); animation: spin 25s linear infinite;
}

.avatar-dots {
  position: absolute; inset: -20px;
  .dot {
    position: absolute; width: 10px; height: 10px; background: $color-primary;
    border-radius: 50%; animation: floatY 3s ease-in-out infinite;
    &:nth-child(1) { top: 10%; left: -5px; }
    &:nth-child(2) { top: 60%; right: -8px; background: $color-accent; }
    &:nth-child(3) { bottom: 5%; left: 30%; background: $color-success; }
  }
}

@keyframes spin { to { transform: rotate(360deg); } }
@keyframes floatY { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }

.intro-label {
  display: inline-flex; align-items: center; gap: $spacing-xs; padding: 4px 12px;
  background: rgba($color-primary, 0.08); border-radius: 50px; font-size: $font-size-xs;
  color: $color-primary; font-weight: 500; margin-bottom: $spacing-md;
}

.intro-content {
  h2 { font-size: $font-size-2xl; margin-bottom: $spacing-sm; }
  .intro-role { color: $color-primary; font-weight: 500; margin-bottom: $spacing-md; }
  .intro-text { color: $text-secondary; line-height: 1.9; margin-bottom: $spacing-lg; .dark-mode & { color: $text-light; } }
  .intro-tags {
    display: flex; flex-wrap: wrap; gap: $spacing-sm;
    @media (max-width: $breakpoint-md) { justify-content: center; }
  }
}
</style>