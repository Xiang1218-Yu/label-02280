<template>
  <!--
    访问量统计组件
    Vue 技术点：ref 响应式数据 + computed 计算属性 + watch 监听
  -->
  <section class="visit-stats-section">
    <div class="container">
      <h2 class="section-title">
        <span class="highlight">访问统计</span>
      </h2>
      <p class="section-subtitle">实时追踪网站访问数据</p>

      <div class="stats-counter-wrapper">
        <div class="stats-tabs">
          <button
            v-for="type in tabTypes"
            :key="type.value"
            class="tab-btn"
            :class="{ active: activeType === type.value }"
            @click="activeType = type.value"
          >
            {{ type.label }}
          </button>
        </div>

        <div class="stats-display">
          <div class="stat-number">{{ currentVisits }}</div>
          <div class="stat-label">{{ typeLabel }}访问量</div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useStatisticsStore } from '@/stores/statistics'

const statisticsStore = useStatisticsStore()
const activeType = ref('day')

const tabTypes = [
  { value: 'day', label: '日' },
  { value: 'week', label: '周' },
  { value: 'month', label: '月' }
]

const typeLabel = computed(() => {
  const labels = { day: '今日', week: '本周', month: '本月' }
  return labels[activeType.value]
})

const currentVisits = computed(() => {
  return statisticsStore.getStatisticsByType(activeType.value)
})

watch(activeType, (newType) => {
  localStorage.setItem('statsActiveType', newType)
})

const initType = localStorage.getItem('statsActiveType')
if (initType && ['day', 'week', 'month'].includes(initType)) {
  activeType.value = initType
}
</script>

<style lang="scss" scoped>
@use '@/assets/styles/variables' as *;

.visit-stats-section {
  padding: $spacing-3xl 0;
  background: $bg-page;

  .dark-mode & {
    background: $bg-dark;
  }
}

.stats-counter-wrapper {
  max-width: 600px;
  margin: 0 auto;
  padding: $spacing-2xl;
  background: $bg-card;
  border-radius: $radius-lg;
  box-shadow: $shadow-card;
  transition: all $transition-normal;

  .dark-mode & {
    background: $bg-dark-card;
    box-shadow: 0 4px 24px rgba(0, 0, 0, 0.2);
  }

  &:hover {
    box-shadow: $shadow-hover;
  }
}

.stats-tabs {
  display: flex;
  justify-content: center;
  gap: $spacing-sm;
  margin-bottom: $spacing-xl;
}

.tab-btn {
  padding: $spacing-sm $spacing-lg;
  font-size: $font-size-md;
  font-family: $font-body;
  color: $text-secondary;
  background: transparent;
  border: 1px solid transparent;
  border-radius: $radius-md;
  cursor: pointer;
  transition: all $transition-fast;

  .dark-mode & {
    color: $text-light;
  }

  &:hover {
    color: $color-primary;
    background: rgba($color-primary, 0.05);
  }

  &.active {
    color: $color-primary;
    background: rgba($color-primary, 0.1);
    border-color: rgba($color-primary, 0.2);
    font-weight: 500;
  }
}

.stats-display {
  text-align: center;
}

.stat-number {
  font-family: $font-heading;
  font-size: $font-size-4xl;
  font-weight: 700;
  color: $color-primary;
  line-height: 1.2;
  margin-bottom: $spacing-sm;
}

.stat-label {
  font-size: $font-size-md;
  color: $text-secondary;

  .dark-mode & {
    color: $text-light;
  }
}

@media (max-width: $breakpoint-md) {
  .stats-counter-wrapper {
    margin: 0 $spacing-md;
    padding: $spacing-xl;
  }

  .stat-number {
    font-size: $font-size-3xl;
  }

  .tab-btn {
    padding: $spacing-sm $spacing-md;
    font-size: $font-size-sm;
  }
}
</style>
