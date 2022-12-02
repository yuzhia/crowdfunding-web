<script setup name="initiate" lang="ts">
import { useCampaignStore } from '@/store'
import { saveDraft, getCampaign, submitCheck } from '@/service'

const initCampaign: ICampaign = {
  title: '',
  description: '',
  coverUrl: '',
  status: '',
  story: '',
  faqs: [],
  assets: [],
  perks: []
}

const campaignStore = useCampaignStore()
const router = useRouter()
const route = useRoute()
const campaign = ref<ICampaign>(initCampaign)

provide('campaign', campaign)

getCampaign(route.params.id).then(res => {
  campaign.value = res.data
  campaignStore.currentStatus = campaign.value.status
})

onMounted(() => {
  campaignStore.initiate = true
})

onUnmounted(() => {
  campaignStore.initiate = false
  campaignStore.currentStatus = ''
})

const saveBtn = () => {
  saveDraft(campaign.value).then(() => {
    window.$message.success('保存成功')
  })
}

const submitBtn = () => {
  submitCheck(campaign.value).then(() => {
    window.$message.success('提交成功')
  })
}

const updateBtn = () => {
  submitCheck(campaign.value).then(() => {
    saveDraft(campaign.value).then(() => {
      window.$message.success('更新成功')
    })
  })
}

const jumpRouter = (name: string) => {
  router.push({ name })
}

const getNextStep = () => {
  // if (route.name == 'base') {
  //   router.push({ name: 'detail' })
  // } else if (route.name == 'detail') {
  //   router.push({ name: 'perks' })
  // } else if (route.name == 'perks') {
  //   router.push({ name: 'goals' })
  // } else if (route.name == 'goals') {
  //   router.push({ name: 'member' })
  // } else if (route.name == 'member') {
  //   router.push({ name: 'promotion' })
  // }
  const stepIndex = steps.findIndex(item => item.name == route.name)
  if (stepIndex !== -1 && stepIndex !== steps.length - 1) {
    router.push({ name: steps[stepIndex + 1].name })
  }
}

const getNextStepText = () => {
  const stepIndex = steps.findIndex(item => item.name == route.name)
  if (stepIndex !== -1 && stepIndex !== steps.length - 1) {
    return steps[stepIndex + 1].text
  }
  return '结束'
}

const steps = [
  { name: 'base', icon: '✍️', text: '基本' },
  { name: 'detail', icon: '📖', text: '内容' },
  { name: 'perks', icon: '🎁', text: '回报' },
  { name: 'goals', icon: '💰', text: '目标' },
  { name: 'rewards', icon: '💰', text: '测试回报' }
  // { name: 'member', icon: '👥', text: '团队' },
  // { name: 'promotion', icon: '📢', text: '推广' }
]

// const isRewardEdit = ref(false)

// watch(
//   () => isRewardEdit,
//   () => {
//     console.log(isRewardEdit.value)
//   }
// )
const isRewardEdit = ref(false)
const rewardEdit = (flag: boolean) => {
  isRewardEdit.value = flag
}
</script>

