<script setup lang="ts">
import { defineProps,onMounted,ref } from 'vue'
import {pairStore, symbolStore,selectX} from '~/store/liquidity/state'
import { useProvide,getInject } from '~/utils/use/state'
const props=defineProps({
  desc:String,
  config:Object,
  chartType:String,
  chartId:String,
  queryCoinType:Object,
  queryInterval:String,
  timeParam:Object
})
const state=ref(false)
const [,]=useProvide('title','')
const [,]=useProvide('chartloading',true)
const [,]=useProvide('tokenOrPairName','')
const [,setTimeParam ] = useProvide('timeParam', null)
const [,setCoinType ] = useProvide('coinType', null)
const [,setInterval]=useProvide('interval',null)
const [,setTs]=useProvide('ts',null)
const [,setPairData]=useProvide('pairData',null)
const [,setTokenData]=useProvide('tokenData',null)
const [isFull, ] = useProvide('isFull', false)

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
    if(!status){
      selectX.index=-1
      selectX.ts=null
    }
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
      <el-container v-if="scope.status" class="h-full xshidden  showY ">
        <el-header v-if="!isFull[0]" height="initial" class="p-0">
            <LiquidityFullChartHeader :desc="props.desc" :config="config"   :chartType="props.chartType" :chartId="props.chartId" />
        </el-header>
        <el-main v-if="!isFull[0]"  class="p-0 mt-4 flex-1" style="flex:1 !important;">
          <div class=" h-full">
            <LiquidityFullChartMain class="h-full" :config="config" :chartId="props.chartId" :chartType="props.chartType"/>
          </div>
        </el-main>
        <el-footer height="initial" :class="isFull[0]?'overflow-hidden flex-1':'overflow-hidden flex-1'" class="flex flex-col ">
          <LiquidityFullChartFlowDown :chartType="props.chartType"/>
        </el-footer>
      </el-container>
      <div v-else  class="flex absolute right-2 xshidden  ">
        <FullZoom v-login/>
      </div>
      <!--监听外层，控制 fullScreen 打开全屏或者取消全屏-->
      <FullTrigger/>
    </template>
  </FullScreen>
</template>
<style scoped lang="postcss">

</style>
