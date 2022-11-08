interface IComment {
  id: number
  content: string
  pid: number
  userId: number
  user: IUser
  createTime: string
}
