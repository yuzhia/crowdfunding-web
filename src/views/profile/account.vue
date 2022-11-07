<script setup lang="ts">
import { changeUserPwd } from '@/service'
import { useUserStore } from '@/store'

const userStore = useUserStore()

const user = ref<IUserAccount>({
  email: ''
})

user.value.email = userStore.user.email

const changePwd = ref(false)
const errMsg = ref<Array<string>>([])

const saveChange = () => {
  errMsg.value = []
  const reg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
  if (!reg.test(user.value.email as string)) {
    errMsg.value.push('请输入正确的邮箱地址')
  }
  if (user.value.newPassword !== user.value.reenteredPassword) {
    errMsg.value.push('两次密码输入不一致')
  }
  if (errMsg.value.length === 0) {
    changeUserPwd(user.value).then(() => {
      userStore.user.email = user.value.email
      user.value.password = ''
      user.value.newPassword = ''
      user.value.reenteredPassword = ''
      changePwd.value = false
      window.$message.success('更改成功')
    })
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
    <n-form ref="formRef" :model="user" class="max-w-lg" size="large">
      <n-form-item label="邮件" path="email">
        <n-input v-model:value="user.email" placeholder="" />
        <input type="password" hidden autocomplete="new-password" />
      </n-form-item>
      <n-form-item label="密码">
        <n-button type="primary" size="medium" @click="changePwd = !changePwd"
          >变更密码</n-button
        >
      </n-form-item>
      <n-form-item
        label="新密码"
        path="password"
        :class="changePwd ? 'block' : 'hidden'"
      >
        <n-input
          v-model:value="user.newPassword"
          type="password"
          placeholder="最少 6 位长度"
          :class="{ block: changePwd }"
        ></n-input>
      </n-form-item>
      <n-form-item
        label="确认密码"
        path="reenteredPassword"
        :class="changePwd ? 'block' : 'hidden'"
      >
        <n-input
          v-model:value="user.reenteredPassword"
          type="password"
          placeholder=""
        ></n-input>
      </n-form-item>
      <n-form-item label="当前密码">
        <n-input
          v-model:value="user.password"
          type="password"
          placeholder=""
        ></n-input>
      </n-form-item>
      <n-form-item label="输入目前密码，保存这些更改">
        <n-button type="primary" size="medium" @click="saveChange"
          >保存更改</n-button
        >
      </n-form-item>
    </n-form>
  </div>
</template>

<style></style>
