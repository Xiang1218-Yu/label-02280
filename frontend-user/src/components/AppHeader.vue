<template>
  <header class="app-header" :class="{ scrolled: isScrolled, 'dark-mode': themeStore.isDark }">
    <div class="header-container">
      <router-link to="/" class="logo">
        <span class="logo-icon">A</span>
        <span class="logo-text">Alex Chen</span>
      </router-link>

      <nav class="nav-menu" :class="{ active: menuOpen }">
        <router-link
          v-for="item in navItems"
          :key="item.path"
          :to="item.path"
          class="nav-link"
          @click="menuOpen = false"
        >
          <el-icon><component :is="item.icon" /></el-icon>
          <span>{{ item.label }}</span>
        </router-link>
      </nav>

      <div class="header-actions">
        <ThemeToggle />
        <button class="menu-toggle" @click="menuOpen = !menuOpen" aria-label="菜单">
          <span :class="{ open: menuOpen }"></span>
        </button>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useThemeStore } from '@/stores/theme'
import ThemeToggle from './ThemeToggle.vue'
import createLogger from '@/utils/logger'

const log = createLogger('AppHeader')

const themeStore = useThemeStore()
const isScrolled = ref(false)
const menuOpen = ref(false)

const navItems = [
  { path: '/', label: '首页', icon: 'House' },
  { path: '/about', label: '关于', icon: 'User' },
  { path: '/skills', label: '技能', icon: 'Trophy' },
  { path: '/portfolio', label: '作品', icon: 'Folder' },
  { path: '/blog', label: '博客', icon: 'Document' },
  { path: '/contact', label: '联系', icon: 'ChatDotRound' }
]

function handleScroll() { isScrolled.value = window.scrollY > 20 }
onMounted(() => {
  log.debug('Header 已挂载')
  window.addEventListener('scroll', handleScroll)
})
onUnmounted(() => {
  log.debug('Header 已卸载')
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style lang="scss" scoped>
@use '@/assets/styles/variables' as *;

.app-header {
  position: fixed;
  top: 0; left: 0; right: 0;
  z-index: 1000;
  background: rgba(255, 255, 255, 0.75);
  backdrop-filter: blur(24px) saturate(180%);
  -webkit-backdrop-filter: blur(24px) saturate(180%);
  border-bottom: 1px solid rgba(255, 255, 255, 0.18);
  transition: all $transition-normal;

  &.scrolled {
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.06);
    background: rgba(255, 255, 255, 0.88);
  }

  &.dark-mode {
    background: rgba(15, 15, 26, 0.8);
    border-bottom-color: rgba(255, 255, 255, 0.05);
    &.scrolled { background: rgba(15, 15, 26, 0.92); }
    .nav-link { color: $text-light; &:hover, &.router-link-exact-active { color: $color-primary-light; } }
    .logo-text { color: $text-white; }
  }
}

.header-container {
  max-width: $container-max;
  margin: 0 auto;
  padding: 0 $spacing-lg;
  height: 72px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.logo {
  display: flex;
  align-items: center;
  gap: $spacing-sm;
  text-decoration: none;
  .logo-icon {
    width: 36px; height: 36px;
    background: linear-gradient(135deg, $color-primary, $color-accent);
    border-radius: $radius-md;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-family: $font-heading;
    font-weight: 700;
    font-size: $font-size-lg;
    transition: all $transition-normal;
  }
  .logo-text {
    font-family: $font-heading;
    font-weight: 600;
    font-size: $font-size-lg;
    color: $text-primary;
    transition: color $transition-fast;
  }
  &:hover .logo-icon { transform: rotate(-5deg) scale(1.05); }
}

.nav-menu {
  display: flex;
  gap: $spacing-xs;
  @media (max-width: $breakpoint-md) {
    position: fixed;
    top: 72px; left: 0; right: 0;
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(20px);
    flex-direction: column;
    padding: $spacing-md;
    box-shadow: $shadow-card;
    transform: translateY(-100%);
    opacity: 0;
    pointer-events: none;
    transition: all $transition-normal;
    &.active { transform: translateY(0); opacity: 1; pointer-events: all; }
  }
}

.nav-link {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: $spacing-sm $spacing-md;
  border-radius: $radius-md;
  color: $text-secondary;
  font-size: $font-size-sm;
  font-weight: 500;
  text-decoration: none;
  transition: all $transition-fast;
  position: relative;
  &:hover { color: $color-primary; background: rgba($color-primary, 0.06); }
  &.router-link-exact-active {
    color: $color-primary;
    background: rgba($color-primary, 0.08);
    font-weight: 600;
    &::after {
      content: '';
      position: absolute;
      bottom: 2px; left: 50%;
      transform: translateX(-50%);
      width: 16px; height: 3px;
      background: linear-gradient(90deg, $color-primary, $color-accent);
      border-radius: 2px;
    }
  }
  .el-icon { font-size: 16px; }
}

.header-actions {
  display: flex;
  align-items: center;
  gap: $spacing-md;
}

.menu-toggle {
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  width: 28px; height: 20px;
  position: relative;
  @media (max-width: $breakpoint-md) { display: block; }
  span, span::before, span::after {
    display: block;
    width: 100%; height: 2px;
    background: $text-primary;
    border-radius: 2px;
    transition: all $transition-normal;
    position: absolute;
  }
  span {
    top: 50%;
    transform: translateY(-50%);
    &::before { content: ''; top: -8px; }
    &::after { content: ''; top: 8px; }
    &.open {
      background: transparent;
      &::before { top: 0; transform: rotate(45deg); }
      &::after { top: 0; transform: rotate(-45deg); }
    }
  }
}
</style>
