

const grid = (interval:string) => {
  const xLength=interval==='1D'?'12px':'35px'
  return {
    left: xLength,
    right: xLength,
    bottom: '45px',
    top: '16px',
    y2: 0,
    containLabel: true,
  }
}

const tooltips = (getModel: any,xData:any) => {
  return {
    padding: [8, 10, 8, 10],
    trigger: 'axis',
    extraCssText: 'z-index:21',
    backgroundColor: 'rgba(255, 255, 255, 0.8);',
    textStyle: {
      color: 'black',
    },
    borderWidth: 1.5,
    borderColor: 'rgba(0, 0, 0, 0.06)',
    formatter: (params: any) => {
      return getModel(params,xData)
    },
  }
}

const graphic = () => {
  return [
    {
      type: 'group',
      bounding: 'raw',
      right: '49%',
      bottom: '65%',
      z: -1000,
      children: [
        {
          type: 'text',
          left: 'center',
          top: 'center',
          z: -1000,
          style: {
            fill: 'rgba(43, 140, 255, 0.08)',
            text: 'KingData.com',
            font: 'bold 52px sans-serif',
          },
        },
      ],
    },
  ]
}
//@ts-ignore
const dataZoom=()=>{
  return {
    type: 'inside'
  }
}
const xAxis = (xdata: Array<string>, xAxisOption: object) => {
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
        margin:20,
        showMinLabel: true,
        showMaxLabel: true,
        // showMinLabel: isMobile ? null : null, //显示最小值
        // showMaxLabel: isMobile ? null : null, //显示最大值
        // splitNumber: 3,
        textStyle: {
          color: '#989898',
        },
      },
      ...xAxisOption,
    },
  ]
}

const legend = (legendData: Array<string>) => {
  return {
    textStyle: {
      fontSize: 13,
    },
    itemHeight: 11.5,
    itemGap: 40,
    data: legendData,
    bottom: '2%',
    itemWidth: 14,
  }
}
//y轴左侧配置
export const  yAxisModel=(min: number, max: number, yLabelFormat: any)=> {
  return {
    show: false,
    position:'left',
    axisLine: {
      show: true, // 不显示坐标轴线
    },
    axisTick: {
      show: false, // 隐藏刻度线
    },
    z: 1000,
    splitLine: {
      // 网格线
      lineStyle: {
        type: 'dashed', // 设置网格线类型 dotted：虚线   solid:实线
        color: ['#f1f1f1'],
      },
      show: true, // 隐藏或显示
    },

    type: 'value',
    // min: min === max ? null : min,
    max:max+(max*0.05),
    // interval: min === max ? max / 4 : (max - min) / 4,
    interval:max/ 4,
    axisLabel: {
      inside: true,
      fontSize: 12,
      textStyle: {
        color: '#2B8DFF',
      },
      formatter: (value: any) => {
        return yLabelFormat(value)
      }
    }
  }
}
//y轴价格线配置
export const yKAxisModel=(kmin: number, kmax: number, yLabelFormat: any,isHasUnit:string)=> {
  return {
    show: true,
    position:'right',
    axisLine: {
      show: false, // 不显示坐标轴线
    },
    axisTick: {
      show: false, // 隐藏刻度线
    },
    splitLine: {
      // 网格线
      lineStyle: {
        type: 'dashed', // 设置网格线类型 dotted：虚线   solid:实线
        color: ['#f1f1f1'],
      },
      show: true, // 隐藏或显示
    },
    type: 'value',
    // min: kmin,
    max: kmax+(kmax*0.05),
    // interval: (kmax - kmin) / 4,
    interval: (kmax+(kmax*0.05)) / 4,
    axisLabel: {
      fontSize: 12,
      textStyle: {
        color: 'rgba(240, 191, 18, 1)',
      },
      formatter: (value: any) => {
        return isHasUnit?(isHasUnit==='$'?isHasUnit+yLabelFormat(value):yLabelFormat(value)+isHasUnit):yLabelFormat(value)
      }
    }
  }
}
//@ts-ignore  多线图
const yAxisKline = (
    min: number,
    max: number,
    kmin: number,
    kmax: number,
    yLabelFormat: any,
) => {
  return [
    {
      show: false,
      axisLine: {
        show: true, // 不显示坐标轴线
      },
      axisTick: {
        show: false, // 隐藏刻度线
      },
      z: 1000,
      splitLine: {
        // 网格线
        lineStyle: {
          type: 'dashed', // 设置网格线类型 dotted：虚线   solid:实线
          color: ['#f1f1f1'],
        },
        show: true, // 隐藏或显示
      },

      type: 'value',
      min: min === max ? null : min,
      max,
      interval: min === max ? max / 4 : (max - min) / 4,
      axisLabel: {
        inside: true,
        fontSize: 12,
        textStyle: {
          color: '#2B8DFF',
        },
        formatter: (value: any) => {
          return yLabelFormat(value)
        },
      },
    },
    {
      show: true,
      axisLine: {
        show: false, // 不显示坐标轴线
      },
      axisTick: {
        show: false, // 隐藏刻度线
      },
      splitLine: {
        // 网格线
        lineStyle: {
          type: 'dashed', // 设置网格线类型 dotted：虚线   solid:实线
          color: ['#f1f1f1'],
        },
        show: true, // 隐藏或显示
      },
      type: 'value',
      min: kmin,
      max: kmax,
      interval: (kmax - kmin) / 4,
      axisLabel: {
        fontSize: 12,
        textStyle: {
          color: 'rgba(240, 191, 18, 1)',
        },
        formatter: (value: any) => {
          return yLabelFormat(value)
        },
      },
    },
  ]
}

export const chartConfig = (
    xData: Array<string>,
    series: any,
    allYAxis:any,
    legendList: Array<string>,
    yLabelFormat: any,
    getModel: any,
    interval:string
) => {
  return {
    grid: grid(interval),
    tooltip: tooltips(getModel,xData),
    graphic: graphic(),
    xAxis: xAxis(xData, {}),
    legend: legend(legendList),
    yAxis: allYAxis,
    series,
  }
}

