<script setup lang="ts">
import Comment from './Comment.vue'

defineProps<{
  storyList: []
}>()

const postId = ref()

const updatesAll = ref(true)
const currentUpdate = ref()
const handleClick = (data: any) => {
  currentUpdate.value = data
  postId.value = data.id
  updatesAll.value = false
}
</script>

<template>
  <div>
    <!-- 所有 -->
    <div v-if="updatesAll">
      <div v-for="item in storyList" :key="item.id" class="mb-10 border p-6">
        <!-- 头像 -->
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-3">
            <n-avatar round :size="50" :src="item.user.avatar"></n-avatar>
            <div class="flex flex-col">
              <div>{{ item.user.username }}</div>
              <div class="text-[#6a6a6a]">
                {{ item.createTime.replace('T', ' ') }}
              </div>
            </div>
          </div>
          <div>
            <n-time :time="new Date(item.createTime)" type="relative" />
          </div>
        </div>
        <!-- 内容 -->
        <div class="mt-5 py-5 border-y space-y-2">
          <div class="text-xl font-bold">{{ item.title }}</div>
          <n-ellipsis
            class="w-full"
            line-clamp="3"
            expand-trigger="click"
            :tooltip="false"
          >
            <div v-html="item.htmlContent"></div>
          </n-ellipsis>
        </div>
        <!-- 评论 -->
        <div
          class="mt-5 mt-5 text-green-500 cursor-pointer py-2 px-4"
          @click="handleClick(item)"
        >
          评论
        </div>
      </div>
    </div>
    <!-- 单个更新 -->
    <div v-else>
      <div
        text
        class="mb-4 flex items-center cursor-pointer"
        @click="updatesAll = true"
      >
        <i-ep-arrow-left class="mr-1" />
        <span class="text-green-500 hover:underline">查看所有更新</span>
      </div>
      <div class="mb-10 border p-6">
        <!-- 头像 -->
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-3">
            <n-avatar
              round
              :size="50"
              :src="currentUpdate.user.avatar"
            ></n-avatar>
            <div class="flex flex-col">
              <div>{{ currentUpdate.user.username }}</div>
              <div class="text-[#6a6a6a]">
                {{ currentUpdate.createTime.replace('T', ' ') }}
              </div>
            </div>
          </div>
          <div>
            <n-time
              :time="new Date(currentUpdate.createTime)"
              type="relative"
            />
          </div>
        </div>
        <!-- 内容 -->
        <div class="mt-5 py-5 border-y space-y-2">
          <div class="text-xl font-bold">{{ currentUpdate.title }}</div>
          <n-ellipsis
            class="w-full"
            line-clamp="3"
            expand-trigger="click"
            :tooltip="false"
          >
            <div v-html="currentUpdate.htmlContent"></div>
          </n-ellipsis>
        </div>
        <!-- 评论 -->
        <div class="mt-5">评论</div>
      </div>

      <!-- 留言 -->
      <div class="space-y-2">
        <div class="text-lg font-bold">留言</div>
        <p class="text-center p-5 bg-gray-100">只有支持者才能留言</p>
        <Comment :post-id="postId" />
      </div>
    </div>
  </div>
</template>

<style></style>
