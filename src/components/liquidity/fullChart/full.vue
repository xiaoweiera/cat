<script setup lang="ts">
import { defineProps,onMounted,ref } from 'vue'
import {pairStore, symbolStore} from '~/store/liquidity/state'
import { useProvide } from '~/utils/use/state'
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
  <FullScreen   @change="statusChange">
    <template #default="scope">
      <el-container v-if="scope.status" class="h-full xshidden ">
        <el-header height="initial" class="p-0">
            <LiquidityFullChartHeader :desc="props.desc" :config="config"   :chartType="props.chartType" :chartId="props.chartId" />
        </el-header>
        <el-main  class="p-0 mt-4">
          <div class=" h-full">
            <LiquidityFullChartMain class="h-full" :config="config" :chartId="props.chartId" :chartType="props.chartType"/>
          </div>
        </el-main>
        <el-footer height="initial" class="p-0 ">
          <LiquidityFullChartFlowDown class=" "/>
        </el-footer>
      </el-container>
      <div v-else  class="flex absolute right-2 xshidden ">
        <FullZoom v-login/>
      </div>
    </template>
  </FullScreen>
</template>
<style scoped lang="postcss">

</style>
