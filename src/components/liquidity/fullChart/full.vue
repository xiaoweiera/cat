<script setup lang="ts">
import { defineProps,onMounted,ref,reactive } from 'vue'
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
      page.value=1
      hasData.value=true
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
const page=reactive({value:1})
const hasData=reactive({value:true})
const scrollWatch=()=>{
  const listDom = document.querySelector('.containerChart')
  if(listDom){
    if ((parseInt(listDom.scrollHeight - listDom.scrollTop) === listDom.clientHeight) && hasData.value) {
      page.value++
    }
  }
}

</script>
<template>
  <FullScreen @change="statusChange">
    <template #default="scope">
      <el-container @scroll="scrollWatch()" v-if="scope.status" class="containerChart relative h-full flex xshidden  showY ">
        <el-header  height="initial" class="p-0">
            <LiquidityFullChartHeader :desc="props.desc" :config="config"   :chartType="props.chartType" :chartId="props.chartId" />
        </el-header>
        <el-main  class="p-0 mt-4"  style="flex:5;    overflow: hidden;">
          <div class=" h-full" style="height:100%;    overflow: hidden;">
            <LiquidityFullChartMain style="    overflow: hidden;" class="h-full"  :config="config" :chartId="props.chartId" :chartType="props.chartType"/>
          </div>
        </el-main>
        <el-footer  style="flex:6" class="flex flex-col ">
          <LiquidityFullChartFlowDown v-if="props.chartType==='flow'" :chartId="props.chartId" :page="page" :hasData="hasData"  :chartType="props.chartType"/>
          <LiquidityFullChartPayDown v-else  :page="page"  :chartId="props.chartId" :hasData="hasData" :chartType="props.chartType"/>
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
.showY::-webkit-scrollbar {
  height: 8px;
  @apply w-0.5;
}
.showY::-webkit-scrollbar-thumb:vertical {
  background: rgba(0, 0, 0, 0.1);
}
</style>
