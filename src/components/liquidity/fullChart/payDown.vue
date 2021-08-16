<script lang="ts" setup>
import {ref, computed, onMounted, watch, defineProps} from 'vue'
import I18n from '~/utils/i18n/index'
import * as lang from '~/utils/lang'
import {payHeader, typeName, orderTypeName,orderRules} from '~/logic/liquidity/down'
import * as R from 'ramda'
import {smallToken, formatRulesPrice, formatTime} from '~/lib/tool'
import * as scroll from '~/utils/event/scroll'
import {getPairName, getAddressHref} from '~/logic/liquidity/dataTool'
import {getDownFirstData} from '~/logic/liquidity/downTool'
import {pairStore, symbolStore, selectX} from '~/store/liquidity/state'
import {getInject, setInject} from '~/utils/use/state'

const props = defineProps({chartId:Number,chartType: String, page: Object, hasData: Object})
const timeParam = getInject('timeParam')
const isFull = getInject('isFull')
const interval = getInject('interval')
const setIsFull = setInject('isFull')
const tokenOrPairName = getInject('tokenOrPairName')
const row = ref(-1)
const selectRow = (index: number) => row.value = index === row.value ? -1 : index
const full = () => setIsFull(!isFull.value[0])
const pairName = (tokenName0: string, tokenName1: string) => getPairName(symbolStore.name, tokenName0, tokenName1)
const param = {
  platId: '1',
  page: props.page.value,
  page_size: 50,
  pair_id: pairStore.id,
  symbol_id: symbolStore.id,
  ts: selectX.ts ? selectX.ts : timeParam.value[0].timeEnd,
  interval: interval.value[0],
  ordering:orderRules[props.chartType][props.chartId],
  sort: 'desc'
}

const loading = ref(true)
const loadingData = ref(true)
const tableData = ref([])
const orderType=ref(1)  //类型 desc asc ''
const orderIndex=ref(-1)  //排序的第几个header
const orderSelect=payHeader.find((item,i)=>item.key===param.ordering)
orderIndex.value=orderSelect.index
watch(() => loading.value, (n) => loadingData.value = n)
//更改图表日期的时候重新得到数据
watch(() => selectX.ts, async (n) => {
  console.log('selectX')
  console.log(orderRules[props.chartType][props.chartId])
  orderType.value=1
  const orderSelect=payHeader.find((item,i)=>item.key===orderRules[props.chartType][props.chartId])
  orderIndex.value=orderSelect.index
  console.log('2',orderType.value,orderTypeName)
  param.sort=orderTypeName[orderType.value].key
  console.log('3')
  param.ordering=orderRules[props.chartType][props.chartId]
  console.log('4')
  tableData.value = []
  param.ts = n
  param.page = 1
  props.page.value = 1
  props.hasData.value = true
  row.value = -1
  await getData()
})
const getData = async () => {
  loading.value = true
  console.log('5')
  const data = await getDownFirstData(param, props.chartType, pairStore.id)
  console.log('6',data)
  if (data?.code === 0) {
    loading.value = false
    props.hasData.value = data.data.next ? true : false
    R.map(item => tableData.value.push(item), data?.data?.results)
    console.log('7')
  }
}
onMounted(async () => {
  await getData()
})
watch(() => props.page.value,async (n) => {
  console.log('55')
  if(n!==1){
    console.log('66')
    param.page = n
    await getData()
  }
})

