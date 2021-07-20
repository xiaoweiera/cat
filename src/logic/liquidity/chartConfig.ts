
const mobile=window.screen.width>768?false:true
const grid = (interval:string,full:boolean) => {
  // const xLength=interval==='1D'?'12px':'35px'
  return {
    left:mobile?3:72,
    right: mobile?3:70,
    bottom: full?68:85,
    top: 10,
    // y2: 0,
    containLabel: false,
  }
}
// const legend = (legendData: Array<string>) => {
//   let newData=legendData.map((item:any)=>{
//     return {...item,
//       textStyle: {
//         fontSize: 13,
//       },
//       x:'center',
//       align:'auto',
//       itemHeight: 11.5,
//       itemGap: 13,
//       bottom: ((item.index*8))+'%',
//       itemWidth: 14,
//     }
//   })
//  return newData
// }
const legend = (legendData: Array<string>,full:boolean) => {
  return {
    textStyle: {
      fontSize: 13,
    },
    x:'center',
    align:'auto',
    itemHeight: 11.5,
    itemGap: 13,
    data: legendData,
    bottom:full?0:4,
    itemWidth: 14,
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
      silent: true,
      children: [
        {
          type: 'text',
          left: 'center',
          top: 'center',
          silent: true,
          style: {
            fill: 'rgba(43, 140, 255, 0.08)',
            text: 'KingData.com',
            font: mobile?'bold 36px sans-serif':'bold 52px sans-serif',
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
        align:'left',
        margin:14,
        showMinLabel: mobile?null:true,
        showMaxLabel: mobile?null:true,
        textStyle: {
          color: '#989898',
        },
      },
      ...xAxisOption,
    },
  ]
}


//y轴左侧配置
export const  yAxisModel=(min: number, max: number,isShow:boolean, yLabelFormat: any)=> {
  min=Math.floor(min)
  max=Math.ceil(max+(max*0.05))
  const interval=parseFloat(((max-min)/4).toString())
  return {
    show: isShow,
    position:'left',
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
    min:min,
    max:max,
    interval:interval,
    splitNumber:4,
    axisLabel: {
      fontSize: 12,
      inside:mobile?true:false,
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
export const yKAxisModel=(kmin: number, kmax: number,isShow:boolean, yLabelFormat: any,isHasUnit:string)=> {
  kmin=Math.floor(kmin)
  kmax=kmax+(kmax*0.05)
  const interval=parseFloat(((kmax-kmin)/4).toString())
  return {
    show: isShow,
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
    min:kmin,
    max:kmax,
    interval:interval,
    splitNumber:4,
    axisLabel: {
      inside:mobile?true:false,
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
    interval:string,
    full:boolean
) => {
  return {
    grid: grid(interval,full),
    tooltip: tooltips(getModel,xData),
    graphic: graphic(),
    xAxis: xAxis(xData, {}),
    legend: legend(legendList,full),
    yAxis: allYAxis,
    series,
  }
}

