export * from './date'
export * from './validate'
export * from './number'
export * from './storage'

import { REGEXP_YOUTUBE } from '@/common'

export function getStatus(status: string) {
  if (status !== '已发布') {
    return 'Ended'
  }
  return 'Funding'
}

export function getExt(ext: string | undefined | null) {
  let result
  if (ext) {
    ext = ext.split('/')[1].toLocaleLowerCase()
    const imglist = ['png', 'jpg', 'jpeg', 'bmp', 'gif', 'webp']
    result = imglist.find(item => item === ext)
  }
  return result
}

export function getVideoId(url: string) {
  const mat = url.match(REGEXP_YOUTUBE)
  if (mat && mat.length > 0) {
    return mat[1]
  }
  return ''
}
