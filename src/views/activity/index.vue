<script setup lang="ts">
const route = useRoute()
const router = useRouter()
const valueRef = ref('campaigns')

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
    <div class="text-5xl font-bold mb-6">活动</div>
    <n-tabs
      v-model:value="valueRef"
      type="line"
      size="large"
      class="mb-5"
      @update:value="updateValue"
    >
      <n-tab name="campaigns"> 活动 </n-tab>
      <n-tab name="backers"> 支持 </n-tab>
      <n-tab name="follows"> 关注 </n-tab>
      <n-tab name="profile"> 设置 </n-tab>
    </n-tabs>
    <router-view />
  </div>
</template>

<style scoped>
.active {
  color: rgba(5, 150, 105);
  --tw-bg-opacity: 1;
  background-color: rgba(209, 250, 229, var(--tw-bg-opacity));
}
</style>
