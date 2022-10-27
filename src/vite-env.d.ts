/// <reference types="vite/client" />

import 'vue-router'
// 引入naive对应的定义类型
import type { DialogApiInjection } from 'naive-ui/lib/dialog/src/DialogProvider'
import type { MessageApiInjection } from 'naive-ui/lib/message/src/MessageProvider'

declare module 'vue-router' {
  export interface RouteMeta {
    title: string
    requiresAuth?: boolean
  }
}

declare global {
  export interface Window {
    $message: MessageApiInjection
    $dialog: DialogApiInjection
  }
}

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}
