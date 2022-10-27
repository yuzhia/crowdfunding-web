<script setup lang="ts">
import MdEditor, { ToolbarTips } from 'md-editor-v3'
import 'md-editor-v3/lib/style.css'
import { imageUpload } from '@/service'
import { Ref } from 'vue'

const campaign = inject('campaign') as Ref<ICampaign>

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
</script>

<template>
  <md-editor
    v-model="campaign.story"
    :toolbars="toolbars"
    @on-upload-img="onUploadImg"
  />
</template>

<style></style>
