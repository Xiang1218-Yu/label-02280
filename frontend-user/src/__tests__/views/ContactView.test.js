import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import ContactView from '@/views/ContactView.vue'
import { useMessageStore } from '@/stores/message'

// Mock Element Plus
vi.mock('element-plus', () => ({
  ElMessage: Object.assign(vi.fn(), { success: vi.fn(), warning: vi.fn() }),
  ElNotification: vi.fn()
}))

const ElIcon = { template: '<span class="el-icon"><slot /></span>' }
const ElTag = { template: '<span class="el-tag"><slot /></span>', props: ['effect', 'round'] }
const ElButton = { template: '<button class="el-button"><slot /></button>', props: ['type', 'size', 'round', 'loading'] }
const ElInput = { template: '<input class="el-input" />', props: ['modelValue', 'placeholder', 'prefixIcon', 'size', 'type', 'rows', 'maxlength', 'showWordLimit'] }
const ElSelect = { template: '<select class="el-select"><slot /></select>', props: ['modelValue', 'placeholder', 'size'] }
const ElOption = { template: '<option class="el-option" />', props: ['label', 'value'] }
const ElForm = {
  template: '<form class="el-form"><slot /></form>',
  props: ['model', 'rules', 'labelPosition'],
  methods: { validate: vi.fn().mockResolvedValue(true), resetFields: vi.fn() }
}
const ElFormItem = { template: '<div class="el-form-item"><slot /></div>', props: ['label', 'prop'] }

const stubs = {
  ElIcon, ElTag, ElButton, ElInput, ElSelect, ElOption, ElForm, ElFormItem,
  ChatDotRound: { template: '<i />' },
  EditPen: { template: '<i />' },
  Location: { template: '<i />' },
  Message: { template: '<i />' },
  Phone: { template: '<i />' },
  Clock: { template: '<i />' },
  Link: { template: '<i />' },
  Share: { template: '<i />' },
  User: { template: '<i />' },
  Promotion: { template: '<i />' }
}

describe('ContactView 联系我', () => {
  let pinia

  beforeEach(() => {
    pinia = createPinia()
    setActivePinia(pinia)
  })

  function createWrapper() {
    return mount(ContactView, {
      global: {
        plugins: [pinia],
        stubs,
        directives: { lazy: {} }
      }
    })
  }

  it('应渲染联系页面', () => {
    const wrapper = createWrapper()
    expect(wrapper.find('.contact-page').exists()).toBe(true)
  })

  it('应显示页面标题', () => {
    const wrapper = createWrapper()
    expect(wrapper.text()).toContain('联系')
  })

  it('应显示联系信息卡片', () => {
    const wrapper = createWrapper()
    const infoCards = wrapper.findAll('.info-card')
    expect(infoCards.length).toBe(4)
  })

  it('联系信息应包含地址、邮箱、电话、工作时间', () => {
    const wrapper = createWrapper()
    const text = wrapper.text()
    expect(text).toContain('地址')
    expect(text).toContain('邮箱')
    expect(text).toContain('电话')
    expect(text).toContain('工作时间')
  })

  it('应显示联系表单', () => {
    const wrapper = createWrapper()
    expect(wrapper.find('.el-form').exists()).toBe(true)
  })

  it('表单应有姓名、邮箱、主题、内容字段', () => {
    const wrapper = createWrapper()
    const formItems = wrapper.findAll('.el-form-item')
    expect(formItems.length).toBeGreaterThanOrEqual(4)
  })

  it('应显示留言板区域', () => {
    const wrapper = createWrapper()
    expect(wrapper.find('.guestbook-section').exists()).toBe(true)
  })

  it('留言板应显示预设留言', () => {
    const wrapper = createWrapper()
    const store = useMessageStore()
    const cards = wrapper.findAll('.guestbook-card')
    expect(cards.length).toBe(store.messages.length)
  })

  it('留言卡片应有头像、名字、日期、内容', () => {
    const wrapper = createWrapper()
    const firstCard = wrapper.findAll('.guestbook-card')[0]
    expect(firstCard.find('.msg-avatar').exists()).toBe(true)
    expect(firstCard.find('.msg-name').exists()).toBe(true)
    expect(firstCard.find('.msg-date').exists()).toBe(true)
    expect(firstCard.find('p').exists()).toBe(true)
  })

  it('头像应显示名字首字', () => {
    const wrapper = createWrapper()
    const store = useMessageStore()
    const avatar = wrapper.findAll('.msg-avatar')[0]
    expect(avatar.text()).toBe(store.messages[0].name.charAt(0))
  })
})
