<template>
  <section class="visit-stats-section">
    <div class="container">
      <div class="section-header">
        <h2 class="section-title">网站访问统计</h2>
        <p class="section-subtitle">实时统计网站访问量</p>
      </div>
      
      <div class="period-tabs">
        <el-button-group>
          <el-button 
            :type="currentPeriod === 'day' ? 'primary' : 'default'" 
            @click="setCurrentPeriod('day')"
          >
            今日
          </el-button>
          <el-button 
            :type="currentPeriod === 'week' ? 'primary' : 'default'" 
            @click="setCurrentPeriod('week')"
          >
            本周
          </el-button>
          <el-button 
            :type="currentPeriod === 'month' ? 'primary' : 'default'" 
            @click="setCurrentPeriod('month')"
          >
            本月
          </el-button>
          <el-button 
            :type="currentPeriod === 'total' ? 'primary' : 'default'" 
            @click="setCurrentPeriod('total')"
          >
            累计
          </el-button>
        </el-button-group>
      </div>

      <div class="visit-stat-card">
        <div class="visit-icon">
          <el-icon :size="32"><View /></el-icon>
        </div>
        <div class="visit-number">{{ animatedCount }}</div>
        <div class="visit-label">{{ periodLabel }}访问量</div>
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
  background: linear-gradient(135deg, rgba($color-primary, 0.05), rgba($color-accent, 0.05));

  .dark-mode & {
    background: linear-gradient(135deg, rgba($color-primary, 0.1), rgba($color-accent, 0.1));
  }
}

.section-header {
  text-align: center;
  margin-bottom: $spacing-xl;

  .section-title {
    font-family: $font-heading;
    font-size: $font-size-xl;
    color: $text-dark;
    margin-bottom: $spacing-xs;

    .dark-mode & {
      color: $text-white;
    }
  }

  .section-subtitle {
    color: $text-secondary;

    .dark-mode & {
      color: $text-light;
    }
  }
}

.period-tabs {
  display: flex;
  justify-content: center;
  margin-bottom: $spacing-xl;
}

.visit-stat-card {
  max-width: 400px;
  margin: 0 auto $spacing-xl;
  padding: $spacing-xl;
  border-radius: $radius-lg;
  background: white;
  text-align: center;
  box-shadow: $shadow-card;
  transition: all $transition-normal;

  .dark-mode & {
    background: $bg-dark-card;
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow: $shadow-hover;
  }

  .visit-icon {
    width: 64px;
    height: 64px;
    margin: 0 auto $spacing-md;
    background: linear-gradient(135deg, $color-primary, $color-accent);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
  }

  .visit-number {
    font-family: $font-heading;
    font-size: 48px;
    font-weight: 700;
    color: $color-primary;
    line-height: 1.2;
    margin-bottom: $spacing-xs;
  }

  .visit-label {
    font-size: $font-size-md;
    color: $text-secondary;

    .dark-mode & {
      color: $text-light;
    }
  }
}

.visit-summary {
  display: flex;
  justify-content: center;
  gap: $spacing-xl;
  flex-wrap: wrap;

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
