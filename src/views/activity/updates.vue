<script setup lang="ts">
import MdEditor, { ToolbarTips } from 'md-editor-v3'
import 'md-editor-v3/lib/style.css'
import { imageUpload } from '@/service'
import { listUpdatesByCampaignId, saveOrUpdateStory } from '@/service'

const storyList = ref()

const toolbars: (keyof ToolbarTips)[] = [
  'bold',
  'underline',
  'italic',
  'strikeThrough',
  'title',
  'quote',
  'unorderedList',
  'orderedList',
  '-',
  'link',
  'image',
  '-',
  'revoke',
  'next',
  'save',
  'pageFullscreen',
  'fullscreen',
  'preview'
]

const onUploadImg = async (files: any[], callback: any) => {
  const res = await Promise.all(
    files.map((file: string | Blob) => {
      return new Promise((rev, rej) => {
        const form = new FormData()
        form.append('file', file)

        imageUpload(form)
          .then((res: unknown) => rev(res))
          .catch((error: any) => rej(error))
      })
    })
  )
  callback(res.map((item: any) => item.data.fullFilePath))
}

const clickEditId = ref()

const route = useRoute()

listUpdatesByCampaignId(route.params.id as any).then(res => {
  storyList.value = res.data
})

const clickSave = (data: any) => {
  saveOrUpdateStory(data).then(() => {
    clickEditId.value = -1
    window.$message.success('保存成功')
  })
}
</script>

<template>
  <div class="px-5 max-w-4xl mx-auto mt-10">
    <div class="text-5xl font-bold mb-6">更新</div>
    <div v-if="!storyList">你还没有任何更新</div>
    <div v-for="(item, index) in storyList" v-else :key="item.id" class="mb-4">
      <div class="flex justify-between items-center border py-4 px-4">
        <div class="basis-4/5">
          <div class="flex items-center gap-3">
            <n-avatar round :size="50" :src="item.user.avatar"></n-avatar>
            <div class="flex flex-col">
              <div>{{ item.user.username }}</div>
              <div class="text-[#6a6a6a]">
                {{ item.createTime.replace('T', ' ') }}
              </div>
            </div>
          </div>
          <div class="mt-5 pt-5 border-t space-y-2">
            <div class="text-xl font-bold">{{ item.title }}</div>
            <n-ellipsis class="w-full" line-clamp="3" :tooltip="false">
              {{ item.content }}
            </n-ellipsis>
          </div>
        </div>
        <div
          class="text-green-600 cursor-pointer py-3 px-6"
          @click="clickEditId = item.id"
        >
          编辑
        </div>
      </div>
      <!-- 编辑 -->
      <div v-if="clickEditId == item.id" class="mt-10 space-y-2">
        <div class="text-base font-bold">编辑</div>
        <n-input v-model:value="item.title"></n-input>
        <md-editor
          v-model="item.content"
          :toolbars="toolbars"
          @on-upload-img="onUploadImg"
        />
        <n-button type="primary" @click="clickSave(item)">保存</n-button>
        <n-button class="ml-2" @click="clickEditId = -1">取消</n-button>
      </div>
    </div>
    <div></div>
  </div>
</template>

<style></style>
