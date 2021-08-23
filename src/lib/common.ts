import { omit } from 'ramda'
import { map, dateTime, dateYMDFormat, dateMDFormat, isObject} from '~/utils'
import { EchartData, seriesType,LegendItem } from '~/logic/echarts/interface'

export const echartTransform = function(trends?: EchartData): EchartData | undefined {
    if (trends) {
        map((item:LegendItem)=>(item.type=item.type || seriesType.line),trends?.legends)
        const xAxis = map(function(date: number) {
            const time = dateTime(date)
            const key = dateYMDFormat(time)
            const value = dateMDFormat(time)
            return { key, time, value }
        }, trends?.xAxis)
        const series = map(function(list: Array<string | number>) {
            return map(function(value: string | number) {
                return isObject(value)? value: { value }
            }, list)
        }, trends?.series)
        return Object.assign({
            xAxis,
            series,
        }, omit(['xAxis', 'series'], trends))
    }
}