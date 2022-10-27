import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import viewsRouter from './views'
import pageRouter from './page'

// 对RouteRecordRaw类型进行扩展
export type AddRouteRecordRaw = RouteRecordRaw & {
  hidden?: boolean
}

const router = createRouter({
  history: createWebHistory(),
  routes: [...viewsRouter, ...pageRouter] as AddRouteRecordRaw[],
  scrollBehavior() {
    return { top: 0 }
  }
})

export default router
