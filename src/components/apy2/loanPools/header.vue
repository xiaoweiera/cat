<script setup lang="ts">
import { ref, defineProps,onMounted,defineEmits } from 'vue'
import * as R from 'ramda'
import I18n from '~/utils/i18n/index'
import {getInject,setInject } from '~/utils/use/state'
import {chain} from '~/store/apy2/state'
import {chains} from '~/logic/apy2/config'
import {getProjectList,getTokenList} from '~/logic/apy2/index'
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
  getTokens()
  getProjects()
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
          <span class="selectTxt"  style="text-indent: 2em;">{{I18n.apyIndex.loanListChain}}</span>
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
      <div @click="search()" class="bg-global-primary  w-40 text-center rounded-kd6px py-2.25 px-3 hand">
        <iconFont type="icon-sousuo-da1" class="text-global-white mr-3" size="16" />
        <span class="text-kd16px24px text-global-white  font-medium">{{I18n.apyIndex.searchTxt}}</span>
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
