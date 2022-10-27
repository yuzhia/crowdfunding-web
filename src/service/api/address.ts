import request from '../request'

export const saveAddress = (data: any) => {
  return request.post(`/address`, data)
}

export const getAddressList = () => {
  return request.get(`/address/list`)
}

export const setDefault = (id: any) => {
  return request.put(`/address/${id}/default`)
}

export const deleteAddress = (id: any) => {
  return request.delete(`/address/${id}`)
}
