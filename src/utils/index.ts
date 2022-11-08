export * from './date'
export * from './validate'
export * from './number'
export * from './storage'

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
  const reg = /(?:https?:\/\/)?(?:www\.)?youtube.*watch\?v=((\w|-){11})(?:\S+)?/
  const mat = url.match(reg)
  if (mat && mat.length > 0) {
    return mat[1]
  }
  return ''
}
