import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'

// 定义路由规则
const routes: Array<RouteRecordRaw> = [{
  path: '/',
  component: () => import('@/views/Home.vue')
}, {
  path: '/auth',
  component: () => import('@/views/Auth.vue')
}]

// 创建路由实例
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router