const order =async (key: string, i: number) => {
  if (orderIndex.value !== i && orderIndex.value !== -1) {
    orderType.value = 1;
    orderIndex.value = i
  } else {
    orderIndex.value = i
    if (orderType.value === 2) {
      orderType.value = 0
    } else {
      orderType.value++
    }
  }
  param.sort = orderTypeName[orderType.value].key
  param.ordering = key
  param.page = 1
  props.page = 1
  props.hasData.value = true
  row.value = -1
  tableData.value = []
 await getData()
}
const timeName=computed(()=>{
  const ts=selectX.ts?selectX.ts:timeParam.value[0].timeEnd
  if(!ts) return
  const time=formatTime(ts,'M/DD')
  if(lang.current.value === 'cn'){
    const timeList=time.split('/')
    return `${timeList[0]}月${timeList[1]}日`
  }
  return time
})
</script>
<template>
  <div class="flex flex-1 flex-col  font-kdFang  w-full   bg-global-white">
    <el-affix :offset="90">
    <div class="pb-3 bg-global-white flex items-center relative text-kd18px28px overflow-hidden font-kdFang text-global-default text-opacity-85">
      <div class="font-semibold">
        <span>{{ tokenOrPairName[0] }}</span>
        <span class="ml-2">{{I18n.liquidity.down.details}}</span>
        <span class="ml-4">({{timeName}})</span>
      </div>
      <span class="text-global-default text-opacity-65 text-kd12px16px ml-4">{{I18n.liquidity.down.chartTip}} </span>
    </div>
    <div class="header bg-global-white  px-2.5 min-h-9 mb-1  flex items-center">
      <template v-for="(item,i) in payHeader">
        <div :style="{width:item.width}" :class="item.width?'':'flex-1'" class=" text-kd12px16px text-global-default text-opacity-65">
          <div class="flex items-center">
            <span>{{ item.name }}</span>
            <img v-if="i>1" @click="order(item.key,i)" class="w-2 h-2.5 ml-1 hand" :src="orderIndex===i?orderTypeName[orderType].img:orderTypeName[0].img" alt="">
          </div>
        </div>
      </template>
    </div>
    </el-affix>
    <!-- 二次展开-->
    <div v-if="tableData.length>0" class="flex flex-1 first  flex-col    showY">
      <template v-for="(item,i) in tableData">
        <div @click="selectRow(i)" :class="row===i?'selectedRow':''" class=" hand   px-2.5  min-h-8.5  font-kdExp items-center flex  text-kd14px18px text-global-highTitle text-opacity-65">
          <a :href="getAddressHref(item.address)" target="_blank" :style="{width:payHeader[0].width}" class="text-global-primary font-medium ">
            {{ smallToken(item.address) }}</a>
          <div :style="{width:payHeader[1].width}" class="text-global-highTitle font-medium ">
            {{ pairName(item.token0_symbol, item.token1_symbol) }}
          </div>
          <div :style="{width:payHeader[2].width}" class="flex-1 text-global-highTitle">
            <LiquidityFullChartPayTableItem
                :symbol0="item.token0_symbol"
                :symbol1="item.token1_symbol"
                :symbol0Number="item.symbol0_flow_in_coin_number"
                :symbol0Fund="item.symbol0_flow_in_fund"
                :symbol1Number="item.symbol1_flow_in_coin_number"
                :symbol1Fund="item.symbol1_flow_in_fund"
            />
          </div>
          <div :style="{width:payHeader[3].width}" class="flex-1 text-global-highTitle">
            <LiquidityFullChartPayTableItem
                :symbol0="item.token0_symbol"
                :symbol1="item.token1_symbol"
                :symbol0Number="item.symbol0_buy_coin_number"
                :symbol0Fund="item.symbol0_buy_fund"
                :symbol1Number="item.symbol1_buy_coin_number"
                :symbol1Fund="item.symbol1_buy_fund"
            />
          </div>
          <div :style="{width:payHeader[4].width}" class="flex-1 text-global-highTitle">
            <LiquidityFullChartPayTableItem
                :symbol0="item.token0_symbol"
                :symbol1="item.token1_symbol"
                :symbol0Number="item.symbol0_sell_coin_number"
                :symbol0Fund="item.symbol0_sell_fund"
                :symbol1Number="item.symbol1_sell_coin_number"
                :symbol1Fund="item.symbol1_sell_fund"
            />
          </div>
          <div :style="{width:payHeader[5].width}" class="text-center">{{ item.swap_count ? item.swap_count : 0 }}</div>
          <div :style="{width:payHeader[6].width}" class="text-center">{{ item.buy_count ? item.buy_count : 0 }}</div>
          <div :style="{width:payHeader[7].width}" class="text-center">{{ item.sell_count ? item.sell_count : 0 }}</div>
        </div>
        <!--        二次下钻-->
        <div v-if="row===i" class="px-2.5 openContainer">
          <LiquidityFullChartPayOpenDown :token0="item.token0_symbol" :token1="item.token1_symbol" :address="item.address" :pair_id="item.pair_id" :pairName="pairName(item.token0_symbol,item.token1_symbol)"/>
        </div>
      </template>
      <div class="w-full mb-1 text-center text-kd12px18px text-global-time">
        <div v-if="props.hasData.value && loading">{{I18n.liquidity.down.loading}}</div>
        <div v-else-if="props.hasData.value && !loading">{{I18n.liquidity.down.pull}}</div>
        <div v-else>{{I18n.liquidity.down.noMore}}</div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.donwBig {
  border: 1px solid rgba(43, 141, 255, 0.24);
  border-radius: 4px;
}

.showY {
  @apply overFlow-hidden overFlow-y-scroll;
}

.selectedRow {
  @apply bg-global-primary bg-opacity-8 flex items-center;
}

.openContainer {
  @apply bg-global-primary bg-opacity-4;
}


.header {
  border-top: 1px solid rgba(37, 62, 111, 0.12);
  border-bottom: 1px solid rgba(37, 62, 111, 0.12);
}

.txtSmall {
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}


.showY::-webkit-scrollbar {
  height: 8px;
  @apply w-0.5;
}

.showY::-webkit-scrollbar-thumb:vertical {
  background: rgba(0, 0, 0, 0.1);
}
</style>
// @formatter:off
<route lang="yaml">
meta:
layout: liquidityLayout
</route>
// @formatter:off
