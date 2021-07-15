<script setup lang="ts">
import { defineProps,onMounted,ref,reactive,watch } from 'vue'
import {pairStore, symbolStore} from '~/store/liquidity/state'
import { useProvide,setInject } from '~/utils/use/state'
const props=defineProps({
  desc:String,
  config:Object,
  chartType:String,
  chartId:String,
  queryCoinType:Object,
  queryInterval:String,
  timeParam:Object
})
// timeBegin: getagoTimeStamp(90), // 开始时间
// timeEnd: dataToTimestamp(formatDefaultTime(null,'YYYY-MM-DD')), // 结束时间
// time:'',//时间是否改变，改变值  判断是否改变
// timeType:90,//7 30 90    0是自定义
// interval: '1D', // 颗粒度
// coinType: 'usd', // USD或者币
// tokenType: 'pair', // pair ETH USDT

const state=ref(false)
const [,]=useProvide('title','')
const [,setTimeParam ] = useProvide('timeParam', null)
const [,setCoinType ] = useProvide('coinType', null)
const [,setInterval]=useProvide('interval',null)
const [,setPairData]=useProvide('pairData',null)
const [,setTokenData]=useProvide('tokenData',null)
onMounted(()=>{
  setTokenData(symbolStore)
  setPairData(pairStore)
  // setIsToken()
  setInterval(props.queryInterval)
  setCoinType(props.queryCoinType)
})

const statusChange=(status:boolean)=>{
  //@ts-ignore 定时器防止进行多余监听

  setTimeout(() => {
    const time={
      timeBegin:props.timeParam.timeBegin,
      timeEnd:props.timeParam.timeEnd,
      time:props.timeParam.time,
      timeType:props.timeParam.timeType
    }
    setTimeParam(time)
    setCoinType(props.queryCoinType)
    setInterval(props.queryInterval)
  },10)
}


</script>
<template>
  <FullScreen @change="statusChange">
    <template #default="scope">
      <el-container v-if="scope.status" class="h-full">
        <el-header height="initial" class="p-0">
            <LiquidityFullChartHeader :desc="props.desc" :config="config"   :chartType="props.chartType" :chartId="props.chartId" />
        </el-header>
        <el-main  class="p-0 mt-4">
          <div class=" h-full">
            <LiquidityFullChartMain class="h-full" :config="config" :chartId="props.chartId" :chartType="props.chartType"/>
          </div>
        </el-main>
<!--        <el-footer height="initial" class="p-0">-->
<!--          <LiquidityFullChartFooter/>-->
<!--        </el-footer>-->
      </el-container>
      <div class="flex absolute right-2" v-else>
        <FullZoom/>
      </div>
    </template>
  </FullScreen>
</template>
<style scoped lang="postcss">

</style>
