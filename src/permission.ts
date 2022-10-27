import router from './router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { useTitle } from '@vueuse/core'
import { useUserStore } from '@/store'

NProgress.configure({ showSpinner: false })

const whiteList = ['as']

router.beforeEach(async (to, from) => {
  NProgress.start()
  useTitle((to.meta.title as string) || '微筹')
  const userStore = useUserStore()
  const token = userStore.token
  const userInfo = userStore.user

  // 需要登录，没有token
  if (to.meta.requireLogin && !token) {
    return { name: 'login' }
  }
  if (to.meta.requireLogin && token) {
    if (!userInfo.id) {
      userStore.getUserInfo()
    }
  }
  NProgress.done()
})

// router.beforeEach(async (to, from, next) => {
//   NProgress.start()
//   // 设置标题
//   useTitle((to.meta.title as string) || '微筹')

//   const userStore = useUserStore()

//   // if (to.meta.requiresAuth && !mainStore.user) {
//   //   return { path: '/login', query: { redirect: to.fullPath } }
//   // }

//   const hasToken = userStore.token

//   if (hasToken) {
//     if (to.path === '/login') {
//       next({ path: '/' })
//       NProgress.done()
//     } else {
//       const hasGetUserInfo = userStore.user
//       if (hasGetUserInfo) {
//         next()
//       } else {
//         try {
//           // await store.dispatch('user/getInfo')

//           next()
//         } catch (error) {
//           // await store.dispatch('user/resetToken')
//           // TODO 错误消息
//           // ElMessage.error(error || 'Has Error')
//           next(`/login?redirect=${to.path}`)
//           NProgress.done()
//         }
//       }
//     }
//   } else {
//     /* has no token*/

//     // 黑名单
//     if (whiteList.indexOf(to.path) == -1) {
//       next()
//     } else {
//       next(`/login?redirect=${to.path}`)
//       NProgress.done()
//     }
//   }
// })

// router.afterEach(() => {
//   NProgress.done()
// })
