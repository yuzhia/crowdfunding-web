import request from '../request'

export const queryComment = (
  campaignId: any,
  postId: any,
  pageNum: number,
  pageSize: number
) => {
  return request.get(`/comment/query`, {
    campaignId: campaignId,
    postId: postId,
    pageNum: pageNum,
    pageSize: pageSize
  })
}

export const saveComment = (data: any) => {
  return request.post(`/comment`, data)
}
