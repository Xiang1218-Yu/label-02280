<template>
  <!--
    首页 - HomeView
    Vue 技术点：ref/reactive 响应式数据 + onMounted 生命周期钩子 + 模板引用 + 组件通信
  -->
  <div class="home-page">
    <HeroSection @scroll-down="scrollToStats" />
    <StatsSection ref="statsSectionRef" />
    <VisitStats />
    <FeaturesSection />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import HeroSection from '@/components/HeroSection.vue'
import StatsSection from '@/components/StatsSection.vue'
import VisitStats from '@/components/VisitStats.vue'
import FeaturesSection from '@/components/FeaturesSection.vue'
import createLogger from '@/utils/logger'

const log = createLogger('HomeView')

const statsSectionRef = ref(null)

function scrollToStats() {
  log.info('用户点击滚动到统计区域')
  statsSectionRef.value?.scrollIntoView()
}
</script>

<style lang="scss" scoped>
.home-page { overflow: hidden; }
</style>
