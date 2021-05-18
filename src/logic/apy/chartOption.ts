import * as R from 'ramda'
import { reactive, ref } from 'vue'
import { getDataset } from '~/api/apy'
import { tableConfig, tableIndex } from '~/logic/apy/config'
interface dataSetModel {
  chain: string
  category: string
  chartIndex: number
  selectedTag: string
  from_ts: number
  to_ts: number
}

interface platInfo {
  chain: string
  data: object
  icon: string
  project_name: string
  url: string
}

interface dropList {
  name: string
  select: string
  data: Array<object>
}

// 根据表格类型得到名字
export const getTypeNameByKey = (name: string) => {
  if (name === 'machine_gun_pool_single') {
    return '机枪池'
  } else if (name === 'lend_single') {
    return '存款'
  }
  return '借款'
}

// 得到链的名字，用作接口请求，接口是小写的
export const getChainName = (name: string) => {}
// 判断是第几个chart
const getChartIndex = (plats: dropList, propsChartIndex: Number) => {
  if (plats.select !== '全部' && propsChartIndex !== 2) return 0
  if (plats.select === '全部' && propsChartIndex !== 2) return 1
  return 2
}
// 获取marks和被选择项
const getMarks = (
  chartIndex: number,
  selectName: string,
  typeSelect: string,
) => {
  const marks = { data: [], select: '' }
  if (chartIndex === 2 && typeSelect === 'machine_gun_pool_single') {
    // @ts-ignore
    marks.data = ['APY', '用户总收益', 'TVL']
    // @ts-ignore
    marks.select = marks.data.includes(selectName)
      ? selectName
      : marks.data[0]
    // @ts-ignore
    return marks
  } else {
    // @ts-ignore
    marks.data = ['APY']
    marks.select = marks.data[0]
    return marks
  }
}
// 获取平台和首次设置mark
const getPlats = (
  chartIndex: number,
  selectName: string,
  dropData: dropList,
) => {
  if (chartIndex !== 2) {
    // @ts-ignore
    return dropData.data.includes(selectName)
      ? selectName
      : dropData.data[0]
  } else if (chartIndex === 2) {
    return '全部'
  }
}
// 根据链为所有的话 得到coins的数据 coins.data
const getAllCoinData = (platsSelect: string, data: any, chain: string) => {
  if (chain === 'ALL') {
    const project_name = platsSelect.slice(0, platsSelect.indexOf('('))
    const chain = platsSelect
      .slice(platsSelect.indexOf('(') + 1, platsSelect.indexOf(')'))
      .toLowerCase()
    // @ts-ignore
    const item: platInfo = R.find((item: platInfo) => {
      const status: boolean
        = item.project_name === project_name && item.chain === chain
      if (status || platsSelect === '全部') {
        return true
      }
    }, data)
    return Object.keys(item.data)
  } else {
    // @ts-ignore 当链不是ALl的时候得到coins.data
    const temp: platInfo = R.find((item: platInfo) => {
      if (item.project_name === platsSelect || platsSelect === '全部') {
        return true
      }
    }, data)
    return Object.keys(temp.data)
  }
}
// 根据链得到所有平台 plats.data
const getALlPlatsData = (chains: string, data: any) => {
  if (chains === 'ALL') {
    return R.map(
      (item: platInfo) =>
        `${item.project_name}(${item.chain.toLocaleUpperCase()})`,
      data,
    )
  } else {
    return R.map((item: platInfo) => item.project_name, data)
  }
}
// @ts-ignore  根据chain 获取 币种 和 平台
export const getInfo = (params: dataSetModel, propsChartIndex: number) => {
  const isChartIndex = ref(propsChartIndex)
  const chains = reactive({
    name: '所在链',
    select: params.chain.toLocaleUpperCase(),
    data: ['ETH', 'HECO', 'BSC', 'HSC', 'ALL'],
  })
  const types = reactive({ name: '类型', select: params.category, data: [] })
  const plats = reactive({ name: '平台', select: '', data: [] })
  const coins = reactive({ name: '币种', select: '', data: [] })
  const marks = reactive({ name: '指标', select: '', data: [] })
  // 得到table数据
  const getDataSet = async(params: dataSetModel) => {
    // @ts-ignore
    params.category = types.data.includes(types.select)
      ? params.category
      : types.data[0]
    types.select = params.category
    const {
      data: { data },
    } = await getDataset(params)
    return data
  }
  // 首次加载或者更改链
  const getData = async(params: dataSetModel) => {
    if (chains.select === 'HSC') {
      // @ts-ignore
      types.data = ['lend_single', 'loan_single']
    } else {
      // @ts-ignore
      types.data = ['machine_gun_pool_single', 'lend_single', 'loan_single']
    }
    // @ts-ignore
    const data = await getDataSet(params)
    // @ts-ignore 得到所有平台 点开第二个图表
    if (propsChartIndex === 1) {
      // @ts-ignore 得到所有平台
      plats.data = getALlPlatsData(chains.select, data)
      // @ts-ignore
      plats.data.unshift('全部')
      // @ts-ignore
      plats.select = '全部'
      // @ts-ignore 得到所有的币 得到conis.data
      coins.data = getAllCoinData(plats.select, data, chains.select)
      // @ts-ignore
      coins.select = coins.data.includes(params.selectedTag)
        ? params.selectedTag
        : coins.data[0]
      // @ts-ignore
      coins.data.unshift('全部')
    } else {
      // 第一个和第二个图表
      // @ts-ignore
      plats.data = getALlPlatsData(chains.select, data)

      // @ts-ignore 获取平台信息
      plats.select = getPlats(propsChartIndex, params.selectedTag, plats)

      if (propsChartIndex === 2) {
        marks.select = params.selectedTag
      }
      // @ts-ignore
      plats.data.unshift('全部')
      // @ts-ignore 得到所有的币 得到conis.data
      coins.data = getAllCoinData(plats.select, data, chains.select)
      // @ts-ignore
      coins.data.unshift('全部')
      coins.select = ''
    }
    // @ts-ignore 第三种类型图表
    const newMark = getMarks(
      params.chartIndex,
      params.selectedTag,
      types.select,
    )
    marks.data = newMark.data
    marks.select = newMark.select
  }
  // 更改类型
  const changeTypes = async(params: dataSetModel) => {
    // @ts-ignore
    const data = await getDataSet(params)
    // @ts-ignore 得到所有平台
    plats.data = getALlPlatsData(chains.select, data)
    // @ts-ignore
    plats.select = getPlats(propsChartIndex, plats.select, plats)
    // @ts-ignore
    plats.data.unshift('全部')
    // @ts-ignore 得到所有的币 得到conis.data
    coins.data = getAllCoinData(plats.select, data, chains.select)
    // @ts-ignore
    coins.data.unshift('全部')
    // @ts-ignore
    coins.select = coins.data.includes(coins.select)
      ? coins.select
      : coins.data[0]
    // 第三种类型图表
    const newMark = getMarks(params.chartIndex, marks.select, types.select)
    marks.data = newMark.data
    marks.select = newMark.select
    // }
  }
  // 更改平台
  const changePlats = async(params: dataSetModel) => {
    // @ts-ignore
    const data = await getDataSet(params)
    if (plats.select === '全部') {
      // @ts-ignore 得到所有的币
      coins.data = Object.keys(data[0].data)
    } else {
      // @ts-ignore 得到所有的币 得到conis.data
      coins.data = getAllCoinData(plats.select, data, chains.select)
    }
    // @ts-ignore
    coins.data.unshift('全部')
    // @ts-ignore 得到平台  因为每一个类型的币种和平台可能不一样，所以默认第一个
    coins.select = coins.data.includes(coins.select)
      ? coins.select
      : coins.data[0]
  }
  // 得到图表数据
  const requestFilterData = async(
    param: dataSetModel,
    filterName: String,
    propsChartIndex: Number,
  ) => {
    const chartIndex = getChartIndex(plats, propsChartIndex)
    isChartIndex.value = chartIndex
    // 判断是第几个table和chart
    const reqParam = {
      chain: param.chain,
      category: param.category,
      from_ts: param.from_ts,
      to_ts: param.to_ts,
      // @ts-ignore
      ...tableConfig[tableIndex[param.category]].charts[chartIndex].param,
    }
    // @ts-ignore
    const requstData = await tableConfig[tableIndex[param.category]].charts[
      chartIndex
    ].requestData(reqParam)
    // 第一个图表的话就是平台tag，第二个就是币tag
    const tagItem
      = chartIndex === 0
        ? plats.select
        : chartIndex === 2
          ? marks.select
          : coins.select
    // 第一个图表的话就能筛选币种，第二个不能，默认一个币种展示全部平台的
    filterName
      = chartIndex === 0
        ? coins.select === '全部'
          ? ''
          : coins.select
        : chartIndex === 2
          ? plats.select === '全部'
            ? ''
            : plats.select
          : ''
    // @ts-ignore
    const data: any = tableConfig[tableIndex[param.category]].charts[
      chartIndex
    ].chartData(requstData.data, tagItem)
    // @ts-ignore
    return tableConfig[tableIndex[param.category]].charts[chartIndex].xyData(
      data,
      filterName,
    )
  }
  return {
    chains,
    types,
    plats,
    coins,
    marks,
    getData,
    changeTypes,
    changePlats,
    requestFilterData,
    isChartIndex,
  }
}
