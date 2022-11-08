<script setup lang="ts">
const route = useRoute()
const router = useRouter()
const valueRef = ref('profile')

onMounted(() => {
  valueRef.value = route.name as string
})

watch(
  () => route.name,
  () => {
    valueRef.value = route.name as string
  }
)

const updateValue = (value: string | number) => {
  router.push({ name: value as string })
}
</script>

<template>
  <div class="px-5 sm:px-10 md:px-20 lg:px-30 xl:px-40 mt-10">
    <div class="text-5xl font-bold mb-6">设置</div>
    <n-tabs
      v-model:value="valueRef"
      type="line"
      size="large"
      class="mb-5"
      @update:value="updateValue"
    >
      <n-tab name="profile">个人资料 </n-tab>
      <n-tab name="account"> 账户</n-tab>
      <n-tab name="address"> 地址 </n-tab>
      <n-tab name="notifications"> 通知 </n-tab>
      <n-tab name="campaigns"> 活动 </n-tab>
    </n-tabs>
    <router-view />
  </div>
</template>

<style scoped></style>
