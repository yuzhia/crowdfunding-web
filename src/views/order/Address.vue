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
const addressList = ref<IAddress[]>([])

// 新增，编辑
const address = ref<IAddress>({ ...initAddress })
const defaultAddress = ref<IAddress>()

const list = () => {
  getAddressList().then((res: any) => {
    addressList.value = res.data as IAddress[]
    if (addressList.value.length > 0) {
      const find = addressList.value.find(item => item.isDefault == 1)
      if (find) {
        defaultAddress.value = find
        currentAdress.value = find
        selectedVal.value = find.id
      } else {
        currentAdress.value = addressList.value[0]
      }
    }
  })
}

onMounted(() => {
  list()
})

watch(addressList, () => {
  if (addressList.value.length > 0) {
    newAddressBox.value = false
  } else {
    newAddressBox.value = true
  }
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
  newAddressBox.value = true
  address.value = data
}

const handlePositiveClick = (id: any) => {
  deleteAddress(id).then(() => {
    list()
  })
}

const addressListBox = ref(false)
const currentAdress = ref<IAddress>()
const newAddressBox = ref(false)
const selectedVal = ref()

const clickAlterAdress = () => {
  addressListBox.value = !addressListBox.value
}

const clickConfirm = () => {
  if (selectedVal.value) {
    const find = addressList.value.find(item => item.id == selectedVal.value)
    currentAdress.value = find
    addressListBox.value = false
  }
}
</script>

<template>
  <div>
    <div v-if="addressList.length > 0" class="mb-6">
      <div class="text-xl font-bold mb-6">收货地址</div>
      <div>
        <div class="flex justify-between items-center">
          <div>
            <div class="text-base font-bold">
              {{ currentAdress?.district }} {{ currentAdress?.address }}
            </div>
            <div>{{ currentAdress?.username }} {{ currentAdress?.phone }}</div>
          </div>
          <div class="text-green-500 cursor-pointer" @click="clickAlterAdress">
            修改地址
          </div>
        </div>
        <!-- 列表 -->
        <div v-if="addressListBox" class="pl-6">
          <n-radio-group
            v-model:value="selectedVal"
            name="radiogroup"
            class="mt-5 border py-2 px-4 w-full"
          >
            <div
              v-for="item in addressList"
              :key="item.id"
              class="flex justify-between items-center mb-2"
            >
              <n-radio :value="item.id">
                <div class="text-base font-bold">
                  {{ item.district }} {{ item.address }}
                </div>
                <div>{{ item.username }} {{ item.phone }}</div>
              </n-radio>
              <div class="text-green-500 cursor-pointer space-x-2">
                <span v-if="item.isDefault == 0" @click="handleDefault(item.id)"
                  >默认</span
                >
                <span @click="handleEdit(item)">编辑</span>
                <span @click="handlePositiveClick(item.id)">删除</span>
              </div>
            </div>
          </n-radio-group>
          <div class="text-right mt-6 space-x-4">
            <n-button @click="newAddressBox = !newAddressBox"
              >添加新地址</n-button
            >
            <n-button @click="clickConfirm">确认地址</n-button>
          </div>
        </div>
      </div>
    </div>
    <!-- 新增 -->
    <div v-if="newAddressBox" class="flex-1">
      <div class="text-2xl font-bold mb-8">添加地址</div>
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
