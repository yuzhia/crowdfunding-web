<script setup name="detail" lang="ts">
import { imageUpload } from '@/service'
import { UploadCustomRequestOptions, UploadFileInfo } from 'naive-ui'
import Faq from './Faq.vue'
import Story from './Story.vue'

import { Ref } from 'vue'

const campaign = inject('campaign') as Ref<ICampaign>

const videoLinkList = ref<Array<IAsset>>([])
const imageLinkList = ref<Array<IAsset>>([])

videoLinkList.value = campaign.value.assets.filter(
  asset => asset.type == 'VIDEO'
)

imageLinkList.value = campaign.value.assets.filter(
  asset => asset.type == 'IMAGE'
)

const fileList = ref<UploadFileInfo[]>([])

// 回显
imageLinkList.value.forEach(item => {
  fileList.value?.push({
    id: item.id + '',
    name: 'a',
    url: item.url,
    status: 'finished'
  })
})

watchEffect(() => {
  campaign.value.assets = [...videoLinkList.value, ...imageLinkList.value]
})

const addItem = () => {
  videoLinkList.value.push({
    url: '',
    type: 'VIDEO',
    campaignId: campaign.value.id as number,
    fileId: ''
  })
}
const removeVideo = (index: number) => {
  videoLinkList.value.splice(index, 1)
}

const customRequest = ({
  file,
  onFinish,
  onError
}: UploadCustomRequestOptions) => {
  const formData = new FormData()
  formData.append('file', file.file as File)
  imageUpload(formData)
    .then(res => {
      if (res.code === 0) {
        imageLinkList.value.push({
          fileId: file.id,
          url: res.data.fullFilePath,
          type: 'IMAGE',
          campaignId: campaign.value.id as number
        })
        window.$message.success('上传成功！')
        onFinish()
      }
    })
    .catch(error => {
      window.$message.error(error.msg)
      onError()
    })
}

const removeImg = (options: {
  file: UploadFileInfo
  fileList: Array<UploadFileInfo>
}) => {
  if (!options.file.url) {
    imageLinkList.value = imageLinkList.value.filter(
      item => item.fileId !== options.file.id
    )
  } else {
    imageLinkList.value = imageLinkList.value.filter(
      item => item.id !== Number(options.file.id)
    )
  }
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
          <n-tab-pane name="video" tab="视频" display-directive="show">
            <p class="text-gray-400 font-thin mb-4">
              输入Bilibili或Video
              URL以显示在您的活动页面顶部。确保你的视频在Bilibili或Vimeo上启用了闭路字幕。
            </p>
            <div>
              <div
                v-for="(item, index) in videoLinkList"
                :key="index"
                class="flex gap-6 p-2"
              >
                <n-input v-model:value="videoLinkList[index].url" type="text" />
                <n-button @click="removeVideo(index)">删除</n-button>
              </div>
              <n-button class="w-full" @click="addItem">新增</n-button>
            </div>
          </n-tab-pane>
          <n-tab-pane name="image" tab="图片" display-directive="show">
            <!-- <my-upload v-model:image-list="imageLinkList" :max="5"></my-upload> -->
            <n-upload
              v-model:default-file-list="fileList"
              :max="10"
              list-type="image-card"
              :custom-request="customRequest"
              @remove="removeImg"
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
