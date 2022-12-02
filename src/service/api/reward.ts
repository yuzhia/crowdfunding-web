import request from '../request'

export const saveReward = (data: any) => {
  return request.post(`/rewards`, data)
}

export const listRewardByCampaignId = (campaignId: number) => {
  return request.get(`/rewards`, { campaignId: campaignId })
}
export const deleteRewardById = (id: number) => {
  return request.delete(`/rewards/${id}`)
}
export const getItems = (campaignId: number) => {
  return request.get(`/rewards/getItems`, { campaignId: campaignId })
}
