const grid = () => {
    return {
        bottom: 0,
        left: 0,
        right: 15,
        top: '10%',
        containLabel: true
    };
};

const tooltips = (getModel: Function) => {
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
        formatter: (params: any) => getModel(params)
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
                        text: "iKingData.com",
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
                align: "center",
                // showMinLabel: false,
                // showMaxLabel: false,
                splitNumber: 1,
                textStyle: {
                    color: "#989898"
                }
            },

        }
    ];
};
const yAxisKline = (yFormat: any) => {
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
            axisLabel: {
                fontSize: 12,
                textStyle: {
                    color: "#989898"
                },
                formatter: (value: any) => yFormat(value)
            }
        }
    ];
};

export const chartOption: any = (
    xData: any,
    getModel: Function,
    series: any,
    yFormat: any
) => {
    return {
        grid: grid(),
        tooltip: tooltips(getModel),
        graphic: graphic(),
        xAxis: xAxis(xData),
        yAxis: yAxisKline(yFormat),
        series: series
    };
};
