/**
 * @file 表格数据
 */

import { omit } from 'ramda'
import { forEach, map, toNumber, uuid } from '~/utils'
import safeSet from '@fengqiaogang/safe-set'
import DBList from '@fengqiaogang/dblist'
import * as API from '~/api/index'
import { SymbolType } from '~/logic/apy2/interface'
import { echartTransform } from '~/lib/common'
import { colors } from '~/logic/echarts/colors'
import { EchartData, LegendItem, SeriesItem, seriesType } from '~/logic/echarts/interface'
import safeGet from '@fengqiaogang/safe-get'

const transform = function(db: DBList, list: any[], pid: string = '0') {
  let maxLength = 0
  forEach(function(row: any) {
    if (maxLength < row.max_length) {
      maxLength = row.max_length
    }
    const data = omit(['table_data', 'max_length'], row)
    const id = uuid()
    safeSet(data, 'uuid', id)
    safeSet(data, 'pid', pid)
    safeSet(data, 'expand', false)
    db.insert(data)
    forEach(function(item: any) {
      safeSet(item, 'pid', id)
      safeSet(item, 'uuid', uuid(`${id} - ${Math.random()}`))
      // 特别处理，设置 apy 数据类型
      safeSet(item, SymbolType.name, SymbolType.Apy)
      db.insert(item)
    }, row.table_data)
  }, list)
  return { db, maxLength }
}

export const getTableList = async function(db: DBList, query: Object = {}) {
  const page = safeGet<number>(query, 'page') || 10
  const result = await API.apy.table.getList<any>({ page, ...query })
  const size = result.length
  const empty = size <= 0
  const data = transform(db, result)
  if (size < page) {
    return { ...data, empty, next: false }
  }
  return { ...data, empty, next: true }
}


export const getTableExpandList = async function (db: DBList, query: any) {
  const { uuid } = query
  const data = db.selectOne<any>({ uuid })
  if (data) {
    const { symbol_alias } = data
    const list = await API.apy.table.getExpandList<any>(Object.assign({ symbol_alias }, omit(['uuid'], query)))
    const result = transform(db, list, uuid)
    forEach(function(item: any) {
      if (item[SymbolType.name] !== SymbolType.Apy) {
        db.update(item, {
          [SymbolType.name]: SymbolType.Child,
          visibility: true
        })
      }
    }, db.select({ pid: uuid }))
    return result
  }
  return { db }
}

// 弹窗详情
export const getDetail = async function(query: object) {
  return await API.apy.table.getDetail(query)
}

// 池子走势图
export const getPoolTrends = async function(query: object) {
  const data = await API.apy.table.trends<EchartData>(query)
  return echartTransform(data)
}

export const getTop5 = async function(query: object) {
  const result: any = await API.apy.table.top5(query)
  let apy_max = result.apy_max
  const chart = new EchartData()
  chart.key = uuid()
  const legend: LegendItem = {
    name: '',
    show: false,
    id: 'top5',
    type: seriesType.bar
  }
  forEach(function(item: any) {
    const { project } = item
    chart.xAxis.push({ value: project })
  }, result.data)

  const series: SeriesItem[] = map(function(item: any, index: number) {
    const apy = toNumber(item.apy)
    if (apy > apy_max) {
      apy_max = apy
    }
    return {
      value: apy,
      itemStyle: {
        color: colors[index]
      }
    }
  }, result.data)

  chart.legends.push(legend)
  chart.series[legend.id] = series
  return { chart, max: apy_max }
}

// 池子 Top5 对比
export const getPoolDiff = async function(query: object) {
  const result = await API.apy.table.diff<EchartData>(query)
  return echartTransform(result)
}
