interface IFaq {
  id?: number
  question: string
  answer: string
  campaignId: number
}

interface IAsset {
  id?: number
  fileId?: string
  url: string
  type: string
  campaignId: number
}

interface IPerk {
  id?: number
  title: string
  description?: string
  price?: number
  num?: number | null
  limitPurchase?: number | null
  imageUrl: string
  returnDate?: string
  campaignId?: number
}

interface ICampaign {
  id?: number
  title: string
  description: string
  goal?: number
  coverUrl: string
  categoryId?: number
  status: string
  story: string
  duration?: number
  createTime?: string
  faqs: IFaq[]
  assets: Array<IAsset>
  perks: Array<IPerk>
  user?: IUser
  count?: number
  collectedFunds?: number
  totalBackers?: number
  remainDay?: number
  endTime?: string
}

interface IPage {
  pageNum: number
  pageSize: number
  categoryId?: number
  campaignStatus?: string
  sort?: string
}
