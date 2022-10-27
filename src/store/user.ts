import { defineStore } from 'pinia'
import { getInfo } from '@/service'

export const useUserStore = defineStore('user', {
  state: () => ({
    user: {} as IUser,
    token: ''
  }),
  persist: true,
  getters: {},
  actions: {
    getUserInfo() {
      getInfo().then(res => {
        this.user = res.data as IUser
      })
    }
  }
})
