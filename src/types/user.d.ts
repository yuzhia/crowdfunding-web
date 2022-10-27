interface IUser {
  id: number
  username: string
  email: string
  urls: string
  avatar: string
}

interface ILoginReq {
  username: string
  password: string
}

interface ILoginResp {
  user: IUser
  tokenValue: string
}

interface IUserAccount {
  email: string
  password?: string
  newPassword?: string
  reenteredPassword?: string
}
