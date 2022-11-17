<script setup lang="ts">
import { useOrderStore } from '@/store'
import { getByPerkId } from '@/service'
import { getPercent } from '@/utils'
import Address from './Address.vue'

const router = useRouter()

const orderStore = useOrderStore()

const perk = ref<IPerk>({})
onMounted(() => {
  if (
    Object.keys(orderStore.orderCampaign).length === 0 ||
    orderStore.orderPerkId == 0
  ) {
    router.push('/')
  }
  getByPerkId(orderStore.orderPerkId).then(res => {
    perk.value = res.data as IPerk
  })
})

const extraAmount = ref(null)

const totalAmount = computed(() => {
  if (perk.value) {
    return (perk.value.price as number) + extraAmount.value
  } else {
    return extraAmount.value
  }
})

const submitOrder = () => {
  alert('假的！！！')
}

const payPlat = ref(1)
</script>

<template>
  <div class="flex flex-col md:flex-row px-2 max-w-6xl mx-auto gap-20 mt-12">
    <!-- 收货地址 -->
    <div class="flex-1">
      <Address v-if="perk" class="mb-6" />
      <!-- 支付方式 -->
      <div>
        <div class="text-2xl font-semibold mb-6">支付方式</div>
        <n-radio-group v-model:value="payPlat" name="payment-platform">
          <n-radio :value="1">支付宝支付</n-radio>
          <!-- <n-radio :value="2">微信支付</n-radio> -->
        </n-radio-group>
      </div>
    </div>
    <!-- 活动信息 -->
    <div class="flex-1">
      <div class="text-2xl font-semibold mb-6">订单摘要</div>
      <div class="flex w-full gap-6">
        <img
          class="basis-[40%] h-24 object-cover"
          :src="orderStore.orderCampaign.coverUrl"
        />
        <div class="flex flex-col basis-[60%] space-y-1">
          <a class="underline text-base">{{
            orderStore.orderCampaign.title
          }}</a>
          <span class="text-[#037362]"
            >已筹集
            {{
              getPercent(
                orderStore.orderCampaign.collectedFunds,
                orderStore.orderCampaign.goal
              )
            }}</span
          >
          <span
            >发起人：<a>{{ orderStore.orderCampaign.user?.username }}</a></span
          >
        </div>
      </div>
      <div class="mt-5 text-xl font-bold">你的订单</div>
      <div class="p-3">
        <div class="flex mb-1">
          <p class="basis-1/5">回报</p>
          <div class="flex justify-between basis-4/5">
            <p>{{ perk?.title }}</p>
            <p v-if="perk">￥ {{ perk?.price }}</p>
            <p v-else>无偿支持</p>
          </div>
        </div>
        <div v-if="perk" class="flex justify-between mb-1">
          <p class="basis-1/5">运费</p>
          <p>包邮</p>
        </div>
        <div class="flex justify-between items-center mb-1">
          <p class="basis-1/5">打赏</p>
          <n-input-number
            v-model:value="extraAmount"
            :show-button="false"
            min="0"
          ></n-input-number>
        </div>
        <hr class="my-2" />
        <div class="flex justify-between mb-1">
          <p class="font-bold">总金额</p>
          <span class="text-green-500 text-base">￥ {{ totalAmount }}</span>
        </div>
      </div>
      <n-button
        size="large"
        type="success"
        class="w-full mt-6"
        @click="submitOrder"
        >提交订单</n-button
      >
    </div>
  </div>
</template>

<style></style>
