/**
 * API 层 - 预留接口
 * 当前为纯前端项目，API 层预留用于后续对接后端服务
 */
import axios from 'axios'
import createLogger from '@/utils/logger'

const log = createLogger('API')

const request = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
})

// 请求拦截器
request.interceptors.request.use(
  (config) => {
    log.debug('发起请求', { url: config.url, method: config.method })
    return config
  },
  (error) => {
    log.error('请求拦截器错误', { message: error.message })
    return Promise.reject(error)
  }
)

// 响应拦截器
request.interceptors.response.use(
  (response) => {
    log.debug('请求成功', { url: response.config?.url, status: response.status })
    return response.data
  },
  (error) => {
    log.error('API 请求失败', { message: error.message, url: error.config?.url })
    return Promise.reject(error)
  }
)

export default request
