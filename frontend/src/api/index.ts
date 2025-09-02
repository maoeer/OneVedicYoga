import axios from 'axios'
import type { AxiosInstance, InternalAxiosRequestConfig, AxiosResponse } from 'axios'

const service: AxiosInstance = axios.create({
  baseURL: '/api',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json;charset=utf-8'
  }
})

// 请求拦截器
service.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  return config
}, (error) => {
  console.log(error)
})

// 响应拦截器
service.interceptors.response.use((config: AxiosResponse) => {
  return config
}, (error) => {
  console.log(error)
})

export default service