<template>
  <div>
    <!-- 导航栏 -->
    <div class="fixed bg-white top-0 z-10 w-full flex justify-between h-16 border-b">
      <header-avatar>
        <div v-if="!isRewardEdit" class="w-full flex justify-end items-center">
          <div
            v-if="campaignStore.initiate && campaignStore.currentStatus == '草稿'"
            class="flex space-x-4"
          >
            <n-button type="primary" ghost class="p-3" @click="submitBtn"> 提交审核 </n-button>
            <n-button type="primary" ghost class="p-3" @click="saveBtn"> 保存 </n-button>
          </div>
          <div v-else>
            <n-button type="primary" ghost class="p-3" @click="updateBtn"> 更新 </n-button>
          </div>

          <n-button type="primary" class="p-3 ml-4" @click="getNextStep">
            下一步：{{ getNextStepText() }}
          </n-button>
        </div>
        <div v-else class="w-full flex justify-end items-center">
          <n-button type="primary" ghost class="p-3" @click="updateBtn"> 取消 </n-button>
          <n-button type="primary" class="p-3 ml-4" @click="getNextStep"> 保存 </n-button>
        </div>
      </header-avatar>
    </div>
    <nav class="w-full shadow-md mt-16">
      <div class="max-w-7xl sm:px-10 mx-auto">
        <div class="flex h-20 sm:mx-10 md:mx-24">
          <div
            v-for="item in steps"
            :key="item.name"
            class="flex items-center h-full justify-center flex-1"
            :class="route.name == item.name ? 'border-b-2 border-[#05CE78]' : ''"
            @click="jumpRouter(item.name)"
          >
            <button class="border-none w-full h-full text-center">
              <div :class="route.name == item.name ? 'scale-150' : ''">
                {{ item.icon }}
              </div>
              <div :class="route.name == item.name ? 'text-green-500' : ''">
                {{ item.text }}
              </div>
            </button>
          </div>
          <!-- <div
            class="flex items-center h-full justify-center flex-1"
            :class="route.name == 'detail' ? 'border-b-2 border-[#05CE78]' : ''"
            @click="jumpRouter('detail')"
          >
            <button class="border-none w-full h-full text-center">
              <div :class="route.name == 'detail' ? 'scale-150' : ''">📖</div>
              <div :class="route.name == 'detail' ? 'text-green-500' : ''">
                内容
              </div>
            </button>
          </div>
          <div
            class="flex items-center h-full justify-center flex-1"
            :class="route.name == 'perks' ? 'border-b-2 border-[#05CE78]' : ''"
            @click="jumpRouter('perks')"
          >
            <button class="border-none w-full h-full text-center">
              <div :class="route.name == 'perks' ? 'scale-150' : ''">🎁</div>
              <div :class="route.name == 'perks' ? 'text-green-500' : ''">
                回报
              </div>
            </button>
          </div>
          <div
            class="flex items-center h-full justify-center flex-1"
            :class="route.name == 'goals' ? 'border-b-2 border-[#05CE78]' : ''"
            @click="jumpRouter('goals')"
          >
            <button class="border-none w-full h-full text-center">
              <div :class="route.name == 'goals' ? 'scale-150' : ''">💰</div>
              <div :class="route.name == 'goals' ? 'text-green-500' : ''">
                目标
              </div>
            </button>
          </div>
          <div
            class="flex items-center h-full justify-center flex-1"
            :class="route.name == 'member' ? 'border-b-2 border-[#05CE78]' : ''"
            @click="jumpRouter('member')"
          >
            <button class="border-none w-full h-full text-center">
              <div :class="route.name == 'member' ? 'scale-150' : ''">👥</div>
              <div :class="route.name == 'member' ? 'text-green-500' : ''">
                团队
              </div>
            </button>
          </div>
          <div
            class="flex items-center h-full justify-center flex-1"
            :class="
              route.name == 'promotion' ? 'border-b-2 border-[#05CE78]' : ''
            "
            @click="jumpRouter('promotion')"
          >
            <button class="border-none w-full h-full text-center">
              <div :class="route.name == 'promotion' ? 'scale-150' : ''">
                📢
              </div>
              <div :class="route.name == 'promotion' ? 'text-green-500' : ''">
                推广
              </div>
            </button>
          </div> -->
        </div>
      </div>
    </nav>

    <div v-if="campaign.id" class="max-w-screen-xl mx-auto py-10 px-4 md:px-16">
      <router-view v-slot="{ Component }">
        <keep-alive>
          <component :is="Component" @reward-edit="rewardEdit" />
        </keep-alive>
      </router-view>
      <div class="flex justify-end mt-10">
        <n-button type="primary" @click="getNextStep">下一步：{{ getNextStepText() }}</n-button>
      </div>
    </div>
  </div>
</template>

<style></style>
