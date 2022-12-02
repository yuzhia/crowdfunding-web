import { AddRouteRecordRaw } from '../index'

export default [
  {
    path: '/',
    component: () => import('@/layouts/index.vue'),
    name: 'main',
    meta: { title: '微筹' },
    redirect: { path: '/index' },
    children: [
      {
        path: 'index',
        name: 'index',
        meta: {
          title: '主页'
        },
        component: () => import('@/views/index/index.vue')
      },
      {
        path: '/discover',
        name: 'discover',
        meta: {
          title: '发现'
        },
        component: () => import('@/views/discover/index.vue')
      },
      {
        path: '/projects/:id',
        name: 'projects',
        meta: {
          title: '项目'
        },
        component: () => import('@/views/projects/index.vue')
      },
      {
        path: '/projects/:id/perks',
        name: 'projects-perks',
        meta: {
          title: '回报列表'
        },
        component: () => import('@/views/projects/perks.vue')
      },
      {
        path: '/projects/:id/updates',
        name: 'projects-updates',
        meta: {
          title: '更新'
        },
        component: () => import('@/views/activity/updates.vue')
      },
      {
        path: '/pay',
        name: 'pay',
        meta: {
          title: '支付'
        },
        component: () => import('@/views/pay.vue')
      },
      {
        path: '/order',
        name: 'order',
        component: () => import('@/views/order/index.vue')
      },
      {
        path: '/checkout',
        name: 'checkout',
        component: () => import('@/views/order/checkout.vue')
      },
      {
        path: '/success',
        name: 'success',
        meta: {
          title: '支付成功'
        },
        component: () => import('@/views/success.vue')
      },
      {
        path: '/initiate/:id',
        name: 'initiate',
        component: () => import('@/views/initiate/index.vue'),
        redirect: { name: 'base' },
        children: [
          {
            path: 'base',
            name: 'base',
            meta: {
              title: '基础信息'
            },
            component: () => import('@/views/initiate/base.vue')
          },
          {
            path: 'detail',
            name: 'detail',
            meta: {
              title: '详情编辑'
            },
            component: () => import('@/views/initiate/detail/detail.vue')
          },
          {
            path: 'perks',
            name: 'perks',
            meta: {
              title: '设置回报'
            },
            component: () => import('@/views/initiate/perks.vue')
          },
          {
            path: 'goals',
            name: 'goals',
            meta: {
              title: '众筹目标'
            },
            component: () => import('@/views/initiate/goals.vue')
          },
          {
            path: 'rewards',
            name: 'rewards',
            meta: {
              title: '回报'
            },
            component: () => import('@/views/initiate/rewards.vue')
          }
        ]
      },
      {
        path: '/activity',
        component: () => import('@/views/activity/index.vue'),
        meta: {
          requireLogin: true
        },
        children: [
          {
            path: '',
            name: 'campaigns',
            meta: {
              title: '活动'
            },
            component: () => import('@/views/activity/campaigns.vue')
          },
          {
            path: 'backers',
            name: 'backers',
            meta: {
              title: '支持'
            },
            component: () => import('@/views/activity/backers.vue')
          },
          {
            path: 'follows',
            name: 'follows',
            meta: {
              title: '关注'
            },
            component: () => import('@/views/activity/follows.vue')
          }
        ]
      },
      {
        path: '/settings',
        component: () => import('@/views/settings/index.vue'),
        meta: {
          requireLogin: true
        },
        children: [
          {
            path: '',
            name: 'profile',
            meta: {
              title: '个人资料'
            },
            component: () => import('@/views/settings/profile.vue')
          },
          {
            path: 'account',
            name: 'account',
            meta: {
              title: '账户'
            },
            component: () => import('@/views/settings/account.vue')
          },
          {
            path: 'address',
            name: 'address',
            meta: {
              title: '地址'
            },
            component: () => import('@/views/settings/address.vue')
          },
          {
            path: 'notifications',
            name: 'notifications',
            meta: {
              title: '通知'
            },
            component: () => import('@/views/settings/notifications.vue')
          }
        ]
      }
    ]
  }
] as AddRouteRecordRaw[]
