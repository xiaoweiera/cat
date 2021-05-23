import I18n from '~/utils/i18n/index'

export const uuid = function(): string {
  return String(Math.random())
}

export const getMax = function(array: number[]): number {
  return Math.max.apply(null, array)
}
export const getMin = function(array: number[]): number {
  return Math.min.apply(null, array)
}

export const makeDescription = function(data: any): string {
  const max = getMax(data.reward)
  const min = getMin(data.reward)
  // 奖励模版
  const minValue = I18n.template('奖励 {count} MDX', { count: min })
  const maxValue = I18n.template('最多可得 {count} MDX', { count: max })
  if (max === min) {
    return I18n.template(data.description, { reward: `<i>${minValue}</i>` })
  }
  return I18n.template(data.description, {
    reward: `<i>${minValue}，${maxValue}</i>`,
  })
}