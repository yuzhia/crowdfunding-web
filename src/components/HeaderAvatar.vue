<script setup lang="ts">
import { useUserStore } from '@/store'

const userStore = useUserStore()
const router = useRouter()

// 选择
const options = [
  { label: '我的活动', key: 'campaigns' },
  { label: '个人资料', key: 'profile' },
  { label: '退出登录', key: 'logout' }
]
const handleSelect = (key: string | number) => {
  if (key == 'logout') {
    userStore.$reset()
    router.push('/login')
  } else if (key == 'campaigns') {
    router.push('/activity')
  } else {
    router.push('/settings')
  }
}

const jumpLogin = () => {
  router.push('/login')
}
</script>

<template>
  <div class="w-full flex justify-between h-16 px-2 md:px-8 border-b">
    <!-- logo -->
    <div class="h-full flex items-center">
      <n-button text class="p-3" @click="router.push('/')">
        <div class="flex">
          <n-icon size="39">
            <img src="@/assets/img/logo.png" />
          </n-icon>
          <div class="text-3xl font-semibold ml-3 text-green-500">微筹</div>
        </div>
      </n-button>
    </div>
    <slot></slot>

    <!-- 头像 -->
    <div class="flex items-center shrink-0">
      <div class="hidden sm:block px-3">
        <div class="h-6 py-3 border-l text-gray-400"></div>
      </div>
      <n-button v-if="!userStore.token" text class="p-3" @click="jumpLogin">
        <p class="btn-header">登录</p>
      </n-button>
      <n-dropdown
        v-else
        trigger="hover"
        :options="options"
        @select="handleSelect"
      >
        <n-button text class="p-3">
          <img
            v-if="!userStore.user.avatar"
            src="@/assets/img/avatar.svg"
            class="rounded-full w-7 h-7 border"
          />
          <n-avatar v-else round size="small" :src="userStore.user.avatar" />
          <span class="btn-header ml-2">{{ userStore.user.username }}</span>
        </n-button>
      </n-dropdown>
    </div>
  </div>
</template>

<style scoped>
.a {
  transition: all 150ms;
}

.g {
  transform: rotate(-180deg);
  transition: all 150ms;
}
</style>
