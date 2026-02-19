<template>
  <section class="stats-section" ref="statsRef">
    <div class="container">
      <div class="stats-grid">
        <div v-for="stat in stats" :key="stat.label" class="stat-card fade-in" v-lazy>
          <div class="stat-icon">
            <el-icon :size="28"><component :is="stat.icon" /></el-icon>
          </div>
          <div class="stat-number">{{ stat.display }}</div>
          <div class="stat-label">{{ stat.label }}</div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, reactive, onMounted, onUnmounted } from 'vue'

const stats = reactive([
  { icon: 'Calendar', label: '开发经验', value: 5, display: '0+', suffix: '+' },
  { icon: 'Folder', label: '完成项目', value: 30, display: '0+', suffix: '+' },
  { icon: 'Document', label: '技术博客', value: 50, display: '0+', suffix: '+' },
  { icon: 'Star', label: 'GitHub Stars', value: 200, display: '0+', suffix: '+' }
])

const statsRef = ref(null)
let statsObserver = null

function animateStats() {
  stats.forEach(stat => {
    let current = 0
    const step = Math.ceil(stat.value / 50)
    const timer = setInterval(() => {
      current += step
      if (current >= stat.value) { current = stat.value; clearInterval(timer) }
      stat.display = current + stat.suffix
    }, 25)
  })
}

function scrollIntoView() {
  statsRef.value?.scrollIntoView({ behavior: 'smooth' })
}

onMounted(() => {
  statsObserver = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) { animateStats(); statsObserver.disconnect() }
  }, { threshold: 0.3 })
  if (statsRef.value) statsObserver.observe(statsRef.value)
})

onUnmounted(() => { statsObserver?.disconnect() })

defineExpose({ scrollIntoView })
</script>

<style lang="scss" scoped>
@use '@/assets/styles/variables' as *;

.stats-section {
  padding: $spacing-3xl 0; background: white;
  .dark-mode & { background: $bg-dark-card; }
}

.stats-grid {
  display: grid; grid-template-columns: repeat(4, 1fr); gap: $spacing-lg;
  @media (max-width: $breakpoint-md) { grid-template-columns: repeat(2, 1fr); }
}

.stat-card {
  text-align: center; padding: $spacing-xl $spacing-md; border-radius: $radius-lg;
  background: $bg-page; transition: all $transition-spring; border: 1px solid transparent;
  .dark-mode & { background: rgba(255, 255, 255, 0.04); }
  &:hover { transform: translateY(-6px); box-shadow: $shadow-hover; border-color: rgba($color-primary, 0.15); }
  .stat-icon {
    width: 56px; height: 56px; margin: 0 auto $spacing-md;
    background: linear-gradient(135deg, rgba($color-primary, 0.1), rgba($color-accent, 0.1));
    border-radius: $radius-lg; display: flex; align-items: center; justify-content: center; color: $color-primary;
  }
  .stat-number { font-family: $font-heading; font-size: $font-size-2xl; font-weight: 700; color: $color-primary; margin-bottom: $spacing-xs; }
  .stat-label { font-size: $font-size-sm; color: $text-secondary; .dark-mode & { color: $text-light; } }
}
</style>
