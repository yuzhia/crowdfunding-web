<script setup lang="ts">
import { useCampaignStore } from '@/store'
import { startCampaign, searchCampaign } from '@/service'
import { timeDifference, getPercent } from '@/utils'
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

// 搜索
const searchVal = ref()
const searchFlag = ref(true)
const inputSearchRef = ref()
const searchResultBox = ref()
const searchResultFlag = ref(false)
const campaigns = ref<Array<ICampaign>>([])
onClickOutside(inputSearchRef, () => {
  if (!searchVal.value) {
    searchFlag.value = true
  }
})
onClickOutside(searchResultBox, () => {
  searchResultFlag.value = false
})

watch(searchVal, () => {
  if (searchVal.value) {
    searchCampaign(searchVal.value).then(res => {
      searchResultFlag.value = true
      campaigns.value = res.data
    })
  } else {
    searchResultFlag.value = false
  }
})

const clickSearchRes = (id: number) => {
  searchResultFlag.value = false
  searchVal.value = ''
  searchFlag.value = true
  router.push({ path: `/projects/${id}` })
}
</script>

<template>
  <div :class="campaignStore.initiate ? 'hidden' : ''">
    <header-avatar>
      <!-- 中间 -->
      <div class="w-full hidden sm:flex justify-between h-full">
        <div class="flex p-3 gap-6 items-center">
          <n-button ref="target" text @click="rotate = !rotate">
            <p class="btn-header">探索</p>
            <n-icon size="16">
              <i-ic-baseline-keyboard-arrow-down :class="rotate ? 'g' : 'a'" />
            </n-icon>
          </n-button>
          <n-button text>
            <p class="btn-header">We Do</p>
          </n-button>
          <n-button v-if="searchFlag" text @click="searchFlag = !searchFlag">
            <n-icon size="20">
              <i-ic-baseline-search class="align-middle" />
            </n-icon>
          </n-button>
          <div v-else ref="inputSearchRef">
            <n-input v-model:value="searchVal" placeholder="" :autofocus="true">
              <template #suffix>
                <n-button text>
                  <n-icon size="20">
                    <i-ic-baseline-search class="align-middle" />
                  </n-icon>
                </n-button>
              </template>
            </n-input>
            <div
              v-show="searchResultFlag"
              ref="searchResultBox"
              class="max-h-96 overflow-auto absolute top-16 w-96 border bg-white z-50 px-2 py-5 space-y-10 shadow-[0_4px_23px_1px_rgba(0,0,0,0.3)]"
            >
              <div
                v-if="campaigns.length == 0"
                class="flex flex-col items-center gap-2"
              >
                <img class="w-24 h-24" src="@/assets/img/empty_warning.png" />
                <p>没有找到相关的搜索结果！</p>
              </div>
              <!-- 活动 -->
              <div
                v-for="item in campaigns"
                :key="item.id"
                class="flex gap-3 mb-4 items-center cursor-pointer"
                @click="clickSearchRes(item.id as number)"
              >
                <img
                  class="w-20 h-20 rounded-sm shrink-0"
                  :src="item.coverUrl"
                  alt=""
                />
                <div class="flex flex-col gap-1">
                  <div class="text-base font-semibold text-[#282828]">
                    {{ item.title }}
                  </div>
                  <div class="text-xs">发起人：{{ item.user?.username }}</div>
                  <div class="text-xs">
                    <span
                      >{{ getPercent(item.collectedFunds, item.goal) }}% funded
                    </span>
                    <span>{{ timeDifference(item.endTime) }}剩余</span>
                  </div>
                </div>
              </div>

              <!-- 用户 -->
              <!-- <div class="w-full flex mb-3 items-center cursor-pointer">
                <n-avatar round size="large" src="" />
                <div class="font-bold text-base ml-2 grow">路途</div>
              </div> -->

              <n-button v-if="campaigns.length > 10" class="w-full"
                >查看所有结果</n-button
              >
            </div>
          </div>
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
