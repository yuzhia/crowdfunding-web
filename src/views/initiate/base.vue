<script setup name="baseInfo" lang="ts">
import { listCategory } from '@/service'
import { UploadFileInfo } from 'naive-ui'
import { Ref } from 'vue'

const campaign = inject('campaign') as Ref<ICampaign>

const categoryList = ref()

const getCategory = () => {
  listCategory().then(res => {
    categoryList.value = res.data.map(item => ({
      label: item.name,
      value: item.id
    }))
  })
}
getCategory()

const urls = ref<Array<string>>([])

onMounted(() => {
  if (campaign.value.coverUrl) {
    urls.value?.push(campaign.value.coverUrl)
  }
})

const updateVal = (file: UploadFileInfo) => {
  if (file.status == 'finished') {
    campaign.value.coverUrl = file.url as string
  } else {
    campaign.value.coverUrl = ''
  }
}
</script>

<template>
  <div>
    <div class="mb-5">
      <p class="text-2xl font-bold text-green-500">基本</p>
      <p class="text-gray-400 my-2">
        给人留下良好的第一印象：介绍你的竞选目标，吸引人们了解更多。
        这些基本信息将在您的活动页面、活动卡和搜索中代表您的活动。
        活动的基础信息，将作为简略信息展示，总之简要介绍你的活动，尽量做到言简意赅。
      </p>
    </div>
    <div>
      <div class="my-10 space-y-2">
        <div class="text-base font-bold">项目标题</div>
        <p class="text-[#6a6a6a]">
          写一个清晰、意赅的标题，帮助人们快速理解你的项目主题
        </p>
        <n-input
          v-model:value="campaign.title"
          maxlength="30"
          show-count
        ></n-input>
      </div>
      <div class="my-10 space-y-2">
        <div class="text-base font-bold">项目描述</div>
        <p class="text-[#6a6a6a]">提供最能向人们描述您的项目的简短描述。</p>
        <n-input
          v-model:value="campaign.description"
          type="textarea"
          maxlength="96"
          show-count
        ></n-input>
      </div>
      <div class="my-10 space-y-2">
        <div class="text-base font-bold">项目图</div>
        <p class="text-[#6a6a6a]">
          图片应简洁清晰，除 Logo
          外的其他文字要精练，说明产品亮点即可。好的项目图会为项目带来更多流量。
        </p>
        <CosUpload
          :width="'200px'"
          :height="'200px'"
          :urls="urls"
          @update-val="updateVal"
        />
      </div>
      <div class="my-10 space-y-2">
        <div class="text-base font-bold">分类</div>
        <p class="text-[#6a6a6a]">
          按实际情况选择你项目最符合的类别，平台会精准推荐相关用户。
        </p>
        <n-select
          v-model:value="campaign.categoryId"
          placeholder="选择分类"
          :options="categoryList"
        />
      </div>
      <!-- <div class="my-10 space-y-2">
        <div class="text-base font-bold">地点</div>
        <p class="text-[#6a6a6a]">
          选择你要开展活动的地点。这个位置将显示在您的竞选页面上，让您的观众看到。
        </p>
        <n-select
          v-model:value="_data.area"
          placeholder="选择地点"
          :options="categoryList"
        />
      </div> -->
      <div class="my-10 space-y-2">
        <div class="text-base font-bold">活动持续时间</div>
        <p class="text-[#6a6a6a]">
          活动计划于2022年11月11日太平洋标准时间早上7:59结束
          您有资格一次性延长60天的最长期限。
        </p>
        <n-input-number
          v-model:value="campaign.duration"
          :show-button="false"
          class="w-20"
          :min="1"
          :max="60"
        />
      </div>
    </div>
  </div>
</template>

<style></style>
