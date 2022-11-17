<script setup lang="ts">
import { listByCampaignId } from '@/service'
import { useOrderStore } from '@/store'

const router = useRouter()

const orderStore = useOrderStore()
const perkOrder = ref({})

watchEffect(() => {
  if (
    Object.keys(orderStore.orderCampaign).length === 0 ||
    orderStore.orderPerkId == 0
  ) {
    router.push('/')
  }
})

const perks = ref<Array<IPerk>>([])
listByCampaignId(orderStore.orderCampaign.id as number).then(res => {
  perks.value = res.data as IPerk[]
})

const radioVal = ref()
</script>

<template>
  <div>
    <div
      class="h-16 md:h-36 w-full py-2 md:py-9 text-center bg-[#FBFBFA] border-b"
    >
      <div class="text-base mb-1 md:text-3xl md:mb-4">
        {{ orderStore.orderCampaign.title }}
      </div>
      <div class="text-xs md:text-sm">
        發起人：{{ orderStore.orderCampaign.user?.username }}
      </div>
    </div>
    <div class="max-w-6xl mx-auto mt-10 px-3">
      <div>
        <div class="text-2xl">选择你的回报</div>
      </div>
      <n-radio-group v-model:value="radioVal" name="radiogroup">
        <n-radio
          v-for="perk in perks"
          :key="perk.id"
          class="border-b py-7"
          :value="perk.id"
        >
          <div class="flex flex-wrap ml-2">
            <div class="md:w-[400px] space-y-2">
              <div class="text-xl">支持 ￥ {{ perk.price }}</div>
              <div class="text-lg font-bold">
                {{ perk.title }}
              </div>
              <div class="text-gray-500">
                {{ perk.description }}
              </div>
            </div>
            <div class="pl-7 py-5 md:w-auto w-full">
              <div class="flex md:flex-col">
                <div class="mb-2 flex-1">
                  <div class="text-[#656969] text-sm">预估交货</div>
                  <div class="">{{ perk.returnDate }}</div>
                </div>
                <div class="mb-2 flex-1">
                  <div class="text-[#656969] text-sm">运送至</div>
                  <div>全国各地</div>
                </div>
              </div>
            </div>
            <div class="w-full mt-3 space-x-4">
              <n-tag
                v-if="perk.limitPurchase !== 0"
                :bordered="false"
                round
                :color="{ color: '#e6faf1' }"
                >限购（每人限购 {{ perk.limitPurchase }})</n-tag
              >
              <n-tag
                v-if="perk.num !== 0"
                :bordered="false"
                round
                :color="{ color: '#fff2ec' }"
                >限量（剩餘 10 ，總量 {{ perk.num }})</n-tag
              >
              <n-tag round :bordered="false">24 名支持者</n-tag>
            </div>
          </div>
        </n-radio>
      </n-radio-group>
    </div>
  </div>
</template>

<style></style>
