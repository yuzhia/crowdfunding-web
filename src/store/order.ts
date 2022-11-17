import { defineStore } from 'pinia'

export const useOrderStore = defineStore('order', {
  state: () => ({
    orderCampaign: {} as ICampaign,
    orderPerkId: 0
  }),
  persist: true,
  getters: {},
  actions: {}
})
