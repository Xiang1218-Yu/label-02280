<template>
  <footer class="app-footer" :class="{ 'dark-mode': themeStore.isDark }">
    <div class="footer-container">
      <div class="footer-top">
        <div class="footer-brand">
          <div class="footer-logo">
            <span class="logo-icon">A</span>
            <span class="logo-text">Alex Chen</span>
          </div>
          <p class="footer-desc">热爱技术，热爱生活。<br>用代码构建美好世界。</p>

        </div>
        <div class="footer-links">
          <h4>快速导航</h4>
          <router-link to="/">首页</router-link>
          <router-link to="/about">关于</router-link>
          <router-link to="/skills">技能</router-link>
          <router-link to="/portfolio">作品</router-link>
        </div>
        <div class="footer-links">
          <h4>更多</h4>
          <router-link to="/blog">博客</router-link>
          <router-link to="/contact">联系我</router-link>
        </div>
        <div class="footer-newsletter">
          <h4>技术栈</h4>
          <div class="tech-list">
            <span v-for="tech in techs" :key="tech">{{ tech }}</span>
          </div>
        </div>
      </div>
      <div class="footer-divider"></div>
      <div class="footer-bottom">
        <p>&copy; {{ currentYear }} Alex Chen. All rights reserved.</p>
        <p class="footer-powered">Powered by Vue 3 + Element Plus</p>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { computed } from 'vue'
import { useThemeStore } from '@/stores/theme'

const themeStore = useThemeStore()
const currentYear = computed(() => new Date().getFullYear())
const techs = ['Vue 3', 'Vite', 'Element Plus', 'Pinia', 'SCSS']
</script>

<style lang="scss" scoped>
@use '@/assets/styles/variables' as *;

.app-footer {
  background: linear-gradient(180deg, #1A1A2E, #0F0F1A);
  color: $text-light;
  padding: $spacing-3xl $spacing-lg $spacing-lg;
  margin-top: $spacing-3xl;
}

.footer-container { max-width: $container-max; margin: 0 auto; }

.footer-top {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  gap: $spacing-xl;
  padding-bottom: $spacing-xl;
  @media (max-width: $breakpoint-md) { grid-template-columns: 1fr 1fr; }
  @media (max-width: $breakpoint-sm) { grid-template-columns: 1fr; }
}

.footer-brand {
  .footer-logo {
    display: flex;
    align-items: center;
    gap: $spacing-sm;
    margin-bottom: $spacing-md;
  }
  .logo-icon {
    width: 40px; height: 40px;
    background: linear-gradient(135deg, $color-primary, $color-accent);
    border-radius: $radius-md;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-family: $font-heading;
    font-weight: 700;
    font-size: $font-size-lg;
  }
  .logo-text {
    font-family: $font-heading;
    font-weight: 600;
    font-size: $font-size-lg;
    color: $text-white;
  }
  .footer-desc {
    font-size: $font-size-sm;
    line-height: 1.8;
    color: $text-light;
    margin-bottom: $spacing-md;
  }
}


.footer-links {
  h4 {
    color: $text-white;
    font-size: $font-size-sm;
    font-weight: 600;
    margin-bottom: $spacing-md;
    letter-spacing: 0.5px;
  }
  a {
    display: block;
    color: $text-light;
    font-size: $font-size-sm;
    padding: $spacing-xs 0;
    transition: all $transition-fast;
    text-decoration: none;
    &:hover { color: $color-primary-light; transform: translateX(4px); }
  }
}

.footer-newsletter {
  h4 {
    color: $text-white;
    font-size: $font-size-sm;
    font-weight: 600;
    margin-bottom: $spacing-md;
    letter-spacing: 0.5px;
  }
}

.tech-list {
  display: flex;
  flex-wrap: wrap;
  gap: $spacing-xs;
  span {
    padding: 4px 10px;
    background: rgba(255, 255, 255, 0.06);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 50px;
    font-size: $font-size-xs;
    color: $text-light;
    transition: all $transition-fast;
    &:hover { background: rgba($color-primary, 0.15); color: $color-primary-light; border-color: rgba($color-primary, 0.3); }
  }
}

.footer-divider {
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent);
  margin-bottom: $spacing-lg;
}

.footer-bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: $font-size-xs;
  color: rgba(255, 255, 255, 0.35);
  @media (max-width: $breakpoint-sm) { flex-direction: column; gap: $spacing-sm; }
}

.footer-powered { color: rgba(255, 255, 255, 0.25); }
</style>
