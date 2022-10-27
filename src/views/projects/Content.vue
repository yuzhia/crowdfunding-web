<script setup lang="ts">
defineProps<{
  comment: Object
  pid?: number
  user?: Object
  forms: []
}>()

defineEmits<{
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
          :class="comment.pid === 0 ? 'w-10 h-10' : 'w-8 h-8'"
        />
        <img
          v-else
          src="@/assets/img/avatar.svg"
          class="rounded-full border"
          :class="comment.pid === 0 ? 'w-10 h-10' : 'w-8 h-8'"
        />
      </div>
      <div class="w-full">
        <!-- 名称，时间 -->
        <div
          class="flex justify-between items-center"
          :class="comment.pid === 0 ? 'h-10' : 'h-8'"
        >
          <div class="text-green-500 mb-1 text-base">
            {{ comment.user.username }}
          </div>
          <div class="text-[#7a8087]">
            {{ comment.createTime.replace(/T/g, ' ') }}
          </div>
        </div>
        <!-- 评论 -->
        <div>
          <!-- 过滤掉一级评论和一级回复 -->
          <span v-if="comment.pid !== 0 && comment.pid !== pid">
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
