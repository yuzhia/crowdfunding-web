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
    const imglist = ['png', 'jpg', 'jpeg', 'bmp', 'gif']
    result = imglist.find(item => item === ext)
  }
  return result
}
