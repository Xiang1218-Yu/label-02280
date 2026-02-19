<template>
  <!-- Vue 技术点：事件处理 + Pinia 状态管理 -->
  <button
    class="theme-toggle"
    @click="themeStore.toggleTheme"
    :title="themeStore.isDark ? '切换到亮色模式' : '切换到暗色模式'"
    aria-label="切换主题"
  >
    <transition name="rotate" mode="out-in">
      <el-icon v-if="themeStore.isDark" key="dark"><Sunny /></el-icon>
      <el-icon v-else key="light"><Moon /></el-icon>
    </transition>
  </button>
</template>

<script setup>
import { useThemeStore } from '@/stores/theme'
const themeStore = useThemeStore()
</script>

<style lang="scss" scoped>
@use '@/assets/styles/variables' as *;

.theme-toggle {
  width: 40px; height: 40px;
  border-radius: $radius-round;
  border: 2px solid rgba($color-primary, 0.15);
  background: rgba($color-primary, 0.04);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  color: $color-primary;
  font-size: 18px;
  &:hover {
    background: rgba($color-primary, 0.1);
    border-color: $color-primary;
    transform: rotate(15deg) scale(1.1);
    box-shadow: 0 4px 15px rgba($color-primary, 0.2);
  }
}

.rotate-enter-active, .rotate-leave-active { transition: all 0.3s ease; }
.rotate-enter-from { opacity: 0; transform: rotate(-90deg) scale(0.5); }
.rotate-leave-to { opacity: 0; transform: rotate(90deg) scale(0.5); }
</style>
