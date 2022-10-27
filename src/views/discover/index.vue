<script setup lang="ts">
import { pageQuery, listCategory } from '@/service'

const route = useRoute()

const page = ref<IPage>({
  pageNum: 1,
  pageSize: 12
})
const campaigns = ref<Array<ICampaign>>([])
const btnShow = ref(true)

const listData = (data: IPage) => {
  pageQuery(data).then(res => {
    if (res.data.length === 0) {
      btnShow.value = false
    }
    campaigns.value.push(...res.data)
  })
}

const handleLoadMore = () => {
  page.value.pageNum++
  console.log(page.value)
  listData(page.value)
}

const categoryValue = ref('0')
const statusValue = ref('successful')
const sortValue = ref('newest')
const categoryOptions = ref([
  {
    value: '0',
    label: '全部'
  }
])
const statusOptions = ref([
  {
    value: 'all',
    label: '全部'
  },
  {
    value: 'upcoming',
    label: '即将开始'
  },
  {
    value: 'underway',
    label: '众筹中'
  },
  {
    value: 'successful',
    label: '众筹成功'
  }
])
const sortOptions = ref([
  {
    value: 'newest',
    label: '最新上线'
  },
  {
    value: 'most_funded',
    label: '金额最高'
  }
])

listCategory().then(res => {
  categoryOptions.value.push(
    ...res.data.map(item => ({
      value: item.id.toString(),
      label: item.name
    }))
  )
})

const refreshData = () => {
  campaigns.value = []
  page.value.pageNum = 1
  page.value.categoryId =
    categoryValue.value == '0' ? undefined : Number(categoryValue.value)
  page.value.campaignStatus =
    statusValue.value == 'all' ? undefined : statusValue.value
  page.value.sort = sortValue.value
  listData(page.value)
}

watch(
  () => route.query,
  () => {
    categoryValue.value = route.query.category_id as unknown as string
    statusValue.value = route.query.status as unknown as string
    sortValue.value = route.query.sort as unknown as string
    refreshData()
  },
  { immediate: true, deep: true }
)

watchEffect(() => {
  const newUrl = `?category_id=${categoryValue.value}&status=${statusValue.value}&sort=${sortValue.value}`
  history.pushState({}, '', newUrl)
})

const handleCategory = () => {
  page.value.categoryId =
    categoryValue.value == '0' ? undefined : Number(categoryValue.value)
  refreshData()
}
const handleStatus = () => {
  page.value.campaignStatus =
    statusValue.value == 'all' ? undefined : statusValue.value
  refreshData()
}
const handleSort = () => {
  page.value.sort = sortValue.value
  refreshData()
}
</script>

<template>
  <div>
    <div
      class="flex flex-col justify-center gap-3 items-center h-60 text-center text-white bg-gray-500"
    >
      <p class="text-3xl font-bold">创造性的作品</p>
      <p>
        对于各地的创意寻求者,欢迎选择你感兴趣的项目进行,他们正期待着你的支持。
      </p>
    </div>
    <div class="flex flex-col gap-10 max-w-7xl mx-auto">
      <div class="flex mt-10 gap-4 w-1/3 mx-auto">
        <n-select
          v-model:value="categoryValue"
          remote
          :options="categoryOptions"
          @update:value="handleCategory"
        />
        <n-select
          v-model:value="statusValue"
          :options="statusOptions"
          @update:value="handleStatus"
        />
        <n-select
          v-model:value="sortValue"
          :options="sortOptions"
          @update:value="handleSort"
        />
      </div>
      <div class="w-full">
        <!-- <div class="w-full mb-10">
          <n-input
            class="text-xl py-1 sm:(w-max-50)"
            type="text"
            clearable
            placeholder="搜索你感兴趣的活动"
          >
            <template #prefix>
              <i-ic-baseline-search class="w-6 h-6" />
            </template>
          </n-input>
        </div> -->

        <div class="w-full flex flex-wrap">
          <div
            v-for="item in campaigns"
            :key="item.id"
            class="w-full sm:w-1/2 lg:w-1/3 p-2 sm:p-4 lg:p-5"
          >
            <CampaignCard :campaign="item" />
          </div>
        </div>
      </div>
    </div>
    <div v-if="btnShow" class="flex justify-center">
      <n-button type="primary" size="large" @click="handleLoadMore"
        >加载更多</n-button
      >
    </div>
  </div>
</template>

<style></style>
