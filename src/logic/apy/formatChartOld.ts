//@ts-ignore
import {formatTimeHour, numberFormat, toFixedNumber, tooptipsModel} from '~/lib/tool'
//@ts-ignore
import { tableConfig } from '~/logic/apy/config'
// import {reactive, ref} from 'vue'
interface chartTag{
    name:String,
    select:Boolean
}
interface chartModel{
    code:number
    data:object
}
export const getXY_data = (chartData:chartModel,tableIndex:number,chartIndex: number, selected: string) => {

    const data=tableConfig[tableIndex].charts[chartIndex].chartData(chartData.data,selected)
    const {xData,yData}tableConfig[tableIndex].charts[chartIndex].getxyData(data)


    const x_data = ref([])
    const y_data = ref([])
    //@ts-ignore
    const allData: any = chartData.data
    //根据props选择的平台进行筛选
    let platData
    if (chartIndex !== 2) {
        platData = allData.find((item:any) => {
                if (chartIndex === 0) {
                    return item.project_name === selected
                } else if (chartIndex === 1) {
                    return item.token_name === selected
                } else {
                    return item.token_name === selected
                }
            }
        )
    } else {
        //@ts-ignore
        if (tableIndex === 0) {
            //@ts-ignore
            platData = allData.total_supply
        } else if (tableIndex === 1) {
            //@ts-ignore
            platData = allData.total_borrowed
        } else {
            //@ts-ignore
            if(selected==='TVL'){
                platData = allData.tvl
            }else if(selected==='用户总收益'){
                platData=allData.reward_cap
            }else{
                platData=allData.machine_gun_pool_avg_apy
            }

        }
    }
    //得到x轴y轴
    if (chartIndex === 0) {
        x_data.value = platData.data[0].x_axis.map((item: any) => {
            return formatTimeHour(item)
        })
        y_data.value = platData.data.map((item: any) => {
            let yData = item.y_axis.map((itemTwo: any) => {
                return {
                    value: toFixedNumber(itemTwo, 2)
                }
            })
            return {yData: yData}
        })
    } else if (chartIndex === 1) {
        //@ts-ignore
        x_data.value = platData.data[0].x_axis.map((item: any) => {
            return formatTimeHour(item)
        })
        y_data.value = platData.data.map((item: any) => {
            let yData = item.y_axis.map((itemTwo: any) => {
                return {
                    value: toFixedNumber(itemTwo, 2)
                }
            })
            return {yData: yData}
        })
    } else {
        x_data.value = platData[0].x_axis.map((item: any) => {
            return formatTimeHour(item)
        })
        y_data.value = platData.map((item: any) => {
            let yData = item.y_axis.map((itemTwo: any) => {
                return {
                    value: toFixedNumber(itemTwo, 2)
                }
            })
            return {name: item.project_name, yData: yData}
        })
    }
    return {x_data, y_data}
}
export const getSerise = (yData: any) => {
    try {
        return yData.map((item: any) => {
            return {
                name: item.name,
                type: "line",
                symbol: "none",
                barCategoryGap: "35%",
                connectNulls: true,
                smooth: true,
                //@ts-ignore
                lineStyle: {width: 1},
                data: item.yData
            }
        })
    }catch{

    }
}
export const getModel = (params: any) => {
    if (!params[0]) {
        return
    }
    const title = params[0].axisValue;
    let f = tooptipsModel;
    let time = `<div>${title}</div>`
    //@ts-ignore
    const result = params.map(({seriesName, data, seriesIndex: idx, color}) => {
        let {value} = data;
        if (value) {
            return f(seriesName, color, value);
        }
    });
    return time + result.join('');
}
//@ts-ignore
export const yLabelFormat = (num: any) => {
    const param = numberFormat(num, true);
    //@ts-ignore
    return param;
}
export const getChartTag = (data: any, tableIndex: number, chartIndex: number) => {
    const tagList = ref([])
    if (chartIndex === 0) {
        tagList.value = data.data.map((item: any) => item.project_name)
    } else if (chartIndex === 1) {
        tagList.value = data.data.map((item: any) => item.token_name)
    } else {
        //@ts-ignore
        tagList.value =tableIndex===2? ['TVL', '用户总收益', '平均APY']:[]
    }
    return tagList
}