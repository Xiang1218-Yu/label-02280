<template>
  <!--
    首页 Hero 区域
    Vue 技术点：ref 响应式数据 + onMounted/onUnmounted 生命周期 + v-for 列表渲染 + 动态 :style 绑定
  -->
  <section class="hero-section">
    <div class="hero-bg-shapes">
      <div class="shape shape-1"></div>
      <div class="shape shape-2"></div>
      <div class="shape shape-3"></div>
    </div>
    <div class="hero-particles">
      <span
        v-for="n in 25"
        :key="n"
        class="particle"
        :style="particleStyle(n)"
      ></span>
    </div>
    <div class="hero-content">
      <div class="hero-badge">
        <span class="badge-dot"></span>
        <span>开放合作中</span>
      </div>
      <p class="hero-greeting">你好，我是</p>
      <h1 class="hero-name">Alex Chen</h1>
      <div class="hero-typing">
        <span class="typing-text">{{ displayText }}</span>
        <span class="typing-cursor">|</span>
      </div>
      <p class="hero-desc">
        一名热爱技术与设计的全栈开发者，专注于构建优雅且高性能的 Web 应用。
      </p>
      <div class="hero-actions">
        <router-link to="/portfolio" class="btn btn-primary">
          <el-icon><Folder /></el-icon>
          查看作品
        </router-link>
        <router-link to="/contact" class="btn btn-outline">
          <el-icon><ChatDotRound /></el-icon>
          联系我
        </router-link>
      </div>
      <div class="hero-tech-stack">
        <span v-for="tech in techStack" :key="tech" class="tech-badge">{{ tech }}</span>
      </div>
    </div>
    <div class="hero-scroll" @click="$emit('scroll-down')">
      <div class="scroll-mouse">
        <div class="scroll-wheel"></div>
      </div>
      <span>向下滚动</span>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

defineEmits(['scroll-down'])

const techStack = ['Vue 3', 'Spring Boot', 'TypeScript', 'Docker', 'MySQL']

const titles = ['全栈开发者', 'UI/UX 爱好者', '开源贡献者', '终身学习者']
const displayText = ref('')
let titleIndex = 0
let charIndex = 0
let isDeleting = false
let typingTimer = null

function typeEffect() {
  const current = titles[titleIndex]
  if (!isDeleting) {
    displayText.value = current.substring(0, charIndex + 1)
    charIndex++
    if (charIndex === current.length) {
      isDeleting = true
      typingTimer = setTimeout(typeEffect, 2000)
      return
    }
  } else {
    displayText.value = current.substring(0, charIndex - 1)
    charIndex--
    if (charIndex === 0) {
      isDeleting = false
      titleIndex = (titleIndex + 1) % titles.length
    }
  }
  typingTimer = setTimeout(typeEffect, isDeleting ? 50 : 120)
}

function particleStyle(i) {
  const seed = i * 137.508
  return {
    left: `${(seed * 7) % 100}%`,
    top: `${(seed * 13) % 100}%`,
    width: `${(seed % 6) + 2}px`,
    height: `${(seed % 6) + 2}px`,
    animationDelay: `${(seed % 5)}s`,
    animationDuration: `${(seed % 10) + 12}s`,
    opacity: 0.08 + (seed % 12) / 100
  }
}

onMounted(() => { typeEffect() })
onUnmounted(() => { clearTimeout(typingTimer) })
</script>

<style lang="scss" scoped>
@use '@/assets/styles/variables' as *;

.hero-section {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  background: linear-gradient(160deg, #F8F9FE 0%, #EDE9FE 40%, #E8E0FF 70%, #F0E6FF 100%);
  padding: $spacing-xl;
  .dark-mode & {
    background: linear-gradient(160deg, #0F0E17 0%, #1A1A2E 40%, #16213E 70%, #0F3460 100%);
  }
}

.hero-bg-shapes {
  position: absolute; inset: 0; overflow: hidden; pointer-events: none;
  .shape { position: absolute; border-radius: 50%; filter: blur(80px); opacity: 0.3; }
  .shape-1 { width: 400px; height: 400px; background: $color-primary; top: -100px; right: -100px; animation: floatY 8s ease-in-out infinite; }
  .shape-2 { width: 300px; height: 300px; background: $color-accent; bottom: -50px; left: -50px; animation: floatY 10s ease-in-out infinite reverse; }
  .shape-3 { width: 200px; height: 200px; background: $color-success; top: 40%; left: 60%; animation: floatY 12s ease-in-out infinite; }
}

.hero-particles { position: absolute; inset: 0; overflow: hidden; pointer-events: none; }

.particle {
  position: absolute; background: $color-primary; border-radius: $radius-round;
  animation: float linear infinite;
}

@keyframes float {
  0%, 100% { transform: translateY(0) translateX(0); }
  25% { transform: translateY(-30px) translateX(15px); }
  50% { transform: translateY(-15px) translateX(-10px); }
  75% { transform: translateY(-40px) translateX(20px); }
}
@keyframes floatY { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-20px); } }

