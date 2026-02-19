<template>
  <!--
    技能页面 - SkillsView
    Vue 技术点：computed 计算属性 + watch 侦听器 + 动态样式绑定
  -->
  <div class="skills-page">
    <section class="skills-hero">
      <div class="container">
        <h1 class="section-title">技术<span class="highlight">技能</span></h1>
        <p class="section-subtitle">持续学习，不断进步</p>
      </div>
    </section>

    <section class="skills-filter">
      <div class="container">
        <div class="filter-tabs">
          <button
            v-for="cat in categories"
            :key="cat"
            class="filter-tab"
            :class="{ active: activeCategory === cat }"
            @click="activeCategory = cat"
          >
            {{ cat }}
          </button>
        </div>
      </div>
    </section>

    <section class="skills-content">
      <div class="container">
        <transition-group name="skill-list" tag="div" class="skills-grid">
          <div v-for="skill in filteredSkills" :key="skill.name" class="skill-card">
            <div class="skill-header">
              <div class="skill-icon" :style="{ background: skill.color }">
                <span>{{ skill.abbr }}</span>
              </div>
              <div class="skill-info">
                <h3>{{ skill.name }}</h3>
                <span class="skill-level">{{ skill.level }}</span>
              </div>
              <span class="skill-percent">{{ skill.percent }}%</span>
            </div>
            <div class="skill-bar-wrapper">
              <div class="skill-bar" :style="{ width: animatedWidths[skill.name] || '0%', background: skill.color }">
                <div class="skill-bar-glow"></div>
              </div>
            </div>
            <p class="skill-desc">{{ skill.desc }}</p>
            <div class="skill-tags">
              <span v-for="tag in skill.tags" :key="tag" class="skill-tag">{{ tag }}</span>
            </div>
          </div>
        </transition-group>

        <div class="skills-summary fade-in" v-lazy>
          <h2 class="section-title">技能<span class="highlight">概览</span></h2>
          <div class="summary-grid">
            <div class="summary-card" v-for="item in summaryData" :key="item.label">
              <div class="summary-ring" :style="ringStyle(item)">
                <span>{{ item.value }}%</span>
              </div>
              <h4>{{ item.label }}</h4>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed, watch, reactive, onMounted } from 'vue'
import createLogger from '@/utils/logger'

const log = createLogger('SkillsView')

const activeCategory = ref('全部')
const categories = ['全部', '前端', '后端', '数据库', '工具']

