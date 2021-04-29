const grid = () => {
    return {
        bottom: 0,
        left: 0,
        right: 15,
        top: '10%',
        containLabel: true
    };
};

const tooltips = (getModel: Function, unit: string) => {
    return {
        padding: [8, 10, 8, 10],
        trigger: "axis",
        extraCssText: "z-index:21",
        backgroundColor: "rgba(255, 255, 255, 0.8);",
        textStyle: {
            color: "black"
        },
        borderWidth: 1.5,
        borderColor: "rgba(0, 0, 0, 0.06)",
        formatter: (params: any) => getModel(params, unit)
    };
};

const graphic = () => {
    return [
        {
            type: "group",
            bounding: "raw",
            right: "49%",
            bottom: "65%",
            z: -100,
            children: [
                {
                    type: "text",
                    left: "center",
                    top: "center",
                    z: 100,
                    style: {
                        fill: "rgba(43, 140, 255, 0.08)",
                        text: "KingData.com",
                        font: "bold 22px sans-serif"
                    }
                }
            ]
        }
    ];
};

const xAxis = (xData: any) => {
    return [
        {
            axisTick: {
                show: false //隐藏刻度线
            },
            axisLine: {
                show: false //不显示坐标轴线
            },
            splitLine: {
                //网格线
                lineStyle: {
                    type: "dotted" //设置网格线类型 dotted：虚线   solid:实线
                },
                show: false //隐藏或显示
            },
            type: "category",
            data: xData,
            align: "left",
            splitNumber: 3,
            axisLabel: {
                align: "left",
                // showMinLabel: false,
                showMaxLabel: false,
                splitNumber: 1,
                textStyle: {
                    color: "#989898"
                }
            },
        }
    ];
};
const yAxisKline = (yFormat: any, min: number, max: number, unit: string) => {
    return [
        {
            splitLine: {
                //网格线
                lineStyle: {
                    type: "dashed", //设置网格线类型 dotted：虚线   solid:实线
                    color: ["#f1f1f1"]
                },
                show: true //隐藏或显示
            },

            type: "value",
            min: min,
            max: max,
            interval: min === max ? max / 4 : (max - min) / 4,
            axisLabel: {
                fontSize: 12,
                textStyle: {
                    color: "#989898"
                },
                formatter: (value: any) => {
                    if (unit === '$') {
                        return unit + yFormat(value)
                    } else {
                        return yFormat(value) + unit
                    }
                }

            }
        }
    ];
};

export const chartOption: any = (
    xData: any,
    getModel: Function,
    series: any,
    yFormat: any,
    min: number,
    max: number,
    unit: string
) => {
    return {
        grid: grid(),
        tooltip: tooltips(getModel, unit),
        graphic: graphic(),
        xAxis: xAxis(xData),
        yAxis: yAxisKline(yFormat, min, max, unit),
        series: series
    };
};
