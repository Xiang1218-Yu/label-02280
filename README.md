# 个人网页 - Vue 3 期末作业

## How to Run

### 方式一：Docker 部署（推荐）

```bash
docker-compose up --build -d
```

访问 http://localhost:8081

### 方式二：本地开发

```bash
cd frontend-user
npm install
npm run dev
```

访问 http://localhost:5173

## Services

| 服务 | 端口 | 说明 |
|------|------|------|
| frontend-user | 8081 | 个人网页（Docker） |
| frontend-user (dev) | 5173 | 个人网页（开发模式） |

## 测试账号

本项目为纯前端个人展示网站，无需登录账号。

## 题目内容

VUE 期末作业

内容：完成个人网页，风格自定，内容不限。

要求：
1. 至少六个页面
2. 每个页面均需有至少体现一个交互
3. 所有页面的风格需一致
4. 内容需要合规合法，遵守道德规范

提交作品：
1. 网页源代码
2. 页面截图，并指出页面中交互，说明交互使用的哪项 Vue 技术

---

## 项目介绍

一个基于 Vue 3 + Element Plus 的个人展示网站，采用深色/浅色双主题设计，包含 6 个完整页面，每个页面都有丰富的交互效果。

### 技术栈

- Vue 3 (Composition API)
- Vue Router 4（路由管理、懒加载）
- Pinia 状态管理（主题切换、博客数据、留言数据）
- Element Plus UI 组件库
- SCSS 预处理器
- Vite 构建工具
- 自定义指令（v-lazy 滚动渐入动画）

### 项目结构

```
frontend-user/
├── src/
│   ├── api/index.js              # API 封装（Axios 请求/响应拦截器）
│   ├── assets/styles/
│   │   ├── variables.scss        # 设计系统变量
│   │   └── global.scss           # 全局样式
│   ├── components/
│   │   ├── AppHeader.vue         # 导航栏（路由导航、主题切换、响应式菜单）
│   │   ├── AppFooter.vue         # 页脚（快速导航、技术栈展示）
│   │   ├── ThemeToggle.vue       # 主题切换按钮
│   │   ├── home/
│   │   │   ├── HeroSection.vue   # 首页 Hero（打字机动画、粒子背景）
│   │   │   ├── StatsSection.vue  # 首页统计（数字递增动画）
│   │   │   └── FeaturesSection.vue # 首页能力展示
│   │   └── about/
│   │       ├── IntroSection.vue  # 关于我 - 个人介绍
│   │       ├── TimelineSection.vue # 关于我 - 时间线
│   │       └── HobbiesSection.vue # 关于我 - 兴趣爱好
│   ├── directives/
│   │   └── lazy.js               # 自定义指令 v-lazy（滚动渐入）
│   ├── views/
│   │   ├── HomeView.vue          # 首页
│   │   ├── AboutView.vue         # 关于我
│   │   ├── SkillsView.vue        # 技能
│   │   ├── PortfolioView.vue     # 作品集
│   │   ├── BlogView.vue          # 博客
│   │   └── ContactView.vue       # 联系我
│   ├── stores/
│   │   ├── theme.js              # 主题状态管理
│   │   ├── blog.js               # 博客数据管理
│   │   └── message.js            # 留言数据管理
│   ├── router/index.js           # 路由配置（懒加载、导航守卫）
│   ├── utils/
│   │   └── logger.js             # 前端日志系统
│   ├── App.vue                   # 根组件
│   └── main.js                   # 入口文件
├── Dockerfile
├── nginx.conf
├── package.json
└── vite.config.js
```
### 页面与交互说明

#### 1. 首页 (HomeView) - `/`
- **打字机动画**：标题文字逐字显示，循环切换不同身份标签（Vue 技术：`ref`, `onMounted`, `setTimeout` 递归调用）
- **粒子背景**：CSS 动画生成的动态粒子效果（Vue 技术：`v-for` 动态渲染、动态 `:style` 绑定）
- **数字递增动画**：统计数据从 0 递增到目标值（Vue 技术：`reactive`, `onMounted`, `IntersectionObserver` + `setInterval`）
- **滚动指示器**：点击平滑滚动到下一屏（Vue 技术：`$emit` 组件通信 + `ref` 模板引用 + `scrollIntoView`）
- **渐入动画**：元素滚动进入视口时触发动画（Vue 技术：自定义指令 `v-lazy`）

