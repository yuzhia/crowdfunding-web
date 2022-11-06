<script setup lang="ts">
import { UploadFileInfo } from 'naive-ui'
import { Ref } from 'vue'

const campaign = inject<Ref<ICampaign>>('campaign') as Ref<ICampaign>

const initPerk: IPerk = {
  title: '',
  description: '',
  imageUrl: '',
  price: undefined,
  returnDate: undefined,
  campaignId: campaign.value.id
}

const showModalRef = ref(false)

// 解构才能初始化
const perk = ref<IPerk>({ ...initPerk })
const perks = campaign.value.perks as IPerk[]

let editIndex = -1
const saveBtn = () => {
  // 解构使数据失去响应式
  if (editIndex === -1) {
    perks.push({ ...perk.value })
  } else {
    perks[editIndex] = { ...perk.value }
  }
  showModalRef.value = false
}

const urls = ref<Array<string>>([])

const editPerk = (index: number) => {
  perk.value = { ...perks[index] }
  perk.value.num ? (limitNumRadio.value = 1) : (limitNumRadio.value = 0)
  perk.value.limitPurchase
    ? (limitPurcharseRadio.value = 1)
    : (limitPurcharseRadio.value = 0)
  showModalRef.value = true
  editIndex = index
  // 回显图片
  urls.value = []
  urls.value.push(perk.value.imageUrl)
}

const removePerk = (index: number) => {
  perks.splice(index, 1)
}

const addBtn = () => {
  urls.value = []
  Object.assign(perk.value, initPerk)
  limitNumRadio.value = 0
  limitPurcharseRadio.value = 0
  showModalRef.value = true
  editIndex = -1
}

const limitPurcharse = [
  { value: 0, label: '不限购' },
  { value: 1, label: '限购' }
]
const limitNum = [
  { value: 0, label: '不限量' },
  { value: 1, label: '限量' }
]

const limitPurcharseRadio = ref(0)
const limitNumRadio = ref(0)

const onConfirm = (value: string | null) => {
  perk.value.returnDate = value as string
}

const handleClick = () => {
  console.log(campaign.value)
}

const updateVal = (file: UploadFileInfo) => {
  if (file.status == 'finished') {
    perk.value.imageUrl = file.url as string
  } else {
    perk.value.imageUrl = ''
  }
}
</script>

<template>
  <div>
    <div class="mb-5">
      <p class="text-2xl font-bold text-green-500">回报</p>
      <p class="text-gray-400 my-2">
        津贴是向支持者提供的奖励，以换取他们的支持。你可以编辑你的特惠细节，直到申请特惠为止。
        访问帮助中心，了解您可以提供的各种福利。
        很好，你的活动被很多人看好，我们都希望有一个方式支持你，能够把活动做的更好，授人玫瑰手留余香，也别忘了回报哦。
      </p>
    </div>
    <n-button class="mb-4" @click="addBtn">新增</n-button>
    <n-table :bordered="false" :single-line="false">
      <thead>
        <tr>
          <th>标题</th>
          <th>金额</th>
          <th>限量</th>
          <th>限购</th>
          <th>回报发放日期</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in perks" :key="index">
          <td>{{ item.title }}</td>
          <td>{{ item.price }}</td>
          <td>{{ item.num }}</td>
          <td>{{ item.limitPurchase }}</td>
          <td>{{ item.returnDate }}</td>
          <td>
            <n-button @click="editPerk(index)">编辑</n-button>
            <n-button @click="removePerk(index)">删除</n-button>
          </td>
        </tr>
      </tbody>
    </n-table>

    <n-button @click="handleClick">按钮</n-button>

    <n-modal v-model:show="showModalRef">
      <n-card
        class="w-[95%] md:w-[650px]"
        title="新增支持激励"
        :bordered="false"
        role="dialog"
        aria-modal="true"
      >
        <n-form
          label-placement="left"
          label-width="auto"
          require-mark-placement="right-hanging"
        >
          <n-form-item label="标题">
            <n-input v-model:value="perk.title" placeholder="输入标题" />
          </n-form-item>
          <n-form-item label="描述">
            <n-input
              v-model:value="perk.description"
              type="textarea"
              placeholder="输入描述"
            />
          </n-form-item>
          <n-form-item label="图片">
            <CosUpload :urls="urls" @update-val="updateVal" />
          </n-form-item>
          <n-form-item label="金额">
            <n-input-number v-model:value="perk.price" :show-button="false">
              <template #prefix> ￥ </template>
            </n-input-number>
          </n-form-item>
          <n-form-item label="限量">
            <n-radio-group v-model:value="limitNumRadio" size="large">
              <n-space>
                <n-radio-button
                  v-for="song in limitNum"
                  :key="song.value"
                  :value="song.value"
                  :label="song.label"
                />
                <n-input-number
                  v-if="limitNumRadio === 1"
                  v-model:value="perk.num"
                  :show-button="false"
                  placeholder="输入总份数"
                  :min="1"
                  size="small"
                ></n-input-number>
              </n-space>
            </n-radio-group>
          </n-form-item>
          <n-form-item label="限购">
            <n-radio-group v-model:value="limitPurcharseRadio" size="large">
              <n-space>
                <n-radio-button
                  v-for="song in limitPurcharse"
                  :key="song.value"
                  :value="song.value"
                  :label="song.label"
                />
                <n-input-number
                  v-if="limitPurcharseRadio === 1"
                  v-model:value="perk.limitPurchase"
                  :show-button="false"
                  :min="1"
                  placeholder="同一用户最多购买份数"
                  size="small"
                ></n-input-number>
              </n-space>
            </n-radio-group>
          </n-form-item>
          <n-form-item label="回报发放日期">
            <n-date-picker
              v-model:formatted-value="perk.returnDate"
              type="month"
              clearable
              @update:formatted-value="onConfirm"
            />
          </n-form-item>
        </n-form>

        <div class="w-full flex">
          <n-button class="ml-auto" @click="saveBtn">保存</n-button>
        </div>
      </n-card>
    </n-modal>
  </div>
</template>

<style></style>
