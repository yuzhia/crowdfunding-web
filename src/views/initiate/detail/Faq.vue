<script setup lang="ts">
import { Ref } from 'vue'

const campaign = inject('campaign') as Ref<ICampaign>

const addItem = () => {
  campaign.value.faqs.push({
    question: '',
    answer: '',
    campaignId: campaign?.value.id as number
  })
}

const removeFaq = (index: number) => {
  campaign.value.faqs.splice(index, 1)
}

const handleClick = () => {
  console.log(campaign.value)
}
</script>

<template>
  <div class="w-full">
    <div
      v-for="(item, index) in campaign.faqs"
      :key="index"
      class="py-4 flex gap-4"
    >
      <div class="flex flex-col w-full gap-4">
        <n-input v-model:value="campaign.faqs[index].question" type="text" />
        <n-input v-model:value="campaign.faqs[index].answer" type="textarea" />
      </div>
      <div>
        <n-button @click="removeFaq(index)">删除</n-button>
      </div>
    </div>
    <n-button class="w-full" @click="addItem">新增</n-button>
    <n-button @click="handleClick">按钮</n-button>
  </div>
</template>

<style></style>
