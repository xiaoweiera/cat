const grid = () => {
  return {
    left: 0,
    right: 0,
    top: '4%',
    containLabel: true,
  }
}

const tooltips = (getModel: Function, unit: string) => {
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
    formatter: (params: any) => getModel(params, unit),
  }
}

const graphic = () => {
  return [
    {
      type: 'group',
      bounding: 'raw',
      right: '49%',
      bottom: '65%',
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
            font: 'bold 55px sans-serif',
          },
        },
      ],
    },
  ]
}

const xAxis = (xData: any) => {
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
const yAxisKline = (yFormat: any, min: number, max: number, unit: string) => {
  return [
    {
      splitLine: {
        // 网格线
        lineStyle: {
          type: 'dashed', // 设置网格线类型 dotted：虚线   solid:实线
          color: ['#f1f1f1'],
        },
        show: true, // 隐藏或显示
      },

      type: 'value',
      min,
      max,
      interval: min === max
        ? max / 4
        : (max - min) / 4,
      axisLabel: {
        fontSize: 12,
        textStyle: {
          color: '#989898',
        },
        formatter: (value: any) => {
          if (unit === '$') {
            return unit + yFormat(value)
          } else {
            return yFormat(value) + unit
          }
        },
      },
    },
  ]
}
// @ts-ignore
const legend = (legendData: any) => {
  return {
    textStyle: {
      fontSize: 13,
    },
    data: legendData,
    itemHeight: 7,
    itemGap: 25,
    bottom: '2%',
    icon: 'path://M9.97493 7.79925C9.53216 7.89649 9.00189 8.16452 8.43335 8.83043C7.59177 9.81613 6.69923 10.4073 5.77629 10.639C4.84856 10.8719 4.01415 10.7102 3.34734 10.4174C2.69372 10.1303 2.18594 9.71228 1.85225 9.3866C0.787056 8.34696 0.764768 7.59236 1.53851 6.99563C2.06911 6.58643 2.81695 6.70032 3.21297 7.24907L3.21978 7.25809C3.22865 7.26968 3.2454 7.29111 3.26954 7.32012C3.3182 7.37862 3.39454 7.46512 3.49455 7.56273C3.70115 7.76437 3.97378 7.97915 4.28067 8.11393C4.57437 8.24292 4.88057 8.2922 5.2135 8.20863C5.55123 8.12386 6.03943 7.87132 6.63861 7.16952C7.51083 6.14793 8.48136 5.57223 9.47935 5.35307C10.4626 5.13716 11.3764 5.28796 12.1222 5.55004C12.8648 5.81101 13.4789 6.19498 13.8996 6.50292C14.1126 6.65887 14.2831 6.80056 14.4035 6.90629C14.7816 7.23843 15.3958 8.0556 14.6435 8.86775C14.1845 9.3634 13.4272 9.37899 12.9496 8.90361M12.9475 8.90151L12.9484 8.90242L12.9496 8.90361L12.9346 8.88921C12.919 8.87453 12.8922 8.84968 12.8549 8.81699C12.7802 8.75133 12.6656 8.6557 12.5184 8.54797C12.2187 8.32855 11.8122 8.07969 11.3543 7.91876C10.8994 7.75893 10.4325 7.69878 9.97493 7.79925',
    itemWidth: 14,
  }
}
export const chartOption: any = (
  xData: any,
  getModel: Function,
  series: any,
  legendData: any,
  yFormat: any,
  min: number,
  max: number,
  unit: string,
) => {
  return {
    grid: grid(),
    tooltip: tooltips(getModel, unit),
    legend: legend(legendData),
    graphic: graphic(),
    xAxis: xAxis(xData),
    yAxis: yAxisKline(yFormat, min, max, unit),
    series,
  }
}
