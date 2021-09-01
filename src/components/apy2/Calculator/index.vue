<script setup lang="ts">
import {ref,onMounted,watch,computed,defineProps,onBeforeMount,reactive} from 'vue'
import {chain} from '~/store/apy2/state'
import {getCalcProjects,getCalcTokens,getCalculator,} from '~/logic/apy2/index'
import {formatRulesNumber} from '~/lib/tool'
import * as R from 'ramda'
import I18n from '~/utils/i18n/index'
const props=defineProps({
  chain:String,
  lendCoin:String,
  loanCoin:String,
  project_id:Number
})

const projectList=ref([])
const tokenList=ref([])
const projectName=ref()
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

const real_rate=ref('')
const clearRate=ref(340)
const diYaRate=ref(180)
const rate=ref(400)
const marks=ref({})
const key=ref(0)
const calcResult=ref({})
const projectItem=ref({})
const getColor=(v:number)=>v>=0?'text-global-numGreen':'text-global-numRed'
const inCoinItem=computed(()=>{
  if(tokenList.value?.supply_tokens){
  return    R.find(item=>item.name===inCoin.value,tokenList.value?.supply_tokens)
  }
})
const outCoinItem=computed(()=>{
  if(tokenList.value?.supply_tokens){
    return  R.find(item=>item.name===outCoin.value,tokenList.value?.supply_tokens)
  }
})
watch(()=>projectName.value,(n)=>projectItem.value=R.find(item=>item.id===n,projectList.value))
const getTip=(v:string)=>v+'%'
const getLabel=(item:any)=>item.chain?`${item.name} (${item.chain})`:item.name
//获取项目列表
const getProject=async ()=>{
  projectList.value=await getCalcProjects()
  const project=R.find(item=>item.project_id===props.project_id && item.chain===props.chain,projectList.value)
  if(project){
    projectItem.value=project
    projectName.value=project.id
  }
}
//抵押率转化
const getMinMortgage=(v:number)=>Math.round(v?(1/(v/100))*100:0)
const minMortgage=computed(()=>getMinMortgage(calcResult.value.mortgage_rate))
//选择项目后进行币种填充
watch(()=>projectItem.value,async (n)=>{
  param.chain=n.chain
  param.project_id=n.project_id
  if(inCoin.value && outCoin.value){
    inCoin.value=''
    outCoin.value=''
  }else{
    inCoin.value=props.lendCoin
    outCoin.value=props.loanCoin
  }
  tokenList.value=await getCalcTokens({project:projectItem.value.name,chain:projectItem.value.chain})
})
watch(()=>[inCoin.value,outCoin.value],async(n)=>{
  param.lend_symbol=n[0]
  param.loan_symbol=n[1]
  if(n[0] && n[1]){
    calcResult.value=await getCalculator(param)
    clearRate.value=calcResult.value.liquidation_rate?calcResult.value.liquidation_rate:0
    diYaRate.value=getMinMortgage(calcResult.value.mortgage_rate)
    marks.value={
      [clearRate.value]: {
        style: {
          width:'40px',
          position:'absolute',
          fontSize:'12px',
          transform:clearRate.value>diYaRate.value? 'translate(4px, -8px)':'translate(-40px,-8px)' ,
          color: 'rgba(3, 54, 102, 0.45)'
        },
        label: reactive(`${I18n.apyIndex.clearRatio}${clearRate.value}%`)
      },
      [diYaRate.value]: {
        style: {
          width:'63px',
          position:'absolute',
          fontSize:'12px',
          transform: clearRate.value>diYaRate.value? 'translate(-62px,-8px)':'translate(4px,-8px)',
          color: 'rgba(3, 54, 102, 0.45)'
        },
        label: reactive(`${I18n.apyIndex.lowestLtv}${diYaRate.value}%`)
      }
    }
    getReal_Data()
  }

})
const  getReal_Data=()=>{
  // 真实利率=抵押收益-（借出成本*1/抵押率）
  if(calcResult.value){
    real_rate.value=formatRulesNumber((calcResult.value.lending_apy) -((calcResult.value.apy) / (rate.value)))
  }
}
watch(()=>rate.value,()=>getReal_Data())
const platSelect=()=>{
  document.getElementsByClassName('platModel')[0].click()
}
onMounted(getProject())
</script>
<template>
<div class="font-kdFang cal w-full  p-4  bg-global-white rounded-kd4px">
  <div class="text-kd18px24px text-global-highTitle text-opacity-85 font-medium text-left">{{I18n.apyIndex.realCalculator}}</div>
  <div class="borderGang mt-4"></div>
  <div>
    <div class="mt-4 h-11  flex items-center  ">
      <div class="selectLabel mr-3 w-14.5">{{I18n.apyIndex.loanPlat}}</div>
      <div class="h-11 flex-1 rounded-kd6px borSelect flex items-center">
        <div @click="platSelect()"  class="hand">
          <div v-if="projectItem?.id"  class="flex items-center min-w-40 h-full">
            <IconFont v-if="projectItem?.id" class="mr-1" style="border-radius: 50%;" size="24" :type="projectItem.icon?projectItem.icon:'icon-morentoken'"/>
            <div class="mr-1 text-global-highTitle font-kdFang text-kd14px18px font-medium">{{projectItem?.name}}</div>
            <div class="mr-1 text-kd12px14px  font-kdExp rounded-kd4px text-global-highTitle text-opacity-45 px-1 py-0.5 bg-global-highTitle bg-opacity-6 ">{{projectItem?.chain}}</div>
            <IconFont type="icon-arrow-down" size="12" class="text-global-highTitle text-opacity-12"/>
          </div>
          <div v-else>
            <div class="mr-1 text-global-highTitle font-kdFang text-kd14px18px font-medium">{{I18n.apyIndex.pleaseSelect}}</div>
          </div>
        </div>
        <div class="absolute  invisible">
        <el-select  class=" platModel"  v-model="projectName" :placeholder="I18n.apyIndex.pleaseSelect">
          <el-option v-for="item in projectList"  :label="getLabel(item)" :value="item.id">
          </el-option>
        </el-select>
        </div>
      </div>
    </div>
    <div class="mt-4 h-11 coin  flex items-center ">
      <div class="selectLabel mr-3 w-14.5">{{I18n.apyIndex.diyaCoin}}</div>
      <div class="h-11 flex-1 rounded-kd6px borSelect flex items-center">
        <IconFont v-if="inCoinItem" class="mr-1" style="border-radius: 50%;" size="24" :type="inCoinItem.icon?inCoinItem.icon:'icon-morentoken'"/>
        <el-select  class=" platModel"  v-model="inCoin" :placeholder="I18n.apyIndex.pleaseSelect">
          <template  v-for="item in tokenList?.supply_tokens">
            <el-option v-if="item.name!==outCoin"   :label="item.name" :value="item.name">
            </el-option>
          </template>
        </el-select>
      </div>
    </div>
    <div class="mt-4 h-13.5 coin  flex items-center ">
      <div class="selectLabel mr-3 w-14.5">{{I18n.apyIndex.diyaRato}}</div>
      <div class="h-11 flex-1 relative font-kdExp">
        <div class=" -top-2.5 absolute flex justify-between  w-95 text-global-highTitle text-opacity-45 ">
          <span>100%</span>
          <span>500%</span>
        </div>
        <el-slider tooltip-class="myClass" :format-tooltip="getTip" v-model="rate"  :min="100" :max="500"  :marks="marks"></el-slider>
      </div>
    </div>
    <div class="mt-4 h-11 coin  flex items-center ">
      <div class="selectLabel mr-3 w-14.5">{{I18n.apyIndex.jiechuCoin}}</div>
        <div class="h-11 flex-1 rounded-kd6px borSelect flex items-center">
          <IconFont v-if="outCoinItem" class="mr-1" style="border-radius: 50%;" size="24" :type="outCoinItem.icon?outCoinItem.icon:'icon-morentoken'"/>
          <el-select  class=" platModel"  v-model="outCoin" :placeholder="I18n.apyIndex.pleaseSelect">
            <template  v-for="item in tokenList?.borrow_tokens">
              <el-option v-if="item.name!==inCoin"  :label="item.name" :value="item.name">
              </el-option>
            </template>
          </el-select>
      </div>
    </div>
  </div>
  <div class="w-full  text-center">
    <IconFont type="icon-arrow-down" size="24" class="my-4 text-global-highTitle text-opacity-35"/>
  </div>

  <div class="bg-global-primary bg-opacity-4 py-3 rounded-kd6px px-3">
    <div class="flex items-center justify-between mb-4">
      <div class="desLabel">{{I18n.apyIndex.mortgage}}：</div>
      <div v-if="calcResult.id" class="font-kdExp">
        <span :class="getColor(calcResult.lending_apy)" class="mr-1.5 text-kd20px20px font-bold ">{{formatRulesNumber(calcResult.lending_apy)}}%</span>
        <span v-if="calcResult.lending_single_apy_detail" class="text-global-highTitle text-opacity-65 text-kd12px16px">{{formatRulesNumber(calcResult.lending_single_apy_detail)}}</span>
      </div>
      <div v-else>-</div>
    </div>
    <div class="flex items-center justify-between mb-4">
      <div class="desLabel">{{I18n.apyIndex.jiekuanMoney}}：</div>
      <div v-if="calcResult.id" class="font-kdExp">
        <span :class="getColor(calcResult.apy)" class="mr-1.5 text-kd20px20px font-bold ">{{formatRulesNumber(calcResult.apy)}}%</span>
        <span v-if="calcResult.apy_detail" class="text-global-highTitle text-opacity-65 text-kd12px16px">{{formatRulesNumber(calcResult.apy_detail)}}</span>
      </div>
      <div v-else>-</div>
    </div>
    <div class="flex items-center justify-between mb-4">
      <div class="desLabel">{{I18n.apyIndex.nowRato}}：</div>
      <div  class="font-kdExp">
        <span :class="getColor(rate)" class="mr-1.5 text-kd20px20px font-bold ">{{rate}}%</span>
        <span v-if="minMortgage && calcResult.mortgage_rate!==0" class="text-global-numRed font-medium text-kd12px16px"> ({{I18n.apyIndex.noLow}} {{minMortgage}}%)</span>
      </div>
    </div>
    <div class="borderGang mb-4"></div>
    <div class="flex items-center justify-between h-7 ">
      <div class="desLabel">{{I18n.apyIndex.realRato}}：</div>
      <div v-if="calcResult.id && rate>=minMortgage" class="font-kdExp">
        <span :class="getColor(real_rate)" class="mr-1.5 text-kd28px28px font-bold ">{{real_rate}}%</span>
        <span class="text-global-highTitle text-opacity-65 text-kd12px16px">${{formatRulesNumber(calcResult.lending_apy)}}% - (${{formatRulesNumber(calcResult.apy)}}% / ${{rate}}%)</span>
      </div>
      <div v-else>-</div>
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
  .coin{
    .el-input__inner{
      width:74px;
    }
  }
  .borderGang{
    border:none;
    border-top:1px solid rgba(0, 0, 0, 0.04);
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
  .el-dialog .el-dialog__body {
    padding: 0px 40px 0px 0px !important;
  }
}

</style>