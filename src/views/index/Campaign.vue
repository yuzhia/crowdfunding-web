<script setup lang="ts">
import { listCampaign } from '@/service'

const campaigns = ref<Array<ICampaign>>([])
listCampaign().then(res => {
  campaigns.value = res.data as ICampaign[]
})

// 动态获取屏幕宽度
// 屏幕宽度
const eleWidth = ref()

const marginLeft = ref(0)

const handleClickLeft = () => {
  marginLeft.value =
    marginLeft.value + Math.floor(eleWidth.value.clientWidth / 291) * 291 + 32
}

const handleClickRight = () => {
  marginLeft.value -= Math.floor(eleWidth.value.clientWidth / 291) * 291 + 32
}

const rightStatus = computed(() => {
  if (eleWidth.value) {
    if (campaigns.value.length * 291 < eleWidth.value.clientWidth) {
      return false
    }
    if (Math.abs(marginLeft.value) >= campaigns.value.length * 291) {
      return false
    }
  }
  return true
})
</script>

<template>
  <div class="mt-10">
    <div class="w-full">
      <div class="flex justify-between items-center mb-5">
        <div class="text-2xl">最近项目</div>
        <div class="hidden sm:flex gap-2">
          <i-grommet-icons-form-previous
            :class="marginLeft >= 0 ? 'pointer-events-none opacity-[4]' : ''"
            class="w-10 h-10 rounded-full border bg-white hover:bg-[#2a2a2a] hover:text-white transition cursor-pointer"
            @click="handleClickLeft"
          ></i-grommet-icons-form-previous>
          <i-grommet-icons-form-next
            :class="!rightStatus ? 'pointer-events-none opacity-[4]' : ''"
            class="w-10 h-10 rounded-full border bg-white hover:bg-[#2a2a2a] hover:text-white transition cursor-pointer"
            @click="handleClickRight"
          ></i-grommet-icons-form-next>
        </div>
      </div>

      <div ref="eleWidth" class="overflow-auto sm:overflow-x-hidden">
        <div
          class="flex gap-8 transition-all duration-500"
          :style="`margin-left:${marginLeft}px`"
        >
          <div v-for="item in campaigns" :key="item.id">
            <CampaignCard :campaign="item" class="w-[275px] shrink-0" />
          </div>
        </div>
      </div>
    </div>

    <!-- 内容 -->
    <!-- <div class="flex gap-8 flex-wrap">
      <CampaignCard class="myWidth" />
    </div> -->
    <!-- <n-carousel
      slides-per-view="auto"
      :space-between="35"
      :show-dots="false"
      :show-arrow="true"
      :loop="false"
    >
      <div v-for="item in campaigns" :key="item.id">
        <CampaignCard :campaign="item" />
      </div>
      <template #arrow="{ currentIndex, to }">
        <div class="text-2xl absolute top-0 left-0">最近项目</div>
        <div class="flex gap-4 absolute top-0 right-0">
          <i-grommet-icons-form-previous
            class="w-10 h-10 rounded-full border bg-white hover:bg-[#2a2a2a] hover:text-white transition cursor-pointer"
            @click="to(currentIndex - 4)"
          ></i-grommet-icons-form-previous>
          <i-grommet-icons-form-next
            class="w-10 h-10 rounded-full border bg-white hover:bg-[#2a2a2a] hover:text-white transition cursor-pointer"
            @click="to(currentIndex + 4)"
          ></i-grommet-icons-form-next>
        </div>
      </template>
    </n-carousel> -->
  </div>
</template>

<style scoped>
.carousel-img {
  width: 100%;
  height: 240px;
  object-fit: cover;
}
:deep(.myWidth) {
  width: 23%;
}
:deep(.n-carousel__slides) {
  margin-top: 50px;
}
</style>
