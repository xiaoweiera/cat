<script setup lang="ts">
import {ref, defineProps, reactive, watch, computed} from 'vue'
import * as R from 'ramda'
import { EchartData } from '~/logic/echarts/interface'
import {echartTransform} from '~/lib/common'
import { getInject} from '~/utils/use/state'
import {getDetail_chart} from '~/logic/apy2/index'
import {formatRulesNumber} from '~/lib/tool'
import hmt from '~/lib/hmt'
import I18n from '~/utils/i18n/index'
const props=defineProps({projectId:Object})
const selectList=ref([
  {name:'TVL',key:'tvl',unit:'$'},
  {name:I18n.apyIndex.projectLook.userMoney,key:'reward_cap',unit:'$'},
  {name:I18n.apyIndex.projectLook.borrowMoney,key:'borrowed',unit:'$'},
  {name:I18n.apyIndex.projectLook.intoMoney,key:'tvl_and_borrowd',unit:'$'},
  {name:I18n.apyIndex.projectLook.poolNumber,key:'pool_length',unit:I18n.apyIndex.projectLook.unit},
  {name:I18n.apyIndex.projectLook.singlePoolNumber,key:'token_pool_length',unit:I18n.apyIndex.projectLook.unit},
  {name:I18n.apyIndex.projectLook.lpPoolNumber,key:'lp_pool_length',unit:I18n.apyIndex.projectLook.unit},
])
const chain = getInject('chain')
const projectInfo = getInject('projectInfo')
const type = ref('tvl')
const chartData = reactive<EchartData>(new EchartData())
const projects = ref([])
const list=ref([])
const key=ref(0)
const loading=ref(true)
const param=reactive({
  from_ts:0,
  to_ts:0,
  project_id:props.projectId,
  field1:type.value
})
//改变时间
const changeTime = (time: any) => {
  param.from_ts=time[0].toString().slice(0,time[0].toString().length-3)
  param.to_ts=time[1].toString().slice(0,time[1].toString().length-3)
  getChart()
}
const typeItem=computed(()=>R.find(item=>item.key===type.value,selectList.value))
//改变TVL等
watch(()=>type.value,(n)=>{
  param.field1=n
  getChart()
})
const baidu=(name:string)=>hmt.event('切换项目数据总览类型',`project_data_overview_${name}`)
const getChart=async ()=>{
  loading.value=true
  const result=await getDetail_chart(param)
  loading.value=false
  const data=echartTransform(result)
  key.value++
  chartData.legends = data.legends
  chartData.xAxis = data.xAxis
  chartData.series = data.series
}

const h3 = computed<string>(function(): string {
  const [ info ] = projectInfo.value
  if (info && info.name) {
    return I18n.template(I18n.apyIndex.pageProject.h3.data, {
      project: info.name,
      value: I18n.apyIndex.projectView
    })
  }
  return I18n.apyIndex.projectView
})

</script>
<template>
  <div class="font-kdFang dataLook">
    <Apy2ProjectChartInfo :title="h3"/>
    <div class="mt-3 flex items-center justify-between">
      <div class="flex items-center">
        <el-select class="mr-3" :popper-append-to-body="false" v-model="type" size="small">
          <el-option @click='baidu(item.name)' v-for="item in selectList" :label="item.name" :value="item.key">
          </el-option>
        </el-select>
      </div>
      <UiDateDay @change="changeTime"/>
    </div>
    <div class="flex items-center my-3">
      <div class=" pr-12">
        <div class="dataTxt pr-12 ">{{typeItem.name}}</div>
        <div class="dataNumber mt-0.5">{{typeItem.unit==='$'?typeItem.unit+formatRulesNumber(projectInfo[0][type]):formatRulesNumber(projectInfo[0][type])+typeItem.unit}}</div>
      </div>
<!--      <div class="righBorder px-12" >-->
<!--        <div class="dataTxt">TVL</div>-->
<!--        <div class="dataNumber">$212124.11</div>-->
<!--      </div>-->
<!--      <div class="pl-12">-->
<!--        <div class="dataTxt">TVL</div>-->
<!--        <div class="dataNumber">$212124.11</div>-->
<!--      </div>-->
    </div>
    <!--    图表echarts-->
    <Apy2ProjectChart :custom="false" :loading="loading" :key="key" :chartData="chartData"  />
  </div>
</template>
<style  lang="scss">
.dataLook{
  @apply  bg-global-white;
  .el-input__inner{
    border: 1px solid rgba(3, 54, 102, 0.06) !important;
    background: none;
    width: 120px !important;
    height: 34px !important;
    padding-left:4px !important;
    @apply text-kd14px18px font-medium  text-global-highTitle text-opacity-85 w-30 text-center h-9 flex items-center  text-kd14px18px ;
  }
  .righBorder{
    border-right: 1px solid rgba(3, 54, 102, 0.1);
  }
  .dataTxt{
    @apply text-kd14px18px text-global-highTitle text-opacity-65 font-kdFang;
  }
  .dataNumber{
    @apply text-kd26px26px text-global-highTitle text-opacity-85 font-kdExp mt-0.5;
  }
}

</style>



