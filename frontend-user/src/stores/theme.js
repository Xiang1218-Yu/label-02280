import { defineStore } from 'pinia'
import { ref, watch } from 'vue'
import createLogger from '@/utils/logger'

const log = createLogger('ThemeStore')

export const useThemeStore = defineStore('theme', () => {
  const isDark = ref(true)

  const toggleTheme = () => {
    isDark.value = !isDark.value
    log.info('主题切换', { isDark: isDark.value })
  }

  watch(isDark, (val) => {
    document.documentElement.classList.toggle('light', !val)
  }, { immediate: true })

  return { isDark, toggleTheme }
})
