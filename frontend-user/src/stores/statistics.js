import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import createLogger from '@/utils/logger'

const log = createLogger('StatisticsStore')

const STORAGE_KEY = 'siteStatistics'

const getStartOfDay = (date) => {
  const d = new Date(date)
  d.setHours(0, 0, 0, 0)
  return d.getTime()
}

const getStartOfWeek = (date) => {
  const d = new Date(date)
  const day = d.getDay()
  const diff = d.getDate() - day + (day === 0 ? -6 : 1)
  d.setDate(diff)
  d.setHours(0, 0, 0, 0)
  return d.getTime()
}

const getStartOfMonth = (date) => {
  const d = new Date(date)
  d.setDate(1)
  d.setHours(0, 0, 0, 0)
  return d.getTime()
}

export const useStatisticsStore = defineStore('statistics', () => {
  const statistics = ref({
    totalVisits: 0,
    dailyStats: {},
    weeklyStats: {},
    monthlyStats: {}
  })

  const loadStatistics = () => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        statistics.value = JSON.parse(stored)
      }
    } catch (e) {
      log.error('加载统计数据失败', e)
    }
  }

  const saveStatistics = () => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(statistics.value))
    } catch (e) {
      log.error('保存统计数据失败', e)
    }
  }

  const incrementVisit = () => {
    const now = Date.now()
    const dayKey = getStartOfDay(now)
    const weekKey = getStartOfWeek(now)
    const monthKey = getStartOfMonth(now)

    statistics.value.totalVisits++

    statistics.value.dailyStats[dayKey] = (statistics.value.dailyStats[dayKey] || 0) + 1
    statistics.value.weeklyStats[weekKey] = (statistics.value.weeklyStats[weekKey] || 0) + 1
    statistics.value.monthlyStats[monthKey] = (statistics.value.monthlyStats[monthKey] || 0) + 1

    saveStatistics()
    log.info('访问量增加', { total: statistics.value.totalVisits })
  }

  const getTodayVisits = computed(() => {
    const dayKey = getStartOfDay(Date.now())
    return statistics.value.dailyStats[dayKey] || 0
  })

  const getWeekVisits = computed(() => {
    const weekKey = getStartOfWeek(Date.now())
    let total = statistics.value.weeklyStats[weekKey] || 0

    const currentWeekStart = weekKey
    for (let i = 1; i < 7; i++) {
      const pastWeekKey = currentWeekStart - i * 7 * 24 * 60 * 60 * 1000
      total += statistics.value.weeklyStats[pastWeekKey] || 0
    }

    return total
  })

  const getMonthVisits = computed(() => {
    const monthKey = getStartOfMonth(Date.now())
    let total = statistics.value.monthlyStats[monthKey] || 0

    const currentMonthStart = monthKey
    for (let i = 1; i < 12; i++) {
      const pastMonthKey = currentMonthStart - i * 30 * 24 * 60 * 60 * 1000
      total += statistics.value.monthlyStats[pastMonthKey] || 0
    }

    return total
  })

  const getStatisticsByType = (type) => {
    const now = Date.now()

    if (type === 'day') {
      const dayKey = getStartOfDay(now)
      return statistics.value.dailyStats[dayKey] || 0
    } else if (type === 'week') {
      return getWeekVisits.value
    } else if (type === 'month') {
      return getMonthVisits.value
    }

    return 0
  }

  loadStatistics()

  return {
    statistics,
    incrementVisit,
    getTodayVisits,
    getWeekVisits,
    getMonthVisits,
    getStatisticsByType
  }
})
