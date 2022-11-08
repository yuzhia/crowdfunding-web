<script setup lang="ts">
import { queryComment } from '@/service'
import Content from './Content.vue'
import Input from './Input.vue'
import { useMainStore, useUserStore } from '@/store'

const mainStore = useMainStore()
const userStore = useUserStore()

const props = defineProps<{
  campaignId: number
}>()

let comments: any = ref([])

watchEffect(() => {
  mainStore.inputFlag
  queryComment(props.campaignId).then(res => {
    comments.value = res.data
  })
})

// form 表单显示隐藏
const forms = ref([] as any)

const hasForm = (id: never) => {
  if (forms.value.includes(id)) {
    deleteForm(id)
  } else {
    forms.value = []
    forms.value.push(id)
  }
}

// 删除表单
const deleteForm = (id: never) => {
  const index = forms.value.indexOf(id)
  index > -1 && forms.value.splice(index, 1)
}

// 获取被回复用户的信息
const getPUser = (replyComments: any, reply: any) => {
  const filter = replyComments.filter(
    (replyComment: any) => replyComment.id === reply.pid
  )
  if (filter.length > 0) {
    return filter[0].user
  }
}
</script>

<template>
  <div class="mx-auto h-full p-4">
    <!-- 评论 -->
    <div class="flex mt-2 items-start mb-14">
      <div class="mr-2">
        <img
          v-if="userStore.user.avatar"
          :src="userStore.user.avatar"
          class="w-12 h-12 rounded-full border"
        />
        <img
          v-else
          src="@/assets/img/avatar.svg"
          class="w-12 h-12 rounded-full border"
        />
      </div>
      <Input class="w-full" :is-root="true" />
    </div>
    <!-- 回复 -->
    <div v-for="item in comments" :key="item.id" class="p-2">
      <Content
        :user="item.user"
        :comment="item"
        :forms="forms"
        @comment-reply="hasForm"
      />
      <div class="mt-2" :class="item.pid === 0 ? 'ml-12' : 'ml-10'">
        <Input
          v-if="forms.includes(item.id as never)"
          :user="item.user"
          :replay-id="item.id"
          @form-delete="deleteForm"
        />
      </div>

      <!-- 二级回复 -->
      <div
        v-for="replay in item.replyComments"
        v-show="item.replyComments.length"
        :key="replay.id"
        class="ml-12 p-2 bg-[#fafafa]"
      >
        <Content
          :comment="replay"
          :forms="forms"
          :pid="item.id"
          :user="getPUser(item.replyComments, replay)"
          @comment-reply="hasForm"
        />
        <div class="mt-2" :class="replay.pid === 0 ? 'ml-12' : 'ml-10'">
          <Input
            v-if="forms.includes(replay.id as never)"
            :user="replay.user"
            :replay-id="replay.id"
            @form-delete="deleteForm"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style></style>
