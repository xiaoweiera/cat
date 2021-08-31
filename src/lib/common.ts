import { omit, filter } from 'ramda'
import { uuid, map, dateTime, dateYMDFormat, dateMDFormat, isObject, toArray } from '~/utils'
import { EchartData, seriesType,LegendItem, FormatterParams, FormatterTemplate } from '~/logic/echarts/interface'
import safeGet from '@fengqiaogang/safe-get'

const some = function(list: LegendItem[]) {
    const array: LegendItem[] = toArray(list)
    return function(name: string): boolean {
        const value = filter((item: LegendItem) => item.name === name, array)
        return value.length > 1
    }
}


export const echartTransform = function(trends?: EchartData): EchartData | undefined {
    if (trends) {
        //@ts-ignore
        const app = some(trends.legends || [])
        const legends = map(function(item: LegendItem, index:number) {
            const data = { ...item }
            // 未设置图形类型
            if (!data.type) {
                // 默认折线图
                data.type = seriesType.line
            }
            // if (app(data.name)) {
            //     data.name = `${data.name}(${index + 1})`
            // }
            return data
        }, trends.legends)
        const xAxis = map(function(date: number) {
            const time = dateTime(date)
            const key = dateYMDFormat(time)
            const value = dateMDFormat(time)
            return { key, time, value }
        }, trends.xAxis)
        const series = map(function(list: Array<string | number>) {
            return map(function(value: string | number) {
                return isObject(value)? value: { value }
            }, list)
        }, trends.series)
        return Object.assign({
            xAxis,
            series,
            legends,
            key: uuid(),
        }, omit(['xAxis', 'series', 'legends'], trends))
    }
}

export const chartFormatter = function(template: FormatterTemplate, data: FormatterParams) {
    const detail = safeGet<string>(data, 'data.detail') || ''
    const html = detail? `<span  class="ml-1.5 text-xs text-global-highTitle text-opacity-60">(${detail})</span>`:``
    return `${template.icon}${template.name}${template.value}${html}`
}
