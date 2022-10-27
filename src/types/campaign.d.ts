interface IFaq {
  id?: number
  question: string
  answer: string
  campaignId: number
}

interface IAsset {
  id?: number
  fileId: string
  url: string
  type: string
  campaignId: number
}

interface IPerk {
  id?: number
  title: string
  description?: string
  price?: number
  num?: number
  limitPurchase?: number
  imageUrl: string
  returnDate?: string
  campaignId?: number
}

interface ICampaign {
  id?: number
  title: string
  description: string
  money?: number
  coverUrl: string
  categoryId?: number
  status: string
  story: string
  day?: number
  createTime?: string
  faqs: IFaq[]
  assets: Array<IAsset>
  perks: Array<IPerk>
  user?: IUser
  count?: number
  supportMoney?: number
  supporter?: number
  money?: number
  remainDay?: number
}

interface IPage {
  pageNum: number
  pageSize: number
  categoryId?: number
  campaignStatus?: string
  sort?: string
}
