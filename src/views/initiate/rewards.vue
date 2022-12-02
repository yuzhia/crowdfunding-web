<script setup lang="ts">
import { FormInst, FormRules, UploadFileInfo } from 'naive-ui'
import { saveReward, listRewardByCampaignId, deleteRewardById } from '@/service'

const route = useRoute()

const formRef = ref<FormInst | null>(null)
const rules: FormRules = {}

interface IReward {
  id?: number
  title?: string
  description?: string
  imageUrl?: string
  amount?: number
  limit?: number
  limitPerBacker?: number
  backersCount?: number
  remainingQuantity?: number
  estimatedDeliveryDate?: string
  shippingAddressRequired?: boolean
  shippingType?: number | null
  campaignId?: number
  startTime?: string
  endTime?: string
}

const initReward: IReward = {
  amount: 10,
  shippingType: null,
  limit: 0,
  limitPerBacker: 0
}

const rewards = ref<Array<IReward>>([])
const reward = ref<IReward>(initReward)

// 查询数据
const campaignId = route.params.id as any as number
const getData = () => {
  listRewardByCampaignId(campaignId).then(res => {
    rewards.value = res.data as Array<IReward>
  })
}
getData()

const rewardEditBox = ref(false)
const rewardListBox = ref(true)

const timeRadio = ref(0)

const showEditBox = (flag: boolean) => {
  rewardEditBox.value = flag
  rewardListBox.value = !flag
}

// 点击新增，取消，保存按钮
const handleAddRewardBtn = () => {
  emit('rewardEdit', true)
  reward.value = initReward
  timeRadio.value = 0
  urls.value = []
  showEditBox(true)
}

const handleSaveReward = () => {
  reward.value.campaignId = route.params.id as any
  console.log(reward.value)
  saveReward(reward.value).then(() => {
    getData()
    window.$message.success('保存成功')
    showEditBox(false)
    emit('rewardEdit', false)
  })
}

const handleCancelSaveReward = () => {
  emit('rewardEdit', false)
  showEditBox(false)
}

// 上传
const urls = ref<Array<string>>([])
const updateVal = (file: UploadFileInfo) => {
  if (file.status == 'finished') {
    reward.value.imageUrl = file.url as string
  } else {
    reward.value.imageUrl = ''
  }
}

const shippingFlag = ref(false)

watch(
  () => reward.value.shippingAddressRequired,
  () => {
    if (!reward.value.shippingAddressRequired) {
      reward.value.shippingType = null
    } else {
      if (!reward.value.shippingType) {
        reward.value.shippingType = 0
      }
    }
  }
)

watch(timeRadio, () => {
  if (timeRadio.value == 0) {
    reward.value.startTime = undefined
    reward.value.endTime = undefined
  }
})

// const emit = defineEmits(['rewardEdit'])
const emit = defineEmits<{
  // eslint-disable-next-line no-unused-vars
  (e: 'rewardEdit', flag: boolean): void
}>()

// 编辑
const handleEdit = (id: number) => {
  emit('rewardEdit', true)
  timeRadio.value = 0
  reward.value = { ...rewards.value.find(item => item.id == id) }
  urls.value = []
  if (reward.value.imageUrl) {
    urls.value.push(reward.value.imageUrl)
  }
  if (reward.value.startTime || reward.value.endTime) {
    timeRadio.value = 1
  }
  showEditBox(true)
}

// 复制
const handleCopy = (id: number) => {
  emit('rewardEdit', true)
  timeRadio.value = 0
  reward.value = { ...rewards.value.find(item => item.id == id) }
  reward.value.id = undefined
  urls.value = []
  if (reward.value.imageUrl) {
    urls.value.push(reward.value.imageUrl)
  }
  if (reward.value.startTime || reward.value.endTime) {
    timeRadio.value = 1
  }
  showEditBox(true)
}

