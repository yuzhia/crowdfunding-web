import { AddRouteRecordRaw } from '../index'

export default [
  {
    path: '/login',
    name: 'login',
    meta: {
      title: '登录'
    },
    component: () => import('@/views/login.vue')
  },
  {
    path: '/:pathMatch(.*)', // 或者 /:pathMatch(.*)*
    name: '404',
    hidden: false, // 自定义添加的属性
    meta: {
      title: '404'
    },
    component: () => import('@/views/404.vue')
  }
] as AddRouteRecordRaw[]
