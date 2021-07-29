

const mobile=window.screen.width>768?false:true
const grid = (interval:string,full:boolean,row:number) => {
  // const xLength=interval==='1D'?'12px':'35px'
  //@ts-ignore
  let height=0
  if (row <= 1) {
    height = 65
  } else if(row===2){
    height =110
  }else {
    height = row * 45
  }
  return {
    left:mobile?3:72,
    right: mobile?3:70,
    // bottom: full?68:85,
    bottom:mobile?30:height,
    top: 10,
    // y2: 0,
    containLabel: false,
  }
}
const legend = (legendData: Array<string>,selected:object,full:boolean) => {
  return {
    textStyle: {
      fontSize: 13,
    },
    x:'center',
    align:'auto',
    itemHeight: 11.5,
    itemGap: 13,
    data: legendData,
    selected:selected,
    bottom:full?0:4,
    itemWidth: 14,
  }
}
const tooltips = (getModel: any,xData:any) => {
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
      return getModel(params,xData)
    },
  }
}

const graphic = (row:number) => {
  let bottomNumber='65%'
  if(row===3){
    bottomNumber='70%'
  }else if(row>3){
    bottomNumber='80%'
  }
  return [
    {
      type: 'group',
      bounding: 'raw',
      right: '49%',
      bottom:mobile?'50%': bottomNumber,
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
            font: mobile?'bold 36px sans-serif':(row>=3?'bold 32px sans-serif':'bold 52px sans-serif'),
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
  console.log(kmin,Math.floor(kmin),kmin*0.9)
  kmin=kmin*0.96
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
        color: '#F88923',
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
    selected:object,
    yLabelFormat: any,
    getModel: any,
    interval:string,
    full:boolean,
    row:number
) => {
  return {
    grid: grid(interval,full,row),
    tooltip: tooltips(getModel,xData),
    graphic: graphic(row),
    xAxis: xAxis(xData, {}),
    legend:mobile?null: legend(legendList,selected,full),
    yAxis: allYAxis,
    series,
  }
}
export const getCodeWidth=(name:string)=>{
  let width=0
  name.split('').forEach((str:string)=>{
    //@ts-ignore
    const code=str.charCodeAt()
    if(code>=97 && code<=122){
      //a-z
      width+= 6
    }else if(code>=65 && code<=90){
      //A-Z
      width+= 3
    }else if(code===40 || code===41) {
      //( )
      width+= 10
    }else if(code===32){
      //' '
      width+=12
    }else if(code===43){
      //+
      width+=8
    }
    else{
      width+= 13.5
    }
  })
return width
}
export const clacLegendBoxWidth =(legends:string[])=> {
  let width = 0
  legends.forEach((item:any, index: number) => {
    const newName = item.name || ' '
    width +=  getCodeWidth(newName)
    if (index > 0) {
      width += 10
    }
  })
  return width
}
export const getLegendRow =(dom:any,legends:string[])=> {
  const width = clacLegendBoxWidth(legends)
  const boxWidth = dom.clientWidth - 55 * 2
  return Math.ceil(width / boxWidth)
}
