<script setup lang="ts">
import {defineProps,ref,watch,onMounted} from 'vue'
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
  {name:'全部项目',id:'all'}
])
const txt=ref('')
watch(project,()=>setProject(project.value))
watch(chained,()=>setChained(chained.value))
watch(txt,()=>setTxt(txt.value))
const typeList=ref([{name:'全部',key:'all'},{name:'单利',key:'token'},{name:'LP',key:'lp'}])
const getProject=async ()=>{
  if(props.hasProject){
    const result=await getProjectList(chain.value,'')
    projectList.value=projectList.value.concat(result)
  }
}
onMounted(()=>getProject())
</script>
<template>
  <div class="flex items-center font-kdFang flex-wrap justify-between">
    <Apy2MiningPoolsSelectTag  v-if="props.hasCustom" :list="tagList"   class="mr-10"/>
    <div class="flex" :class="props.hasCustom?'':'justify-between   w-full'">
      <div class="flex ">
      <Apy2MiningPoolsFliter v-if="props.type" class="mr-3"  :list="typeList" />
      <div v-if="props.hasProject" class="apyProject mr-3">
        <el-select filterable :popper-append-to-body="false" v-model="project"   size="small" >
          <el-option v-for="item in projectList"  :label="item.name" :value="item.id">
          </el-option>
        </el-select>
      </div>
        <div v-if="props.hasChain" class="apyProject mr-3">
          <el-select filterable :popper-append-to-body="false" v-model="chained"   size="small" >
            <el-option v-for="item in chains"  :label="item.name" :value="item.key">
            </el-option>
          </el-select>
        </div>
      </div>

      <div class="apySearch mr-3 px-4 py-2 rounded-kd6px  flex items-center h-9" >
        <IconFont type="icon-sousuo-da1" class="mr-2 text-global-highTitle text-opacity-45" size="12"></IconFont>
        <el-input v-model="txt" placeholder="搜索币种/项目"></el-input>
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
    @apply text-kd14px18px font-medium  text-global-highTitle text-opacity-85 w-30 text-center h-9 flex items-center  text-kd14px18px ;
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
    @apply text-kd14px18px text-global-highTitle text-opacity-45;
  }
}
</style>
