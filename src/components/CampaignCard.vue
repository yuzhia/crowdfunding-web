<script setup lang="ts">
import { getPercent, timeDifference, getStatus } from '@/utils'
const router = useRouter()

defineProps<{
  campaign: ICampaign
}>()
</script>

<template>
  <div
    class="flex flex-col pb-2 rounded-lg border cursor-pointer hover:shadow-[0_8px_10px_-4px_rgba(0,0,0,0.3)] hover:transform-y-5"
    @click="router.push({ name: 'projects', params: { id: campaign.id } })"
  >
    <div class="h-52 w-full">
      <img :src="campaign.coverUrl" class="rounded-t-lg w-full h-full" />
    </div>
    <div class="flex flex-col gap-1 px-3 py-2">
      <div>
        <n-ellipsis
          :tooltip="false"
          :line-clamp="2"
          class="text-base font-semibold"
        >
          {{ campaign.title }}
        </n-ellipsis>
      </div>
      <n-ellipsis :tooltip="false" :line-clamp="4" class="h-[84px]">
        {{ campaign.description }}
      </n-ellipsis>
      <div>
        <n-button text>
          <n-avatar round size="small" :src="campaign.user?.avatar" />
          <span class="btn-header ml-2">{{ campaign.user?.username }}</span>
        </n-button>
      </div>
      <div>
        <span>{{ campaign.collectedFunds }}</span>
        <n-progress
          type="line"
          :percentage="getPercent(campaign.collectedFunds, campaign.goal)"
          :indicator-placement="'inside'"
          processing
        />
      </div>
      <div class="flex justify-between">
        <div>
          <i-el-group
            class="inline-block align-middle mr-1 text-lg text-green-600"
          />
          <span class="align-middle">{{ campaign.totalBackers }} 个支持者</span>
        </div>

        <div class="flex items-center gap-1">
          <i-mdi-clock-time-eight
            class="inline-block align-middle text-gray-400"
          />
          <div v-if="campaign.status != 'underway'">
            {{ getStatus(campaign.status) }}
          </div>
          <div v-else>还剩 {{ timeDifference(campaign.endTime as Date) }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.carousel-img {
  width: 100%;
  height: 240px;
  object-fit: cover;
}
</style>
