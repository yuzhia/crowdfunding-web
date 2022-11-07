import request from '../request'

// 用户登录
export const login = (data: ILoginReq) => {
  return request.post<ILoginResp>(`/user/doLogin`, data)
}

export const getInfo = () => {
  return request.get<IUser>(`/user/info`)
}

export const changeProfile = (data: any) => {
  return request.put(`/user`, data)
}

export const changeUserPwd = (data: any) => {
  return request.put(`/user/change_pwd`, data)
}
