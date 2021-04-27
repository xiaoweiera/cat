//@ts-ignore
import {formatTimeHour, numberFormat, toFixedNumber, tooptipsModel} from '~/lib/tool'
//@ts-ignore
import {tableConfig} from '~/logic/apy/config'

export interface chartModel {
    code: number
    data: object
}

export const getXY_data = (requestChartData: chartModel, tableIndex: number, chartIndex: number, selected: string) => {
    //@ts-ignore
    const data = tableConfig[tableIndex].charts[chartIndex].chartData(requestChartData.data, selected)
    //@ts-ignore
    return tableConfig[tableIndex].charts[chartIndex].xyData(data)
}
export const getSerise = (yData: any) => {
    if (!yData) {
        return
    }
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
}
export const getModel = (params: any) => {
    if (!params[0]) {
        return
    }
    const title = params[0].axisValue;
    let f = tooptipsModel;
    const time = `<div>${title}</div>`
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
export const yLabelFormat = (num: any) => numberFormat(num, true)


export const getPlat = (chartData: any, tableIndex: number, chartIndex: number) => tableConfig[tableIndex].charts[chartIndex].platData(chartData)
