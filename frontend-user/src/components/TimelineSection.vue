<template>
  <section class="timeline-section">
    <div class="container">
      <h2 class="section-title">我的<span class="highlight">旅程</span></h2>
      <p class="section-subtitle">从学生到工程师的成长之路</p>

      <div class="timeline">
        <div
          v-for="(item, index) in timeline"
          :key="index"
          class="timeline-item fade-in"
          v-lazy
          :class="{ left: index % 2 === 0, right: index % 2 !== 0 }"
        >
          <div class="timeline-dot" :style="{ background: item.color }">
            <div class="dot-ring"></div>
          </div>
          <div class="timeline-card" @click="toggleDetail(index)">
            <div class="timeline-header">
              <span class="timeline-date">{{ item.date }}</span>
              <el-tag :type="item.type" size="small" effect="plain">{{ item.tag }}</el-tag>
            </div>
            <h3>{{ item.title }}</h3>
            <p>{{ item.summary }}</p>

            <transition name="expand">
              <div v-show="expandedIndex === index" class="timeline-detail">
                <p>{{ item.detail }}</p>
              </div>
            </transition>

            <button class="expand-btn">
              <el-icon>
                <component :is="expandedIndex === index ? 'ArrowUp' : 'ArrowDown'" />
              </el-icon>
              {{ expandedIndex === index ? '收起' : '展开详情' }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import createLogger from '@/utils/logger'

const log = createLogger('TimelineSection')

const expandedIndex = ref(-1)

function toggleDetail(index) {
  expandedIndex.value = expandedIndex.value === index ? -1 : index
  log.info('时间线详情切换', { index, expanded: expandedIndex.value === index })
}

const timeline = [
  {
    date: '2019.09', title: '进入大学', tag: '教育', type: 'primary', color: '#6C63FF',
    summary: '就读于某重点大学计算机科学与技术专业。',
    detail: '大学期间系统学习了数据结构、算法、操作系统等核心课程，参加了多次编程竞赛，获得省级奖项。'
  },
  {
    date: '2021.06', title: '第一份实习', tag: '工作', type: 'success', color: '#00C9A7',
    summary: '在某互联网公司担任前端开发实习生。',
    detail: '负责公司内部管理系统的前端开发，使用 Vue 2 + Element UI 技术栈，独立完成了 3 个模块的开发工作。'
  },
  {
    date: '2022.03', title: '开源之旅', tag: '开源', type: 'warning', color: '#FFC75F',
    summary: '在 GitHub 上发布了第一个开源项目。',
    detail: '开发了一个 Vue 3 组件库，累计获得 200+ Stars，被多个项目引用。这段经历让我深刻理解了开源协作的价值。'
  },
  {
    date: '2023.07', title: '正式入职', tag: '工作', type: 'success', color: '#00C9A7',
    summary: '加入某科技公司担任全栈开发工程师。',
    detail: '负责公司核心产品的全栈开发，使用 Vue 3 + Spring Boot 技术栈，主导了多个重要功能的架构设计与实现。'
  },
  {
    date: '2024.01', title: '技术博客', tag: '创作', type: 'danger', color: '#FF6584',
    summary: '开始系统性地撰写技术博客。',
    detail: '在掘金、CSDN 等平台发表了 50+ 篇技术文章，涵盖前端、后端、DevOps 等领域，累计阅读量超过 10 万。'
  }
]
</script>

<style lang="scss" scoped>
@use '@/assets/styles/variables' as *;

.timeline-section {
  padding: $spacing-3xl 0; background: white;
  .dark-mode & { background: $bg-dark-card; }
}

.timeline {
  position: relative; max-width: 800px; margin: 0 auto;
  &::before {
    content: ''; position: absolute; left: 50%; top: 0; bottom: 0; width: 2px;
    background: linear-gradient(to bottom, $color-primary, $color-accent, $color-success);
    transform: translateX(-50%);
    @media (max-width: $breakpoint-md) { left: 20px; }
  }
}

.timeline-item {
  position: relative; padding: $spacing-md 0; display: flex;
  &.left {
    justify-content: flex-start; padding-right: calc(50% + 30px);
    @media (max-width: $breakpoint-md) { padding-right: 0; padding-left: 50px; }
  }
  &.right {
    justify-content: flex-end; padding-left: calc(50% + 30px);
    @media (max-width: $breakpoint-md) { padding-left: 50px; }
  }
}

.timeline-dot {
  position: absolute; left: 50%; top: 30px; width: 16px; height: 16px;
  border-radius: $radius-round; transform: translateX(-50%); border: 3px solid white; z-index: 1;
  @media (max-width: $breakpoint-md) { left: 20px; }
  .dot-ring {
    position: absolute; inset: -6px; border-radius: 50%; border: 2px solid currentColor;
    opacity: 0.2; animation: pulse 2s infinite;
  }
}

@keyframes pulse {
  0%, 100% { transform: scale(1); opacity: 0.2; }
  50% { transform: scale(1.4); opacity: 0; }
}

.timeline-card {
  background: $bg-page; border-radius: $radius-lg; padding: $spacing-lg; cursor: pointer;
  transition: all $transition-spring; width: 100%; border: 1px solid transparent;
  .dark-mode & { background: rgba(255, 255, 255, 0.04); }
  &:hover { box-shadow: $shadow-hover; transform: translateY(-3px); border-color: rgba($color-primary, 0.12); }
  .timeline-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: $spacing-sm; }
  .timeline-date { font-size: $font-size-sm; color: $text-light; font-weight: 500; }
  h3 { font-size: $font-size-lg; margin-bottom: $spacing-sm; }
  p { font-size: $font-size-sm; color: $text-secondary; line-height: 1.7; .dark-mode & { color: $text-light; } }
}

.timeline-detail {
  margin-top: $spacing-md; padding-top: $spacing-md; border-top: 1px solid rgba($color-primary, 0.1);
  p { color: $text-secondary; font-size: $font-size-sm; line-height: 1.8; }
}

.expand-btn {
  display: flex; align-items: center; gap: $spacing-xs; margin-top: $spacing-md;
  background: none; border: none; color: $color-primary; font-size: $font-size-xs;
  cursor: pointer; padding: 4px 0; transition: all $transition-fast;
  &:hover { color: $color-primary-dark; transform: translateX(4px); }
}

.expand-enter-active, .expand-leave-active { transition: all 0.3s ease; overflow: hidden; }
.expand-enter-from, .expand-leave-to { opacity: 0; max-height: 0; }
.expand-enter-to, .expand-leave-from { opacity: 1; max-height: 200px; }
</style>
