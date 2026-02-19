<template>
  <!--
    联系我 - ContactView
    Vue 技术点：v-model 双向绑定 + Element Plus 表单验证 + ref 模板引用
  -->
  <div class="contact-page">
    <section class="contact-hero">
      <div class="container">
        <h1 class="section-title">联系<span class="highlight">我</span></h1>
        <p class="section-subtitle">有任何问题或合作意向，欢迎联系</p>
      </div>
    </section>

    <section class="contact-content">
      <div class="container">
        <div class="contact-grid">
          <!-- 联系信息 -->
          <div class="contact-info fade-in" v-lazy>
            <div class="info-label">
              <el-icon><ChatDotRound /></el-icon>
              <span>联系方式</span>
            </div>
            <h2>保持联系</h2>
            <p class="info-desc">无论是项目合作、技术交流还是简单的问候，我都很乐意收到你的消息。</p>

            <div class="info-cards">
              <div class="info-card" v-for="info in contactInfo" :key="info.label">
                <div class="info-icon" :style="{ background: info.bg }">
                  <el-icon :size="22"><component :is="info.icon" /></el-icon>
                </div>
                <div>
                  <h4>{{ info.label }}</h4>
                  <p>{{ info.value }}</p>
                </div>
              </div>
            </div>

          </div>

          <!-- 联系表单 -->
          <div class="contact-form-wrapper fade-in" v-lazy>
            <div class="form-label">
              <el-icon><EditPen /></el-icon>
              <span>在线留言</span>
            </div>
            <h2>发送消息</h2>
            <el-form
              ref="formRef"
              :model="formData"
              :rules="formRules"
              label-position="top"
              class="contact-form"
            >
              <el-form-item label="姓名" prop="name">
                <el-input
                  v-model="formData.name"
                  placeholder="请输入您的姓名"
                  :prefix-icon="User"
                  size="large"
                />
              </el-form-item>

              <el-form-item label="邮箱" prop="email">
                <el-input
                  v-model="formData.email"
                  placeholder="请输入您的邮箱"
                  :prefix-icon="Message"
                  size="large"
                />
              </el-form-item>

              <el-form-item label="主题" prop="subject">
                <el-select v-model="formData.subject" placeholder="请选择主题" size="large" style="width: 100%">
                  <el-option label="项目合作" value="合作" />
                  <el-option label="技术交流" value="技术" />
                  <el-option label="工作机会" value="工作" />
                  <el-option label="其他" value="其他" />
                </el-select>
              </el-form-item>

              <el-form-item label="留言内容" prop="content">
                <el-input
                  v-model="formData.content"
                  type="textarea"
                  :rows="5"
                  placeholder="请输入您的留言内容..."
                  maxlength="500"
                  show-word-limit
                />
              </el-form-item>

              <el-form-item>
                <el-button
                  type="primary"
                  size="large"
                  round
                  :loading="submitting"
                  @click="handleSubmit"
                  style="width: 100%"
                >
                  <el-icon v-if="!submitting"><Promotion /></el-icon>
                  {{ submitting ? '发送中...' : '发送消息' }}
                </el-button>
              </el-form-item>
            </el-form>
          </div>
        </div>

        <!-- 留言板 -->
        <div class="guestbook-section">
          <h2 class="section-title">留言<span class="highlight">板</span></h2>
          <p class="section-subtitle">来自访客的留言</p>
          <div class="guestbook-grid">
            <div
              v-for="msg in messageStore.messages"
              :key="msg.id"
              class="guestbook-card fade-in"
              v-lazy
            >
              <div class="msg-avatar">{{ msg.name.charAt(0) }}</div>
              <div class="msg-content">
                <div class="msg-header">
                  <span class="msg-name">{{ msg.name }}</span>
                  <span class="msg-date">{{ msg.date }}</span>
                </div>
                <p>{{ msg.content }}</p>
              </div>
            </div>
          </div>
          <div v-if="messageStore.messages.length === 0" class="empty-guestbook">
            <el-icon :size="48"><ChatDotRound /></el-icon>
            <p>暂无留言，快来留下第一条吧</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { ElMessage, ElNotification } from 'element-plus'
import { User, Message } from '@element-plus/icons-vue'
import { useMessageStore } from '@/stores/message'
import createLogger from '@/utils/logger'

const log = createLogger('ContactView')

const messageStore = useMessageStore()

const formRef = ref(null)
const submitting = ref(false)

const formData = reactive({
  name: '',
  email: '',
  subject: '',
  content: ''
})

const formRules = {
  name: [
    { required: true, message: '请输入姓名', trigger: 'blur' },
    { min: 2, max: 20, message: '姓名长度在 2 到 20 个字符', trigger: 'blur' }
  ],
  email: [
    { required: true, message: '请输入邮箱', trigger: 'blur' },
    { type: 'email', message: '请输入正确的邮箱格式', trigger: 'blur' }
  ],
  subject: [
    { required: true, message: '请选择主题', trigger: 'change' }
  ],
  content: [
    { required: true, message: '请输入留言内容', trigger: 'blur' },
    { min: 10, max: 500, message: '内容长度在 10 到 500 个字符', trigger: 'blur' }
  ]
}

