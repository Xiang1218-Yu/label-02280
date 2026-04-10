<template>
  <div class="stats-counter">
    <div class="stats-tabs">
      <el-radio-group v-model="activeType" size="default">
        <el-radio-button value="day">日</el-radio-button>
        <el-radio-button value="week">周</el-radio-button>
        <el-radio-button value="month">月</el-radio-button>
      </el-radio-group>
    </div>
    <div class="stats-display">
      <div class="stats-number">{{ currentVisits }}</div>
      <div class="stats-label">{{ typeLabel }}访问量</div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useStatisticsStore } from '@/stores/statistics'

const statisticsStore = useStatisticsStore()
const activeType = ref('day')

const typeLabel = computed(() => {
  const labels = {
    day: '今日',
    week: '本周',
    month: '本月'
  }
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
.stats-counter {
  padding: 20px;
  background: var(--el-bg-color);
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}

.stats-tabs {
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
}

.stats-display {
  text-align: center;
}

.stats-number {
  font-size: 48px;
  font-weight: bold;
  color: var(--el-color-primary);
  line-height: 1.2;
}

.stats-label {
  margin-top: 8px;
  font-size: 14px;
  color: var(--el-text-color-secondary);
}
</style>
