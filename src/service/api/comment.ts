import request from '../request'

export const queryComment = (campaignId: any) => {
  return request.get(`/comment`, { campaignId })
}

export const saveComment = (data: any) => {
  return request.post(`/comment`, data)
}
