<template>
  <section class="visit-stats">
    <div class="container">
      <h2 class="section-title">网站访问统计</h2>
      <div class="visit-stats-grid">
        <div class="visit-stat-card">
          <div class="visit-stat-icon">
            <el-icon :size="28"><View /></el-icon>
          </div>
          <div class="visit-stat-number">{{ visitStore.totalVisits }}</div>
          <div class="visit-stat-label">总访问量</div>
        </div>
        <div class="visit-stat-card">
          <div class="visit-stat-icon">
            <el-icon :size="28"><Sunny /></el-icon>
          </div>
          <div class="visit-stat-number">{{ visitStore.getDailyVisits }}</div>
          <div class="visit-stat-label">今日访问</div>
        </div>
        <div class="visit-stat-card">
          <div class="visit-stat-icon">
            <el-icon :size="28"><Calendar /></el-icon>
          </div>
          <div class="visit-stat-number">{{ visitStore.getWeeklyVisits }}</div>
          <div class="visit-stat-label">本周访问</div>
        </div>
        <div class="visit-stat-card">
          <div class="visit-stat-icon">
            <el-icon :size="28"><DataLine /></el-icon>
          </div>
          <div class="visit-stat-number">{{ visitStore.getMonthlyVisits }}</div>
          <div class="visit-stat-label">本月访问</div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { View, Sunny, Calendar, DataLine } from '@element-plus/icons-vue'
import { useVisitStore } from '@/stores/visit'

const visitStore = useVisitStore()
</script>

<style lang="scss" scoped>
@use '@/assets/styles/variables' as *;

.visit-stats {
  padding: $spacing-3xl 0; background: white;
  .dark-mode & { background: $bg-dark-card; }

  .section-title {
    text-align: center; margin-bottom: $spacing-2xl;
    font-family: $font-heading; font-size: $font-size-xl; color: $text-primary;
    .dark-mode & { color: white; }
  }
}

.visit-stats-grid {
  display: grid; grid-template-columns: repeat(4, 1fr); gap: $spacing-lg;
  @media (max-width: $breakpoint-md) { grid-template-columns: repeat(2, 1fr); }
}

.visit-stat-card {
  text-align: center; padding: $spacing-xl $spacing-md; border-radius: $radius-lg;
  background: $bg-page; transition: all $transition-spring; border: 1px solid transparent;
  .dark-mode & { background: rgba(255, 255, 255, 0.04); }
  &:hover { transform: translateY(-6px); box-shadow: $shadow-hover; border-color: rgba($color-primary, 0.15); }

  .visit-stat-icon {
    width: 56px; height: 56px; margin: 0 auto $spacing-md;
    background: linear-gradient(135deg, rgba($color-primary, 0.1), rgba($color-accent, 0.1));
    border-radius: $radius-lg; display: flex; align-items: center; justify-content: center; color: $color-primary;
  }
  .visit-stat-number { font-family: $font-heading; font-size: $font-size-2xl; font-weight: 700; color: $color-primary; margin-bottom: $spacing-xs; }
  .visit-stat-label { font-size: $font-size-sm; color: $text-secondary; .dark-mode & { color: $text-light; } }
}
</style>
