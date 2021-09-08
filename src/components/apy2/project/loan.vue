<script setup lang="ts">
import { ref, defineProps, onBeforeMount, reactive, computed } from 'vue'
import * as R from 'ramda'
import { EchartData } from '~/logic/echarts/interface'
import { getInject} from '~/utils/use/state'
import { selectChains} from '~/logic/apy2/config'
import I18n from '~/utils/i18n/index'
import DBList from '@fengqiaogang/dblist'
const props=defineProps({projectId:Object,pool_type:Object})
import {getPoolsList} from '~/logic/apy2/index'
const chain=getInject('chain')
const chartData = reactive<EchartData>(new EchartData())
const pools=ref([])
const list=ref([])
const key=ref(0)
const loading=ref(true)
const pcTip=reactive({value:false})
const projectInfo = getInject('projectInfo')

const param=reactive({
  from_ts:0,
  to_ts:0,
  project_id:props.projectId,
  pools:pools.value,
})
//改变时间
const changeTime = (time: any) => {
  param.from_ts=time[0].toString().slice(0,time[0].toString().length-3)
  param.to_ts=time[1].toString().slice(0,time[1].toString().length-3)
  getChart()
}
const getData=async (project_id,pool_type,chain,type,search)=>{
  if(project_id) {
    const res= await getPoolsList(project_id, pool_type, chain, type, search)
    const dbRes=new DBList(res)
    list.value=dbRes.clone()
  }
}
onBeforeMount(()=>{
  getData(props.projectId,props.pool_type,'all','token','')
})

const changeParam=(v:any)=>{
  getData(props.projectId, props.pool_type, v.chain, v.radioValue?v.radioValue:'token', v.search)
}

const getChart=async ()=>{
  key.value++
  // loading.value=true
  // const result=await getProjectLoanTop10Chart(param)
  // loading.value=false
  // const data=echartTransform(result)
  // chartData.legends = data.legends
  // chartData.xAxis = data.xAxis
  // chartData.series = data.series
}
const onSumbit=(v:any)=>{
  const poolsId=R.join(',',R.map(v=>v.id,v))
  param.pools=poolsId
  getChart()
}

const h3 = computed<string>(function(): string {
  const [ info ] = projectInfo.value
  if (info && info.name) {
    return I18n.template(I18n.apyIndex.pageProject.h3.loan, {
      project: info.name,
      pool: I18n.apyIndex.pools
    })
  }
  return `APR Top 5 ${I18n.apyIndex.pools}`
})

const poolsH3 = computed<string>(function(): string {
  const [ info ] = projectInfo.value
  if (info && info.name) {
    return I18n.template('{project} {value}', {
      project: info.name,
      value: I18n.apyIndex.allLoanPool
    })
  }
  return I18n.apyIndex.allLoanPool
})

</script>
<template>
  <div class="font-kdFang mb-12">
    <Apy2ProjectChartInfo :title="h3" type="lend"/>
    <div class="mt-3 flex items-center justify-between">
      <div class="my-4 flex items-center justify-between w-full flex-wrap">
        <div class="xshidden">
          <UiTransfer  :title="I18n.apyIndex.addPool" :sub-title="I18n.apyIndex.selectedPool" :list="list"  @changeParam="changeParam"  :selects="selectChains" @submit="onSumbit">
            <template #content>
              <div class="px-4 rounded-kd6px w-30 h-8.5 w-fit  flex items-center hand" style="border:1px solid rgba(3, 54, 102, 0.1);">
                <IconFont class="text-global-highTitle text-opacity-85 mr-1" type="icon-add" size="16"/>
                <span class="text-global-highTitle text-opacity-85 text-kd14px18px font-medium">{{I18n.apyIndex.addLoanPool}}</span>
              </div>
            </template>
            <!-- 自定义左侧列表显示内容 -->
            <template #item="scope">
              <Apy2BaseAddTokenDialogItem :data="scope.data" class="w-full"/>
            </template>
            <!-- 自定义右侧列表显示内容 -->
            <template #result="scope">
              <Apy2BaseAddTokenDialogItem :data="scope.data" class="w-full"/>
            </template>
          </UiTransfer>
        </div>
        <div @click="pcTip.value=true" class="px-4 mdhidden mb-3 whitespace-nowrap rounded-kd6px w-30 h-8.5 w-fit  flex items-center hand" style="border:1px solid rgba(3, 54, 102, 0.1);">
          <IconFont class="text-global-highTitle text-opacity-85 mr-1" type="icon-add" size="16"/>
          <span class="text-global-highTitle text-opacity-85 text-kd14px18px font-medium">{{I18n.apyIndex.addLoanPool}}</span>
        </div>
        <UiDateDay @change="changeTime"/>
      </div>
    </div>
    <!--    图表echarts-->
    <Apy2TopContainer :key="key" class="mt-4"  type="lend"  :paramData="param" :project="true"/>
<!--        <Apy2ProjectChart :custom="true" :loading="loading" :key="key" :chartData="chartData"  />-->

    <!--    表格-->
    <div class="mt-8">
      <span class="text-kd18px24px text-global-highTitle text-opacity-85 font-medium mb-3 block">{{ poolsH3 }}</span>
      <Apy2ProjectLoanList :projectId="props.projectId" />
    </div>
  </div>
  <UiDialogPcTip :pcTip="pcTip"/>
</template>
<style scoped lang="scss">

</style>