async function handleSubmit() {
  try {
    await formRef.value.validate()
    submitting.value = true
    log.info('表单提交中', { name: formData.name, subject: formData.subject })

    await new Promise(resolve => setTimeout(resolve, 1500))

    messageStore.addMessage({
      name: formData.name,
      email: formData.email,
      content: formData.content
    })

    log.info('留言提交成功', { name: formData.name })
    ElNotification({
      title: '发送成功',
      message: `感谢 ${formData.name} 的留言，我会尽快回复您！`,
      type: 'success',
      duration: 3000
    })

    formRef.value.resetFields()
  } catch {
    log.warn('表单验证失败')
    ElMessage.warning('请检查表单填写是否完整')
  } finally {
    submitting.value = false
  }
}

const contactInfo = [
  { icon: 'Location', label: '地址', value: '中国 · 北京', bg: 'linear-gradient(135deg, #6C63FF, #8B83FF)' },
  { icon: 'Message', label: '邮箱', value: 'alex@example.com', bg: 'linear-gradient(135deg, #FF6584, #FF8FA3)' },
  { icon: 'Phone', label: '电话', value: '+86 138-0000-0000', bg: 'linear-gradient(135deg, #00C9A7, #00E4BF)' },
  { icon: 'Clock', label: '工作时间', value: '周一至周五 9:00-18:00', bg: 'linear-gradient(135deg, #FFC75F, #FFD97D)' }
]

</script>

<style lang="scss" scoped>
@use '@/assets/styles/variables' as *;

.contact-hero {
  padding: $spacing-3xl 0 $spacing-xl;
  background: linear-gradient(160deg, #F8F9FE, #EDE9FE, #F0E6FF);
  .dark-mode & { background: linear-gradient(160deg, #0F0E17, #1A1A2E, #16213E); }
}

.contact-content { padding: $spacing-xl 0 $spacing-3xl; }

.contact-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: $spacing-3xl;
  margin-bottom: $spacing-3xl;
  @media (max-width: $breakpoint-md) { grid-template-columns: 1fr; }
}

.info-label, .form-label {
  display: inline-flex;
  align-items: center;
  gap: $spacing-xs;
  padding: 4px 12px;
  background: rgba($color-primary, 0.08);
  border-radius: 50px;
  font-size: $font-size-xs;
  color: $color-primary;
  font-weight: 500;
  margin-bottom: $spacing-md;
}

.contact-info {
  h2 { font-size: $font-size-xl; margin-bottom: $spacing-md; }
  .info-desc { color: $text-secondary; line-height: 1.8; margin-bottom: $spacing-xl; .dark-mode & { color: $text-light; } }
}

.info-cards { display: flex; flex-direction: column; gap: $spacing-md; margin-bottom: $spacing-xl; }

.info-card {
  display: flex;
  align-items: center;
  gap: $spacing-md;
  padding: $spacing-md;
  background: white;
  border-radius: $radius-lg;
  box-shadow: $shadow-card;
  transition: all $transition-spring;
  border: 1px solid transparent;
  .dark-mode & { background: $bg-dark-card; }
  &:hover { box-shadow: $shadow-hover; transform: translateX(6px); border-color: rgba($color-primary, 0.12); }
  .info-icon {
    width: 48px;
    height: 48px;
    border-radius: $radius-md;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    flex-shrink: 0;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
  h4 { font-size: $font-size-sm; margin-bottom: 2px; }
  p { font-size: $font-size-sm; color: $text-secondary; .dark-mode & { color: $text-light; } }
}



.contact-form-wrapper {
  background: white;
  border-radius: $radius-xl;
  padding: $spacing-xl;
  box-shadow: $shadow-card;
  border: 1px solid rgba($color-primary, 0.06);
  .dark-mode & { background: $bg-dark-card; border-color: rgba(255, 255, 255, 0.05); }
  h2 { font-size: $font-size-xl; margin-bottom: $spacing-lg; }
}

// ========== 留言板 ==========
.guestbook-section { text-align: center; }

.guestbook-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: $spacing-lg;
  margin-top: $spacing-xl;
  text-align: left;
  @media (max-width: $breakpoint-md) { grid-template-columns: 1fr; }
}

.guestbook-card {
  display: flex;
  gap: $spacing-md;
  background: white;
  border-radius: $radius-lg;
  padding: $spacing-lg;
  box-shadow: $shadow-card;
  transition: all $transition-spring;
  border: 1px solid transparent;
  .dark-mode & { background: $bg-dark-card; }
  &:hover { box-shadow: $shadow-hover; transform: translateY(-3px); border-color: rgba($color-primary, 0.12); }
}

.msg-avatar {
  width: 44px;
  height: 44px;
  border-radius: $radius-round;
  background: linear-gradient(135deg, $color-primary, $color-accent);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 700;
  font-size: $font-size-md;
  flex-shrink: 0;
  box-shadow: 0 4px 12px rgba($color-primary, 0.3);
}

.msg-content {
  flex: 1;
  .msg-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: $spacing-sm;
  }
  .msg-name { font-weight: 600; font-size: $font-size-sm; }
  .msg-date { font-size: $font-size-xs; color: $text-light; }
  p { font-size: $font-size-sm; color: $text-secondary; line-height: 1.7; .dark-mode & { color: $text-light; } }
}

.empty-guestbook {
  padding: $spacing-3xl;
  color: $text-light;
  p { margin-top: $spacing-md; font-size: $font-size-sm; }
}
</style>