const skills = [
  { name: 'Vue.js', abbr: 'V', category: '前端', level: '精通', percent: 95, color: 'linear-gradient(135deg, #42b883, #35495e)', desc: '深入理解 Vue 3 组合式 API、响应式原理和虚拟 DOM。', tags: ['Composition API', 'Pinia', 'Vue Router'] },
  { name: 'JavaScript', abbr: 'JS', category: '前端', level: '精通', percent: 92, color: 'linear-gradient(135deg, #F7DF1E, #E8C800)', desc: '精通 ES6+ 语法、异步编程、原型链和闭包。', tags: ['ES6+', 'Promise', 'TypeScript'] },
  { name: 'CSS/SCSS', abbr: 'C', category: '前端', level: '熟练', percent: 88, color: 'linear-gradient(135deg, #1572B6, #33A9DC)', desc: '擅长响应式布局、CSS 动画和预处理器。', tags: ['Flexbox', 'Grid', 'Animation'] },
  { name: 'React', abbr: 'R', category: '前端', level: '熟练', percent: 78, color: 'linear-gradient(135deg, #61DAFB, #00B4D8)', desc: '熟悉 React Hooks、Redux 和 Next.js 框架。', tags: ['Hooks', 'Redux', 'Next.js'] },
  { name: 'Java', abbr: 'J', category: '后端', level: '精通', percent: 90, color: 'linear-gradient(135deg, #ED8B00, #5382A1)', desc: '精通 Java 核心、多线程和 JVM 调优。', tags: ['JDK 17', '多线程', 'JVM'] },
  { name: 'Spring Boot', abbr: 'SB', category: '后端', level: '精通', percent: 88, color: 'linear-gradient(135deg, #6DB33F, #4E8A2F)', desc: '熟练使用 Spring Boot 构建微服务架构。', tags: ['Spring MVC', 'Security', 'MyBatis'] },
  { name: 'Node.js', abbr: 'N', category: '后端', level: '熟练', percent: 75, color: 'linear-gradient(135deg, #339933, #68A063)', desc: '使用 Express/Koa 构建 RESTful API。', tags: ['Express', 'Koa', 'NestJS'] },
  { name: 'MySQL', abbr: 'M', category: '数据库', level: '精通', percent: 85, color: 'linear-gradient(135deg, #4479A1, #00758F)', desc: '擅长 SQL 优化、索引设计和分库分表。', tags: ['SQL优化', '索引', '事务'] },
  { name: 'Redis', abbr: 'R', category: '数据库', level: '熟练', percent: 80, color: 'linear-gradient(135deg, #DC382D, #A41E11)', desc: '熟悉缓存策略、分布式锁和消息队列。', tags: ['缓存', '分布式锁', 'Pub/Sub'] },
  { name: 'Docker', abbr: 'D', category: '工具', level: '熟练', percent: 82, color: 'linear-gradient(135deg, #2496ED, #0DB7ED)', desc: '熟练使用 Docker 进行容器化部署。', tags: ['Dockerfile', 'Compose', 'K8s'] },
  { name: 'Git', abbr: 'G', category: '工具', level: '精通', percent: 90, color: 'linear-gradient(135deg, #F05032, #DE4C36)', desc: '精通 Git 工作流、分支管理和 CI/CD。', tags: ['GitFlow', 'Actions', 'CI/CD'] }
]

const filteredSkills = computed(() => {
  if (activeCategory.value === '全部') return skills
  return skills.filter(s => s.category === activeCategory.value)
})

const animatedWidths = reactive({})

function animateBars() {
  filteredSkills.value.forEach(s => { animatedWidths[s.name] = '0%' })
  setTimeout(() => {
    filteredSkills.value.forEach(s => { animatedWidths[s.name] = s.percent + '%' })
  }, 100)
}

watch(activeCategory, (val) => {
  log.info('技能分类切换', { category: val })
  animateBars()
})
onMounted(() => { animateBars() })

const summaryData = [
  { label: '前端开发', value: 90, color: '#6C63FF' },
  { label: '后端开发', value: 85, color: '#00C9A7' },
  { label: '数据库', value: 82, color: '#FF6584' },
  { label: 'DevOps', value: 78, color: '#FFC75F' }
]

function ringStyle(item) {
  const deg = (item.value / 100) * 360
  return { background: `conic-gradient(${item.color} ${deg}deg, rgba(0,0,0,0.05) ${deg}deg)` }
}
</script>

<style lang="scss" scoped>
@use '@/assets/styles/variables' as *;

