<template>
  <section class="visit-stats-section">
    <div class="container">
      <h2 class="section-title">网站访问<span class="highlight">统计</span></h2>
      <p class="section-subtitle">实时统计网站访问量</p>
      
      <div class="period-tabs">
        <div class="tabs-container">
          <button
            v-for="tab in tabs"
            :key="tab.value"
            class="tab-btn"
            :class="{ active: currentPeriod === tab.value }"
            @click="setCurrentPeriod(tab.value)"
          >
            {{ tab.label }}
          </button>
        </div>
      </div>

      <div class="stats-grid">
        <div class="stat-card">
          <div class="stat-number">{{ animatedCount }}</div>
          <div class="stat-label">{{ periodLabel }}访问量</div>
          <div class="stat-icon">
            <el-icon :size="24"><View /></el-icon>
          </div>
        </div>
      </div>

      <div class="visit-summary">
        <div class="summary-item">
          <span class="label">今日:</span>
          <span class="value">{{ todayCount }}</span>
        </div>
        <div class="summary-item">
          <span class="label">本周:</span>
          <span class="value">{{ weekCount }}</span>
        </div>
        <div class="summary-item">
          <span class="label">本月:</span>
          <span class="value">{{ monthCount }}</span>
        </div>
        <div class="summary-item">
          <span class="label">累计:</span>
          <span class="value">{{ totalCount }}</span>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { View } from '@element-plus/icons-vue'
import { useVisitStore } from '@/stores/visit'

const visitStore = useVisitStore()
const { currentPeriod, todayCount, weekCount, monthCount, totalCount, currentCount } = storeToRefs(visitStore)
const { setCurrentPeriod } = visitStore

const tabs = [
  { value: 'day', label: '今日' },
  { value: 'week', label: '本周' },
  { value: 'month', label: '本月' },
  { value: 'total', label: '累计' }
]

const animatedCount = ref(0)

const periodLabel = computed(() => {
  switch (currentPeriod) {
    case 'day': return '今日'
    case 'week': return '本周'
    case 'month': return '本月'
    case 'total': return '累计'
    default: return ''
  }
})

function animateNumber(from, to) {
  const duration = 1000
  const startTime = Date.now()
  const frame = () => {
    const elapsed = Date.now() - startTime
    const progress = Math.min(elapsed / duration, 1)
    const eased = 1 - Math.pow(1 - progress, 3)
    animatedCount.value = Math.floor(from + (to - from) * eased)
    if (progress < 1) requestAnimationFrame(frame)
    else animatedCount.value = to
  }
  requestAnimationFrame(frame)
}

watch(currentCount, (newVal, oldVal) => {
  animateNumber(oldVal || 0, newVal)
})

onMounted(() => {
  animateNumber(0, currentCount.value)
})
</script>

<style lang="scss" scoped>
@use '@/assets/styles/variables' as *;

.visit-stats-section {
  padding: $spacing-3xl 0;
}

.visit-stats-section :deep(.section-title),
.section-title {
  text-align: center;
  font-family: $font-heading;
  font-size: $font-size-xl;
  color: $text-primary;
  margin-bottom: $spacing-xs;

  .highlight {
    color: $color-primary;
  }

  .dark-mode & {
    color: $text-white;
  }
}

.visit-stats-section :deep(.section-subtitle),
.section-subtitle {
  text-align: center;
  display: block;
  color: $text-secondary;
  margin-bottom: $spacing-xl;

  .dark-mode & {
    color: $text-light;
  }
}

.period-tabs {
  display: flex;
  justify-content: center;
  margin-bottom: $spacing-xl;

  .tabs-container {
    display: inline-flex;
    background: $bg-page;
    border-radius: $radius-xl;
    padding: $spacing-xs;
    gap: $spacing-xs;
    box-shadow: $shadow-inset;

    .dark-mode & {
      background: rgba(255, 255, 255, 0.04);
    }
  }

  .tab-btn {
    padding: $spacing-sm $spacing-lg;
    border: none;
    background: transparent;
    color: $text-secondary;
    font-size: $font-size-sm;
    font-weight: 500;
    border-radius: $radius-lg;
    cursor: pointer;
    transition: all $transition-normal;
    position: relative;
    overflow: hidden;

    .dark-mode & {
      color: $text-light;
    }

    &:hover {
      color: $color-primary;
      background: rgba($color-primary, 0.08);
    }

    &.active {
      background: linear-gradient(135deg, $color-primary, $color-primary-dark);
      color: $text-white;
      box-shadow: 0 4px 12px rgba($color-primary, 0.4);
      transform: translateY(-2px);

      &::before {
        content: '';
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
        animation: shine 2s infinite;
      }
    }
  }
}

@keyframes shine {
  0% { left: -100%; }
  100% { left: 100%; }
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: $spacing-lg;
  max-width: 300px;
  margin: 0 auto;
}

.stat-card {
  background: white;
  border-radius: $radius-lg;
  padding: $spacing-xl;
  text-align: center;
  box-shadow: $shadow-card;
  transition: all $transition-spring;
  position: relative;
  overflow: hidden;
  border: 1px solid transparent;

  .dark-mode & {
    background: $bg-dark-card;
  }

  &:hover {
    transform: translateY(-8px);
    box-shadow: $shadow-hover;
    border-color: rgba($color-primary, 0.15);
  }

  .stat-number {
    font-family: $font-heading;
    font-size: 48px;
    font-weight: 700;
    color: $color-primary;
    line-height: 1.2;
    margin-bottom: $spacing-xs;
  }

  .stat-label {
    font-size: $font-size-md;
    color: $text-secondary;

    .dark-mode & {
      color: $text-light;
    }
  }

  .stat-icon {
    position: absolute;
    top: $spacing-md;
    right: $spacing-md;
    opacity: 0.1;
    color: $color-primary;
  }
}

.visit-summary {
  display: flex;
  justify-content: center;
  gap: $spacing-xl;
  flex-wrap: wrap;
  margin-top: $spacing-lg;

  .summary-item {
    font-size: $font-size-sm;

    .label {
      color: $text-secondary;
      margin-right: $spacing-xs;

      .dark-mode & {
        color: $text-light;
      }
    }

    .value {
      font-weight: 600;
      color: $color-primary;
    }
  }
}
</style>
