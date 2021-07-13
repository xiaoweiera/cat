/**
 * @file echarts 配置
 */
export const grid = function() {
  return {
    bottom: 0,
    left: 0,
    right: 15,
    top: '10%',
    containLabel: true,
  }
}

export const tooltips = function (getModel?: Function, unit?: string) {
  const option: any = {
    padding: [8, 10, 8, 10],
    trigger: 'axis',
    extraCssText: 'z-index:21',
    backgroundColor: 'rgba(255, 255, 255, 0.8);',
    textStyle: {
      color: 'black',
    },
    borderWidth: 1.5,
    borderColor: 'rgba(0, 0, 0, 0.06)',
  }
  if (getModel) {
    option.formatter = (params: any) => getModel(params, unit)
  }
  return option
}

export const graphic = function (fontSize: number = 22) {
  return {
    elements: [
      {
        type: 'group',
        bounding: 'raw',
        right: 'center',
        bottom: 'center',
        z: -100,
        children: [
          {
            type: 'text',
            left: 'center',
            top: 'center',
            z: 100,
            style: {
              fill: 'rgba(43, 140, 255, 0.08)',
              text: 'KingData.com',
              font: `bold ${fontSize}px sans-serif`,
            },
          },
        ],
      }
    ]
  }
}

// 设置网格线类型 dotted：虚线   solid:实线
export const splitLine = function(type: 'dotted' | 'solid' | 'dashed', show: boolean = false, color?: string) {
  const style: any = { type }
  if (color) {
    style.color = color
  }
  return {
    show, // 隐藏或显示
    lineStyle: style,
  }
}

export const xAxis = (xData: any[] = []) => {
  return [
    {
      axisTick: {
        show: false, // 隐藏刻度线
      },
      axisLine: {
        show: false, // 不显示坐标轴线
      },
      splitLine: splitLine('dotted'),
      type: 'category',
      data: xData,
      align: 'left',
      splitNumber: 3,
      axisLabel: {
        align: 'left',
        // showMinLabel: false,
        showMaxLabel: false,
        splitNumber: 1,
        textStyle: {
          color: '#989898',
        },
      },
    },
  ]
}
export const yAxisKline = (yFormat?: any, min?: number, max?: number, unit: string = '') => {
  const axisLabel: any = {
    fontSize: 12,
    textStyle: {
      color: '#989898',
    },
  }
  if (yFormat) {
    axisLabel.formatter = (value: any) => {
      if (unit === '$') {
        return unit + yFormat(value)
      } else {
        return yFormat(value) + unit
      }
    }
  }
  const option: any = {
    axisLabel,
    type: 'value',
    splitLine: splitLine('dashed', true,'#f1f1f1'),
  }

  if (min) {
    option.min = min
  }
  if (max) {
    option.max = max
  }
  if (min && max && min === max) {
    option.interval = min === max ? max / 4 : (max - min) / 4
  }


  return [ option ]
}

export const chartOption: any = (
  xData: any,
  getModel: Function,
  series: any,
  yFormat: any,
  min: number,
  max: number,
  unit: string,
) => {
  return {
    grid: grid(),
    tooltip: tooltips(getModel, unit),
    graphic: graphic(),
    xAxis: xAxis(xData),
    yAxis: yAxisKline(yFormat, min, max, unit),
    series,
  }
}
