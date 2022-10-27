import request from '../request'

export const pageQuery = (data: IPage) => {
  return request.post<Array<ICampaign>>(`/campaign/discover`, data)
}

export const createCampaign = (data: any) => {
  return request.post(`/campaign`, data)
}

export const saveDraft = (data: any) => {
  return request.post(`/campaign/saveDraft`, data)
}

export const submitCheck = (data: any) => {
  return request.post(`/campaign/submit`, data)
}

export const startCampaign = () => {
  return request.post(`/campaign/start_campaign`)
}

export const listCampaign = () => {
  return request.get<Array<ICampaign>>(`/campaign`)
}

export const listCampaignByUser = () => {
  return request.get<Array<ICampaign>>(`/campaign/me`)
}

export const getCampaign = (id: any) => {
  return request.get<ICampaign>(`/campaign/${id}`)
}

export const deleteDraft = (tempId: any) => {
  return request.delete(`/campaign/del_draft/${tempId}`)
}

export const deleteCampaign = (id: any) => {
  return request.delete(`/campaign/${id}`)
}
