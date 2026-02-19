import { describe, it, expect } from 'vitest'
import axios from 'axios'

describe('API 请求模块', () => {
  it('axios 应已导入', () => {
    expect(axios).toBeDefined()
    expect(typeof axios.create).toBe('function')
  })

  it('创建的实例应有拦截器', () => {
    const instance = axios.create({
      baseURL: '/api',
      timeout: 10000,
      headers: { 'Content-Type': 'application/json' }
    })
    expect(instance.interceptors).toBeDefined()
    expect(instance.interceptors.request).toBeDefined()
    expect(instance.interceptors.response).toBeDefined()
  })

  it('请求拦截器应可注册', () => {
    const instance = axios.create({ baseURL: '/api' })
    const id = instance.interceptors.request.use(
      (config) => config,
      (error) => Promise.reject(error)
    )
    expect(typeof id).toBe('number')
  })

  it('响应拦截器应可注册', () => {
    const instance = axios.create({ baseURL: '/api' })
    const id = instance.interceptors.response.use(
      (response) => response.data,
      (error) => Promise.reject(error)
    )
    expect(typeof id).toBe('number')
  })

  it('默认导出的 request 实例应可用', async () => {
    const request = (await import('@/api/index.js')).default
    expect(request).toBeDefined()
    expect(typeof request.get).toBe('function')
    expect(typeof request.post).toBe('function')
    expect(typeof request.put).toBe('function')
    expect(typeof request.delete).toBe('function')
  })
})
