<script setup lang="ts">
import request from '@/service/request'

const alipayDto = {
  subject: 'subject',
  tradeNo: 'tradeNo111',
  totalAmount: '2222'
}

const handleClick = () => {
  request.post(`/alipay/pay`, formValue.value).then(res => {
    console.log(res)
    const divForm = document.getElementsByTagName('div')
    if (divForm.length) {
      document.body.removeChild(divForm[0])
    }
    const div = document.createElement('div')
    div.innerHTML = res.data?.formVal // data就是接口返回的form 表单字符串
    document.body.appendChild(div)
    document.forms[0].setAttribute('target', '_blank') // 新开窗口跳转
    document.forms[0].submit()
  })
}

const formValue = ref({})
</script>

<template>
  <div class="w-1/2 m-auto mt-10">
    <n-form :model="formValue" label-placement="left" label-width="auto">
      <n-form-item label="活动id">
        <n-input v-model:value="formValue.cid" />
      </n-form-item>
      <n-form-item label="回报id">
        <n-input v-model:value="formValue.pid" />
      </n-form-item>
      <n-form-item label="额外价格">
        <n-input v-model:value="formValue.money" />
      </n-form-item>
      <n-form-item label="地址id">
        <n-input v-model:value="formValue.aid" />
      </n-form-item>
      <n-form-item>
        <n-button type="primary" size="medium" @click="handleClick"
          >点击支付</n-button
        >
      </n-form-item>
    </n-form>
  </div>
</template>

<style></style>
