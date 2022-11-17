<script setup lang="ts">
import { listCampaignByUser, deleteCampaign } from '@/service'
import { useCampaignStore } from '@/store'

const campaignStore = useCampaignStore()

const router = useRouter()

const campaignList = ref<Array<ICampaign>>()

const list = () => {
  listCampaignByUser().then(res => {
    campaignList.value = res.data
  })
}

list()

const handleDeleteCampaign = (id: any) => {
  deleteCampaign(id).then(() => {
    list()
    window.$message.success('删除成功')
  })
}

const handleClick = (id: number, status: string) => {
  campaignStore.currentStatus = status
  if (status == '草稿' || status == '审核中') {
    router.push(`/initiate/${id}`)
  } else {
    router.push(`/projects/${id}`)
  }
}

const handleUpdate = (id: number) => {
  router.push(`/projects/${id}/updates`)
}
</script>

<template>
  <div class="flex flex-col flex-1 w-full">
    <div class="border p-6 rounded-xl bg-white space-y-5">
      <div>
        <p class="text-2xl">您发起的活动</p>
        <p class="tracking-widest mb-4 my-2">
          活动可不是简简单单的发起就会成功的。
        </p>
      </div>
      <!-- 列表 -->
      <div
        v-for="item in campaignList"
        :key="item.id"
        class="flex flex-col md:flex-row space-y-4 md:space-x-4"
      >
        <hr />
        <img
          :src="item.coverUrl"
          class="w-60 h-40 object-cover rounded-lg cursor-pointer shrink-0"
          @click="handleClick(item.id as number, item.status)"
        />
        <div class="w-full flex flex-col">
          <p
            class="text-xl cursor-pointer"
            @click="handleClick(item.id as number, item.status)"
          >
            {{ item.title }}
          </p>
          <!-- 中间 -->
          <n-ellipsis
            :tooltip="false"
            :line-clamp="4"
            class="text-base text-gray-500 my-2 flex-1"
          >
            <p>{{ item.description }}</p>
          </n-ellipsis>
          <!-- 底部 -->
          <div class="flex justify-between items-center">
            <div class="space-x-1">
              <n-tag>
                {{ item.status }}
              </n-tag>
              <n-time
                :time="new Date(item.createTime as string)"
                class="hidden lg:inline-block self-center"
                format="yy年M月d日h时"
              />
            </div>
            <div class="space-x-1">
              <n-button @click="router.push(`/initiate/${item.id}`)"
                >编辑</n-button
              >

              <n-popconfirm
                :show-icon="false"
                @positive-click.stop="handleDeleteCampaign(item.id)"
              >
                <template #trigger>
                  <n-button @click.stop="">删除</n-button>
                </template>
              </n-popconfirm>
              <n-button @click="handleUpdate(item.id as number)">更新</n-button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style></style>
