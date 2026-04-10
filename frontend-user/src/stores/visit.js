import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import createLogger from '@/utils/logger'

const log = createLogger('VisitStore')

const STORAGE_KEY = 'visit_records'
const SESSION_KEY = 'session_visited_pages'

export const useVisitStore = defineStore('visit', () => {
  const visitRecords = ref(JSON.parse(localStorage.getItem(STORAGE_KEY)) || [])
  const sessionVisitedPages = ref(JSON.parse(sessionStorage.getItem(SESSION_KEY)) || [])

  const recordVisit = (pagePath) => {
    if (sessionVisitedPages.value.includes(pagePath)) {
      log.debug('会话内已访问，跳过统计', { path: pagePath })
      return
    }

    const record = {
      path: pagePath,
      timestamp: new Date().toISOString(),
      date: new Date().toDateString()
    }
    visitRecords.value.push(record)
    sessionVisitedPages.value.push(pagePath)
    saveToStorage()
    log.info('页面访问记录', { path: pagePath, total: visitRecords.value.length })
  }

  const saveToStorage = () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(visitRecords.value))
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(sessionVisitedPages.value))
  }

  const getDailyVisits = computed(() => {
    const today = new Date().toDateString()
    return visitRecords.value.filter(r => r.date === today).length
  })

  const getWeeklyVisits = computed(() => {
    const weekAgo = new Date()
    weekAgo.setDate(weekAgo.getDate() - 7)
    return visitRecords.value.filter(r => new Date(r.timestamp) >= weekAgo).length
  })

  const getMonthlyVisits = computed(() => {
    const monthAgo = new Date()
    monthAgo.setMonth(monthAgo.getMonth() - 1)
    return visitRecords.value.filter(r => new Date(r.timestamp) >= monthAgo).length
  })

  const totalVisits = computed(() => visitRecords.value.length)

  return {
    visitRecords,
    recordVisit,
    getDailyVisits,
    getWeeklyVisits,
    getMonthlyVisits,
    totalVisits
  }
})
