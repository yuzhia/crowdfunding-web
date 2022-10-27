<script setup lang="ts">
import { useUserStore, useMainStore } from '@/store'
import { saveComment } from '@/service'
import { onClickOutside } from '@vueuse/core'

const route = useRoute()

interface IComment {
  campaignId: number
  content: string
  pid?: number
}

const userStore = useUserStore()
const content = ref('')

const props = defineProps<{
  replayId?: number
  isRoot?: boolean
  user?: IUser
}>()

const onSubmit = () => {
  const comment: IComment = {
    campaignId: Number(route.params.id),
    content: content.value,
    pid: props.replayId
  }
  saveComment(comment as any).then(() => {
    content.value = ''
    handleBlur()
    const mainStore = useMainStore()
    mainStore.inputFlag = !mainStore.inputFlag
  })
}

const em = defineEmits<{
  (e: 'form-delete', id: never): void
}>()

const handleBlur = () => {
  em('form-delete', props.replayId as never)
}

const inputBox = ref()
const input = ref<HTMLInputElement>()

onMounted(() => {
  input.value?.focus()
})

onClickOutside(inputBox, () => {
  // 点击外区域，不是评论框才执行
  if (!props.isRoot) {
    console.log('执行了clickOut')
    handleBlur()
  }
})
</script>

<template>
  <div ref="inputBox">
    <n-input
      ref="input"
      v-model:value="content"
      type="textarea"
      :autosize="{ minRows: 2 }"
      :placeholder="
        userStore.token
          ? user
            ? '回复：' + user.username
            : '写一个评论'
          : '请登录后再发表评论'
      "
      :autofocus="true"
    />
    <div class="flex flex-row-reverse mt-4">
      <n-button @click="onSubmit">发表</n-button>
    </div>
  </div>
</template>

<style></style>
