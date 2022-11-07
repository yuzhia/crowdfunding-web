<script setup name="detail" lang="ts">
import Faq from './Faq.vue'
import Story from './Story.vue'

import { Ref } from 'vue'
import { UploadFileInfo } from 'naive-ui'

const campaign = inject('campaign') as Ref<ICampaign>

const videoLinkList = ref<Array<IAsset>>([])
const imageLinkList = ref<Array<IAsset>>([])

videoLinkList.value = campaign.value.assets.filter(
  asset => asset.type == 'VIDEO'
)

imageLinkList.value = campaign.value.assets.filter(
  asset => asset.type == 'IMAGE'
)

const urls = ref<Array<string>>([])

onMounted(() => {
  if (imageLinkList.value.length !== 0) {
    imageLinkList.value.forEach(item => {
      urls.value?.push(item.url)
    })
  }
})

const updateVal = (file: UploadFileInfo) => {
  if (file.status == 'finished') {
    imageLinkList.value.push({
      type: 'IMAGE',
      url: file.url as string,
      campaignId: campaign.value.id as number
    })
  } else {
    imageLinkList.value = imageLinkList.value.filter(
      item => item.url != file.url
    )
  }
}

watchEffect(() => {
  campaign.value.assets = [...videoLinkList.value, ...imageLinkList.value]
})

const videoLink = ref('')
const disabled = ref(true)
const updateVideoInput = () => {
  disabled.value = true
  const reg = /(?:https?:\/\/)?(?:www\.)?youtube.*watch\?v=((\w|-){11})(?:\S+)?/
  const mat = videoLink.value.match(reg)
  if (mat) {
    disabled.value = false
  }
}

const addItem = () => {
  videoLinkList.value.push({
    url: videoLink.value,
    type: 'VIDEO',
    campaignId: campaign.value.id as number,
    fileId: ''
  })
  videoLink.value = ''
}

const removeVideo = (index: number) => {
  videoLinkList.value.splice(index, 1)
}
</script>

<template>
  <div>
    <div class="mb-5">
      <p class="text-2xl font-bold text-green-500">内容</p>
      <p class="text-gray-400 my-2">
        添加视频或图像以显示在活动页面的顶部。有视频的活动比没有视频的活动提高2000%。将视频保留2-3分钟。
        你的活动被感兴趣的人发现了，他希望通过下面的内容详细的了解你的活动，千万不要遗漏你的活动最出彩的地方。
      </p>
    </div>
    <n-form
      ref="formRef"
      label-width="auto"
      require-mark-placement="right-hanging"
      class="mb-6"
    >
      <n-form-item path="sources">
        <n-tabs type="line" default-value="video" size="large">
          <!-- 视频 -->
          <n-tab-pane name="video" tab="视频" display-directive="show">
            <p class="text-gray-400 font-thin mb-4">
              输入Bilibili或Video
              URL以显示在您的活动页面顶部。确保你的视频在Bilibili或Vimeo上启用了闭路字幕。
            </p>
            <div>
              <div class="flex gap-6 mb-2">
                <n-input
                  v-model:value="videoLink"
                  type="text"
                  @update:value="updateVideoInput"
                />
                <n-button :disabled="disabled" @click="addItem"
                  >添加视频</n-button
                >
              </div>
              <div class="flex flex-wrap gap-2">
                <div
                  v-for="(item, index) in videoLinkList"
                  :key="index"
                  class="relative"
                >
                  <i-ep-close
                    class="absolute top-0 right-0 w-7 h-7 bg-[#6a6a6a] text-white cursor-pointer"
                    @click="removeVideo(index)"
                  ></i-ep-close>
                  <n-image
                    :src="`https://i1.ytimg.com/vi/${
                      item.url.split('=')[1]
                    }/0.jpg`"
                    width="300"
                    class="h-[200px]"
                    :preview-disabled="true"
                    object-fit="cover"
                  />
                  <div>
                    <a
                      class="underline text-[#0EB4b6] text-xs"
                      :href="item.url"
                      target="_blank"
                      >{{ item.url }}</a
                    >
                  </div>
                </div>
              </div>
            </div>
          </n-tab-pane>
          <!-- 图片 -->
          <n-tab-pane name="image" tab="图片" display-directive="show">
            <CosUpload
              class="w-full"
              :width="'300px'"
              :height="'200px'"
              :max="10"
              :urls="urls"
              @update-val="updateVal"
            />
          </n-tab-pane>
        </n-tabs>
      </n-form-item>
      <n-form-item label="故事" path="story">
        <Story></Story>
      </n-form-item>
      <n-form-item label="常见问题 & FQA" path="faq">
        <Faq></Faq>
      </n-form-item>
    </n-form>
  </div>
</template>

<style></style>
