// 获取百分比
export const getPercent = (
  num1: number | undefined,
  num2: number | undefined
) => {
  if (!num1 || !num2) {
    return 0
  }
  return Math.floor((num1 / num2) * 100)
}
