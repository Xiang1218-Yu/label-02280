<template>
  <div class="app-wrapper" :class="{ 'dark-mode': themeStore.isDark }">
    <AppHeader />
    <main class="main-content">
      <router-view />
    </main>
    <AppFooter />
  </div>
</template>

<script setup>
import { useThemeStore } from '@/stores/theme'
import AppHeader from '@/components/AppHeader.vue'
import AppFooter from '@/components/AppFooter.vue'

const themeStore = useThemeStore()
</script>

<style lang="scss">
@use '@/assets/styles/variables' as *;

.app-wrapper {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  transition: background-color $transition-normal, color $transition-normal;

  &.dark-mode {
    background-color: $bg-dark;
    color: $text-white;

    .card {
      background: #16213E;
      color: $text-white;
    }

    .section-title,
    h1, h2, h3, h4, h5, h6 {
      color: $text-white;
    }

    .section-subtitle {
      color: $text-light;
    }
  }
}

.main-content {
  flex: 1;
  padding-top: 72px;
}
</style>
