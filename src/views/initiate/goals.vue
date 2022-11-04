<script setup lang="ts">
import { Ref } from 'vue'

const campaign = inject('campaign') as Ref<ICampaign>
</script>

<template>
  <div>
    <div class="mb-5">
      <p class="text-2xl font-bold text-green-500">众筹</p>
      <p class="text-gray-400 my-2">
        你想为这次竞选筹集多少资金？你的货币最低目标是1000元。
        有关选择目标金额的帮助，请参阅本文。
        请务必记住我们的费用和您的预留资金。
      </p>
    </div>
    <n-form>
      <!-- <n-form-item label="众筹类型" path="isFixedFunding">
        <n-switch :rail-style="railStyle" v-model:value="campaignModel.isFixedFunding">
          <template #checked> 灵活众筹 </template>
          <template #unchecked> 固定众筹 </template>
        </n-switch>
      </n-form-item> -->
      <n-form-item label="目标金额" path="goalRaisedMoney">
        <div class="flex flex-col space-y-4 text-gray-400">
          <p>
            你想为这次竞选筹集多少资金？你的货币最低目标是1000元。有关选择目标金额的帮助，请咨询管理员。请务必记住我们的费用和您的预留资金。
          </p>
          <n-input-number
            v-model:value="campaign.goal"
            :show-button="false"
            :min="1000"
          >
            <template #prefix> ￥ </template>
          </n-input-number>
        </div>
      </n-form-item>
    </n-form>
  </div>
</template>

<style></style>
