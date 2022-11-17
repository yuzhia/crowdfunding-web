import request from '../request'

export const saveOrUpdateStory = (data: any) => {
  return request.post(`/story`, data)
}

export const listUpdatesByCampaignId = (campaignId: number) => {
  return request.get(`/story/updates`, { campaignId: campaignId })
}
