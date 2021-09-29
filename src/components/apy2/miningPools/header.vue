<script setup lang="ts">
import {defineProps,ref,watch,onMounted} from 'vue'
import hmt from '~/lib/hmt'
import * as R from 'ramda'
import I18n from '~/utils/i18n/index'
import {chain} from '~/store/apy2/state'
import {  setInject, getInject } from '~/utils/use/state'
import {getProjectList} from '~/logic/apy2/index'
import {chains} from '~/logic/apy2/config'
const props=defineProps({
  tagList:Object,
  hasCustom:Boolean,
  hasChain:Boolean,
  type:Boolean,
  hasProject:Boolean
})
const project=ref('all')
const chained=ref('all')
const setProject=setInject('project')
const setChained=setInject('chained')
const setTxt=setInject('txt')
const projectList=ref([
  {name:I18n.apyIndex.projects,id:'all'}
])
const txt=ref('')
watch(project,()=>{
  hmt.event('底部榜单选择项目', 'mining_list_project')
  setProject(project.value)
})
watch(chained,()=>setChained(chained.value))
watch(txt,()=>{
  hmt.event('底部榜单搜索', 'mining_list_search')
  setTxt(txt.value)
})
const typeList=ref([{name:I18n.apyIndex.all,key:'all'},{name:I18n.apyIndex.singleCoin,key:'token'},{name:'LP',key:'lp'}])
const getProject=async ()=>{
  if(props.hasProject){
    const result=await getProjectList(chain.value,'')
    projectList.value=projectList.value.concat(result)
  }
}
onMounted(()=>getProject())
</script>
<template>
  <div class="flex items-center font-kdFang flex-wrap md:justify-between ">
    <Apy2MiningPoolsSelectTag  v-if="props.hasCustom" :list="tagList" tagType='list' :type='props.type'   class="md:mr-10 w-12/12 md:w-max  min-h-9"/>
    <div class="flex flex-col md:flex-row  mt-3 md:mt-0" :class="props.hasCustom?'':'justify-between   w-full'">
      <div class="flex   flex-wrap">
        <Apy2MiningPoolsFliter v-if="props.type" class="mr-3  md:w-max md:mb-3 min-w-33 min-h-9   " :type='props.type'  :list="typeList" />
         <div v-if="props.hasProject" class="apyProject min-w-33     flex-1 md:mr-3 min-h-9">
        <el-select filterable :popper-append-to-body="false" v-model="project"   size="small" >
          <el-option v-for="item in projectList"  :label="item.name" :value="item.id">
          </el-option>
        </el-select>
      </div>
        <div v-if="props.hasChain" class="apyProject    flex-1  md:w-auto  md:mr-3 min-h-9">
          <el-select filterable :popper-append-to-body="false" v-model="chained"   size="small" >
            <el-option v-for="item in chains"  :label="item.name" :value="item.key">
            </el-option>
          </el-select>
        </div>
      </div>
      <div class="apySearch  px-4 py-2 rounded-kd6px  flex items-center h-9 mt-3 md:mt-0" >
        <IconFont type="icon-sousuo-da1" class="mr-2 text-global-highTitle text-opacity-45" size="12"></IconFont>
        <el-input v-model="txt" :placeholder="I18n.apyIndex.searchAll"></el-input>
      </div>
    </div>
  </div>
</template>
<style  lang="scss">
.apyProject{
  @apply  bg-global-white;
  .el-input__inner{
    border: 1px solid rgba(3, 54, 102, 0.06) !important;
    background: none;
    padding-left:4px !important;
    @apply md:text-kd14px18px  font-medium  text-global-highTitle text-opacity-85 md:w-30  text-center h-9 flex items-center ;
  }
  .el-icon-arrow-up{
    @apply mt-0.5;
  }
}
.apySearch{
  border: 1px solid rgba(3, 54, 102, 0.06);
  .el-input__inner{
    border: none;
    background: none;
    padding-left:0px !important;
    @apply md:text-kd14px18px text-kd12px16px text-global-highTitle text-opacity-45;
  }
}
</style>
