<script setup lang="ts">
import { getCampaign } from '@/service'
import Comment from './Comment.vue'
import MdEditor from 'md-editor-v3'
import 'md-editor-v3/lib/style.css'

const route = useRoute()

const campaign = ref({} as ICampaign)

const imageAssets = ref<Array<IAsset>>([])
const videoAssets = ref<Array<IAsset>>([])

const campaignId = route.params.id as string

getCampaign(campaignId).then(res => {
  campaign.value = res.data
  imageAssets.value = campaign.value.assets.filter(
    asset => asset.type === 'IMAGE'
  )
  videoAssets.value = campaign.value.assets.filter(
    asset => asset.type === 'VIDEO'
  )
  console.log(campaign.value)
})

const getVideoId = (url: string) => {
  if (url) {
    return url.split('?')[1].split('=')[1]
  }
}

const splitDate = (date: any) => {
  if (date) {
    const arr = date.split('-')
    return arr[0] + '年' + arr[1] + '月'
  }
}
</script>

<template>
  <div class="max-w-7xl mx-auto">
    <div class="flex flex-col md:flex-row gap-x-10 pb-12 pt-5 md:pt-10">
      <!-- video -->
      <n-carousel
        show-arrow
        :transition-style="{ transitionDuration: '400ms' }"
        :default-index="0"
        class="shrink-0 w-full h-[274px] md:flex-1 lg:w-[695px] md:h-full"
      >
        <img
          v-if="campaign?.assets.length == 0"
          src="@/assets/img/missing_project_photo.avif"
          class="w-full h-[460px] object-cover"
        />
        <iframe
          v-for="(item, index) in videoAssets"
          :key="index"
          frameborder="0"
          allowfullscreen
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          title="The Worlds First Electric HYPERSCOOTER!"
          width="695"
          height="460"
          :src="
            'https://www.youtube.com/embed/' +
            getVideoId(item.url) +
            '?playsinline=1&enablejsapi=1m&widgetid=1'
          "
          tabindex="-1"
          data-airgap-id="36"
          loading="lazy"
        ></iframe>

        <img
          v-for="item in imageAssets"
          :key="item.id"
          class="w-full h-[460px] object-cover"
          :src="item.url"
        />

        <template #arrow="{ to }">
          <div class="flex w-full h-12 gap-x-2 mt-4 justify-center">
            <img
              v-if="campaign?.assets.length == 0"
              src="@/assets/img/missing_project_photo.avif"
              class="cursor-pointer w-12 h-full"
            />
            <img
              v-for="(item, index) in videoAssets"
              :key="item.id"
              class="cursor-pointer w-12 h-full object-fill"
              :src="
                'https://img.youtube.com/vi/' +
                getVideoId(item.url) +
                '/mqdefault.jpg'
              "
              mode="aspectFill"
              @click="to(index)"
            />
            <img
              v-for="(item, index) in imageAssets"
              :key="item.id"
              class="cursor-pointer w-12 h-full"
              :src="item.url"
              @click="to(index + videoAssets.length)"
            />
          </div>
        </template>
      </n-carousel>
      <!-- 描述 -->
      <div
        class="flex flex-col break-all space-y-3 flex-1 pb-16 px-4 mt-2 md:mt-0"
      >
        <!-- 状态 -->
        <div class="text-sm font-semibold text-[#088366]">FUNDING</div>
        <!-- 标题 -->
        <div class="text-3xl font-semibold">
          {{ campaign.title ? campaign.title : '默认标题' }}
        </div>
        <!-- 简介 -->
        <div class="text-xl font-medium flex-1">
          {{ campaign.description ? campaign.description : '默认描述' }}
        </div>
        <!-- 头像 -->
        <div class="flex py-3 items-center">
          <n-avatar
            class="w-10 h-10"
            round
            :src="campaign.user?.avatar"
          ></n-avatar>
          <div class="ml-2">
            <p
              class="text-base font-semibold hover:underline hover:cursor-pointer"
            >
              {{ campaign.user?.username }}
            </p>
            <p>已发起 {{ campaign.count }} 个活动 | 42 个已支持</p>
          </div>
        </div>
        <!-- 筹集进程 -->
        <div>
          <div class="flex justify-between items-center">
            <span>
              已筹
              <span class="text-xl font-semibold"
                >￥{{ campaign.supportMoney }}</span
              >
            </span>
            <div>
              <i-el-group class="inline-block mr-2 text-xl text-green-600" />
              <span class="align-middle">
                <span class="font-semibold">{{ campaign.supporter }}</span>
                支持者
              </span>
            </div>
          </div>
          <n-progress
            type="line"
            status="success"
            :percentage="
              campaign.money
                ? (campaign.supportMoney as number  / campaign.money) * 100
                : 0
            "
            :indicator-placement="'inside'"
            class="py-2"
          />
          <div class="flex justify-between items-center">
            <span>
              目标金额
              <span class="font-semibold">￥{{ campaign.money }}</span>
            </span>
            <span>
              还剩
              <span class="font-semibold">{{ campaign.remainDay }}</span>
              天
            </span>
          </div>
        </div>
        <!-- 支持按钮 -->
        <div class="flex justify-between items-center pt-3">
          <div>
            <n-button type="primary" size="large">支持</n-button>
            <n-button type="primary" size="large" class="ml-3">关注</n-button>
          </div>
          <div class="flex gap-x-2 items-center">
            <i-uiw-weixin class="w-5 h-5 text-green-500 hover:cursor-pointer" />
            <i-mdi-link-variant
              class="w-5 h-5 text-green-500 hover:cursor-pointer"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
  <hr class="mb-10" />
  <div class="max-w-7xl mx-auto px-4">
    <div class="flex flex-col-reverse md:flex-row md:space-x-8 w-full">
      <div class="md:w-[60%] shrink-0 mt-10">
        <n-tabs type="bar" animated size="large">
          <n-tab-pane name="story" tab="详情">
            <md-editor v-model="campaign.story" :preview-only="true" />
          </n-tab-pane>
          <n-tab-pane name="faq" tab="常见问题">
            <n-card v-for="item in campaign.faqs" :key="item.id" hoverable>
              <div class="text-base font-semibold md:text-xl mb-2">
                {{ item.question }}
              </div>
              <div class="text-sm md:text-base">{{ item.answer }}</div>
            </n-card>
          </n-tab-pane>
          <n-tab-pane name="update" tab="更新"> 更新 </n-tab-pane>
          <n-tab-pane name="comment" tab="讨论">
            <Comment :value="campaignId" />
          </n-tab-pane>
        </n-tabs>
      </div>
      <!-- perk -->
      <div
        class="mb-10 overflow-auto md:sticky top-0 md:h-[90vh] md:w-72 lg:w-96 pr-4"
      >
        <div
          class="flex w-[208px] h-[375px] md:block md:w-full space-x-4 md:space-y-4 md:space-x-0"
        >
          <n-card v-for="item in campaign.perks" :key="item.id" hoverable>
            <div class="border-b mb-4 pb-2">
              <div class="flex justify-between items-center">
                <p class="text-2xl font-bold">￥{{ item.price }}</p>
                <p v-if="item.num !== 0">已支持 3 份 / <span>限 66 份</span></p>
              </div>
              <div v-if="item.num !== 0" class="text-xs ml-1">
                <n-tag type="success" size="small" :bordered="false" round>
                  限量
                </n-tag>
              </div>
            </div>
            <div class="space-y-2">
              <div class="text-base font-semibold">{{ item.title }}</div>
              <div class="hidden md:block">{{ item.description }}</div>
              <div v-if="item.imageUrl">
                <img :src="item.imageUrl" class="w-full h-28 object-cover" />
              </div>
              <div class="py-2">
                预计回报发放时间 {{ splitDate(item.returnDate) }} 内
              </div>
              <n-button type="primary" class="w-44">去支持</n-button>
            </div>
          </n-card>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
