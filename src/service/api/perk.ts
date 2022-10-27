import request from '../request'

export const savePerk = (data: any) => {
  return request.post(`/perk`, data)
}
