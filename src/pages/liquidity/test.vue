<script setup lang="ts">
import {ref,onMounted,watch,computed,defineProps,onBeforeMount} from 'vue'
import {chain} from '~/store/apy2/state'
import {getTokenAndProject,getCalculator,getTokenList} from '~/logic/apy2/index'
import * as R from 'ramda'
const props=defineProps({
  chain:String,
  lendCoin:String,
  loanCoin:String,
  project_id:Number
})

onMounted(()=>{
  console.log('ppp',props.project_id,props.chain)
})
onBeforeMount(()=>{
  console.log('pppbefore',props.project_id)
})
const tokenList=ref([])
const projectList=ref([])
const projectId=ref()
const inCoin=ref('')
const outCoin=ref('')
const param={
  lend_symbol:'',
  loan_symbol:'',
  project_id:'',
  chain:'all',
  page:1,
  page_size:4
}
const getSelectData=async ()=>{
  const [tokenData,projectData]=await getTokenAndProject(chain.value,false)
  console.log(tokenData)
  tokenList.value=tokenData
  projectList.value=projectData
}
const clearRate=ref(340)
const diYaRate=ref(180)
const rate=ref(400)
const marks=ref({
  [clearRate.value]: {
    style: {
      width:'40px',
      position:'absolute',
      fontSize:'12px',
      transform:clearRate.value>diYaRate.value? 'translate(4px, -8px)':'translate(-40px,-8px)' ,
      color: 'rgba(3, 54, 102, 0.45)'
    },
    label: '清算率130%'
  },
  [diYaRate.value]: {
    style: {
      width:'65px',
      position:'absolute',
      fontSize:'12px',
      transform: clearRate.value>diYaRate.value? 'translate(-62px,-8px)':'translate(4px,-8px)',
      color: 'rgba(3, 54, 102, 0.45)'
    },
    label: '最低抵押率250%'
  }
})
const getColor=(v:number)=>v>=0?'text-global-numGreen':'text-global-numRed'
onMounted(getSelectData())
const projectItem=computed(()=>R.find(item=>item.id===projectId.value,projectList.value))
const getTip=(v:string)=>v+'%'
const getLabel=(item:any)=>item.chains.length>0?`${item.name} (${item.chains[0]})`:item.name
const getData=async ()=>{
  const res=await getCalculator(param)
  console.log('计算器',res)

}
watch(()=>projectId.value,async (n)=>{
  param.project_id=n
  const res=await getTokenList({})
})
watch(()=>inCoin.value,(n)=>{
  param.lend_symbol=n
})
watch(()=>outCoin.value,(n)=>{
  param.loan_symbol=n
})
const resultNumber=computed(()=>{

})
</script>
<template>
  <div class="font-kdFang cal w-full  p-4  bg-global-white rounded-kd4px">
    <div class="text-kd18px24px text-global-highTitle text-opacity-85 font-medium">真实利率计算器</div>
    <div class="borderGang mt-4"></div>
    <div>
      <div class="mt-4 h-11  flex items-center ">
        <div class="selectLabel mr-3 w-14.5">借贷平台</div>
        <div class="h-11 flex-1 rounded-kd6px borSelect flex items-center">
          <IconFont v-if="projectItem" class="mr-1" size="24" :type="projectItem.logo?projectItem.logo:'icon-morentoken'"/>
          <el-select v-model="projectId" placeholder="请选择">
            <el-option v-for="item in projectList"  :label="getLabel(item)" :value="item.id">
            </el-option>
          </el-select>
        </div>
      </div>
      <div class="mt-4 h-11  flex items-center ">
        <div class="selectLabel mr-3 w-14.5">抵押币种</div>
        <div class="h-11 flex-1 rounded-kd6px borSelect"></div>
      </div>
      <div class="mt-4 h-13.5  flex items-center ">
        <div class="selectLabel mr-3 w-14.5">抵押率</div>
        <div class="h-11 flex-1 relative font-kdExp">
          <div class=" -top-2.5 absolute flex justify-between  w-95 text-global-highTitle text-opacity-45 ">
            <span>100%</span>
            <span>500%</span>
          </div>
          <el-slider tooltip-class="myClass" :format-tooltip="getTip" v-model="rate"  :min="100" :max="500"  :marks="marks"></el-slider>
        </div>
      </div>
      <div class="mt-4 h-11  flex items-center ">
        <div class="selectLabel mr-3 w-14.5">借出币种</div>
        <div class="h-11 flex-1 rounded-kd6px borSelect"></div>
      </div>
    </div>
    <div class="w-full  text-center">
      <IconFont type="icon-arrow-down" size="24" class="my-4 text-global-highTitle text-opacity-35"/>
    </div>

    <div class="bg-global-primary bg-opacity-4 py-3 rounded-kd6px px-3">
      <div class="flex items-center justify-between mb-4">
        <div class="desLabel">抵押收益：</div>
        <div class="font-kdExp">
          <span :class="getColor(33.4)" class="mr-1.5 text-kd20px20px font-bold ">33.4%</span>
          <span class="text-global-highTitle text-opacity-65 text-kd12px16px">25% USDC + 5% LHB</span>
        </div>
      </div>
      <div class="flex items-center justify-between mb-4">
        <div class="desLabel">借款成本：</div>
        <div class="font-kdExp">
          <span :class="getColor(-33.4)" class="mr-1.5 text-kd20px20px font-bold ">-33.4%</span>
          <span class="text-global-highTitle text-opacity-65 text-kd12px16px">25% USDC + 5% LHB</span>
        </div>
      </div>
      <div class="flex items-center justify-between mb-4">
        <div class="desLabel">当前抵押率：</div>
        <div class="font-kdExp">
          <span :class="getColor(33.4)" class="mr-1.5 text-kd20px20px font-bold ">33.4%</span>
          <span class="text-global-highTitle text-opacity-65 text-kd12px16px">25% USDC + 5% LHB</span>
        </div>
      </div>
      <div class="borderGang mb-4"></div>
      <div class="flex items-center justify-between h-7 ">
        <div class="desLabel">真实利率：</div>
        <div class="font-kdExp">
          <span :class="getColor(33.4)" class="mr-1.5 text-kd28px28px font-bold ">33.4%</span>
          <span class="text-global-highTitle text-opacity-65 text-kd12px16px">25% USDC + 5% LHB</span>
        </div>
      </div>
    </div>

  </div>
</template>
<style  lang="scss">
.cal{
  .el-input__inner{
    padding:0px !important;
    border:none;
  }
  .borderGang{
    border:0.5px solid rgba(0, 0, 0, 0.04);
  }
  .selectLabel{
    @apply text-kd14px18px text-global-highTitle text-opacity-65;
  }
  .borSelect{
    border:1px solid rgba(3, 54, 102, 0.06);
    @apply px-3;
  }
  .desLabel{
    @apply text-kd12px16px text-global-highTitle text-opacity-45;
  }
  .el-slider__runway{
    height: 2px;
    background: rgba(37, 62, 111, 0.1);
  }
  .el-slider__bar{
    height: 2px;
    background: rgba(37, 62, 111, 0.1);
  }
  .el-slider__stop{
    left: 12.5%;
    width: 12px;
    height: 12px;
    background: rgba(246, 246, 246, 1);
    bottom: -4.8px;
    border: 1px solid rgba(37, 62, 111, 0.1);
  }
  .el-slider__button{
    background: #2B8DFE;
    bottom: 2px;
    width: 16px;
    height: 16px;
    position: relative;
  }
}

</style>