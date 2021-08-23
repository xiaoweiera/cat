<script setup lang="ts">
import { ref, defineProps,onMounted } from 'vue'
import * as R from 'ramda'
import I18n from '~/utils/i18n/index'
import {getInject,setInject } from '~/utils/use/state'
import {chain} from '~/store/apy2/state'
import {chains} from '~/logic/apy2/config'
import {getProjectList,getTokenList} from '~/logic/apy2/index'

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

const projectList=ref(['全部'])
const tokenList=ref([])
// const getProjects=async ()=>{
//   const result=await getProjectList(chain.value,'')
//   result.unshift({name:'全部'})
//   projectList.value=result
// }
const getTokens=async ()=>{
  const result=await getTokenList()
  if(result.length>=2){
    // setInCoin(result[0].name)
    // setOutCoin(result[1].name)
    setInCoin('全部')
    setOutCoin('全部')
  }
  result.unshift({name:'全部'})
  tokenList.value=result
}
const clear=()=>{
  setProjectId('全部')
  setChained('全部')
  setKey(++key.value[0])
}
onMounted(()=>{
  getTokens()
  // getProjects()
})
</script>
<template>
  <div class="loanClass w-full p-4   flex items-center  bg-global-body rounded-kd4px justify-between ">
    <div>
      <div class="flex flex-wrap">
        <div class="mr-6">
          <span class="selectTxt">抵押币种</span>
          <el-select filterable :popper-append-to-body="false"   size="small" v-model="inCoin[0]" >
            <el-option v-for="item in tokenList"  :label="item.name" :value="item.name">
            </el-option>
          </el-select>
        </div>
        <div>
          <span class="selectTxt">借出币种</span>
          <el-select filterable :popper-append-to-body="false"   size="small" v-model="outCoin[0]" >
            <el-option v-for="item in tokenList"  :label="item.name" :value="item.name">
            </el-option>
          </el-select>
        </div>
      </div>
      <div class="flex mt-3 flex-wrap">
        <div class="mr-6">
          <span class="selectTxt">借贷平台</span>
          <el-select filterable :popper-append-to-body="false"   size="small" v-model="projectId[0]" >
            <el-option v-for="item in projectList" :key="item.id" :label="item.name" :value="item.id">
            </el-option>
          </el-select>
        </div>
        <div class="flex items-center">
          <span class="selectTxt"  style="text-indent: 2em;">公链</span>
          <el-select filterable :popper-append-to-body="false"   size="small" v-model="chained[0]" >
            <el-option v-for="item in chains" :key="item.key" :label="item.name" :value="item.key">
            </el-option>
          </el-select>
        </div>
      </div>
    </div>
    <div class="font-kdFang">
      <div @click="clear()" class="btnBorder w-40 text-center rounded-kd6px py-2.25 px-3 mb-3 hand">
        <span class="text-kd16px24px text-global-primary  font-medium">重置</span>
      </div>
      <div class="bg-global-primary  w-40 text-center rounded-kd6px py-2.25 px-3 hand">
        <iconFont type="icon-sousuo-da1" class="text-global-white mr-3" size="16" />
        <span class="text-kd16px24px text-global-white  font-medium">搜索</span>
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
    @apply text-global-highTitle text-opacity-45 h-10.5 w-75 bg-global-white  text-kd14px18px ;
  }
  .btnBorder{
    border:1px solid rgba(43, 141, 254, 0.25);
  }
  .selectTxt{
  @apply mr-3 text-kd14px18px text-global-highTitle text-opacity-85;
  }
  .el-input__suffix{
    @apply flex items-center;
  }
}

</style>