.skills-hero {
  padding: $spacing-3xl 0 $spacing-xl;
  background: linear-gradient(160deg, #F8F9FE, #EDE9FE, #F0E6FF);
  .dark-mode & { background: linear-gradient(160deg, #0F0E17, #1A1A2E, #16213E); }
}

.skills-filter {
  padding: $spacing-xl 0;
  background: white;
  position: sticky;
  top: 72px;
  z-index: 10;
  box-shadow: $shadow-nav;
  backdrop-filter: blur(20px);
  .dark-mode & { background: rgba($bg-dark-card, 0.9); }
}

.filter-tabs {
  display: flex;
  gap: $spacing-sm;
  justify-content: center;
  flex-wrap: wrap;
}

.filter-tab {
  padding: $spacing-sm $spacing-lg;
  border: 2px solid transparent;
  border-radius: 50px;
  background: $bg-page;
  color: $text-secondary;
  font-size: $font-size-sm;
  font-weight: 500;
  cursor: pointer;
  transition: all $transition-spring;
  .dark-mode & { background: rgba(255,255,255,0.05); color: $text-light; }
  &:hover { border-color: $color-primary; color: $color-primary; }
  &.active {
    background: linear-gradient(135deg, $color-primary, $color-primary-dark);
    color: white;
    border-color: $color-primary;
    box-shadow: 0 4px 16px rgba($color-primary, 0.3);
  }
}

.skills-content { padding: $spacing-xl 0 $spacing-3xl; }

.skills-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: $spacing-lg;
  margin-bottom: $spacing-3xl;
  @media (max-width: $breakpoint-md) { grid-template-columns: 1fr; }
}

.skill-card {
  background: white;
  border-radius: $radius-lg;
  padding: $spacing-lg;
  box-shadow: $shadow-card;
  transition: all $transition-spring;
  border: 1px solid transparent;
  .dark-mode & { background: $bg-dark-card; }
  &:hover {
    box-shadow: $shadow-hover;
    transform: translateY(-4px);
    border-color: rgba($color-primary, 0.12);
  }
}

.skill-header {
  display: flex;
  align-items: center;
  gap: $spacing-md;
  margin-bottom: $spacing-md;
}

.skill-icon {
  width: 48px;
  height: 48px;
  border-radius: $radius-md;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 700;
  font-size: $font-size-sm;
  flex-shrink: 0;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.skill-info {
  flex: 1;
  h3 { font-size: $font-size-md; margin-bottom: 2px; }
  .skill-level { font-size: $font-size-xs; color: $color-primary; font-weight: 500; }
}

.skill-percent {
  font-family: $font-heading;
  font-size: $font-size-lg;
  font-weight: 700;
  color: $color-primary;
}

.skill-bar-wrapper {
  height: 6px;
  background: $bg-page;
  border-radius: 3px;
  margin-bottom: $spacing-md;
  overflow: hidden;
  .dark-mode & { background: rgba(255,255,255,0.08); }
}

.skill-bar {
  height: 100%;
  border-radius: 3px;
  transition: width 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  position: relative;

  .skill-bar-glow {
    position: absolute;
    right: 0;
    top: -2px;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: white;
    box-shadow: 0 0 8px rgba(255, 255, 255, 0.6);
    opacity: 0.8;
  }
}

.skill-desc {
  font-size: $font-size-sm;
  color: $text-secondary;
  line-height: 1.7;
  margin-bottom: $spacing-md;
  .dark-mode & { color: $text-light; }
}

.skill-tags { display: flex; flex-wrap: wrap; gap: $spacing-xs; }

.skill-tag {
  padding: 2px $spacing-sm;
  background: rgba($color-primary, 0.08);
  color: $color-primary;
  border-radius: 50px;
  font-size: $font-size-xs;
  transition: all $transition-fast;
  &:hover { background: rgba($color-primary, 0.15); }
}

.skill-list-enter-active, .skill-list-leave-active { transition: all 0.4s ease; }
.skill-list-enter-from, .skill-list-leave-to { opacity: 0; transform: scale(0.95) translateY(10px); }

.skills-summary { text-align: center; }

.summary-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: $spacing-lg;
  margin-top: $spacing-xl;
  @media (max-width: $breakpoint-md) { grid-template-columns: repeat(2, 1fr); }
}

.summary-card {
  background: white;
  border-radius: $radius-lg;
  padding: $spacing-xl;
  box-shadow: $shadow-card;
  text-align: center;
  transition: all $transition-spring;
  border: 1px solid transparent;
  .dark-mode & { background: $bg-dark-card; }
  &:hover {
    transform: translateY(-4px);
    box-shadow: $shadow-hover;
    border-color: rgba($color-primary, 0.12);
  }
  h4 { margin-top: $spacing-md; font-size: $font-size-sm; color: $text-secondary; .dark-mode & { color: $text-light; } }
}

.summary-ring {
  width: 100px;
  height: 100px;
  border-radius: $radius-round;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;

  span {
    background: white;
    width: 76px;
    height: 76px;
    border-radius: $radius-round;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 700;
    font-size: $font-size-md;
    color: $text-primary;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
    .dark-mode & { background: $bg-dark-card; color: $text-white; }
  }
}
</style>
