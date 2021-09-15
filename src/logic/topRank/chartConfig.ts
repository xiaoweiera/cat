

const grid = () => {
  return {
    left:"0%",
    right:"0%",
    bottom:"0%",
    top: "0%",
    containLabel: false,
  }
}

const tooltips = () => {
  return {
    padding: [8, 10, 8, 10],
    trigger: 'axis',
    extraCssText: 'z-index:21',
    backgroundColor: 'rgba(255, 255, 255, 0.9);',
    textStyle: {
      color: 'black',
    },
    borderWidth: 1.5,
    borderColor: 'rgba(0, 0, 0, 0.06)',
    confine:true,
    formatter: (params: any) => {
      return 'getModel(params,xData)'
    },
  }
}


const xAxis = (xdata: any) => {
  return {
    axisTick: {
      show: false, // 隐藏刻度线
    },
    type: 'category',
    boundaryGap:false,
    data: xdata
  }
  return [
    {
      axisTick: {
        show: false, // 隐藏刻度线
      },
      axisLine: {
        show: false, // 不显示坐标轴线
      },
      splitLine: {
        // 网格线
        lineStyle: {
          type: 'dotted', // 设置网格线类型 dotted：虚线   solid:实线
        },
        show: false, // 隐藏或显示
      },
      type: 'category',
      data: xdata,
      axisLabel: {
        align:'left',
        margin:14,
        textStyle: {
          color: '#00B464',
        },
      },
    },
  ]
}

//y轴左侧配置
export const  yAxisModel=()=> {
  return {
    show: false,
    axisLine: {
      show: false, // 不显示坐标轴线
    },
    axisTick: {
      show: false, // 隐藏刻度线
    },
    splitLine: {
      show:false,
    },
    type: 'value',
  }
}
const seriesModel=(series:any)=>{
  return [{
    data: series,
    type: 'line',
    smooth: true,
    symbol: 'none',
    lineStyle:{
      width:1,
      color:'rgba(0, 180, 100, 1)'
    },
    areaStyle:{
      color:'rgba(0, 180, 100, 0.1)'
    }
  }]
}

export const chartConfig = (
  xData: Array<string>,
  series: any,
) => {
  return {
    grid: grid(),
    tooltip: tooltips(),
    xAxis: xAxis(xData),
    yAxis:yAxisModel(),
    series:seriesModel(series),
  }
}


