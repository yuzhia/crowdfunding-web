<script setup lang="ts">
import { changeProfile } from '@/service'
import { useUserStore } from '@/store'
import { UploadFileInfo } from 'naive-ui'

const userStore = useUserStore()

const website = ref<Array<string>>([])

const user = { ...useUserStore().user }
const newUser = ref(user)
const errMsg = ref<Array<string>>([])

const saveChange = () => {
  errMsg.value = []
  if (newUser.value.username.length < 2 || newUser.value.username.length > 20) {
    errMsg.value.push('昵称长度最少为 2，最长为 20')
  }
  const reg =
    /^(https?:\/\/(([a-zA-Z0-9]+-?)+[a-zA-Z0-9]+\.)+[a-zA-Z]+)(:\d+)?(\/.*)?(\?.*)?(#.*)?$/

  for (let i = 0; i < website.value.length; i++) {
    if (!reg.test(website.value[i])) {
      errMsg.value.push('网站格式有问题')
      break
    }
  }
  if (errMsg.value.length === 0) {
    if (website.value.length !== 0) {
      const urls = website.value.join(',')
      newUser.value.urls = urls
    }
    changeProfile(newUser.value).then(res => {
      userStore.user = { ...(res.data as IUser) }
      window.$message.success('更改成功')
    })
  }
}

if (newUser.value.urls) {
  website.value = newUser.value.urls.split(',')
}

// 图片上传
const urls = ref<Array<string>>([])

onMounted(() => {
  if (newUser.value.avatar) {
    urls.value?.push(newUser.value.avatar)
  }
})

const updateVal = (file: UploadFileInfo) => {
  if (file.status == 'finished') {
    newUser.value.avatar = file.url as string
  } else {
    newUser.value.avatar = ''
  }
}
</script>

<template>
  <div>
    <div v-if="errMsg.length !== 0" class="text-[#fd003b]">
      <div class="text-3xl font-bold mb-5">无法存储你的变更。</div>
      <ul>
        <li v-for="(item, index) in errMsg" :key="index">{{ item }}</li>
      </ul>
    </div>
    <div class="lg:flex lg:space-x-20 mb-4">
      <div class="flex-1">
        <div class="py-5">
          <div class="mb-2 font-bold">昵称</div>
          <n-input v-model:value="newUser.username" size="large"></n-input>
          <span>昵称 最少两个字</span>
        </div>
        <div class="py-5">
          <div class="mb-2 font-bold">头像</div>
          <CosUpload :urls="urls" @update-val="updateVal" />
          <span>JPEG、PNG、GIF 或 BMP • 限制 2MB</span>
        </div>
        <div class="py-5">
          <div class="mb-2 font-bold">简介</div>
          <n-input
            v-model:value="newUser.resume"
            type="textarea"
            size="large"
          ></n-input>
          <span
            >我们建议个人简介可以短一点。300
            个字以下的内容在你的个人资料页面上会看起来很棒。</span
          >
        </div>
      </div>
      <div class="flex-1">
        <div class="py-5">
          <div class="mb-2 font-bold">地点</div>
          <n-input
            v-model:value="newUser.area"
            size="large"
            placeholder="例如：中国武汉"
          ></n-input>
        </div>
        <div class="py-5">
          <div class="mb-2 font-bold">网站</div>
          <div
            v-for="(item, index) in website"
            :key="index"
            class="mb-2 space-x-2"
          >
            <n-input
              v-model:value="website[index]"
              type="text"
              size="large"
              style="width: 82%"
            />
            <n-button @click.stop="website.splice(index, 1)">删除</n-button>
          </div>
          <n-button type="primary" @click.stop="website.push('')"
            >新增</n-button
          >
        </div>
      </div>
    </div>
    <hr />
    <div class="mt-6">
      <n-button type="primary" @click="saveChange">保存设定</n-button>
    </div>
  </div>
</template>

<style scoped></style>
