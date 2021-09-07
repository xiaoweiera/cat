import { omit, pick } from 'ramda'
import { uuid, map, dateTime, dateYMDFormat, dateYMDHmFormat, isObject, convertInterval, dateFormat } from '~/utils'
import { EchartData, seriesType,LegendItem, FormatterParams, FormatterTemplate, YAxis } from '~/logic/echarts/interface'
import safeGet from '@fengqiaogang/safe-get'
import DBList from '@fengqiaogang/dblist'
import { formatRulesNumber } from '~/lib/tool'
import iconFont from '~/logic/icon/index'


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
            const project = safeGet<string>(legend, 'project') || ''
            const chain=safeGet<string>(legend, 'chain') || ''
            const project_category=safeGet<string>(legend, 'project_category') || ''
            const strategy_tags=safeGet<string>(legend, 'strategy_tags') || ''
            return map(function(value: string | number | object, index: number) {
                if (isObject(value)) {
                    return Object.assign({ unit,project,chain,project_category,strategy_tags }, pick(['time', 'date'], xAxis[index]), value)
                }
                return { value, unit,project,chain,project_category,strategy_tags, ...pick(['time', 'date'], xAxis[index]) }
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
    const chain=safeGet<string>(data, 'data.chain') || ''
    const apy=safeGet<string>(data, 'data.value') || ''
    const unit=safeGet<string>(data, 'data.unit') || ''
    const project=safeGet<string>(data, 'data.project') || ''
    const project_category=safeGet<string>(data, 'data.project_category') || ''
    const strategy_tags=safeGet<string>(data, 'data.strategy_tags') || ''
    // const apyUnit=unit==='$'?unit+apy:apy+unit
    //@ts-ignore
    const chainImg= iconFont({
        type: chain,
        size: 14,
        className: 'ml-2'
    })
    const apyHtml=`<span class="text-kd12px16px text-global-highTitle ml-1">:${unit==='$'?unit+formatRulesNumber(apy,false):formatRulesNumber(apy,false)+unit}</span>`
    //@ts-ignore
    const typeImg= iconFont({
        type: project_category,
        size: 14,
        className: 'ml-2'
    })
    const nameHtml=`<span class="font-kdExp ml-1 text-kd12px16px text-global-highTitle ">${template.name}</span>`
    const projectHtml=`<span class="font-kdExp ml-1 text-kd12px18px text-global-highTitle text-opacity-65">${project}</span>`
    const tagsHtml=strategy_tags?`<span  class="text-kd12px14px text-global-highTitle text-opacity-45 rounded-kd4px bg-global-highTitle bg-opacity-6 px-1 ml-1 py-0.5">${strategy_tags}</span>`:''
    return `${template.icon}${nameHtml}${projectHtml}${chainImg}${typeImg}${tagsHtml}${apyHtml}`
}
