export const timeDifference = (endTime: Date) => {
  if (!endTime) {
    return 0
  }
  const nowTime = new Date()
  const restSec = new Date(endTime).getTime() - nowTime.getTime()

  const day = Math.floor(restSec / (60 * 60 * 24 * 1000))

  const hour = Math.floor((restSec / (60 * 60 * 1000)) % 24)

  const minu = Math.floor((restSec / (60 * 1000)) % 60)

  const sec = Math.round((restSec / 1000) % 60)
  if (day >= 1) {
    return day + ' 天'
  }
  if (hour >= 1) {
    return hour + ' 小时'
  }
  if (minu >= 1) {
    return hour + ' 分钟'
  }
  if (sec >= 1) {
    return hour + ' 秒'
  }

  return 0
}
