import iconFont from '~/logic/icon'
import { tolocaleUpperCase, formatRulesNumber } from '~/lib/tool'
import * as R from 'ramda'

const getIcon = () => {
  const list = ['a', 'b', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']
  const data = {}
  R.forEach(item => {
    //@ts-ignore
    data[tolocaleUpperCase(item)] = {
      height: 14,
      width: 14,
      align: 'left',
      backgroundColor: {
        image: `../assets/icon/${tolocaleUpperCase(item)}.png`,
      },
    }
  }, list)
  return data
}
const getChainIcon = () => {
  const list = ['solana', 'eth', 'bsc', 'heco', 'oec', 'hoo', 'polygon', 'hsc']
  let data = {}
  R.forEach(item => {
    //@ts-ignore
    data[tolocaleUpperCase(item)] = {
      height: 14,
      width: 14,
      align: 'left',
      backgroundColor: {
        //@ts-ignore
        image: `../assets/icon/${item}.png`,
      },
    }
  }, list)
  return data
}
const tooltip = () => {
  return {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow',
    },
    formatter: function(value: any) {
      console.log(value,'k;k;k;')
      const d = JSON.parse(value[0].axisValueLabel)
      return `
      <div class='text-global-highTitle text-opacity-85'>${d.project}</div> 
      <div class='flex items-center'>
         <svg t='1632722474257'  class='icon w-4 h-4'   viewBox='0 0 1024 1024' version='1.1' xmlns='http://www.w3.org/2000/svg' p-id='25913' width='200' height='200'><path d='M853.312 85.312c-47.104 0-85.312 38.208-85.312 85.376v682.624a85.312 85.312 0 1 0 170.688 0V170.688c0-47.168-38.208-85.376-85.376-85.376zM426.688 426.688a85.312 85.312 0 1 1 170.624 0v426.624a85.312 85.312 0 1 1-170.624 0V426.688zM85.312 597.312a85.312 85.312 0 0 1 170.688 0v256a85.312 85.312 0 1 1-170.688 0v-256z' p-id='25914' fill='${d.color}'></path></svg>
         <div class='text-12 ml-1.5 text-global-highTitle text-opacity-85'>${d.value}%</div>           
      </div>
`
    },
  }
}
const grid = () => {
  return {
    top:'4%',
    left: '8%',
    right: '12%',
    bottom: '3%',
    containLabel: true,
  }
}
const getXaxis = () => {
  return {
    type: 'value',
    splitLine: {
      // 网格线
      lineStyle: {
        type: 'dashed', // 设置网格线类型 dotted：虚线   solid:实线
        color: ['#f1f1f1'],
      },
      show: true, // 隐藏或显示
    },
    axisLabel: {
      color: 'rgba(3, 54, 102, 0.45)',
      formatter: function(value: any) {
        return value + '%'
      },
    },
  }
}
const getYaxis = (data: any) => {
  return {
    type: 'category',
    axisLine: {
      show: false,
    },
    axisTick: {
      show: false,
    },
    axisLabel: {
      show: true,
      color: 'rgba(3, 54, 102, 1)',
      width:85,
      margin:0,
      fontFamily: 'D-DIN Exp',
      formatter: function(value: any) {
        const item = JSON.parse(value)
        const cateIcon = item.project_category ? tolocaleUpperCase(R.slice(0, 1, item.project_category)) : ''
        // return `{value|${item.project}}\n{${item.chain}|}{${cateIcon}|}{tags|${item.strategy_tags}}`
        return `{value|${item.project}}\n{${item.chain}|}{${cateIcon}|}`
      },
      rich: {
        value: {
          lineHeight: 20,
          align: 'left',
          height: 40,

        },
        tags: {
          lineHeight: 20,
          align: 'left',
          height: 40,

        },
        ...getIcon(),
        ...getChainIcon(),
      },
    },
    data: data,
  }
}
const getSeries = (data: any) => {
  return {
    type: 'bar',
    barWidth: '8',
    data: data,

    label: {
      color: 'rgba(3, 54, 102, 1)',
      show: true,
      position: 'right',
      formatter: function(param: any) {
        return param?.value + '%'
      },
    },
    itemStyle: {
      color: function(param: any) {
        return JSON.parse(param.name).color
      },
    },
  }
}
const graphic = () => {
  return [
    {
      type: 'group',
      bounding: 'raw',
      right: '49%',
      bottom:'49%',
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
            font:'bold 35px sans-serif',
          },
        },
      ],
    },
  ]
}
export const getConfig = (yData: any, series: any) => {
  return {
    backgroundColor:'#FEFEFE',
    graphic:graphic(),
    tooltip: tooltip(),
    grid: grid(),
    xAxis: getXaxis(),
    yAxis: getYaxis(yData),
    series: getSeries(series),
  }
}
