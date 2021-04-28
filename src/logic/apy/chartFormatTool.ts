import {formatTimeHour, toFixedNumber,numberFormat} from '~/lib/tool'
import {getChart, getChartByMoney} from "~/api/apy";

interface lendModel {
    total_supply: projectItem[]
}

interface loanModel {
    total_borrowed: projectItem[]
}

interface gunModel {
    reward_cap: projectItem[]
    tvl: projectItem[]
    machine_gun_pool_single_avg_apy: projectItem[]
}

interface requsetProjectModel {
    code: number,
    data: projectItem[]
}

interface requsetTokenModel {
    code: number,
    data: tokenItem[]
}

interface projectItem {
    project_name: string
    x_axis: object
    y_axis: object
}

interface tokenItem {
    token_name: string
    x_axis: object
    y_axis: object
}

export interface tableCofigModel {
    name: string
    title: string
    options: object
    charts: chartModel[]
}

export interface chartModel {
    title: string
    chartData: Function
    xyData: Function
}

export interface newModel {
    title: string
}

//------------------第n个table的第三个表----------------
export const lendDataFormat = (data: lendModel) => data.total_supply
export const loanDataFormat = (data: loanModel) => data.total_borrowed
export const gunDataFormat = (data: gunModel, selected: string) => {
    if (selected === 'TVL') {
        return data.tvl
    }
    if (selected === '用户总收益') {
        return data.reward_cap
    }

    return data.machine_gun_pool_single_avg_apy
}
//-----------------------------------------------------

//第一个图表
export const getChartProjectData = (data: projectItem[], selected: string) => data.find((item: any) => item.project_name === selected)
//第二个图表
export const getChartTokenData = (data: tokenItem[], selected: string) => data.find((item: any) => item.token_name === selected)


//得到x轴y轴
interface chartItem {
    project_name: string
    data: projectItem[]
}

const getxyDataWithField = (data: chartItem, field: String) => {
    //@ts-ignore
    let xData = data.data[0].x_axis.map((item: any) => formatTimeHour(item))
    let min=0
    let max=0
    //@ts-ignore
    let yData = data.data.map((item: tokenItem) => {
        return {
            // @ts-ignore
            name: item[field],
            // @ts-ignore
            yData: item.y_axis.map((yValue: any) => {
                if(yValue){
                    min=min===0?yValue:getMin(min,yValue)

                    max=max===0?yValue:getMax(max,yValue)
                }
                return {
                    value:toFixedNumber(yValue, 2),
                    formatValue:numberFormat(yValue,true)
                }
            })
        }
    })
    return {xData, yData,min,max}
}

//得到xy轴 第一个表
export const getxyData = (data: chartItem) => getxyDataWithField(data, 'token_name')
//得到xy轴 第二个表
export const getCoinData = (data: chartItem) => getxyDataWithField(data, 'project_name')
//第三个表
export const getInfoData = (data: any) => {
    if (!data) return
    //@ts-ignore
    let xData = data[0].x_axis.map((item: any) => formatTimeHour(item))
    let min=0
    let max=0
    let yData = data.map((item: projectItem) => {
        //@ts-ignore
        let yData = item.y_axis.map((yValue: any) => {
            if(yValue){
                min=min===0?yValue:getMin(min,yValue)
                max=max===0?yValue:getMax(max,yValue)
            }

            return {
                value: toFixedNumber(yValue, 2),
                formatValue:numberFormat(yValue,true)
            }
        })
        return {name: item.project_name, yData: yData}
    })
    return {xData, yData,min,max}
}
const getMin=(min:number,yValue:any)=>min<yValue?min:yValue
const getMax=(max:number,yValue:any)=>max>yValue?max:yValue
//获取平台列表--筛选
export const getProjectPlat = (data: requsetProjectModel) => data.data.map((item: projectItem) => item['project_name'])
export const getTokenPlat = (data: requsetTokenModel) => data.data.map((item: tokenItem) => item['token_name'])
export const getInfoPlat = () => []
export const getInfoHasPlat = () => ['TVL', '用户总收益', '平均APY']

interface requestItem {
    chain: string
    category: string
    keyWord1: string
    keyWord2: string
}

//接口请求
export const requestLendData = async (param: requestItem) =>  (await getChart(param))?.data
export const requestLoanData = async (param: requestItem) => (await getChart(param))?.data
export const requestGunData = async (param: requestItem) => (await getChartByMoney(param))?.data


