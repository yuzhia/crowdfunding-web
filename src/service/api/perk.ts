import request from '../request'

export const savePerk = (data: any) => {
  return request.post(`/perk`, data)
}

export const listByCampaignId = (campaignId: number) => {
  return request.get(`/perk`, { campaignId: campaignId })
}

export const getByPerkId = (perkId: number) => {
  return request.get(`/perk/${perkId}`)
}
