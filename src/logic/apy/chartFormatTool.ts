import {formatTimeHour, toFixedNumber, numberFormat} from '~/lib/tool'
import {getChart, getChartByMoney} from "~/api/apy";
import * as R from 'ramda'

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
//第一个图表
export const getChartProjectData = (data: projectItem[], selected: string) => data?.find((item: any) => item.project_name === selected)
//第二个图表
export const getChartTokenData = (data: tokenItem[], selected: string) => data?.find((item: any) => item.token_name === selected)

//得到x轴y轴
interface chartItem {
    project_name: string
    data: projectItem[]
}

const getxyDataWithField = (data: chartItem, field: String) => {
    if (!data) return {}
    //@ts-ignore

    let min = 0
    let max = 0
    //@ts-ignore
    const [xItems, result] = getDataByTime(data.data, field)
    let xData = xItems.map((item: any) => formatTimeHour(item))
    //@ts-ignore
    let yData = result.map((item: tokenItem) => {
        return {
            // @ts-ignore
            name: item.name,
            // @ts-ignore
            yData: item.y_axis.map((yValue: any) => {
                if (yValue) {
                    min = min === 0 ? yValue : getMin(min, yValue)
                    max = max === 0 ? yValue : getMax(max, yValue)
                }
                return {
                    value: toFixedNumber(yValue, 2),
                    formatValue: numberFormat(yValue, true)
                }
            })
        }
    })
    return {xData, yData, min, max}
}
// //@ts-ignore  第一个第二个图
// const getDataByTime = (data: tokenItem[],field:string) => {
//     let allTime = []
//     let newData=[]
//     //获取所有的xTime
//     R.map((item: tokenItem) => {
//         //@ts-ignore
//         R.map((time: string) => {
//            if(!allTime.includes(time)) allTime.push(time)
//         }, item.x_axis)
//     }, data)
//     allTime = R.sort((a, b) => a - b, allTime);
//     R.map((item: tokenItem) => {
//         let NewYData=[]
//         //@ts-ignore
//         R.map((time: string) => {
//             let yValue=null
//             //@ts-ignore
//             item.x_axis.map((itemX,i)=>{
//                 if(time===itemX){
//                     //@ts-ignore
//                     yValue=item.y_axis[i]
//                 }
//             })
//             NewYData.push(yValue)
//         }, allTime)
//         //@ts-ignore
//         newData.push({name:item[field],y_axis:NewYData})
//     }, data)
//     return [allTime,newData]
// }
// //@ts-ignore  第三个图
// const getDataByTimeMark = (data: projectItem[]) => {
//     let allTime = []
//     let newData=[]
//     //获取所有的xTime
//     R.map((item: projectItem) => {
//         //@ts-ignore
//         R.map((time: string) => {
//             if(!allTime.includes(time)) allTime.push(time)
//         }, item.x_axis)
//     }, data)
//     allTime = R.sort((a, b) => a - b, allTime);
//     R.map((item: projectItem) => {
//         let NewYData=[]
//         //@ts-ignore
//         R.map((time: string) => {
//             let yValue=null
//             //@ts-ignore
//             item.x_axis.map((itemX,i)=>{
//                 if(time===itemX){
//                     //@ts-ignore
//                     yValue=item.y_axis[i]
//                 }
//             })
//             NewYData.push(yValue)
//         }, allTime)
//         //@ts-ignore
//         newData.push({name:item.project_name,y_axis:NewYData})
//     }, data)
//     return [allTime,newData]
// }


const getDataByTime = (data, field) => {
    const xItems = R.sort((a, b) => a - b, R.uniq(R.flatten(R.map(i => i.x_axis, data))))
    const result = R.map(i => {
        return {
            name: i[field],
            y_axis:
                R.map(date => {
                    let idx = i.x_axis.indexOf(date)
                    if (idx) {
                        return i.y_axis[idx]
                    }
                    return null
                }, xItems),
        }
    }, data)
    console.log('值',result)
    return [xItems, result]
}


//得到xy轴 第一个表
export const getxyData = (data: chartItem) => getxyDataWithField(data, 'token_name')
//得到xy轴 第二个表
export const getCoinData = (data: chartItem) => getxyDataWithField(data, 'project_name')
//第三个表
export const getInfoData = (data: any) => {
    if (!data) return
    let min = 0
    let max = 0
    //@ts-ignore
    const [xItems, result] = getDataByTime(data, 'project_name')
    let xData = xItems.map((item: any) => formatTimeHour(item))
    let yData = result.map((item: projectItem) => {
        //@ts-ignore
        let yData = item.y_axis.map((yValue: any) => {
            if (yValue) {
                min = min === 0 ? yValue : getMin(min, yValue)
                max = max === 0 ? yValue : getMax(max, yValue)
            }
            return {
                value: toFixedNumber(yValue, 2),
                formatValue: numberFormat(yValue, true)
            }
        })
        return {name: item.name, yData: yData}
    })
    return {xData, yData, min, max}
}
const getMin = (min: number, yValue: any) => min < yValue ? min : yValue
const getMax = (max: number, yValue: any) => max > yValue ? max : yValue
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
export const requestLendData = async (param: requestItem) => (await getChart(param))?.data
export const requestLoanData = async (param: requestItem) => (await getChart(param))?.data
export const requestGunData = async (param: requestItem) => (await getChartByMoney(param))?.data


