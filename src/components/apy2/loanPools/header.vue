<script setup lang="ts">
import { ref, defineProps,onMounted,defineEmits } from 'vue'
import * as R from 'ramda'
import hmt from '~/lib/hmt'
import I18n from '~/utils/i18n/index'
import {getInject,setInject } from '~/utils/use/state'
import {chain} from '~/store/apy2/state'
import {chains} from '~/logic/apy2/config'
import * as lang from '~/utils/lang'


import {getProjectList,getTokenList} from '~/logic/apy2/index'
const langType=ref('')
const emitEvent = defineEmits([ 'search'])
const inCoin=getInject('inCoin')
const outCoin=getInject('outCoin')
const chained=getInject('chained')
const projectId=getInject('projectId')

const setInCoin=setInject('inCoin')
const setOutCoin=setInject('outCoin')
const setChained=setInject('chained')
const setProjectId=setInject('projectId')

const setKey=setInject('key')
const key=getInject('key')
const coin=ref('')

const projectList=ref([I18n.apyIndex.all])
const tokenList=ref([])
const getProjects=async ()=>{
  const result=await getProjectList(chain.value,'',undefined,true)
  result.unshift({name:I18n.apyIndex.all})
  projectList.value=result
}
const getTokens=async ()=>{
  const result=await getTokenList()
  if(result.length>=2){
    setInCoin(I18n.apyIndex.all)
    setOutCoin(I18n.apyIndex.all)
  }
  result.unshift({name:I18n.apyIndex.all})
  tokenList.value=result
}
const clear=()=>{
  setInCoin(I18n.apyIndex.all)
  setOutCoin(I18n.apyIndex.all)
  setProjectId(I18n.apyIndex.all)
  setChained(I18n.apyIndex.all)
  setKey(++key.value[0])
}
const search=()=>{
  emitEvent('search')
}
onMounted(()=>{
  langType.value=lang.current.value
  getTokens()
  getProjects()
})
const baidu=(name:string,key:string)=>hmt.event(name,key)
</script>
<template>
  <div class="loanClass w-full md:p-4 p-3 flex-wrap   flex items-center  bg-global-body rounded-kd4px justify-between " >
    <div class="flex items-center flex-wrap  ">
      <div class="flex md:mr-6 mr-3 flex-col flex-wrap">
        <div class="flex items-center">
          <span :class="langType==='en'?'min-w-23':''"  class="selectTxt">{{I18n.apyIndex.diyaCoin}}</span>
          <el-select filterable :popper-append-to-body="false"   size="small" v-model="inCoin[0]" >
            <el-option @click='baidu("借贷最佳路径选择抵押币种","lend_Best_supply")'  v-for="item in tokenList"  :label="item.name" :value="item.name">
            </el-option>
          </el-select>
        </div>
        <div class="mt-3 flex items-center">
          <span :class="langType==='en'?'min-w-23':''" class="selectTxt">{{I18n.apyIndex.loanPlat}}</span>
          <el-select filterable :popper-append-to-body="false"   size="small" v-model="projectId[0]" >
            <el-option @click='baidu("借贷最佳路径选择平台","lend_Best_project")' v-for="item in projectList" :key="item.id" :label="item.name" :value="item.id">
            </el-option>
          </el-select>
        </div>
      </div>
      <div class="flex flex-col  flex-wrap">
        <div class="flex items-center">
          <span :class="langType==='en'?'min-w-23':''" class="selectTxt ">{{I18n.apyIndex.jiechuCoin}}</span>
          <el-select filterable :popper-append-to-body="false"   size="small" v-model="outCoin[0]" >
            <el-option @click='baidu("借贷最佳路径选择解除币种","lend_Best_borrow")' v-for="item in tokenList"  :label="item.name" :value="item.name">
            </el-option>
          </el-select>
        </div>
        <div class="flex mt-3 items-center">
          <span :class="langType==='en'?'min-w-23':''" class="selectTxt "  style="text-indent: 2em;">{{I18n.apyIndex.loanListChain}}</span>
          <el-select filterable :popper-append-to-body="false"   size="small" v-model="chained[0]" >
            <el-option @click='baidu("借贷最佳路径选择公链","lend_Best_chain")' v-for="item in chains" :key="item.key" :label="item.name" :value="item.key">
            </el-option>
          </el-select>
        </div>
      </div>
    </div>
    <div class="font-kdFang md:mt-0 mt-3 flex md:flex-col flex-row  ">
      <div @click="clear()" class="btnBorder md:w-40 w-36.5  md:h-10.5 h-7 md:mr-0  mr-1.5  flex items-center justify-center text-center rounded-kd6px py-1.5 md:py-2.25 px-3 md:mb-3 hand">
        <span class="text-kd12px16px md:text-kd16px24px text-global-primary   font-medium">{{I18n.apyIndex.clearData}}</span>
      </div>
      <div @click="search()" class="bg-global-primary md:h-10.5 h-7 md:ml-0 ml-1.5  flex items-center justify-center   md:w-40 w-36.5 text-center rounded-kd6px py-1.5 md:py-2.25 px-3 hand">
        <iconFont type="icon-sousuo-da1" class="text-global-white mr-3" size="16" />
        <span class="text-kd12px16px md:text-kd16px24px text-global-white  font-medium">{{I18n.apyIndex.searchTxt}}</span>
      </div>
    </div>
  </div>

</template>
<style  lang="scss">

.loanClass{
  .el-input__inner{
    border: 1px solid rgba(3, 54, 102, 0.06)!important;
    background: none;
    border-radius: 6px;
    padding-left:12px !important;
    @apply text-global-highTitle text-opacity-45 md:h-10.5 md:w-75 w-23 md:10.5 h-7 bg-global-white  text-kd14px18px ;
  }
  .btnBorder{
    border:1px solid rgba(43, 141, 254, 0.25);
  }
  .selectTxt{
  @apply md:mr-3 mr-1.5 md:text-kd14px18px text-kd12px16px block text-right  text-global-highTitle text-opacity-85;
  }

  .el-input__suffix{
    @apply flex items-center;
  }
}

</style>
