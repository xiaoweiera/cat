import * as R from 'ramda'
import { CoinModel, HeaderModel, OptionModel, RowModel } from '~/types/apy'

interface CellRenderModel {
  name: string
  key: string
  status: boolean
  value?: string
}

/**
 * 单个元内具体内容
 * @param option 点击控制选项
 * @param cellOrigin 单元格对应的数据
 * @return {CellRenderModel} 格式化后的单元格内容
 */
const cellContent = (
  option: OptionModel,
  cellOrigin: CoinModel | undefined,
): CellRenderModel => {
  const obj: CellRenderModel = {
    name: option.name,
    key: option.key,
    status: option.status,
  }
  // 对应单元格内没有数据
  if (!cellOrigin) {
    return obj
  }
  // @ts-ignore
  const val = cellOrigin[option.key]
  if (option.format_func) {
    // @ts-ignore
    obj.value = option.format_func(val)
  } else if (option.format_cb) {
    // @ts-ignore
    obj.value = option.format_cb(cellOrigin)
  } else {
    obj.value = val || '-'
  }
  return obj
}

/**
 * 格式化表格显示内容
 * @param headers {HeaderModel[]} 表头
 * @param rows {RowModel[]} 具体内容
 * @param options {OptionModel[]} 点击选项
 * @return {Array[Object]}
 */
export const filterByOptions = (
  headers: HeaderModel[],
  rows: RowModel[],
  options: OptionModel[],
  key: string,
  type: string,
) => {
  if (key) {
    const getProp = R.curry((propName: string, obj: any) => obj && obj[propName] ? obj[propName] : type === 'asc' ? obj[propName]===0?1:999999 : null)
    const optionSingle=options.find(item=>item.key==='single_and_mine_award')
    const orderKey=optionSingle?'single_and_mine_award':'compound_and_mine_award'
    console.log(orderKey)
    const getApy = R.compose(getProp(orderKey), getProp(key), getProp('data'))
    const sortF = type === 'asc'
      ? R.ascend
      : R.descend
    // @ts-ignore
    rows = R.sortWith([sortF(getApy)])(rows)
  }
  return rows
    ? rows.map((row) => {
      return {
        // @ts-ignore
        project_name: row.project_name,
        // @ts-ignore
        icon: row.icon,
        chain: row.chain,
        online_time:row.online_time,
        // @ts-ignore
        url: row.url,
        data: headers?.map(({ token_name }: { token_name: String }) => {
          // @ts-ignore
          const cellOrigin = row.data[token_name] as any
          return {
            high_light: cellOrigin
              ? cellOrigin.high_light
              : false,
            single_high_light: cellOrigin
                ? cellOrigin.single_high_light
                : false,
          compound_high_light:  cellOrigin
              ? cellOrigin.compound_high_light
              : false,
            data: options.map((opt) => cellContent(opt, cellOrigin)),
          }
        }),
      }
    })
    : []
}
