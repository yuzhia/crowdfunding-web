<script setup lang="ts">
defineProps<{
  comment: IComment
  pid?: number
  user?: IUser
  forms: []
}>()

const op = inject('OP') as ICampaign

defineEmits<{
  // eslint-disable-next-line no-unused-vars
  (e: 'comment-reply', id: never): void
}>()

// const commentReply = (id: never) => {
//   em('comment-reply', id)
// }
</script>

<template>
  <div class="mb-6">
    <div class="flex">
      <!-- 头像 -->
      <div class="mr-2">
        <img
          v-if="comment.user.avatar"
          :src="comment.user.avatar"
          class="rounded-full border"
          :class="!comment.pid ? 'w-10 h-10' : 'w-8 h-8'"
        />
        <img
          v-else
          src="@/assets/img/avatar.svg"
          class="rounded-full border"
          :class="!comment.pid ? 'w-10 h-10' : 'w-8 h-8'"
        />
      </div>
      <div class="w-full">
        <!-- 名称，时间 -->
        <div
          class="flex justify-between items-center"
          :class="!comment.pid ? 'h-10' : 'h-8'"
        >
          <div class="flex gap-4 items-center">
            <div class="text-green-500 mb-1 text-base">
              {{ comment.user.username }}
            </div>
            <div
              v-if="comment.userId == op?.user?.id"
              class="text-xs py-1 px-2 bg-[#088366] text-white rounded"
            >
              发起人
            </div>
          </div>
          <div class="text-[#7a8087]">
            {{ comment.createTime.replace(/T/g, ' ') }}
          </div>
        </div>
        <!-- 评论 -->
        <div>
          <!-- 过滤掉一级评论和一级回复 -->
          <span v-if="comment.pid && comment.pid !== pid">
            回复 <span class="text-green-500">{{ user?.username }}</span
            >：</span
          >
          <span>
            {{ comment.content }}
          </span>
        </div>
        <!-- 点赞 -->
        <div class="mt-2 flex space-x-3 items-center">
          <div
            class="flex items-center space-x-1 cursor-pointer text-[#999aaa]"
          >
            <n-icon :size="16" class=" ">
              <i-ant-design-like-filled></i-ant-design-like-filled>
            </n-icon>
            <div>点赞</div>
          </div>
          <div
            class="flex items-center space-x-1 cursor-pointer text-[#999aaa]"
            @click="$emit('comment-reply', comment.id)"
          >
            <n-icon :size="16">
              <i-ant-design-message-filled></i-ant-design-message-filled>
            </n-icon>
            <div>
              {{
                forms.length !== 0 &&
                forms.some(item => {
                  return item === comment.id
                })
                  ? '收起'
                  : '回复'
              }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style></style>
