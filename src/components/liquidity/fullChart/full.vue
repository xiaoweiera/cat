<script setup lang="ts">
import { defineProps,onMounted,ref,reactive,watch } from 'vue'
import { useProvide,setInject } from '~/utils/use/state'
const props=defineProps({
  chartType:String,
  chartId:String,
  queryCoinType:Object,
  queryInterval:String
})
// timeBegin: getagoTimeStamp(90), // 开始时间
// timeEnd: dataToTimestamp(formatDefaultTime(null,'YYYY-MM-DD')), // 结束时间
// time:'',//时间是否改变，改变值  判断是否改变
// timeType:90,//7 30 90    0是自定义
// interval: '1D', // 颗粒度
// coinType: 'usd', // USD或者币
// tokenType: 'pair', // pair ETH USDT

// useProvide('interval', props.queryInterval.value)
// const setInterval=setInject('interval')

const chartType=ref(props.queryChartType)
const state=ref(false)

const [ , setCoinType ] = useProvide('coinType', null)
watch(()=>props.queryCoinType.value,()=>{
  setCoinType(props.queryCoinType.value)
})
onMounted(()=>{
  // setInterval(props.queryInterval.value)
  setCoinType(props.queryCoinType.value)
})



</script>
<template>
  <FullScreen>
    <template #default="scope">
      <el-container v-if="scope.status" class="h-full">
        <el-header height="initial" class="p-0">
            <LiquidityFullChartHeader   :chartType="chartType" :chartId="props.chartId" />
        </el-header>
        <el-main  class="p-0">
          <div class="border-1 h-full">
            <LiquidityFullChartMain />
          </div>
        </el-main>
<!--        <el-footer height="initial" class="p-0">-->
<!--          <div class="border-1">footer</div>-->
<!--        </el-footer>-->
      </el-container>
      <div class="flex absolute right-0" v-else>
        <FullZoom/>
      </div>
    </template>
  </FullScreen>
</template>
<style scoped lang="postcss">

</style>
