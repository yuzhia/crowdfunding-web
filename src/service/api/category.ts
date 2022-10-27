import request from '../request'

export const listCategory = () => {
  return request.get<Array<ICategory>>(`/categories`)
}
