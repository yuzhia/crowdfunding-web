<script setup lang="ts">
import {
  saveAddress,
  getAddressList,
  setDefault,
  deleteAddress
} from '@/service'

const initAddress: IAddress = {
  username: '',
  title: '',
  district: '',
  address: '',
  phone: '',
  isDefault: 0
}
const addressList = ref<IAddress[]>()

// 新增，编辑
const address = ref<IAddress>({ ...initAddress })

const list = () => {
  getAddressList().then(res => {
    addressList.value = res.data as IAddress[]
  })
}

onMounted(() => {
  list()
})

const handleSave = () => {
  console.log(address.value)
  saveAddress(address.value).then(() => {
    address.value = { ...initAddress }
    list()
    window.$message.success('保存成功')
  })
}
const handleDefault = (id: any) => {
  setDefault(id).then(() => {
    window.$message.success('设置成功')
    list()
  })
}

const handleEdit = (data: any) => {
  address.value = data
}

const handlePositiveClick = (id: any) => {
  deleteAddress(id).then(() => {
    list()
  })
}
</script>

<template>
  <div class="lg:flex lg:space-x-10">
    <!-- 列表 -->
    <div class="flex-1 mb-10">
      <div class="text-2xl font-bold mb-8">已存储的地址</div>
      <n-card
        v-for="item in addressList"
        :key="item.id"
        :title="item.title ? item.title : ' '"
        class="mb-2"
      >
        <template #header-extra>
          <n-popconfirm
            :show-icon="false"
            @positive-click="handlePositiveClick(item.id)"
          >
            <template #trigger>
              <i-ep-close class="cursor-pointer"></i-ep-close>
            </template>
          </n-popconfirm>
        </template>
        <div>
          <span class="text-[#999]">收货人：</span>
          <span>{{ item.username }}</span>
        </div>
        <div>
          <span class="text-[#999]">所在地区：</span>
          <span>{{ item.district }}</span>
        </div>
        <div>
          <span class="text-[#999]">详细地址：</span>
          <span>{{ item.address }}</span>
        </div>
        <div>
          <span class="text-[#999]">手机：</span>
          <span>{{ item.phone }}</span>
        </div>
        <div class="flex justify-end space-x-5">
          <button
            v-if="!item.isDefault"
            class="text-green-500"
            @click="handleDefault(item.id)"
          >
            设为默认
          </button>
          <button class="text-green-500" @click="handleEdit(item)">编辑</button>
        </div>
      </n-card>
    </div>
    <!-- 新增 -->
    <div class="flex-1">
      <div class="text-2xl font-bold mb-8">新地址</div>
      <n-form :label-width="80" :model="address">
        <n-form-item label="收货人">
          <n-input v-model:value="address.username" placeholder="" />
        </n-form-item>
        <n-form-item label="所在地区">
          <n-input v-model:value="address.district" placeholder="" />
        </n-form-item>
        <n-form-item label="详细地址">
          <n-input v-model:value="address.address" placeholder="" />
        </n-form-item>
        <n-form-item label="手机号">
          <n-input v-model:value="address.phone" placeholder="" />
        </n-form-item>
        <n-form-item label="地址别名">
          <n-input v-model:value="address.title" placeholder="" />
        </n-form-item>
        <n-button type="primary" @click="handleSave">保存地址</n-button>
      </n-form>
    </div>
  </div>
</template>

<style></style>
