<script setup lang="ts">
import {ref, defineProps,onBeforeMount,reactive,onMounted,watch} from 'vue'
import * as R from 'ramda'
import I18n from '~/utils/i18n/index'
import { Position, LegendDirection, colors, seriesType, EchartData } from '~/logic/echarts/interface'
import {echartTransform} from '~/lib/common'
import {useProvide, setInject, getInject} from '~/utils/use/state'
import {chainsIcon,selectChains} from '~/logic/apy2/config'
import {getSame_category,getProjectList} from '~/logic/apy2/index'
import {tolocaleUpperCase} from '~/lib/tool'
import DBList from '@fengqiaogang/dblist'
const props=defineProps({projectId:Object})
const tagList=[{name:'全部',key:'all'}, {name:'单币',key:'dan'}, {name:'LP',key:'lp'}]
const chain=getInject('chain')
const projectInfo=getInject('projectInfo')
const type = ref('tvl')
const selectList = ref([{name:'TVL',key:'tvl'},{name:'APY',key:'apy'}])
const chartData = reactive<EchartData>(new EchartData())
const projects=ref([])
const dialogSearch=ref('')
const list=ref([])
const key=ref(0)
const loading=ref(true)
const param=reactive({
  from_ts:0,
  to_ts:0,
  project_id:props.projectId,
  is_lend:projectInfo.value[0].is_lend,
  projects:'',
  field1:type.value
})
//改变时间
const changeTime = (time: any) => {
  param.from_ts=time[0].toString().slice(0,time[0].toString().length-3)
  param.to_ts=time[1].toString().slice(0,time[1].toString().length-3)
  getChart()
}
//改变TVL APY
watch(()=>type.value,(n)=>{
  param.field1=n
  getChart()
})
const getData=async (chain,search)=>{
  const res= await getProjectList( chain, search)
  const dbRes=new DBList(res)
  list.value=dbRes.clone()
}
onBeforeMount(()=>{
  getData('all','')
})

const changeParam=(v:any)=>{
  getData(v.chain, v.search)
}

const getChart=async ()=>{
  loading.value=true
  const result=await getSame_category(param)
  loading.value=false
  const data=echartTransform(result)
  key.value++
  chartData.legends = data.legends
  chartData.xAxis = data.xAxis
  chartData.series = data.series
}
const onSumbit=(v:any)=>{
  const projectsId=R.join(',',R.map(v=>v.id,v))
  param.projects=projectsId
  getChart()
}
</script>
<template>
  <div class="font-kdFang ">
    <Apy2ProjectChartInfo title="同类项目数据"/>
    <div class="mt-3 flex items-center justify-between ">
      <div class="flex items-center">
        <el-select class="projectMining" :popper-append-to-body="false" v-model="type" size="small">
          <el-option v-for="item in selectList" :label="item.name" :value="item.key">
          </el-option>
        </el-select>
        <UiTransfer title="添加项目" sub-title="已选项目" :list="list"    @changeParam="changeParam" :selects="selectChains" @submit="onSumbit">
          <template #content>
            <div class="px-4 rounded-kd6px w-30 h-8.5 w-fit ml-3 flex items-center hand" style="border:1px solid rgba(3, 54, 102, 0.1);">
              <IconFont class="text-global-highTitle text-opacity-85 mr-1" type="icon-add" size="16"/>
              <span class="text-global-highTitle text-opacity-85 text-kd14px18px font-medium">添加项目</span>
            </div>
          </template>
          <!-- 自定义左侧列表显示内容 -->
          <template #item="scope">
            <Apy2BaseAddProjectDialogItem :data="scope.data" class="w-full"/>
          </template>
          <!-- 自定义右侧列表显示内容 -->
          <template #result="scope">
            <Apy2BaseAddProjectDialogItem :data="scope.data" class="w-full"/>
          </template>
        </UiTransfer>
      </div>
      <UiDateDay @change="changeTime"/>
    </div>
    <!--    图表echarts-->
    <Apy2ProjectChart :custom="true" :loading="loading" :key="key" :chartData="chartData"  />
  </div>
</template>
<style lang="scss">
.sameData{
  @apply  bg-global-white;
  .el-input__inner{
    border: 1px solid rgba(3, 54, 102, 0.06) !important;
    background: none;
    width: 120px !important;
    height: 34px !important;
    padding-left:4px !important;
    @apply text-kd14px18px font-medium  text-global-highTitle text-opacity-85 w-30 text-center h-9 flex items-center  text-kd14px18px ;
  }
}
</style>



