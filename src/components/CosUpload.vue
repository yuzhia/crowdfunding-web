<script setup lang="ts">
import { nanoid } from 'nanoid'
import COS from 'cos-js-sdk-v5'
import { getSts } from '@/service'
import { UploadCustomRequestOptions, UploadFileInfo } from 'naive-ui'
import { getExt, getYearMonth } from '@/utils'

const props = withDefaults(
  defineProps<{
    max?: number
    urls?: string[]
    width?: string
    height?: string
  }>(),
  {
    max: 1,
    urls: () => {
      return []
    },
    width: '96px',
    height: '96px'
  }
)

const fileList = ref<UploadFileInfo[]>([])

watch(
  props.urls,
  () => {
    if (props.urls.length !== 0) {
      props.urls.forEach(item => {
        if (item) {
          fileList.value.push({
            id: nanoid(),
            name: 'IMAGE',
            status: 'finished',
            url: item
          })
        }
      })
    }
  },
  { immediate: true }
)

const cos = new COS({
  getAuthorization: function (options, callback) {
    getSts().then(res => {
      if (res.code == 0) {
        var credentials = res.data && res.data.credentials
        callback({
          TmpSecretId: credentials.tmpSecretId,
          TmpSecretKey: credentials.tmpSecretKey,
          XCosSecurityToken: credentials.sessionToken,
          StartTime: res.data.startTime,
          ExpiredTime: res.data.expiredTime
          // ScopeLimit: true, // 细粒度控制权限需要设为 true，会限制密钥只在相同请求时重复使用
        })
      }
    })
  }
})

const customRequest = ({ file, onFinish, onError }: UploadCustomRequestOptions) => {
  cos.uploadFile(
    {
      Bucket: 'crowdfunding-1252169801',
      Region: 'ap-guangzhou',
      Key: `files/${getYearMonth()}/${nanoid()}.${
        file.file?.type.split('/')[1]
      }` /* 存储在桶里的对象键（例如1.jpg，a/b/test.txt），必须字段 */,
      Body: file.file as File
    },
    (err, data) => {
      if (err) {
        console.log(err)
        onError()
      } else {
        if (data.statusCode == 200) {
          file.url = 'https://' + data.Location
          window.$message.success('上传成功')
          onFinish()
        }
      }
    }
  )
}

const beforeUpload = (options: { file: UploadFileInfo; fileList: UploadFileInfo[] }) => {
  if (!getExt(options.file.type)) {
    window.$message.error('只能上传图片文件，请重新上传')
    return false
  }
  return true
}

const emit = defineEmits<{
  (e: 'updateVal', file: UploadFileInfo): void
}>()

const handleChange = (options: { file: UploadFileInfo }) => {
  if (options.file.status == 'removed' || options.file.status == 'finished') {
    emit('updateVal', options.file)
  }
}
</script>

<template>
  <n-upload
    v-model:default-file-list="fileList"
    list-type="image-card"
    :max="max"
    :custom-request="customRequest"
    @before-upload="beforeUpload"
    @change="handleChange"
  >
    点击上传
  </n-upload>
</template>

<style scoped>
:deep(.n-upload-file-list.n-upload-file-list--grid) {
  display: grid;
  grid-template-columns: repeat(auto-fill, v-bind(width)) !important;
  grid-gap: 8px;
  margin-top: 0;
}
:deep(.n-upload-file-list .n-upload-file.n-upload-file--image-card-type),
:deep(.n-upload-trigger.n-upload-trigger--image-card) {
  width: 100%;
  height: v-bind(height);
}
</style>