#### 2. 关于我 (AboutView) - `/about`
- **时间线展开/收起**：点击时间线卡片，展开或收起详细描述（Vue 技术：`v-show` 条件渲染 + `<transition>` 过渡动画 + `ref` 响应式状态 + `@click` 事件）
- **标签展示**：动态渲染个人标签列表（Vue 技术：`v-for` + Element Plus `<el-tag>`）
- **滚动渐入**：时间线和兴趣卡片滚动进入视口时触发动画（Vue 技术：自定义指令 `v-lazy`）
- **头像装饰动画**：头像周围的虚线圆环旋转、浮动圆点动画（Vue 技术：`v-for` + 动态 `:style` 绑定 + CSS `@keyframes`）

#### 3. 技能 (SkillsView) - `/skills`
- **Tab 分类切换**：点击切换全部/前端/后端/数据库/工具五个分类（Vue 技术：`ref`, `computed`, `v-for`, `@click`）
- **技能条动画**：切换分类时进度条从 0% 动画填充到目标百分比（Vue 技术：`watch` 侦听器 + `reactive` + 动态 `:style` 绑定）
- **TransitionGroup 动画**：切换分类时卡片有缩放淡入淡出过渡效果（Vue 技术：`<transition-group>`）
- **环形进度条**：技能概览区域使用 CSS `conic-gradient` 绘制圆环进度（Vue 技术：动态 `:style` 绑定 + `computed`）

#### 4. 作品集 (PortfolioView) - `/portfolio`
- **标签筛选**：按技术标签（Vue 3、Spring Boot 等）筛选项目（Vue 技术：`ref` + `computed` 计算属性 + `v-for`）
- **TransitionGroup 过渡**：筛选切换时卡片有缩放过渡效果（Vue 技术：`<transition-group>`）
- **渐入动画**：项目卡片滚动进入视口时触发动画（Vue 技术：自定义指令 `v-lazy`）
- **Hover 交互**：鼠标悬停卡片上移并增强阴影（Vue 技术：CSS `:hover` + `transition`）

#### 5. 博客 (BlogView) - `/blog`
- **搜索过滤**：输入关键词实时搜索文章标题和摘要（Vue 技术：`v-model` 双向绑定 + Pinia `computed`）
- **分类筛选**：按"全部/前端/后端/运维"分类过滤文章（Vue 技术：Pinia 状态管理 `blogStore` + `computed`）
- **分页功能**：文章列表分页展示，每页 4 篇（Vue 技术：`computed` 分页计算 + Element Plus `<el-pagination>`）
- **清除搜索**：搜索框有内容时显示清除按钮，一键清空（Vue 技术：`v-show` 条件显示 + `@click` 事件）

#### 6. 联系我 (ContactView) - `/contact`
- **表单验证**：姓名、邮箱、主题、留言内容的实时校验（Vue 技术：`reactive` + `v-model` 双向绑定 + Element Plus `el-form :rules`）
- **提交 Loading 状态**：提交按钮显示加载动画，模拟异步提交（Vue 技术：`ref` + `async/await` + Element Plus `el-button :loading`）
- **成功提示**：提交成功后弹出通知消息（Vue 技术：Element Plus `ElNotification`）
- **留言板**：提交的留言实时显示在留言板区域（Vue 技术：Pinia `messageStore` + `v-for` 列表渲染）
- **空状态**：留言板为空时显示提示信息（Vue 技术：`v-if` 条件渲染）

### 全局交互

- **主题切换**：导航栏中的太阳/月亮按钮，一键切换深色/浅色模式（Vue 技术：Pinia `themeStore` + `watch` 侦听器 + 动态 `:class` + `<transition>` 图标切换动画）
- **响应式导航**：移动端显示汉堡菜单，点击展开/收起导航（Vue 技术：`ref` + `v-bind:class` + `@click`）
- **导航高亮**：当前页面对应的导航链接自动高亮（Vue 技术：Vue Router `router-link-exact-active`）
- **路由懒加载**：所有页面组件按需加载，优化首屏性能（Vue 技术：`() => import()` 动态导入）
- **导航守卫**：路由切换时自动更新页面标题（Vue 技术：`router.beforeEach` 全局前置守卫）
- **滚动渐入动画**：自定义指令 `v-lazy` 实现元素进入视口时渐入（Vue 技术：自定义指令 + IntersectionObserver）
