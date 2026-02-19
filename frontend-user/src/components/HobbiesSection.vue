<template>
  <section class="hobbies-section">
    <div class="container">
      <h2 class="section-title">兴趣<span class="highlight">爱好</span></h2>
      <p class="section-subtitle">代码之外的生活</p>
      <div class="hobbies-grid">
        <div v-for="hobby in hobbies" :key="hobby.name" class="hobby-card fade-in" v-lazy>
          <div class="hobby-icon" :style="{ background: hobby.bg }">
            <el-icon :size="32"><component :is="hobby.icon" /></el-icon>
          </div>
          <h4>{{ hobby.name }}</h4>
          <p>{{ hobby.desc }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const hobbies = [
  { name: '摄影', icon: 'Camera', desc: '用镜头记录生活中的美好瞬间', bg: 'linear-gradient(135deg, #6C63FF, #8B83FF)' },
  { name: '阅读', icon: 'Reading', desc: '每月至少阅读两本技术或人文书籍', bg: 'linear-gradient(135deg, #FF6584, #FF8FA3)' },
  { name: '跑步', icon: 'Bicycle', desc: '坚持每周跑步，保持身心健康', bg: 'linear-gradient(135deg, #00C9A7, #00E4BF)' },
  { name: '音乐', icon: 'Headset', desc: '编码时的最佳伴侣，喜欢电子和爵士', bg: 'linear-gradient(135deg, #FFC75F, #FFD97D)' }
]
</script>

<style lang="scss" scoped>
@use '@/assets/styles/variables' as *;

.hobbies-section { padding: $spacing-3xl 0; }

.hobbies-grid {
  display: grid; grid-template-columns: repeat(4, 1fr); gap: $spacing-lg;
  @media (max-width: $breakpoint-md) { grid-template-columns: repeat(2, 1fr); }
  @media (max-width: $breakpoint-sm) { grid-template-columns: 1fr; }
}

.hobby-card {
  background: white; border-radius: $radius-lg; padding: $spacing-xl; text-align: center;
  box-shadow: $shadow-card; transition: all $transition-spring; border: 1px solid transparent;
  .dark-mode & { background: $bg-dark-card; }
  &:hover { transform: translateY(-8px) scale(1.02); box-shadow: $shadow-hover; border-color: rgba($color-primary, 0.12); }
  .hobby-icon {
    width: 64px; height: 64px; border-radius: $radius-lg; display: flex; align-items: center;
    justify-content: center; margin: 0 auto $spacing-md; color: white; box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  }
  h4 { font-size: $font-size-md; margin-bottom: $spacing-sm; }
  p { font-size: $font-size-sm; color: $text-secondary; .dark-mode & { color: $text-light; } }
}
</style>
