<script setup lang="ts">
import { useCampaignStore } from '@/store'
import { startCampaign } from '@/service'
import HeaderAvatar from '@/components/HeaderAvatar.vue'
import { onClickOutside } from '@vueuse/core'

const campaignStore = useCampaignStore()
const router = useRouter()

// 翻转箭头
const rotate = ref(false)
const target = ref(null)

onClickOutside(target, () => {
  rotate.value = false
})

// 开展项目
const clickStartCampaign = () => {
  startCampaign().then(res => {
    router.push(`/initiate/${res.data.id}`)
  })
}

// 抽屉
</script>

<template>
  <div :class="campaignStore.initiate ? 'hidden' : ''">
    <header-avatar>
      <!-- 中间 -->
      <div class="w-full hidden sm:flex justify-between h-full">
        <div class="flex">
          <n-button ref="target" text class="p-3" @click="rotate = !rotate">
            <p class="btn-header">探索</p>
            <n-icon size="16">
              <i-ic-baseline-keyboard-arrow-down :class="rotate ? 'g' : 'a'" />
            </n-icon>
          </n-button>
          <n-button text class="p-3">
            <p class="btn-header">We Do</p>
          </n-button>
          <n-button text class="p-3">
            <n-icon size="20">
              <i-ic-baseline-search class="align-middle" />
            </n-icon>
          </n-button>
        </div>
        <div class="flex">
          <n-button text class="p-3" @click="clickStartCampaign">
            <p class="btn-header">开展项目</p>
          </n-button>
        </div>
      </div>
    </header-avatar>

    <!-- 接受抽屉 -->
    <!-- <div id="drawer-target" class="absolute w-full h-[250px] overflow-hidden" /> -->
    <!-- 显示抽屉 -->
    <n-drawer
      :show="false"
      placement="top"
      to="#drawer-target"
      :height="250"
      :width="200"
    >
      <div class="max-w-screen-lg mx-auto flex">
        <div class="flex w-full py-8">
          <div class="p-3 w-[40%]">
            <router-link to="/" class="block">
              <div class="text-sm font-semibold mb-2">Explore All Projects</div>
              <div
                class="flex h-24 w-full bg-gray-100 items-center justify-center hover:text-green-500"
              >
                <p class="w-[58%] font-semibold text-xl text-center">
                  Clever Things For Curious Humans™
                </p>
              </div>
            </router-link>
          </div>
          <div class="p-3 grow">
            <router-link to="/" class="block">
              <div class="text-sm font-semibold mb-2">Our Top 10 Finds</div>
              <div
                class="flex h-24 w-full bg-gray-100 items-center justify-center hover:text-green-500"
              />
            </router-link>
          </div>
          <div class="p-3 grow">
            <router-link to="/" class="block">
              <div class="text-sm font-semibold mb-2">Team Favorites</div>
              <div
                class="flex h-24 w-full bg-gray-100 items-center justify-center hover:text-green-500"
              />
            </router-link>
          </div>
          <div class="p-3 grow">
            <router-link to="/" class="block">
              <div class="text-sm font-semibold mb-2">Spend Under $100</div>
              <div
                class="flex h-24 w-full bg-gray-100 items-center justify-center hover:text-green-500"
              />
            </router-link>
          </div>
          <div class="p-3 grow">
            <router-link to="/" class="block">
              <div class="text-sm font-semibold mb-2">Join the Convo</div>
              <div
                class="flex h-24 w-full bg-gray-100 items-center justify-center hover:text-green-500"
              />
            </router-link>
          </div>
        </div>
      </div>
    </n-drawer>
  </div>
</template>

<style>
.btn-header {
  @apply font-bold text-sm;
}
.a {
  transition: all 150ms;
}

.g {
  transform: rotate(-180deg);
  transition: all 150ms;
}
</style>
