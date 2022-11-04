<script setup lang="ts">
import { UploadCustomRequestOptions, UploadFileInfo } from 'naive-ui'
import { imageUpload } from '@/service'

const props = withDefaults(
  defineProps<{
    imageList?: Array<string>
    max?: number
  }>(),
  {
    max: 1
  }
)

const fileList = ref<UploadFileInfo[]>([])

console.log(props.imageList)
if (props.imageList) {
  props.imageList.forEach(item => {
    fileList.value.push({
      id: '123',
      name: 'a',
      url: item,
      // url: 'https://crowdfunding-1252169801.cos.ap-guangzhou.myqcloud.com/files/2022-11-01/4235c0cee2d64eb0a9febc0c0f56b9a6.jpg',
      status: 'finished'
    })
  })
}

const handleChange = (options: {
  file: UploadFileInfo
  fileList: Array<UploadFileInfo>
  event?: Event
}) => {
  console.log(options.fileList)
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
        window.$message.success('上传成功！')
        // 添加到imageList
        onFinish()
      }
    })
    .catch(err => {
      console.log(err)
      onError()
    })
}

defineExpose({
  fileList
})
</script>

<template>
  <div class="w-1/2 m-auto mt-10">
    <n-upload
      v-model:file-list="fileList"
      :max="max"
      list-type="image-card"
      :custom-request="customRequest"
      @change="handleChange"
    >
      点击上传
    </n-upload>
  </div>
</template>

<style></style>
