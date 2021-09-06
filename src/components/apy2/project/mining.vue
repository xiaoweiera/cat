<script setup lang="ts">
import {ref, defineProps,onBeforeMount,reactive,onMounted,watch} from 'vue'
import * as R from 'ramda'
import I18n from '~/utils/i18n/index'
import { Position, LegendDirection, colors, seriesType, EchartData } from '~/logic/echarts/interface'
import {echartTransform} from '~/lib/common'
import {useProvide, setInject, getInject} from '~/utils/use/state'
import {chainsIcon,selectChains} from '~/logic/apy2/config'
import {getProjectMiningTop10Chart} from '~/logic/apy2/index'
import {tolocaleUpperCase} from '~/lib/tool'
import DBList from '@fengqiaogang/dblist'
const props=defineProps({projectId:Object,pool_type:Object})
import {getPoolsList} from '~/logic/apy2/index'
const tagList=[{name:I18n.apyIndex.all,key:'all'}, {name:I18n.apyIndex.singleCoin,key:'dan'}, {name:'LP',key:'lp'}]
const radios = [{ label: I18n.apyIndex.singleCoin, value: 'token' }, { label: 'LP', value: 'lp' }]
const chain=getInject('chain')
const type = ref('tvl')
const selectList = ref([{name:'TVL',key:'tvl'},{name:'APY',key:'apy'}])
const chartData = reactive<EchartData>(new EchartData())
const pools=ref([])
const dialogSearch=ref('')
const list=ref([])
const key=ref(0)
const pcTip=reactive({value:false})
const loading=ref(true)
const param=reactive({
  from_ts:0,
  to_ts:0,
  project_id:props.projectId,
  pools:'',
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
  getData(props.projectId, props.pool_type, v.chain, v.radioValue, v.search)
}

const getChart=async ()=>{
  // loading.value=true
  key.value++
  // const result=await getProjectMiningTop10Chart(param)
  // loading.value=false
  // const data=echartTransform(result)
  // key.value++
  // chartData.legends = data.legends
  // chartData.xAxis = data.xAxis
  // chartData.series = data.series
}
const onSumbit=(v:any)=>{
  const poolsId=R.join(',',R.map(v=>v.id,v))
  param.pools=poolsId
  getChart()
}
const openTip=()=>pcTip.value=true
</script>
<template>
  <div class="font-kdFang relative mb-12">
    <Apy2ProjectChartInfo :title="`APY Top 10 ${I18n.apyIndex.pools}`" type="mining"/>
    <div class="mt-3 flex items-center justify-between flex-wrap  ">
      <div class="flex items-center md:mb-0 mb-3 ">
        <el-select class="projectMining" :popper-append-to-body="false" v-model="type" size="small">
          <el-option v-for="item in selectList" :label="item.name" :value="item.key">
          </el-option>
        </el-select>
        <div class="xshidden">
          <UiTransfer :title="I18n.apyIndex.addPool" :sub-title="I18n.apyIndex.selectedPool" :list="list" :radios="radios"   @changeParam="changeParam" :selects="selectChains" @submit="onSumbit">
            <template #content>
              <div class="px-4 rounded-kd6px w-30 h-8.5 w-fit ml-3 flex items-center hand" style="border:1px solid rgba(3, 54, 102, 0.1);">
                <IconFont class="text-global-highTitle text-opacity-85 mr-1" type="icon-add" size="16"/>
                <span class="text-global-highTitle whitespace-nowrap text-opacity-85 text-kd14px18px font-medium">{{I18n.apyIndex.addPool}}</span>
              </div>
            </template>
            <!-- 自定义左侧列表显示内容 -->
            <template #item="scope">
              <Apy2BaseAddPoolDialogItem :data="scope.data" class="w-full"/>
            </template>
            <!-- 自定义右侧列表显示内容 -->
            <template #result="scope">
              <Apy2BaseAddPoolDialogItem :data="scope.data" class="w-full"/>
            </template>
          </UiTransfer>
        </div>
        <div class="mdhidden" @click="openTip">
          <div class="px-4 rounded-kd6px w-30 h-8.5 w-fit ml-3 flex items-center hand" style="border:1px solid rgba(3, 54, 102, 0.1);">
            <IconFont class="text-global-highTitle text-opacity-85 mr-1" type="icon-add" size="16"/>
            <span class="text-global-highTitle whitespace-nowrap text-opacity-85 text-kd14px18px font-medium">{{I18n.apyIndex.addPool}}</span>
          </div>
          <UiDialogPcTip  :pcTip="pcTip"/>
        </div>

      </div>
      <UiDateDay @change="changeTime"/>
    </div>
    <!--    图表echarts-->
    <Apy2TopContainer :key="key" class="mt-4"  type="mining"  :paramData="param" :project="true"/>
<!--    <Apy2ProjectChart :custom="true" :loading="loading" :key="key" :chartData="chartData"  />-->

    <!--    表格-->
    <div class="mt-8">
      <span class="text-kd18px24px text-global-highTitle text-opacity-85 font-medium mb-3 block">{{I18n.apyIndex.allMiningPool}}</span>
      <Apy2ProjectMiningList :projectId="props.projectId" />
    </div>
  </div>
</template>
<style  lang="scss">
.projectMining{
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




