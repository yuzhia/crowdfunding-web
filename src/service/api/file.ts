import request from '../request'

export const imageUpload = (data: any) => {
  return request.post<any>('/image/upload', data)
}

export const batchUpload = (data: any) => {
  return request.post<any>('/image/uploads', data)
}