.hero-content { text-align: center; z-index: 1; animation: heroFadeIn 1s ease; }
@keyframes heroFadeIn { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }

.hero-badge {
  display: inline-flex; align-items: center; gap: $spacing-sm; padding: 6px 16px;
  background: rgba($color-success, 0.1); border: 1px solid rgba($color-success, 0.3);
  border-radius: 50px; font-size: $font-size-xs; color: $color-success; font-weight: 500; margin-bottom: $spacing-lg;
  .badge-dot { width: 8px; height: 8px; background: $color-success; border-radius: 50%; animation: pulse 2s infinite; }
}
@keyframes pulse { 0%, 100% { transform: scale(1); opacity: 1; } 50% { transform: scale(1.5); opacity: 0.5; } }

.hero-greeting { font-size: $font-size-lg; color: $text-secondary; margin-bottom: $spacing-sm; font-weight: 400; .dark-mode & { color: $text-light; } }

.hero-name {
  font-family: $font-heading; font-size: clamp(40px, 8vw, 72px); font-weight: 700;
  background: linear-gradient(135deg, $color-primary, $color-accent);
  -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
  margin-bottom: $spacing-md; letter-spacing: -1px;
}

.hero-typing {
  font-size: $font-size-xl; font-weight: 500; margin-bottom: $spacing-lg; min-height: 36px;
  .typing-text { color: $color-primary; }
  .typing-cursor { color: $color-accent; animation: blink 1s infinite; }
}
@keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }

.hero-desc { font-size: $font-size-md; color: $text-secondary; max-width: 500px; margin: 0 auto $spacing-xl; line-height: 1.8; .dark-mode & { color: $text-light; } }

.hero-actions { display: flex; gap: $spacing-md; justify-content: center; flex-wrap: wrap; margin-bottom: $spacing-xl; }

.btn {
  display: inline-flex; align-items: center; gap: $spacing-sm; padding: 14px 32px;
  border-radius: 50px; font-size: $font-size-md; font-weight: 500; cursor: pointer;
  transition: all $transition-spring; text-decoration: none; border: 2px solid transparent;
  &-primary {
    background: linear-gradient(135deg, $color-primary, $color-primary-dark); color: white;
    border-color: $color-primary; box-shadow: 0 4px 16px rgba($color-primary, 0.3);
    &:hover { transform: translateY(-3px); box-shadow: 0 8px 30px rgba($color-primary, 0.4); }
  }
  &-outline {
    background: transparent; color: $color-primary; border-color: $color-primary;
    &:hover { background: $color-primary; color: white; transform: translateY(-3px); box-shadow: 0 8px 25px rgba($color-primary, 0.3); }
  }
}

.hero-tech-stack { display: flex; gap: $spacing-sm; justify-content: center; flex-wrap: wrap; }
.tech-badge {
  padding: 4px 14px; background: rgba($color-primary, 0.08); border: 1px solid rgba($color-primary, 0.15);
  border-radius: 50px; font-size: $font-size-xs; color: $color-primary; font-weight: 500;
  transition: all $transition-fast;
  &:hover { background: rgba($color-primary, 0.15); transform: translateY(-2px); }
}

.hero-scroll {
  position: absolute; bottom: 40px; display: flex; flex-direction: column; align-items: center;
  gap: $spacing-sm; color: $text-light; font-size: $font-size-xs; cursor: pointer; animation: bounce 2s infinite;
}
.scroll-mouse {
  width: 24px; height: 38px; border: 2px solid $text-light; border-radius: 12px; position: relative;
  .scroll-wheel {
    width: 4px; height: 8px; background: $color-primary; border-radius: 2px;
    position: absolute; top: 6px; left: 50%; transform: translateX(-50%); animation: scrollWheel 1.5s infinite;
  }
}
@keyframes scrollWheel { 0% { opacity: 1; transform: translateX(-50%) translateY(0); } 100% { opacity: 0; transform: translateX(-50%) translateY(12px); } }
@keyframes bounce { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(8px); } }
</style>