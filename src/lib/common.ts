import { omit } from 'ramda'
import { uuid, map, dateTime, dateYMDFormat, dateMDFormat, isObject} from '~/utils'
import { EchartData, seriesType,LegendItem, FormatterParams, FormatterTemplate } from '~/logic/echarts/interface'
import safeGet from '@fengqiaogang/safe-get'

export const echartTransform = function(trends?: EchartData): EchartData | undefined {
    if (trends) {
        const legends = map(function(item: LegendItem,i:number) {
            if (!item.type) {
                item.type = seriesType.line
            }
            return item
        },trends.legends)
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
    const detail = safeGet<string>(data, 'data.detail')
    const html = `<span class="ml-1.5 text-xs text-global-highTitle text-opacity-60">${detail}</span>`
    return `${template.icon}${template.name}${template.value}${html}`
}