const handleDelete = (id: number) => {
  deleteRewardById(id).then(() => {
    window.$message.success('删除成功')
    getData()
  })
}

// radio 改变
const limitChange = (e: Event) => {
  const val = Number((e.target as HTMLInputElement).value)
  reward.value.limit = val
}

const limitPBChange = (e: Event) => {
  const val = Number((e.target as HTMLInputElement).value)
  reward.value.limitPerBacker = val
}
</script>

<template>
  <div>
    <div class="mb-5 text-center">
      <p class="text-2xl font-bold text-green-500">回报</p>
      <p class="text-gray-400 my-2">
        提供简单、有意义的回报，让支持者更接近你的专案，并与你一同庆祝将创意变为现实。
      </p>
    </div>
    <div :class="!rewardListBox ? 'pointer-events-none opacity-30' : ''">
      <div class="flex flex-col md:flex-row justify-between items-center py-4 gap-4">
        <div>
          <div class="text-xl font-bold mb-2">设置回报档</div>
          <div>
            支持设置1-40个档位，一般项目多选择设3-10个回报档。在项目通过审核后，回报档内除时间类设置外，其他设置不支持修改。
          </div>
        </div>
        <div>
          <n-button size="large" @click="handleAddRewardBtn">
            <template #icon>
              <n-icon size="14">
                <i-ep-plus />
              </n-icon>
            </template>
            新回报
          </n-button>
        </div>
      </div>
      <!-- 列表----------------------------------- -->
      <div v-for="item in rewards" :key="item.id" class="mb-8">
        <n-card
          hoverable
          :segmented="{
            footer: true
          }"
        >
          <div class="flex">
            <div class="basis-2/12 text-base font-bold">{{ item.amount }}</div>
            <div class="basis-6/12 space-y-1 px-4">
              <div class="font-bold text-base mb-2">{{ item.title }}</div>
              <div>预计交货：{{ item.estimatedDeliveryDate }}</div>
              <div class="text-red-400">
                <div v-if="item.startTime">开始于 {{ item.startTime }}</div>
                <div v-if="item.endTime">结束语 {{ item.endTime }}</div>
              </div>
              <div class="text-gray-500">
                <div v-if="item.limit">
                  限量（剩余 {{ item.remainingQuantity }} ，总量 {{ item.limit }} )
                </div>
                <div v-if="item.limitPerBacker">限购（每人限 {{ item.limitPerBacker }} 份）</div>
              </div>
            </div>
            <div class="basis-4/12">图片</div>
          </div>
          <template v-if="true" #footer>
            <div class="flex justify-between items-center">
              <div class="text-gray-500 text-sm">{{ item.backersCount }} 名支持者</div>
              <div class="text-base space-x-3">
                <n-button text class="text-gray-500" @click="handleEdit(item.id as number)"
                  >编辑</n-button
                >
                <n-button text class="text-gray-500" @click="handleCopy(item.id as number)"
                  >复制</n-button
                >
                <n-popconfirm
                  :show-icon="false"
                  @positive-click.stop="handleDelete(item.id as number)"
                >
                  <template #trigger>
                    <n-button text class="text-gray-500" @click.stop="">删除</n-button>
                  </template>
                </n-popconfirm>
              </div>
            </div>
          </template>
        </n-card>
      </div>
    </div>

    <div class="flex flex-col">
      <!-- 新增--------------------------------- -->
      <div v-if="rewardEditBox">
        <div class="my-4">
          <div class="text-xl">新增回报</div>
          <div class="text-gray-500">建议设置3-10个档位，项目审核通过后回报档不支持修改。</div>
        </div>
        <div class="flex gap-10">
          <!-- <div class="flex flex-col w-[600px]">
            <div class="mt-10">
              <div class="mb-2">标题</div>
              <n-input></n-input>
            </div>
            <div class="mt-10">
              <div class="mb-2">金额</div>
              <n-input-number :show-button="false"></n-input-number>
            </div>
            <div class="mt-10">
              <div class="mb-2">描述</div>
              <n-input></n-input>
            </div>
          </div> -->
          <div class="w-[600px]">
            <n-form ref="formRef" :model="reward" :rules="rules">
              <n-form-item path="title" label="标题" label-style="font-size: 16px">
                <n-input v-model:value="reward.title" @keydown.enter.prevent />
              </n-form-item>
              <n-form-item path="amount" label="金额" label-style="font-size: 16px">
                <n-input-number
                  v-model:value="reward.amount"
                  :min="10"
                  class="w-full"
                  :show-button="false"
                  @keydown.enter.prevent
                />
              </n-form-item>
              <n-form-item path="description" label="描述" label-style="font-size: 16px">
                <n-input
                  v-model:value="reward.description"
                  type="textarea"
                  @keydown.enter.prevent
                />
              </n-form-item>
              <n-form-item path="imageUrl" label="图片" label-style="font-size: 16px">
                <CosUpload
                  :width="'200px'"
                  :height="'200px'"
                  :urls="urls"
                  @update-val="updateVal"
                />
              </n-form-item>
              <n-form-item path="shipping" label="运输" label-style="font-size: 16px">
                <div>
                  <div class="text-gray-500 mb-2">这个回报包含你需要运输的物品吗？</div>
                  <div>
                    <n-radio-group
                      v-model:value="reward.shippingAddressRequired"
                      name="shippingAddressRequired"
                    >
                      <n-space vertical>
                        <n-radio :value="false">不包含</n-radio>
                        <n-radio :value="true" @click="shippingFlag = true">包含</n-radio>
                      </n-space>
                    </n-radio-group>
                  </div>
                  <div v-if="reward.shippingAddressRequired" class="space-y-2 mt-2">
                    <div class="font-bold">邮费方式</div>
                    <n-radio-group v-model:value="reward.shippingType" name="shippingType">
                      <n-space>
                        <n-radio-button :value="0">包邮</n-radio-button>
                        <n-radio-button :value="1">到付</n-radio-button>
                      </n-space>
                    </n-radio-group>
                  </div>
                </div>
              </n-form-item>
              <n-form-item
                path="estimatedDeliveryDate"
                label="预计交货时间"
                label-style="font-size: 16px"
              >
                <div>
                  <div class="text-gray-500 mb-2">
                    给自己充足的时间。最好提前交付给支持者而非落后于日程。
                  </div>
                  <n-date-picker
                    v-model:formatted-value="reward.estimatedDeliveryDate"
                    type="month"
                    clearable
                  />
                </div>
              </n-form-item>
              <n-form-item path="limit" label="该档位限量总份数" label-style="font-size: 16px">
                <div class="w-full">
                  <n-radio
                    class="w-full border p-3 mb-2"
                    :value="0"
                    name="limit"
                    :checked="reward.limit == 0"
                    @change="limitChange"
                  >
                    不限量
                  </n-radio>
                  <n-radio
                    class="w-full border p-3"
                    :value="100"
                    name="limit"
                    :checked="reward.limit != 0"
                    @change="limitChange"
                  >
                    限量</n-radio
                  >
                  <div v-if="reward.limit !== 0" class="space-y-2 border p-3 border-t-0">
                    <div>档位限量份数</div>
                    <n-input-number
                      v-model:value="reward.limit"
                      :show-button="false"
                    ></n-input-number>
                  </div>
                </div>
              </n-form-item>
              <n-form-item
                path="limit"
                label="同一用户最多购买份数（限购）"
                label-style="font-size: 16px"
              >
                <div class="w-full">
                  <n-radio
                    class="w-full border p-3 mb-2"
                    :value="0"
                    name="limitPerBacker"
                    :checked="reward.limitPerBacker == 0"
                    @change="limitPBChange"
                  >
                    不限量
                  </n-radio>
                  <n-radio
                    class="w-full border p-3"
                    :value="1"
                    name="limitPerBacker"
                    :checked="reward.limitPerBacker != 0"
                    @change="limitPBChange"
                  >
                    限量</n-radio
                  >
                  <div v-if="reward.limitPerBacker !== 0" class="space-y-2 border p-3 border-t-0">
                    <div>同一用户最多购买份数</div>
                    <n-input-number
                      v-model:value="reward.limitPerBacker"
                      :show-button="false"
                    ></n-input-number>
                  </div>
                </div>
              </n-form-item>
              <n-form-item path="limit" label="时间限制" label-style="font-size: 16px">
                <div class="w-full">
                  <n-radio-group v-model:value="timeRadio" name="shippingType1" class="w-full">
                    <n-radio class="w-full border mb-2 p-3" :value="0">无限制</n-radio>
                    <n-radio class="w-full border p-3" :value="1">指定开始和结束</n-radio>
                    <div v-if="timeRadio == 1" class="space-y-2 border p-3 border-t-0">
                      <div>
                        <p class="text-base mb-2">设置开始售卖时间 （选填）</p>
                        <n-date-picker
                          v-model:formatted-value="reward.startTime"
                          type="datetime"
                          clearable
                        />
                        <p class="text-gray-500 mt-1 mb-5">
                          请先设定开始售卖时间，在项目上线前可再次修改
                        </p>
                        <p class="text-base mb-2">设置结束售卖时间（选填）</p>
                        <n-date-picker
                          v-model:formatted-value="reward.endTime"
                          type="datetime"
                          clearable
                        />
                        <p class="text-gray-500 mt-1">
                          可设置在“回报档开售时间”后1分钟 ，在项目上线前可进行修改
                        </p>
                      </div>
                    </div>
                  </n-radio-group>
                </div>
              </n-form-item>
            </n-form>

            <!-- 保存 -->
            <div class="space-x-4 text-right">
              <n-button type="tertiary" @click="handleCancelSaveReward">取消</n-button>
              <n-button type="primary" @click="handleSaveReward">保存</n-button>
            </div>
          </div>

          <!-- 预览--------------------------------- -->
          <div class="w-1/3 hidden md:block">
            <div>回报预览</div>
            <div class="sticky top-20 mt-2">
              <n-card
                embedded
                :segmented="{
                  content: true
                }"
              >
                <template #cover>
                  <img v-if="reward.imageUrl" :src="reward.imageUrl" class="h-[200px]" />
                </template>
                <template #header>
                  <div>
                    <div class="flex justify-between items-center">
                      <p class="text-2xl font-bold">￥{{ reward.amount }}</p>
                      <p v-if="reward.limit" class="text-gray-500 text-base">
                        限 {{ reward.limit }} 份
                      </p>
                    </div>
                    <div v-if="true" class="text-xs ml-1 space-x-2">
                      <n-tag
                        v-if="reward.startTime || reward.endTime"
                        type="success"
                        size="small"
                        :bordered="false"
                        round
                      >
                        限时
                      </n-tag>
                      <n-tag
                        v-if="reward.limit"
                        type="success"
                        size="small"
                        :bordered="false"
                        round
                      >
                        限量
                      </n-tag>
                      <n-tag
                        v-if="reward.limitPerBacker"
                        type="success"
                        size="small"
                        :bordered="false"
                        round
                      >
                        每人限 {{ reward.limitPerBacker }} 份
                      </n-tag>
                    </div>
                  </div>
                </template>
                <div>
                  <div class="space-y-4">
                    <div class="text-base font-bold">{{ reward.title }}</div>
                    <div v-if="true">
                      <div class="text-gray-500 mb-4">{{ reward.description }}</div>
                    </div>
                    <div>预计回报发放时间 {{ reward.estimatedDeliveryDate }}</div>
                  </div>
                </div>
              </n-card>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style></style>
