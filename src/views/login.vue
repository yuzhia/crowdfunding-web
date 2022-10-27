<script setup lang="ts">
import { login } from '@/service'
import { useUserStore } from '@/store'

const userStore = useUserStore()
const router = useRouter()

const userInput = ref(false)
const passInput = ref(false)

const user: ILoginReq = reactive({
  username: '',
  password: ''
})

const handleLogin = () => {
  login(user).then(res => {
    userStore.token = res.data?.tokenValue as string
    userStore.user = res.data?.user as IUser
    // 跳转首页·
    router.push('/index')
    window.$message.success('登录成功')
  })
}
</script>

<template>
  <img
    src="@/assets/img/wave.png"
    class="hidden md:block fixed bottom-0 left-0 h-full -z-10"
  />
  <div class="flex w-screen h-screen gap-x-28 items-center px-10">
    <div class="hidden md:flex flex-1 justify-end">
      <img class="w-[300px] lg:w-[500px] h-full" src="@/assets/img/bg.svg" />
    </div>
    <div class="flex flex-1 grow text-center justify-cente">
      <form action="" class="w-full md:w-[360px]">
        <img class="h-20 mx-auto" src="@/assets/img/avatar.svg" />
        <div class="my-5 text-3xl font-bold">WelCome！</div>
        <!-- 输入框 -->
        <div>
          <div
            class="input-div flex justify-center items-center"
            :class="{ focus: userInput }"
          >
            <div
              class="w-1/12 text-[#d9d9d9] duration-300"
              :class="{ 'text-[#38d39f]': userInput }"
            >
              <i-fa-solid-user></i-fa-solid-user>
            </div>
            <div class="w-11/12 h-11 relative">
              <div class="text">用户名</div>
              <!-- 用户名 -->
              <input
                v-model="user.username"
                type="text"
                class="absolute left-0 top-0 w-full h-full border-none outline-none px-3 py-2 bg-transparent text-xl"
                @focus="userInput = true"
                @blur="user.username ? user.username : (userInput = false)"
              />
            </div>
          </div>
          <div
            class="input-div flex justify-center items-center mt-9"
            :class="{ focus: passInput }"
          >
            <div
              class="w-1/12 text-[#d9d9d9] duration-300"
              :class="{ 'text-[#38d39f]': passInput }"
            >
              <i-fa6-solid-lock></i-fa6-solid-lock>
            </div>
            <div class="w-11/12 h-11 relative">
              <div class="text">密码</div>
              <!-- 密码 -->
              <input
                v-model="user.password"
                type="password"
                class="absolute left-0 top-0 w-full h-full border-none outline-none px-3 py-2 bg-transparent text-xl"
                @focus="passInput = true"
                @blur="user.password ? user.password : (passInput = false)"
                @keyup.enter="handleLogin"
              />
            </div>
          </div>
          <a
            href="#"
            class="block mt-1 text-right text-[#999] text-base transition hover:text-[#38d39f]"
            >忘记密码？</a
          >
          <input
            type="button"
            value="登录"
            class="btn"
            :disabled="user.username === '' || user.password === ''"
            @click="handleLogin"
          />
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>
.input-div {
  position: relative;
  border-bottom: 2px solid #d9d9d9;
}
.input-div::before,
.input-div::after {
  content: '';
  /* 绝对定位 */
  position: absolute;
  bottom: -2px;
  width: 0%;
  height: 2px;
  background-color: #38d39f;
  transition: 0.4s;
}

.input-div::before {
  right: 50%;
}

.input-div::after {
  left: 50%;
}

.input-div.focus::before,
.input-div.focus::after {
  width: 50%;
}

.input-div > div > .text {
  /* 绝对定位 */
  position: absolute;
  left: 10px;
  top: 50%;
  transform: translateY(-50%);
  color: #999;
  font-size: 18px;
  transition: 0.3s;
}

.input-div.focus > div > .text {
  top: -5px;
  font-size: 15px;
  /* font-weight: bold; */
}

.btn {
  display: block;
  width: 100%;
  height: 50px;
  border-radius: 25px;
  outline: none;
  border: none;
  background-image: linear-gradient(to right, #32be8f, #32b39f, #32be8f);
  background-size: 200%;
  font-size: 1.2rem;
  color: #fff;
  font-family: 'Poppins', sans-serif;
  text-transform: uppercase;
  margin: 1rem 0;
  /* 鼠标放上变小手 */
  cursor: pointer;
  transition: 0.5s;
}

.btn:hover {
  background-position: right;
}
</style>
