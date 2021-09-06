import { omit, pick } from 'ramda'
import { uuid, map, dateTime, dateYMDFormat, dateYMDHmFormat, isObject, convertInterval, dateFormat } from '~/utils'
import { EchartData, seriesType,LegendItem, FormatterParams, FormatterTemplate, YAxis } from '~/logic/echarts/interface'
import safeGet from '@fengqiaogang/safe-get'
import DBList from '@fengqiaogang/dblist'
import {chainsIcon} from '~/logic/apy2/config'
import {tolocaleLowerCase,getIconType} from '~/lib/tool'
export const echartTransform = function(trends?: EchartData): EchartData | undefined {
    if (trends) {
        const interval = convertInterval(safeGet<string>(trends, 'interval') || '1D')
        const yAxis: YAxis = {
            left: '',
            right: ''
        }
        //@ts-ignore
        const legends = map(function(item: LegendItem, index:number) {
            const data = { ...item }
            // 未设置图形类型
            if (!data.type) {
                // 默认折线图
                data.type = seriesType.line
            }
            if (item.unit) {
                if (item.kline) {
                    yAxis.right = item.unit
                } else {
                    yAxis.left = item.unit
                }
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
            const chain=safeGet<string>(legend, 'chain') || ''
            console.log(chain,'-----')
            const project_category=safeGet<string>(legend, 'project_category') || ''
            const strategy_tags=safeGet<string>(legend, 'strategy_tags') || ''
            return map(function(value: string | number | object, index: number) {
                if (isObject(value)) {
                    return Object.assign({ unit,chain,project_category,strategy_tags }, pick(['time', 'date'], xAxis[index]), value)
                }
                return { value, unit,chain,project_category,strategy_tags, ...pick(['time', 'date'], xAxis[index]) }
            }, list)
        }, trends.series)
        return Object.assign({
            yAxis,
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

export const chartFormatterAll = function(template: FormatterTemplate, data: FormatterParams) {
    const detail = safeGet<string>(data, 'data.detail') || ''
    const chain=safeGet<string>(data, 'data.chain') || ''
    const project_category=safeGet<string>(data, 'data.project_category') || ''
    const strategy_tags=safeGet<string>(data, 'data.strategy_tags') || ''
    //@ts-ignore
    const chainHtml=`<span><IconFont size="14" type="${chainsIcon[tolocaleLowerCase(chain)]}"/></span>`
    const typeHtml=`<span><IconFont size="14" type="${getIconType(project_category)}"/></span>`
    const tagsHtml=strategy_tags?`<span  class="text-kd12px14px text-global-highTitle text-opacity-45 rounded-kd4px bg-global-highTitle bg-opacity-6 px-1 ml-1 py-0.5">${strategy_tags}</span>`:''
    console.log(chainHtml,typeHtml)
    const html = detail? `<span  class="ml-1.5 text-xs text-global-highTitle text-opacity-60">(${detail})</span>`:``
    return `${template.icon}${template.name}${chainHtml}${template.value}${tagsHtml}${html}`
}
