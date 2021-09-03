import { omit, pick } from 'ramda'
import { uuid, map, dateTime, dateYMDFormat, dateYMDHmFormat, isObject, convertInterval, dateFormat } from '~/utils'
import { EchartData, seriesType,LegendItem, FormatterParams, FormatterTemplate } from '~/logic/echarts/interface'
import safeGet from '@fengqiaogang/safe-get'
import DBList from '@fengqiaogang/dblist'


export const echartTransform = function(trends?: EchartData): EchartData | undefined {
    if (trends) {
        const interval = convertInterval(safeGet<string>(trends, 'interval') || '1D')
        //@ts-ignore
        const legends = map(function(item: LegendItem, index:number) {
            const data = { ...item }
            // 未设置图形类型
            if (!data.type) {
                // 默认折线图
                data.type = seriesType.line
            }
            return data
        }, trends.legends)

        const xAxis = map(function(date: number) {
            const time = dateTime(date)
            if (interval.type === 'h') {
                const date = dateYMDHmFormat(time)
                return { time, date, value: dateFormat(time, 'MM/DD HH:mm') }
            } else {
                const date = dateYMDFormat(time)
                return { time, date, value: date }
            }
        }, trends.xAxis)

        const db = new DBList(legends, 'id')
        const series = map(function(list: Array<string | number>, id: string) {
            const legend = db.selectOne<LegendItem>({ id })
            const unit = safeGet<string>(legend, 'unit') || ''
            return map(function(value: string | number | object, index: number) {
                if (isObject(value)) {
                    return Object.assign({ unit }, pick(['time', 'date'], xAxis[index]), value)
                }
                return { value, unit, ...pick(['time', 'date'], xAxis[index]) }
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
