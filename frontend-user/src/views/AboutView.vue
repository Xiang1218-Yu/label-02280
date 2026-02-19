<template>
  <!--
    关于我 - AboutView
    Vue 技术点：v-if/v-show 条件渲染 + Transition 过渡动画 + 组件化拆分
  -->
  <div class="about-page">
    <section class="about-hero">
      <div class="container">
        <h1 class="section-title">关于<span class="highlight">我</span></h1>
        <p class="section-subtitle">了解我的故事、经历和热爱</p>
      </div>
    </section>

    <IntroSection />
    <TimelineSection />
    <HobbiesSection />
  </div>
</template>

<script setup>
import IntroSection from '@/components/about/IntroSection.vue'
import TimelineSection from '@/components/about/TimelineSection.vue'
import HobbiesSection from '@/components/about/HobbiesSection.vue'
</script>

<style lang="scss" scoped>
@use '@/assets/styles/variables' as *;

.about-hero {
  padding: $spacing-3xl 0 $spacing-xl;
  background: linear-gradient(160deg, #F8F9FE, #EDE9FE, #F0E6FF);
  .dark-mode & { background: linear-gradient(160deg, #0F0E17, #1A1A2E, #16213E); }
}
</style>
