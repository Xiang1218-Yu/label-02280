import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import createLogger from '@/utils/logger'

const log = createLogger('VisitStore')

const STORAGE_KEY = 'visit-stats'

function getTodayKey() {
  const now = new Date()
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`
}

function getWeekKeys() {
  const keys = []
  const now = new Date()
  for (let i = 0; i < 7; i++) {
    const date = new Date(now)
    date.setDate(date.getDate() - i)
    keys.push(`${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`)
  }
  return keys
}

function getMonthKeys() {
  const keys = []
  const now = new Date()
  for (let i = 0; i < 30; i++) {
    const date = new Date(now)
    date.setDate(date.getDate() - i)
    keys.push(`${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`)
  }
  return keys
}

function loadStats() {
  try {
    const data = localStorage.getItem(STORAGE_KEY)
    return data ? JSON.parse(data) : {}
  } catch (e) {
    log.error('加载访问统计失败', e)
    return {}
  }
}

function saveStats(stats) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stats))
  } catch (e) {
    log.error('保存访问统计失败', e)
  }
}

export const useVisitStore = defineStore('visit', () => {
  const visitStats = ref(loadStats())
  const currentPeriod = ref('day')

  const todayCount = computed(() => {
    const key = getTodayKey()
    return visitStats.value[key] || 0
  })

  const weekCount = computed(() => {
    const keys = getWeekKeys()
    return keys.reduce((sum, key) => sum + (visitStats.value[key] || 0), 0)
  })

  const monthCount = computed(() => {
    const keys = getMonthKeys()
    return keys.reduce((sum, key) => sum + (visitStats.value[key] || 0), 0)
  })

  const totalCount = computed(() => {
    return Object.values(visitStats.value).reduce((sum, count) => sum + count, 0)
  })

  const currentCount = computed(() => {
    switch (currentPeriod.value) {
      case 'day':
        return todayCount.value
      case 'week':
        return weekCount.value
      case 'month':
        return monthCount.value
      default:
        return totalCount.value
    }
  })

  function incrementVisit() {
    const key = getTodayKey()
    if (!visitStats.value[key]) {
      visitStats.value[key] = 0
    }
    visitStats.value[key]++
    saveStats(visitStats.value)
    log.info('访问量增加', { date: key, count: visitStats.value[key] })
  }

  function setCurrentPeriod(period) {
    currentPeriod.value = period
    log.info('切换统计周期', { period })
  }

  return {
    currentPeriod,
    todayCount,
    weekCount,
    monthCount,
    totalCount,
    currentCount,
    incrementVisit,
    setCurrentPeriod
  }
})
