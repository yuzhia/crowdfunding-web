/**
 * 还剩多少时间
 * @param endTime 结束时间
 * @returns
 */
export const timeDifference = (endTime: string | undefined) => {
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

/**
 * 获取年月
 * @returns 2022-02
 */
export const getYearMonth = () => {
  const date = new Date()
  const year = date.getFullYear()
  const month = date.getMonth()

  let m = (month + 1).toString()
  if (m.length == 1) {
    m = '0' + m
  }
  return year + '-' + m
}

/**
 * 计算几天前
 * @param startTime 开始时间
 * @returns
 */
function getDateDiff(startTime: string) {
  // 时间字符串转时间戳
  var timestamp = new Date(startTime).getTime()
  var minute = 1000 * 60
  var hour = minute * 60
  var day = hour * 24
  var halfamonth = day * 15
  var month = day * 30
  var year = day * 365
  var now = new Date().getTime()
  var diffValue = now - timestamp
  var result
  if (diffValue < 0) {
    return
  }
  var yearC = diffValue / year
  var monthC = diffValue / month
  var weekC = diffValue / (7 * day)
  var dayC = diffValue / day
  var hourC = diffValue / hour
  var minC = diffValue / minute
  if (yearC >= 1) {
    result = '' + Math.floor(yearC) + '年前'
  } else if (monthC >= 1) {
    result = '' + Math.floor(monthC) + '月前'
  } else if (weekC >= 1) {
    result = '' + Math.floor(weekC) + '周前'
  } else if (dayC >= 1) {
    result = '' + Math.floor(dayC) + '天前'
  } else if (hourC >= 1) {
    result = '' + Math.floor(hourC) + '小时前'
  } else if (minC >= 1) {
    result = '' + Math.floor(minC) + '分钟前'
  } else result = '刚刚'
  return result
}
