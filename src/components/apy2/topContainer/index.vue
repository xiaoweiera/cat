<script setup lang="ts">
import {onMounted,reactive,watch,ref,computed,defineProps} from 'vue'
import {getTopData} from '~/logic/apy2/index'
import {rankingTag,chain} from '~/store/apy2/state'
import {echartTransform} from '~/lib/common'
import { EchartData } from '~/logic/echarts/interface'
import I18n from '~/utils/i18n/index'
const props=defineProps({
  header:Boolean,
  type:String,
  project:Boolean,
  token:Boolean,
  paramData:Object,
  symbol:String
})
const token=reactive({value:'',name:''})
const chartData = reactive<EchartData>(new EchartData())
watch(()=>rankingTag.value,(n)=>{
  token.value=n[0]?.id
  token.name=n[0]?.name
})

//得到图表数据
const getChartData=async ()=>{
  if(!token.value && props.header) return
  let  result
  if(!props.project && !props.token){
    const param={
      chain:chain.value,
      group_id:token.value
    }
    result=await getTopData(props.type,props.project,props.token,param)
  }else if(props.project && props.type==='mining' ){
    result=await getTopData(props.type,props.project,props.token,props.paramData)
  }else if(props.project && props.type==='lend' ){
    result=await getTopData(props.type,props.project,props.token,props.paramData)
  }else if(props.token && props.type==='mining'){
    result=await getTopData(props.type,props.project,props.token,props.paramData)
  }else if(props.token && props.type==='lend'){
    result=await getTopData(props.type,props.project,props.token,props.paramData)
  }

  const data=echartTransform(result)
  chartData.legends = data.legends
  chartData.xAxis = data.xAxis
  chartData.series = data.series
  chartData.yAxis=data.yAxis
}


watch(()=>token.value,()=>getChartData())
const title=computed(()=>{
 if(props.type==='mining' && props.header){
   return     I18n.template(I18n.apyIndex.topTitleMining,{token:token.name})
 }else if(props.type==='lend' && props.header){
   return     I18n.template(I18n.apyIndex.topTitleLending,{token:token.name})
 }else if(props.type==='mining' && props.project){
   return    I18n.template(I18n.apyIndex.projectTitleMining)
 }else if(props.type==='lend' && props.project){
   return I18n.template(I18n.apyIndex.projectTitleLending)
 }else if(props.type==='mining' && props.token){
   return I18n.template(I18n.apyIndex.tokenTitleMining,{token:props.symbol})
 }else if(props.type==='lend' && props.token){
   return I18n.template(I18n.apyIndex.tokenTitleLeding,{token:props.symbol})
 }
})
onMounted(getChartData())
</script>
<template>
<div>
  <Apy2TopContainerGroups v-if="props.header" class="mb-3" :token="token" />
  <div class="flex md:flex-row flex-col">
<!--    <div class="border-1  border-global-numRed h-full flex-1">e</div>-->
    <Apy2TopContainerChart :chartData="chartData" class="flex-1 h-88  min-h-88 order-1 md:order-0 "   />

    <Apy2TopContainerList :class="(props.header )?'md:w-90 md:min-w-90':'md:w-87 md:min-w-87'" :type="props.type" :header="props.header" :project="props.project" :token="props.token" :title="title" :paramData="props.paramData" :tokenItem="token" class=" min-h-78 h-full md:ml-6 order-0 md:order-1 md:mb-0 mb-3" />
  </div>

</div>
</template>