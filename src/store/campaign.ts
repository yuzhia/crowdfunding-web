import { ICampaign } from '@/service/types/campaign'
import { defineStore } from 'pinia'

export const useCampaignStore = defineStore('campaign', {
  state: () => ({
    campaign: {} as ICampaign,
    currentStatus: '',
    initiate: false
  }),
  getters: {},
  actions: {}
})
