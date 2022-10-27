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
    <n-tabs
      v-model:value="valueRef"
      type="line"
      size="large"
      class="mb-5"
      @update:value="updateValue"
    >
      <n-tab name="profile">个人资料 </n-tab>
      <n-tab name="account"> 账户</n-tab>
      <n-tab name="campaign"> 活动 </n-tab>
      <n-tab name="support"> 支持 </n-tab>
      <n-tab name="address"> 地址 </n-tab>
    </n-tabs>
    <router-view />
  </div>
  <!-- <div class="flex max-w-screen-xl space-x-20 mx-auto">
    <div class="flex flex-col text-lg space-y-5 mt-16">
      <router-link
        to="/profile"
        class="flex pl-8 py-3 pr-40 rounded-r-full hover:bg-gray-200"
        :class="route.name == 'profile' ? 'active' : ''"
      >
        <i-carbon-user-avatar-filled-alt class="h-7 w-7 self-center mr-3" />
        <p>个人信息</p>
      </router-link>
      <router-link
        to="/profile/campaign"
        class="flex pl-8 py-3 pr-40 rounded-r-full hover:bg-gray-200"
        :class="route.name == 'profile-campaign' ? 'active' : ''"
      >
        <i-fluent-people-community-16-filled class="h-7 w-7 self-center mr-3" />
        <p>活动</p>
      </router-link>
      <router-link
        to="/profile/support"
        class="flex pl-8 py-3 pr-40 rounded-r-full hover:bg-gray-200"
        :class="route.name == 'profile-support' ? 'active' : ''"
      >
        <i-uil-feedback class="h-7 w-7 self-center mr-3" />
        <p>支持</p>
      </router-link>
      <router-link
        to="/logout"
        class="flex pl-8 py-3 pr-40 rounded-r-full hover:bg-gray-200"
        :class="route.name == 'index' ? 'active' : ''"
      >
        <i-mdi-logout class="h-7 w-7 self-center mr-3" />
        <p>注销</p>
      </router-link>
    </div>
    <router-view></router-view>
  </div> -->
</template>

<style scoped>
.active {
  color: rgba(5, 150, 105);
  --tw-bg-opacity: 1;
  background-color: rgba(209, 250, 229, var(--tw-bg-opacity));
}
</style>
